const COOKIE_NAME="rf_session";
const SESSION_DAYS=30;
const PBKDF2_ITERATIONS=100000;

function corsHeaders(request,env){
  const origin=request.headers.get("Origin")||"";
  const allowed=env.ALLOWED_ORIGIN||origin;
  return {
    "access-control-allow-origin":allowed,
    "access-control-allow-credentials":"true",
    "access-control-allow-methods":"GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers":"Content-Type, Authorization",
    "vary":"Origin"
  };
}
function response(data,status,request,env,extra={}){
  return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8",...corsHeaders(request,env),...extra}});
}
function now(){return new Date().toISOString()}
function uid(){return crypto.randomUUID()}
function randomBytes(n){const x=new Uint8Array(n);crypto.getRandomValues(x);return x}
function b64url(bytes){let s="";for(const b of bytes)s+=String.fromCharCode(b);return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}
function fromB64url(s){s=s.replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";const bin=atob(s),out=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)out[i]=bin.charCodeAt(i);return out}
async function sha256(value){const d=await crypto.subtle.digest("SHA-256",typeof value==="string"?new TextEncoder().encode(value):value);return new Uint8Array(d)}
function equalBytes(a,b){if(a.length!==b.length)return false;let x=0;for(let i=0;i<a.length;i++)x|=a[i]^b[i];return x===0}
async function derivePassword(password,salt){const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveBits"]);return new Uint8Array(await crypto.subtle.deriveBits({name:"PBKDF2",salt,iterations:PBKDF2_ITERATIONS,hash:"SHA-256"},key,256))}
async function hashPassword(password){const salt=randomBytes(16);const digest=await derivePassword(password,salt);return{salt:b64url(salt),hash:b64url(digest)}}
async function verifyPassword(password,saltText,hashText){return equalBytes(await derivePassword(password,fromB64url(saltText)),fromB64url(hashText))}
function parseCookies(request){const out={};for(const part of (request.headers.get("Cookie")||"").split(";")){const i=part.indexOf("=");if(i>0)out[part.slice(0,i).trim()]=decodeURIComponent(part.slice(i+1).trim())}return out}
function sessionCookie(token,maxAge=SESSION_DAYS*86400){return COOKIE_NAME+"="+encodeURIComponent(token)+"; Path=/; HttpOnly; Secure; SameSite=None; Max-Age="+maxAge}
function clearCookie(){return COOKIE_NAME+"=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0"}
function parseJson(v,fallback={}){try{return v?JSON.parse(v):fallback}catch{return fallback}}
function age(dob){const d=new Date(String(dob||"")+"T00:00:00");if(Number.isNaN(d.getTime()))return -1;const n=new Date();let a=n.getFullYear()-d.getFullYear();if(n.getMonth()<d.getMonth()||(n.getMonth()===d.getMonth()&&n.getDate()<d.getDate()))a--;return a}
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}
function profileOut(r){return{user_id:r.user_id,business_name:r.business_name||null,knowledge:parseJson(r.knowledge_json,{}),integrations:parseJson(r.integrations_json,{}),auto_reply_enabled:!!r.auto_reply_enabled,plan:r.plan||"free",avatar_data_url:r.avatar_data_url||null,created_at:r.created_at,updated_at:r.updated_at}}

async function newSession(env,userId){
  const token=b64url(randomBytes(32));
  const tokenHash=b64url(await sha256(token));
  const expires=new Date(Date.now()+SESSION_DAYS*86400000).toISOString();
  await env.DB.prepare("INSERT INTO sessions(token_hash,user_id,expires_at,created_at) VALUES(?,?,?,?)").bind(tokenHash,userId,expires,now()).run();
  return token;
}
async function access(request,env){
  const auth=request.headers.get("Authorization")||"";
  const bearer=auth.startsWith("Bearer ")?auth.slice(7):"";
  const token=bearer||parseCookies(request)[COOKIE_NAME];
  if(!token)return null;
  const tokenHash=b64url(await sha256(token));
  const row=await env.DB.prepare("SELECT u.*,p.business_name,p.knowledge_json,p.integrations_json,p.auto_reply_enabled,p.plan,p.created_at AS p_created_at,p.updated_at AS p_updated_at,p.avatar_data_url FROM sessions s JOIN users u ON u.id=s.user_id LEFT JOIN profiles p ON p.user_id=u.id WHERE s.token_hash=? AND s.expires_at>? LIMIT 1").bind(tokenHash,now()).first();
  if(!row)return null;
  return{
    user:{id:row.id,email:row.email,full_name:row.full_name,date_of_birth:row.date_of_birth,age_verified:!!row.age_verified,email_verified:!!row.email_verified,created_at:row.created_at},
    profile:profileOut({user_id:row.id,business_name:row.business_name,avatar_data_url:row.avatar_data_url,knowledge_json:row.knowledge_json,integrations_json:row.integrations_json,auto_reply_enabled:row.auto_reply_enabled,plan:row.plan,created_at:row.p_created_at,updated_at:row.p_updated_at})
  };
}
async function jsonBody(request){try{return await request.json()}catch{return{}}}

async function ensureSchema(env){
  if(!env.DB)throw new Error("D1 binding DB is not configured.");
  await env.DB.batch([
    env.DB.prepare("CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY,email TEXT NOT NULL UNIQUE,password_hash TEXT NOT NULL,password_salt TEXT NOT NULL,full_name TEXT NOT NULL,date_of_birth TEXT NOT NULL,age_verified INTEGER NOT NULL DEFAULT 0,email_verified INTEGER NOT NULL DEFAULT 0,email_verification_token_hash TEXT,email_verification_expires_at TEXT,email_verification_sent_at TEXT,terms_accepted_at TEXT,terms_version TEXT,created_at TEXT NOT NULL,updated_at TEXT NOT NULL)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS profiles (user_id TEXT PRIMARY KEY,business_name TEXT,avatar_data_url TEXT,knowledge_json TEXT NOT NULL DEFAULT '{}',integrations_json TEXT NOT NULL DEFAULT '{}',auto_reply_enabled INTEGER NOT NULL DEFAULT 0,plan TEXT NOT NULL DEFAULT 'free',created_at TEXT NOT NULL,updated_at TEXT NOT NULL,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL,expires_at TEXT NOT NULL,created_at TEXT NOT NULL,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY,user_id TEXT NOT NULL,source TEXT NOT NULL,sender_name TEXT,sender_handle TEXT,body TEXT NOT NULL,received_at TEXT NOT NULL,business_related INTEGER NOT NULL DEFAULT 0,relevance_confidence INTEGER NOT NULL DEFAULT 0,reply_confidence INTEGER NOT NULL DEFAULT 0,status TEXT NOT NULL DEFAULT 'review',reply_text TEXT,metadata_json TEXT NOT NULL DEFAULT '{}',created_at TEXT NOT NULL,updated_at TEXT NOT NULL,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_messages_user_received ON messages(user_id,received_at DESC)")
  ]);
  const userColumns=await env.DB.prepare("PRAGMA table_info(users)").all();
  const userColumnNames=(userColumns.results||[]).map(x=>x.name);
  if(!userColumnNames.includes("email_verified"))await env.DB.prepare("ALTER TABLE users ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 1").run();
  if(!userColumnNames.includes("email_verification_token_hash"))await env.DB.prepare("ALTER TABLE users ADD COLUMN email_verification_token_hash TEXT").run();
  if(!userColumnNames.includes("email_verification_expires_at"))await env.DB.prepare("ALTER TABLE users ADD COLUMN email_verification_expires_at TEXT").run();
  if(!userColumnNames.includes("email_verification_sent_at"))await env.DB.prepare("ALTER TABLE users ADD COLUMN email_verification_sent_at TEXT").run();

  const profileColumns=await env.DB.prepare("PRAGMA table_info(profiles)").all();
  if(!(profileColumns.results||[]).some(x=>x.name==="avatar_data_url")){
    await env.DB.prepare("ALTER TABLE profiles ADD COLUMN avatar_data_url TEXT").run();
  }
}

function htmlEscape(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}

async function sendVerificationEmail(env,request,user,token){
  if(!env.RESEND_API_KEY)throw new Error("RESEND_API_KEY is not configured.");
  const base=String(env.ALLOWED_ORIGIN||new URL(request.url).origin).replace(/\/$/,"");
  const verificationUrl=base+"/auth.html?verify="+encodeURIComponent(token);
  const firstName=htmlEscape(String(user.fullName||"there").trim().split(/\s+/)[0]||"there");
  const from=String(env.RESEND_FROM||"").trim();
  if(!from)throw new Error("RESEND_FROM is not configured. Set it to a sender address on a verified Resend domain.");
  const html="<!doctype html><html><body style=\"margin:0;background:#f4f5f6;font-family:Arial,sans-serif;color:#111318\"><div style=\"max-width:560px;margin:40px auto;padding:32px;background:#fff;border:1px solid #e1e4e8;border-radius:14px\"><p style=\"font-size:12px;font-weight:700;letter-spacing:.08em;color:#6b7280\">REPLYFLIX / ACCOUNT</p><h1 style=\"font-size:32px;margin:10px 0 14px\">Verify your email.</h1><p style=\"font-size:15px;line-height:1.6\">Hey "+firstName+" — confirm this email address to finish creating your ReplyFlix account.</p><p><a href=\""+verificationUrl+"\" style=\"display:inline-block;padding:12px 18px;background:#2f6ff2;color:#fff;text-decoration:none;border-radius:8px;font-weight:700\">VERIFY EMAIL</a></p><p style=\"font-size:13px;line-height:1.6;color:#687080\">This link expires in 24 hours and can only be used once. If you did not create this account, you can ignore this email.</p></div></body></html>";
  const text="Verify your ReplyFlix email:\n\n"+verificationUrl+"\n\nThis link expires in 24 hours and can only be used once. If you did not create this account, ignore this email.";
  const res=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+env.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from,to:[user.email],subject:"Verify your ReplyFlix email",html,text})});
  if(!res.ok){
    let detail="Resend request failed.";
    try{const body=await res.json();detail=body?.message||body?.error||detail}catch{}
    throw new Error(detail);
  }
  const body=await res.json();
  return {id:body?.id||null,from};
}

async function issueVerificationToken(env,request,user){
  const token=b64url(randomBytes(32));
  const tokenHash=b64url(await sha256(token));
  const expires=new Date(Date.now()+24*60*60*1000).toISOString();
  await env.DB.prepare("UPDATE users SET email_verification_token_hash=?,email_verification_expires_at=?,email_verification_sent_at=?,updated_at=? WHERE id=?").bind(tokenHash,expires,now(),now(),user.id).run();
  return await sendVerificationEmail(env,request,user,token);
}

async function verifyEmail(request,env){
  await ensureSchema(env);
  const p=await jsonBody(request);
  const token=String(p.token||"").trim();
  if(!token)return response({error:"Verification token is missing."},400,request,env);
  const tokenHash=b64url(await sha256(token));
  const user=await env.DB.prepare("SELECT * FROM users WHERE email_verification_token_hash=? AND email_verification_expires_at>? LIMIT 1").bind(tokenHash,now()).first();
  if(!user)return response({error:"This verification link is invalid or has expired."},400,request,env);

  const t=now();
  await env.DB.prepare("UPDATE users SET email_verified=1,email_verification_token_hash=NULL,email_verification_expires_at=NULL,email_verification_sent_at=NULL,updated_at=? WHERE id=?").bind(t,user.id).run();
  const session=await newSession(env,user.id);
  const a=await access(new Request(request.url,{headers:new Headers({"Authorization":"Bearer "+session})}),env);
  if(!a)throw new Error("Verified session could not be loaded.");
  return response({ok:true,verified:true,user:a.user,profile:a.profile,session_token:session},200,request,env,{"set-cookie":sessionCookie(session)});
}

async function resendVerification(request,env){
  await ensureSchema(env);
  const p=await jsonBody(request);
  const email=String(p.email||"").trim().toLowerCase();
  if(!validEmail(email))return response({error:"Enter a valid email address."},400,request,env);
  const user=await env.DB.prepare("SELECT id,email,full_name,email_verified,email_verification_sent_at FROM users WHERE email=? LIMIT 1").bind(email).first();
  if(!user||Number(user.email_verified)===1)return response({ok:true,message:"If that account needs verification, a new email has been sent."},200,request,env);

  const sentAt=Date.parse(String(user.email_verification_sent_at||""));
  if(Number.isFinite(sentAt)&&Date.now()-sentAt<60000)return response({error:"Please wait a minute before requesting another verification email."},429,request,env);

  try{
    const emailDelivery=await issueVerificationToken(env,request,user);
    return response({ok:true,message:"A new verification email has been sent.",email_sent:true,email_id:emailDelivery?.id||null,email_from:emailDelivery?.from||null},200,request,env);
  }catch(err){
    console.error("resend verification:",err);
    return response({error:"We could not send the verification email right now. Please try again shortly."},503,request,env);
  }
}

async function signup(request,env){
  let stage="schema";
  try{
    await ensureSchema(env);
    stage="parse";
    const p=await jsonBody(request);
    const email=String(p.email||"").trim().toLowerCase();
    const password=String(p.password||"");
    const fullName=String(p.full_name||"").trim();
    const dob=String(p.date_of_birth||"");
    if(!validEmail(email)||email.length>254)return response({error:"Enter a valid email address."},400,request,env);
    if(password.length<8)return response({error:"Password must be at least 8 characters."},400,request,env);
    if(!fullName||fullName.length>120)return response({error:"Enter your full name."},400,request,env);
    if(age(dob)<18)return response({error:"ReplyFlix requires users to be 18 or older."},400,request,env);
    if(p.age_attested!==true||p.terms_accepted_at==null)return response({error:"Confirm your age and accept the policies."},400,request,env);

    stage="check-existing";
    if(await env.DB.prepare("SELECT id FROM users WHERE email=? LIMIT 1").bind(email).first())return response({error:"An account with this email already exists. Sign in instead."},409,request,env);

    stage="hash-password";
    const id=uid(),t=now(),hp=await hashPassword(password);

    stage="create-account";
    const verificationToken=b64url(randomBytes(32));
    const verificationHash=b64url(await sha256(verificationToken));
    const verificationExpires=new Date(Date.now()+24*60*60*1000).toISOString();

    await env.DB.batch([
      env.DB.prepare("INSERT INTO users(id,email,password_hash,password_salt,full_name,date_of_birth,age_verified,email_verified,email_verification_token_hash,email_verification_expires_at,email_verification_sent_at,terms_accepted_at,terms_version,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id,email,hp.hash,hp.salt,fullName,dob,1,0,verificationHash,verificationExpires,t,String(p.terms_accepted_at),String(p.terms_version||"2026-09-23"),t,t),
      env.DB.prepare("INSERT INTO profiles(user_id,plan,auto_reply_enabled,knowledge_json,integrations_json,created_at,updated_at,avatar_data_url) VALUES(?,?,?,?,?,?,?,?)").bind(id,"free",0,"{}","{}",t,t,null)
    ]);

    stage="send-verification";
    let emailDelivery;
    try{
      emailDelivery=await sendVerificationEmail(env,request,{id,email,fullName},verificationToken);
    }catch(err){
      console.error("verification email:",err);
      return response({error:"Account created, but the verification email could not be sent yet. Please use RESEND VERIFICATION.",email,verification_required:true,email_sent:false},503,request,env);
    }

    return response({ok:true,email,verification_required:true,email_sent:true,email_id:emailDelivery?.id||null,email_from:emailDelivery?.from||null},201,request,env);
  }catch(err){
    console.error("signup stage:",stage,err);
    return response({error:"Signup failed.",stage,detail:String(err?.message||err||"unknown error")},500,request,env);
  }
}
async function signin(request,env){
  let stage="schema";
  try{
    await ensureSchema(env);
    stage="parse";
    const p=await jsonBody(request),email=String(p.email||"").trim().toLowerCase(),password=String(p.password||"");
    if(!validEmail(email)||!password)return response({error:"Email and password are required."},400,request,env);

    stage="lookup-user";
    const u=await env.DB.prepare("SELECT * FROM users WHERE email=? LIMIT 1").bind(email).first();
    stage="verify-password";
    if(!u||!(await verifyPassword(password,u.password_salt,u.password_hash)))return response({error:"Invalid email or password."},401,request,env);
    if(Number(u.email_verified)!==1)return response({error:"Please verify your email before signing in.",verification_required:true,email:u.email},403,request,env);

    stage="create-session";
    const token=await newSession(env,u.id);
    stage="load-session";
    const a=await access(new Request(request.url,{headers:new Headers({"Authorization":"Bearer "+token})}),env);
    if(!a)throw new Error("New session could not be loaded.");

    return response({user:a.user,profile:a.profile,session_token:token},200,request,env,{"set-cookie":sessionCookie(token)});
  }catch(err){
    console.error("signin stage:",stage,err);
    return response({error:"Signin failed.",stage,detail:String(err?.message||err||"unknown error")},500,request,env);
  }
}
async function signout(request,env){
  const auth=request.headers.get("Authorization")||"",bearer=auth.startsWith("Bearer ")?auth.slice(7):"",token=bearer||parseCookies(request)[COOKIE_NAME];
  if(token)await env.DB.prepare("DELETE FROM sessions WHERE token_hash=?").bind(b64url(await sha256(token))).run();
  return response({ok:true},200,request,env,{"set-cookie":clearCookie()});
}
async function me(request,env){const a=await access(request,env);return a?response(a,200,request,env):response({error:"Unauthorized."},401,request,env)}
async function profile(request,env){
  const a=await access(request,env);if(!a)return response({error:"Unauthorized."},401,request,env);
  if(request.method==="GET")return response({profile:a.profile},200,request,env);
  const p=await jsonBody(request),sets=[],vals=[];
  if(Object.hasOwn(p,"business_name")){sets.push("business_name=?");vals.push(p.business_name||null)}
  if(Object.hasOwn(p,"knowledge")){sets.push("knowledge_json=?");vals.push(JSON.stringify(p.knowledge||{}))}
  if(Object.hasOwn(p,"integrations")){sets.push("integrations_json=?");vals.push(JSON.stringify(p.integrations||{}))}
  if(Object.hasOwn(p,"auto_reply_enabled")){sets.push("auto_reply_enabled=?");vals.push(p.auto_reply_enabled?1:0)}
  if(Object.hasOwn(p,"avatar_data_url")){
    const avatar=String(p.avatar_data_url||"");
    if(avatar.length>350000)return response({error:"Profile picture is too large. Please use a smaller image."},413,request,env);
    if(avatar && !/^data:image\/(png|jpe?g|webp);base64,/i.test(avatar))return response({error:"Profile picture must be a PNG, JPEG, or WebP image."},400,request,env);
    sets.push("avatar_data_url=?");vals.push(avatar||null);
  }
  if(Object.hasOwn(p,"full_name")){
    const fullName=String(p.full_name||"").trim();
    if(!fullName||fullName.length>120)return response({error:"Enter a valid display name."},400,request,env);
    await env.DB.prepare("UPDATE users SET full_name=?,updated_at=? WHERE id=?").bind(fullName,now(),a.user.id).run();
  }
  if(!sets.length)return response({profile:a.profile},200,request,env);
  sets.push("updated_at=?");vals.push(now(),a.user.id);
  await env.DB.prepare("UPDATE profiles SET "+sets.join(",")+" WHERE user_id=?").bind(...vals).run();
  const r=await env.DB.prepare("SELECT * FROM profiles WHERE user_id=?").bind(a.user.id).first();
  const user=await env.DB.prepare("SELECT id,email,full_name,date_of_birth,age_verified,created_at FROM users WHERE id=?").bind(a.user.id).first();
  return response({profile:profileOut(r),user:user?{id:user.id,email:user.email,full_name:user.full_name,date_of_birth:user.date_of_birth,age_verified:!!user.age_verified,created_at:user.created_at}:null},200,request,env);
}
async function messages(request,env){
  const a=await access(request,env);if(!a)return response({error:"Unauthorized."},401,request,env);
  if(request.method==="GET"){const r=await env.DB.prepare("SELECT id,source,sender_name,sender_handle,body,received_at,business_related,relevance_confidence,reply_confidence,status,reply_text,metadata_json,created_at,updated_at FROM messages WHERE user_id=? ORDER BY received_at DESC LIMIT 150").bind(a.user.id).all();return response({messages:r.results||[]},200,request,env)}
  const p=await jsonBody(request),limit=a.profile.plan==="premium"?100:a.profile.plan==="pro"?25:5;
  const count=await env.DB.prepare("SELECT COUNT(*) c FROM messages WHERE user_id=? AND status<>'ignored'").bind(a.user.id).first();
  if(Number(count?.c||0)>=limit)return response({error:"Your current plan has reached its message limit."},429,request,env);
  if(!String(p.body||"").trim())return response({error:"Message body is required."},400,request,env);
  const id=uid(),t=now();
  await env.DB.prepare("INSERT INTO messages(id,user_id,source,sender_name,sender_handle,body,received_at,business_related,relevance_confidence,reply_confidence,status,reply_text,metadata_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id,a.user.id,String(p.source||"manual"),String(p.sender_name||"Customer"),String(p.sender_handle||""),String(p.body),String(p.received_at||t),p.business_related?1:0,Number(p.relevance_confidence||0),Number(p.reply_confidence||0),String(p.status||"review"),p.reply_text||null,JSON.stringify(p.metadata||{}),t,t).run();
  const row=await env.DB.prepare("SELECT * FROM messages WHERE id=?").bind(id).first();
  return response({message:row},201,request,env);
}
async function messagePatch(request,env,id){
  const a=await access(request,env);if(!a)return response({error:"Unauthorized."},401,request,env);
  const p=await jsonBody(request),sets=[],vals=[];
  if(Object.hasOwn(p,"status")){sets.push("status=?");vals.push(String(p.status))}
  if(Object.hasOwn(p,"reply_text")){sets.push("reply_text=?");vals.push(p.reply_text||null)}
  if(!sets.length)return response({error:"No changes supplied."},400,request,env);
  sets.push("updated_at=?");vals.push(now(),id,a.user.id);
  await env.DB.prepare("UPDATE messages SET "+sets.join(",")+" WHERE id=? AND user_id=?").bind(...vals).run();
  const row=await env.DB.prepare("SELECT * FROM messages WHERE id=? AND user_id=?").bind(id,a.user.id).first();
  return row?response({message:row},200,request,env):response({error:"Message not found."},404,request,env);
}


async function authDiagnostics(request,env){
  if(!env.DB)return response({ok:false,database_binding:false},500,request,env);
  const tables=await env.DB.prepare("SELECT name, sql FROM sqlite_master WHERE type='table' AND name IN ('users','profiles','sessions','messages') ORDER BY name").all();
  return response({ok:true,database_binding:true,tables:(tables.results||[]).map(x=>({name:x.name,sql:x.sql}))},200,request,env);
}

async function authSmoke(request,env){
  await ensureSchema(env);
  const counts = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) c FROM users").first(),
    env.DB.prepare("SELECT COUNT(*) c FROM profiles").first(),
    env.DB.prepare("SELECT COUNT(*) c FROM sessions").first()
  ]);
  return response({
    ok:true,
    auth:"ready",
    users:Number(counts[0]?.c||0),
    profiles:Number(counts[1]?.c||0),
    sessions:Number(counts[2]?.c||0)
  },200,request,env);
}


async function deleteAccount(request,env){
  const a=await access(request,env);
  if(!a)return response({error:"Unauthorized."},401,request,env);
  const p=await jsonBody(request);
  const password=String(p.password||"");
  const confirmation=String(p.confirmation||"");
  if(confirmation!=="DELETE MY ACCOUNT")return response({error:'Type "DELETE MY ACCOUNT" to confirm account deletion.'},400,request,env);
  if(!password)return response({error:"Enter your current password to delete the account."},400,request,env);
  const u=await env.DB.prepare("SELECT password_hash,password_salt FROM users WHERE id=?").bind(a.user.id).first();
  if(!u||!(await verifyPassword(password,u.password_salt,u.password_hash)))return response({error:"Current password is incorrect."},401,request,env);
  const uid=a.user.id;
  await env.DB.batch([
    env.DB.prepare("DELETE FROM messages WHERE user_id=?").bind(uid),
    env.DB.prepare("DELETE FROM sessions WHERE user_id=?").bind(uid),
    env.DB.prepare("DELETE FROM profiles WHERE user_id=?").bind(uid),
    env.DB.prepare("DELETE FROM users WHERE id=?").bind(uid)
  ]);
  return response({ok:true},200,request,env,{"set-cookie":clearCookie()});
}

async function changePassword(request,env){
  const a=await access(request,env);if(!a)return response({error:"Unauthorized."},401,request,env);
  const p=await jsonBody(request),current=String(p.current_password||""),next=String(p.new_password||"");
  if(next.length<8)return response({error:"New password must be at least 8 characters."},400,request,env);
  const u=await env.DB.prepare("SELECT password_hash,password_salt FROM users WHERE id=?").bind(a.user.id).first();
  if(!u||!(await verifyPassword(current,u.password_salt,u.password_hash)))return response({error:"Current password is incorrect."},401,request,env);
  const hp=await hashPassword(next);
  await env.DB.prepare("UPDATE users SET password_hash=?,password_salt=?,updated_at=? WHERE id=?").bind(hp.hash,hp.salt,now(),a.user.id).run();
  await env.DB.prepare("DELETE FROM sessions WHERE user_id=?").bind(a.user.id).run();
  const token=await newSession(env,a.user.id);
  return response({ok:true,session_token:token},200,request,env,{"set-cookie":sessionCookie(token)});
}
export default {async fetch(request,env){
  if(request.method==="OPTIONS")return new Response(null,{status:204,headers:corsHeaders(request,env)});
  const path=new URL(request.url).pathname.replace(/\/+$/,"")||"/";
  try{
    if(path==="/health"&&request.method==="GET")return response({ok:true,service:"replyflix-api",database:"ok"},200,request,env);
    if(path==="/api/auth/smoke"&&request.method==="GET")return authSmoke(request,env);
    if(path==="/api/auth/diagnostic"&&request.method==="GET")return authDiagnostics(request,env);
    if(path==="/api/auth/signup"&&request.method==="POST")return signup(request,env);
    if(path==="/api/auth/verify-email"&&request.method==="POST")return verifyEmail(request,env);
    if(path==="/api/auth/resend-verification"&&request.method==="POST")return resendVerification(request,env);
    if(path==="/api/auth/signin"&&request.method==="POST")return signin(request,env);
    if(path==="/api/auth/signout"&&request.method==="POST")return signout(request,env);
    if(path==="/api/auth/me"&&request.method==="GET")return me(request,env);
    if(path==="/api/auth/change-password"&&request.method==="POST")return changePassword(request,env);
    if(path==="/api/account"&&request.method==="DELETE")return deleteAccount(request,env);
    if(path==="/api/profile"&&(request.method==="GET"||request.method==="PUT"))return profile(request,env);
    if(path==="/api/messages"&&(request.method==="GET"||request.method==="POST"))return messages(request,env);
    if(path.startsWith("/api/messages/")&&request.method==="PATCH")return messagePatch(request,env,path.slice(14));
    return env.ASSETS.fetch(request);
  }catch(err){console.error(err);return response({error:"Internal server error."},500,request,env)}
}};