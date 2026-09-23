const STORE='tori-knowledge-v4';
const TORI_SITE_URL='https://tori.dewify.shop';
const THEME_KEY='tori-theme';

const INTENTS={
BUSINESS_NAME:{label:'BUSINESS NAME',patterns:['what is your business name','what is ur business name','whats your business name','whats ur business name','what is the business name','whats the business name','business name','company name','name of your business','what is the company called','what do you call your business','what is your brand name','your brand name']},
BUSINESS_DESCRIPTION:{label:'BUSINESS DESCRIPTION',patterns:['what do you do','what does your business do','what do u do','what does this business do','what is this business','what is your business about','what are you selling','what do you sell','what do u sell','tell me about the business','tell me about your company','what does the company do','what service do you provide','what services do you provide','what does your company do']},
PRODUCT_PURPOSE:{label:'PRODUCT PURPOSE',patterns:['what is this for','what is this product for','what is the product for','what does this product do','what does it do','what is it','what is this thing','what can i use this for','who is this for','what is the purpose','purpose of','use of this','why would i buy this','what problem does this solve','how does this help','what is this used for','what is the vault for','what ur product for','what your product for','what is ur product for']},
PRICE:{label:'PRICE',patterns:['how much','how much is','how much does','how much do','how much it cost','how much does it cost','what is the price','whats the price','what is price','price of','price for','price?','cost of','cost?','what does it cost','what is the cost','rate of','what is the rate','rate?','kitne ka','kitna ka','kitni ki','kitna padega','kitne mein','how expensive','how costly','what is your price','what are your rates']},
QUOTE:{label:'QUOTE',patterns:['can you quote','send a quote','quotation','quote for','quote me','estimate','estimated cost','estimate for','business quote','project quote','custom price','custom pricing','give me an estimate','what would it cost for','price for bulk','bulk quotation','wholesale price','wholesale quote','quote for quantity']},
AVAILABILITY:{label:'AVAILABILITY',patterns:['is it available','is this available','available now','available today','availability','in stock','do you have','do u have','have this','have it','can i get this','can i get it','still available','is there stock','stock available','is the product available','u got this','you got this','do you still have','can i order now','is it in stock','do you have stock']},
DELIVERY:{label:'DELIVERY',patterns:['when will it arrive','when does it arrive','when can i get','how long delivery','how long does delivery take','delivery time','delivery how long','when will i receive','when do i receive','how fast','deliver today','can you deliver','can u deliver','do you deliver','delivery available','shipping time','how long shipping','ship today','can it be delivered','instant delivery','tomorrow delivery','send today','when will i get it','how long until i get it','delivery details','shipping details','how soon can i get','when can you ship']},
PURCHASE:{label:'PURCHASE',patterns:['how do i buy','how can i buy','can i buy','i want to buy','where can i buy','place an order','how to order','want this','ill take it','i will take it','lets buy','buy this','purchase this','how to purchase','ready to buy','where do i order','can i order','order this','send purchase details','how do i purchase','where can i purchase','how to get this','how can i get this','how do i get it']},
LINK:{label:'LINK',patterns:['send the link','send me the link','link please','purchase link','buy link','where is the link','give me the link','share the link','drop the link','send link','link for this','product link','website link','url please','where can i find it','send the website','send your site','give me the url']},
CONTACT:{label:'CONTACT',patterns:['how can i contact','how do i contact','contact you','contact details','contact info','how to reach you','get in touch','reach you','talk to you','support contact','contact number','how can i reach you','how do i reach you','where can i contact','contact information']},
EMAIL:{label:'EMAIL',patterns:['what is your email','what is ur email','whats your email','whats ur email','email address','mail address','email id','give me your email','send me your email','how do i email you','support email','email please','your mail','what email do you use']},
PHONE:{label:'PHONE',patterns:['what is your phone','what is ur phone','whats your phone','phone number','phone no','mobile number','mobile no','contact number','contact no','give me your number','give me a number','how do i call you','where can i call you','call number','your phone','your phone number','your mobile','what number can i call','business phone','company phone']},WHATSAPP:{label:'WHATSAPP',patterns:['whatsapp','whatsapp number','whatsapp no','whatsapp contact','whatsapp contact number','whatsapp details','your whatsapp','your whatsapp number','what is your whatsapp','what is ur whatsapp','whats your whatsapp','whats ur whatsapp','what is the whatsapp number','what is the whatsapp','give me your whatsapp','send your whatsapp','send me your whatsapp','how do i whatsapp you','how can i whatsapp you','where can i whatsapp you','can i whatsapp you','do you have whatsapp','are you on whatsapp','is there a whatsapp number','wa number','wa no','wa contact']},
WEBSITE:{label:'WEBSITE',patterns:['what is your website','what is ur website','whats your website','website','site link','web link','homepage','where is your website','where can i find your site','give me your website','send your site','your website link','what is your site']},
LOCATION:{label:'LOCATION',patterns:['where are you','where r you','where are you located','where r u located','location','address','where is your office','where is the business','where is your shop','where do you operate','what city are you in','where can i find you','send location','business address','where is your company located','what is your address','where is your business']},
HOURS:{label:'HOURS',patterns:['what time are you open','what are your hours','opening hours','business hours','working hours','when are you open','when do you open','when do you close','what time do you close','are you open today','when can i contact you','what days are you open','open on sunday','open today','closing time','opening time','working days']},
PAYMENT:{label:'PAYMENT',patterns:['how can i pay','payment methods','ways to pay','do you accept upi','do you take card','can i pay by card','bank transfer','payment options','how do payments work','what payment do you accept','which payment methods','can i pay online','pay using','do u accept upi','what are the payment options','payment details']},
REFUND:{label:'REFUND / RETURN',patterns:['refund policy','return policy','exchange policy','can i get a refund','can i return it','can i exchange','what is your refund','what is the return policy','how do i return','how do refunds work','refund available','money back','return this','exchange this','can i get my money back','what if i want a refund','what is your exchange policy']},
DISCOUNT:{label:'DISCOUNT',patterns:['discount','any discount','can you discount','better price','lower price','cheaper','deal','offer','promo code','coupon','bulk discount','wholesale','can u do better price','can you do better','best price','student discount','special price','negotiable','negotiation']},
SUPPORT:{label:'SUPPORT',patterns:['need help','help me','customer support','support','problem with','issue with','not working','something broke','help with order','help with purchase','need assistance','how do i get help','talk to support','technical support','i have a problem','there is a problem','help please']},
ORDER_STATUS:{label:'ORDER STATUS',patterns:['where is my order','order status','track my order','track order','order tracking','has my order shipped','has it shipped','when was my order shipped','order update','my order update','where is the order']},
COMPATIBILITY:{label:'COMPATIBILITY',patterns:['is this compatible','does this work with','will this work with','compatible with','works on','can i use this on','what devices','which devices','system requirements']},
COMPARISON:{label:'COMPARISON',patterns:['what is the difference','difference between','compare','which one should i choose','which is better','how is this different','difference in','versus','vs']},
FEATURES:{label:'FEATURES',patterns:['what features','features of this','what can it do','what are the features','features?','key features','main features','what does it include','what capabilities','capabilities']},
INCLUDED:{label:'WHAT IS INCLUDED',patterns:['what is included','what do i get','what do i receive','whats inside','what comes with it','included in the package','included in this','what is in the package','what is inside','contents']},
AUDIENCE:{label:'WHO IT IS FOR',patterns:['who is this for','who is this made for','who can use this','is this for me','who should use this','who is this suitable for','target customer','who is it for']},
LEAD_TIME:{label:'LEAD TIME',patterns:['how long does it take','how long will it take','turnaround time','lead time','when can you finish','when will it be ready','how soon can you finish','completion time','delivery time for the service']},
CUSTOMIZATION:{label:'CUSTOMIZATION',patterns:['can this be customized','can you customize','customize this','custom version','personalize this','can i change it','can i edit it','can i request changes','customization available']},
DEMO_TRIAL:{label:'DEMO / TRIAL',patterns:['is there a demo','can i try it','free trial','trial available','can i test it','preview available','is there a free version','demo available','can i see a demo']},
BOOKING:{label:'BOOKING / APPOINTMENT',patterns:['how do i book','book an appointment','appointment','schedule a call','book a call','how can i schedule','available for a call','set up a meeting','meeting time']},
CANCELLATION:{label:'CANCELLATION',patterns:['cancel my order','cancel order','cancellation policy','can i cancel','how do i cancel','cancel this','want to cancel','can this be cancelled']},
INVOICE_RECEIPT:{label:'INVOICE / RECEIPT',patterns:['invoice','receipt','need a receipt','send invoice','tax invoice','payment receipt','can i get an invoice','receipt for purchase']},
TAX:{label:'TAX',patterns:['tax included','does the price include tax','gst included','gst','tax amount','taxes','is tax included','tax invoice']},
WHOLESALE:{label:'WHOLESALE / BULK',patterns:['wholesale','bulk order','bulk pricing','buy in bulk','large quantity','quantity discount','reseller price','wholesale price','bulk price']},
LICENSE:{label:'LICENSE / USAGE',patterns:['license','licence','commercial use','personal use','can i resell','resell rights','usage rights','how many users','seat license','commercial license']},
ACCOUNT_ACCESS:{label:'ACCOUNT / ACCESS',patterns:['how do i access','where do i log in','login','sign in','account access','reset password','forgot password','download again','access after purchase']},
SOCIAL:{label:'SOCIAL / COMMUNITY',patterns:['instagram','linkedin','twitter','x account','social media','socials','facebook','youtube','discord','community']}
};

const SLANG={ur:'your',u:'you',r:'are',yr:'your',ya:'you',plz:'please',pls:'please',hw:'how',wat:'what',wht:'what',wats:'what is',whats:'what is',tmrw:'tomorrow',tod:'today',abt:'about',buisness:'business',busines:'business',buisnes:'business',prce:'price',pric:'price',kitna:'how much',kitne:'how much',kitni:'how much',ka:'of',ki:'of',ke:'of',mein:'in',me:'in',hai:'is',ha:'is',he:'is',kr:'do',kro:'do',kar:'do',msg:'message',dm:'message',qty:'quantity',avail:'available',sv:'service'};
const TYPO={buisness:'business',busines:'business',buisnes:'business',prce:'price',priice:'price',availble:'available',avialable:'available',deliverd:'delivered',delivry:'delivery',recieve:'receive',recived:'received',adress:'address',addres:'address',wht:'what',wat:'what',hwo:'how',prodcut:'product',servce:'service',servis:'service',refnd:'refund',retun:'return',websit:'website',emial:'email'};

function blank(){return{version:4,business:{name:'',legalName:'',category:'',tagline:'',description:'',website:'',email:'',phone:'',whatsapp:'',country:'',city:'',address:'',hours:'',supportHours:'',payments:'',currencies:'',delivery:'',leadTime:'',refund:'',returns:'',social:'',cta:'',style:'formal'},products:[],services:[],facts:[],keywords:[],learned:[]}}
function normalizePack(x){const b=blank();if(!x||typeof x!=='object')return b;return{...b,...x,business:{...b.business,...(x.business||{})},products:Array.isArray(x.products)?x.products:[],services:Array.isArray(x.services)?x.services:[],facts:Array.isArray(x.facts)?x.facts:[],keywords:Array.isArray(x.keywords)?x.keywords:[],learned:Array.isArray(x.learned)?x.learned:[]}}
function load(){try{return normalizePack(JSON.parse(localStorage.getItem(STORE)))}catch{return blank()}}
let K=load();
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
let cloudSaveTimer=null;
function save(){
  localStorage.setItem(STORE,JSON.stringify(K));
  const access=window.__TORI_ACCESS;
  if(!access?.client||!access?.user)return;
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer=setTimeout(async()=>{
    try{
      const {error}=await access.client.from("profiles").update({
        business_name:K.business?.name||null,
        knowledge:K,
        updated_at:new Date().toISOString()
      }).eq("id",access.user.id);
      if(error)console.warn("TORI cloud knowledge sync:",error.message);
    }catch(e){console.warn("TORI cloud knowledge sync failed:",e)}
  },350);
}
function clean(s){return String(s??'').toLowerCase().replace(/[“”"'`]/g,' ').replace(/[^a-z0-9₹$€£+\-/#.\s]/g,' ').replace(/\s+/g,' ').trim()}
function normalize(s){let x=clean(s);x=x.split(' ').map(w=>TYPO[w]||w).join(' ');for(let i=0;i<2;i++)x=x.split(' ').map(w=>SLANG[w]||w).join(' ');return x}
function words(s){return normalize(s).split(' ').filter(Boolean)}
function present(text,phrase){const a=normalize(text),b=normalize(phrase);return b&&(' '+a+' ').includes(' '+b+' ')}
function uniq(a){return[...new Set(a.filter(Boolean))]}
function lev(a,b){a=String(a);b=String(b);if(a===b)return 0;if(!a.length)return b.length;if(!b.length)return a.length;let p=[...Array(b.length+1)].map((_,i)=>i);for(let i=1;i<=a.length;i++){let c=[i],row=a[i-1];for(let j=1;j<=b.length;j++)c[j]=Math.min(c[j-1]+1,p[j]+1,p[j-1]+(row===b[j-1]?0:1));p=c}return p[b.length]}
function similarity(a,b){a=normalize(a);b=normalize(b);if(!a||!b)return 0;if(a===b)return 1;const A=a.split(' ').filter(Boolean),B=b.split(' ').filter(Boolean);if(B.length===1&&A.includes(B[0]))return .88;if(B.length>1&&present(a,b))return .9;let common=A.filter(x=>B.includes(x)).length/Math.max(new Set(A).size,new Set(B).size);let near=0;for(const x of A)for(const y of B){if(Math.min(x.length,y.length)<4)continue;const d=lev(x,y)/Math.max(x.length,y.length);if(d<=.25)near=Math.max(near,.65)}return Math.min(1,common*.82+near*.28)}
function aliases(e){return uniq([e.name,...String(e.aliases||'').split(',')].map(clean))}
function contentTokens(s){const stop=new Set(['what','is','are','your','you','the','a','an','this','that','do','does','can','i','me','my','for','of','to','in','on','and','or','it','its','there','please','tell','give','get','how','where','when','which','would','could','should','will','our','we','ur']);return words(s).filter(x=>x.length>2&&!stop.has(x))}
function phraseSignal(text,phrase){const A=contentTokens(text),B=contentTokens(phrase);if(A.length<3)return 0;if(!B.length)return similarity(text,phrase);let common=0;for(const x of A){for(const y of B){if(x===y||lev(x,y)<=Math.ceil(Math.max(x.length,y.length)*.25)){common++;break}}}return common/Math.max(B.length,1)}
function factCandidates(text){
const nt=normalize(text),out=[];
for(let i=0;i<K.facts.length;i++){
 const f=K.facts[i],aliasesList=uniq([f.key,...String(f.aliases||'').split(',')].map(clean));
 let bestScore=0,best='',matchedKey='';
 for(const a of aliasesList){
  if(!a)continue;
  if(present(nt,a)){const sc=40+Math.min(18,a.split(' ').length*4);if(sc>bestScore){bestScore=sc;best=a;matchedKey=a}}
  else if(a.length>=4){
   const sim=similarity(nt,a);
   const queryHasKey=contentTokens(nt).some(t=>contentTokens(a).includes(t));
   if(sim>=.82){const sc=11+(sim*10)+(queryHasKey?8:0);if(sc>bestScore){bestScore=sc;best='near: '+a;matchedKey=a}}
  }
 }
 if(bestScore){
  const questionBoost=/^(?:what|whats|where|which|who|when|how|can|do|does|is|are|tell|give|send|show|could|would)/.test(nt)?8:0;
  out.push({key:'CUSTOM_FACT',label:String(f.key||'FACT').toUpperCase(),score:bestScore+questionBoost,evidence:[best||matchedKey],needsEntity:false,customFact:f});
 }
}
return out.sort((a,b)=>b.score-a.score);
}
function entities(){return[...K.products.map((x,i)=>({type:'PRODUCT',index:i,name:x.name,aliases:aliases(x),data:x})),...K.services.map((x,i)=>({type:'SERVICE',index:i,name:x.name,aliases:aliases(x),data:x}))]}
function resolveEntity(text){const nt=normalize(text),all=entities(),scores=[];for(const e of all){let best=0,matched='';for(const a of e.aliases){if(!a)continue;if(present(nt,a)){const sc=.97;if(sc>best){best=sc;matched=a}}else{const sim=similarity(nt,a);if(sim>.66){const sc=.45+sim*.45;if(sc>best){best=sc;matched=a}}}}const nameTokens=[...new Set(normalize(e.name).split(' ').filter(x=>x.length>=4))];for(const tok of nameTokens){if(present(nt,tok)&&best<.68){best=.68;matched=tok}}if(best)scores.push({...e,score:best,matched,method:best>.9?'exact alias':best>.67?'name/context':'fuzzy'})}scores.sort((a,b)=>b.score-a.score);if(!scores.length){if(all.length===1&&/(product|item|thing|service|this|that|package)/.test(nt))return{...all[0],score:.72,matched:all[0].name,method:'single-entry context'};return null}const top=scores[0],ties=scores.filter(x=>x.score>=top.score-.06);let ambiguous=ties.length>1;if(top.score>.9&&String(top.matched||'').trim().length<=5&&scores.slice(1).some(x=>x.score>=.65))ambiguous=true;return{...top,candidates:ambiguous?scores.filter(x=>x.score>=Math.max(.65,top.score-.34)).slice(0,5):ties,ambiguous,method:top.method}}
function profileCandidates(text){
const nt=normalize(text),b=K.business,out=[];
const map=[
{key:'BUSINESS_NAME',label:'BUSINESS NAME',value:b.name,aliases:['business name','company name','brand name','what are you called','what is the company called']},
{key:'BUSINESS_DESCRIPTION',label:'BUSINESS DESCRIPTION',value:b.description,aliases:['business description','about the business','about your business']},
{key:'BUSINESS_CATEGORY',label:'BUSINESS CATEGORY',value:b.category,aliases:['business category','business type','industry','sector','field']},
{key:'TAGLINE',label:'TAGLINE',value:b.tagline,aliases:['tagline','slogan','motto']},
{key:'WEBSITE',label:'WEBSITE',value:b.website,aliases:['website','website link','official website','homepage','web link']},
{key:'EMAIL',label:'EMAIL',value:b.email,aliases:['email','email address','email id','mail address','mail']},
{key:'PHONE',label:'PHONE',value:b.phone,aliases:['phone','phone number','phone no','mobile number','mobile no','telephone','contact number','contact no']},
{key:'WHATSAPP',label:'WHATSAPP',value:b.whatsapp,aliases:['whatsapp','whatsapp number','whatsapp no','whatsapp contact','wa number','wa no','wa contact']},
{key:'LOCATION',label:'LOCATION',value:joinLocation([b.address,b.city,b.country]),aliases:['location','address','business address','office address','city','country','where are you based']},
{key:'HOURS',label:'HOURS',value:b.hours,aliases:['hours','opening hours','business hours','working hours','opening time','closing time','timing']},
{key:'PAYMENT',label:'PAYMENT',value:b.payments,aliases:['payment','payment methods','payment options','ways to pay','payment details']},
{key:'CURRENCY',label:'CURRENCY',value:b.currencies,aliases:['currency','currencies','currency accepted']},
{key:'DELIVERY',label:'DELIVERY',value:b.delivery,aliases:['delivery','shipping','delivery details','shipping details']},
{key:'LEAD_TIME',label:'LEAD TIME',value:b.leadTime,aliases:['lead time','turnaround time','completion time']},
{key:'REFUND',label:'REFUND / RETURN',value:b.refund||b.returns,aliases:['refund','refund policy','return policy','returns','exchange policy','exchanges']},
{key:'SUPPORT',label:'SUPPORT',value:b.email||b.phone||b.whatsapp,aliases:['support','customer support','customer service','customer care','support contact']},
{key:'SOCIAL',label:'SOCIAL / COMMUNITY',value:b.social,aliases:['socials','social media','social links','instagram','linkedin','facebook','youtube','twitter','discord']}
];
for(const p of map){
 if(!String(p.value||'').trim())continue;
 let score=0,best='';
 for(const a of p.aliases){
  const na=normalize(a);if(!na)continue;
  if(present(nt,na)){
   const sc=(p.key==='WHATSAPP'||p.key==='EMAIL'||p.key==='WEBSITE')?36:24+Math.min(6,na.split(' ').length*2);
   if(sc>score){score=sc;best=a}
  }else if(na.length>=5&&nt.length<=70){
   const sim=similarity(nt,na);
   if(sim>=.90){const sc=7+sim*3;if(sc>score){score=sc;best='near: '+a}}
  }
 }
 if(p.key==='WHATSAPP'&&/^(?:whatsapp|wa|whatsapp number|whatsapp no|wa number|wa no)$/.test(nt))score=44;
 if(p.key==='EMAIL'&&/^(?:email|mail|email address|email id)$/.test(nt))score=44;
 if(p.key==='PHONE'&&/^(?:phone|mobile|telephone|contact number|contact no)$/.test(nt))score=42;
 if(p.key==='WEBSITE'&&/^(?:website|homepage|official website)$/.test(nt))score=42;
 if(p.key==='BUSINESS_NAME'&&/^(?:business name|company name|brand name)$/.test(nt))score=42;
 if(p.key==='LOCATION'&&/^(?:location|address|business address|office address)$/.test(nt))score=42;
 if(p.key==='HOURS'&&/^(?:hours|opening hours|business hours|working hours|timing|opening time|closing time)$/.test(nt))score=42;
 if(score)out.push({key:p.key,label:p.label,score,evidence:[best||p.aliases[0]],needsEntity:false,profile:true});
}
return out;
}
function intentCandidates(text){
 const nt=normalize(text), out=[...profileCandidates(text)], entity=resolveEntity(text);
 const rules={
  PURPOSE:{key:'PRODUCT_PURPOSE',label:'PRODUCT PURPOSE',score:42,needsEntity:true,rx:[/\bwhat(?: is|'s)?\b.*\b(?:for|used for|meant for|purpose)\b/,/\bwhat does\b.*\b(?:do|help)\b/,/\bwhy (?:would|should) i (?:buy|get|use)\b/]},
  FEATURES:{key:'FEATURES',label:'FEATURES',score:48,needsEntity:true,rx:[/\bwhat can\b.*\bdo\b/,/\bwhat (?:features|functions|capabilities)\b/,/\bwhat does\b.*\bhave\b/]},
  INCLUDED:{key:'INCLUDED',label:'WHAT IS INCLUDED',score:50,needsEntity:true,rx:[/\b(?:what is|whats|what's)\b.*\b(?:included|inside|in)\b/,/\bwhat (?:do|does)\b.*\b(?:get|come|comes)\b/,/\bwhat comes with\b/]},
  PRICE:{key:'PRICE',label:'PRICE',score:44,needsEntity:true,rx:[/\b(?:how much|price|cost|rate|fee|charge)\b/,/\bwhat would i (?:pay|spend)\b/]},
  AVAILABILITY:{key:'AVAILABILITY',label:'AVAILABILITY',score:43,needsEntity:true,rx:[/\b(?:available|availability|in stock|still have|got one|have one)\b/]},
  DELIVERY:{key:'DELIVERY',label:'DELIVERY',score:43,needsEntity:true,rx:[/\bwhen\b.*\b(?:get|receive|arrive|deliver|ship|send)\b/,/\bhow long\b.*\b(?:delivery|shipping|take|get|receive)\b/,/\b(?:delivery|shipping)\b.*\b(?:time|when|how long)\b/]},
  PURCHASE:{key:'PURCHASE',label:'PURCHASE',score:43,needsEntity:true,rx:[/\b(?:how do i|where can i|can i|i want to|ready to)\b.*\b(?:buy|purchase|order|get one)\b/,/\bplace an order\b/]},
  LINK:{key:'LINK',label:'LINK',score:42,needsEntity:true,rx:[/\b(?:send|give|share|drop)\b.*\b(?:link|url)\b/,/\b(?:where is|what is)\b.*\b(?:link|url)\b/]},
  DISCOUNT:{key:'DISCOUNT',label:'DISCOUNT',score:43,needsEntity:true,rx:[/\b(?:discount|offer|deal|coupon|promo|better price|lower price|cheaper)\b/]},
  QUOTE:{key:'QUOTE',label:'QUOTE',score:42,needsEntity:true,rx:[/\b(?:quote|quotation|estimate)\b/]},
  REFUND:{key:'REFUND',label:'REFUND / RETURN',score:43,needsEntity:true,rx:[/\b(?:refund|return|exchange|money back)\b/]},
  LICENSE:{key:'LICENSE',label:'LICENSE / USAGE',score:46,needsEntity:true,rx:[/\b(?:license|licence|commercial use|commercially|business use|resell|resale|redistribut)\b/]},
  CUSTOMIZATION:{key:'CUSTOMIZATION',label:'CUSTOMIZATION',score:43,needsEntity:true,rx:[/\b(?:customize|customise|custom|personalize|personalise|edit|change|changes)\b/]},
  COMPATIBILITY:{key:'COMPATIBILITY',label:'COMPATIBILITY',score:43,needsEntity:true,rx:[/\b(?:compatible|compatibility|works? on|runs? on|supported|system requirements)\b/]},
  AUDIENCE:{key:'AUDIENCE',label:'WHO IT IS FOR',score:43,needsEntity:true,rx:[/\b(?:who is|who can|who should|made for|designed for|suitable for|appropriate for)\b/]},
  SOCIAL:{key:'SOCIAL',label:'SOCIAL / COMMUNITY',score:39,needsEntity:false,rx:[/\b(?:socials|social media|instagram|linkedin|facebook|youtube|twitter|discord)\b/]},
  CONTACT:{key:'CONTACT',label:'CONTACT',score:38,needsEntity:false,rx:[/\b(?:contact|reach|reach out|get in touch|speak to|talk to)\b/]},
  HOURS:{key:'HOURS',label:'HOURS',score:40,needsEntity:false,rx:[/\b(?:hours|opening|closing|timing|open today|when are you open|working hours)\b/]},
  PAYMENT:{key:'PAYMENT',label:'PAYMENT',score:40,needsEntity:false,rx:[/\b(?:payment|pay|upi|card|bank transfer|payment method)\b/]},
  LOCATION:{key:'LOCATION',label:'LOCATION',score:40,needsEntity:false,rx:[/\b(?:location|address|where are you based|where is your office|which city)\b/]},
  SUPPORT:{key:'SUPPORT',label:'SUPPORT',score:39,needsEntity:false,rx:[/\b(?:support|help|customer service|customer care|assistance)\b/]}
 };
 const suppress=new Set();
 if(/\bwhatsapp\b|\bwa (?:number|no|contact)\b/.test(nt))suppress.add('PHONE').add('SOCIAL');
 if(entity){
  for(const rule of Object.values(rules)){
   if(rule.needsEntity && rule.rx.some(rx=>rx.test(nt))){
    out.push({key:rule.key,label:rule.label,score:rule.score,needsEntity:true,evidence:['entity + structural question']});
   }
  }
 }
 for(const [key,d] of Object.entries(INTENTS)){
  if(suppress.has(key))continue;
  let exact=0,evidence=[],fuzzy=0,best='';
  for(const p of d.patterns){
   const np=normalize(p);
   if(present(nt,np)){exact++;evidence.push(p)}
   else if(np.length>=4){
    const ps=phraseSignal(nt,np);
    if(ps>=.74&&ps>fuzzy){fuzzy=ps;best='near: '+p}
   }
  }
  let score=exact?14+Math.min(12,(exact-1)*2):fuzzy?4+fuzzy*7:0;
  if(score){
   if(!exact&&best)evidence.push(best);
   if(entity&&d&&['PRICE','PRODUCT_PURPOSE','AVAILABILITY','DELIVERY','PURCHASE','DISCOUNT','QUOTE','REFUND','COMPATIBILITY','FEATURES','INCLUDED','AUDIENCE','CUSTOMIZATION','LICENSE'].includes(key))score+=6;
   out.push({key,label:d.label,score,needsEntity:['PRICE','PRODUCT_PURPOSE','AVAILABILITY','DELIVERY','PURCHASE','DISCOUNT','QUOTE','REFUND','COMPATIBILITY','FEATURES','INCLUDED','AUDIENCE','CUSTOMIZATION','LICENSE'].includes(key),evidence:uniq(evidence)});
  }
 }
 if(/^what .+\s+for$/.test(nt)&&entity)out.push({key:'PRODUCT_PURPOSE',label:'PRODUCT PURPOSE',score:44,needsEntity:true,evidence:['purpose question grammar']});
 if(/^what (?:is|are) .+\s+inside$/.test(nt)&&entity)out.push({key:'INCLUDED',label:'WHAT IS INCLUDED',score:48,needsEntity:true,evidence:['inside question grammar']});
 if(/^(?:what|whats|what is) (?:your|ur) (?:business|company) name/.test(nt))out.push({key:'BUSINESS_NAME',label:'BUSINESS NAME',score:46,needsEntity:false,evidence:['business-name grammar']});
 out.push(...factCandidates(text));
 const merged=new Map();
 for(const item of out){
  const prev=merged.get(item.key);
  if(!prev)merged.set(item.key,item);
  else{prev.score=Math.max(prev.score,item.score);prev.evidence=uniq([...(prev.evidence||[]),...(item.evidence||[])]);if(item.customFact)prev.customFact=item.customFact;if(item.entityName)prev.entityName=item.entityName}
 }
 return [...merged.values()].sort((a,b)=>b.score-a.score);
}
function profileEntries(){const b=K.business;return[
{intent:'BUSINESS_NAME',key:'business name',value:b.name,aliases:['business name','company name','brand name']},{intent:'BUSINESS_DESCRIPTION',key:'business description',value:b.description,aliases:['business description','about business','what you do']},{intent:'WEBSITE',key:'website',value:b.website,aliases:['website','site','homepage','website link']},{intent:'EMAIL',key:'email',value:b.email,aliases:['email','email address','mail']},{intent:'PHONE',key:'phone',value:b.phone,aliases:['phone','phone number','mobile number']},{intent:'PHONE',key:'whatsapp',value:b.whatsapp,aliases:['whatsapp','whatsapp number']},{intent:'LOCATION',key:'location',value:[b.address,b.city,b.country].filter(Boolean).join(', '),aliases:['location','address','office address']},{intent:'HOURS',key:'hours',value:b.hours,aliases:['hours','opening hours','business hours','working hours']},{intent:'PAYMENT',key:'payments',value:b.payments,aliases:['payment methods','payment options','ways to pay']},{intent:'DELIVERY',key:'delivery',value:b.delivery,aliases:['delivery','shipping','delivery details']},{intent:'REFUND',key:'refund',value:b.refund,aliases:['refund policy','refund']},{intent:'REFUND',key:'returns',value:b.returns,aliases:['return policy','exchange policy','returns']},{intent:'SUPPORT',key:'support',value:b.email||b.phone||b.whatsapp,aliases:['support','support contact']}].filter(x=>String(x.value||'').trim())}
function joinLocation(parts){const out=[];for(const part of parts.flatMap(x=>String(x||'').split(','))){const v=part.trim();if(v&&!out.some(y=>y.toLowerCase()===v.toLowerCase()))out.push(v)}return out.join(', ')}
function period(v){v=String(v||'').trim();return v&&/[.!?]$/.test(v)?v:v+'.'}
function factFor(intent,entity,custom){const b=K.business,d=entity?.data||{};if(intent==='CUSTOM_FACT')return custom?.value||'';switch(intent){case'BUSINESS_NAME':return b.name;case'BUSINESS_DESCRIPTION':return b.description;case'WEBSITE':return b.website;case'EMAIL':return b.email;case'PHONE':return b.phone;case'WHATSAPP':return b.whatsapp;case'LOCATION':return joinLocation([b.address,b.city,b.country]);case'HOURS':return b.hours;case'PAYMENT':return b.payments;case'DELIVERY':return entity?(d.delivery||b.delivery):b.delivery;case'REFUND':return entity?(d.refund||b.refund||b.returns):b.refund||b.returns;case'PRICE':return d.price||'';case'QUOTE':return d.price||'';case'PRODUCT_PURPOSE':return d.description||'';case'FEATURES':return d.features||'';case'INCLUDED':return d.included||'';case'AUDIENCE':return d.audience||'';case'AVAILABILITY':return d.stock||d.availability||'';case'LEAD_TIME':return d.leadTime||d.delivery||b.leadTime||'';case'CUSTOMIZATION':return d.customization||'';case'DEMO_TRIAL':return d.trial||'';case'LINK':return d.link||b.website;case'PURCHASE':return d.link||b.website;case'DISCOUNT':return d.discount||'';case'COMPATIBILITY':return d.compatibility||'';case'ORDER_STATUS':return d.orderStatus||'';case'CANCELLATION':return d.cancellation||'';case'TAX':return d.tax||'';case'WHOLESALE':return d.wholesale||'';case'LICENSE':return d.license||'';case'ACCOUNT_ACCESS':return d.access||'';case'INVOICE_RECEIPT':return b.email;case'SOCIAL':return b.social;case'SUPPORT':return b.email||b.phone||b.whatsapp;default:return''}}
function entityNameFromIntent(r,entity){if(entity)return entity.name;if(r.entityName)return r.entityName;return ''}
function sentence(label,val,entity){const n=entity?entity.name:'';switch(label){case'BUSINESS NAME':return`Our business name is ${val}.`;case'BUSINESS DESCRIPTION':return`We are ${val}.`;case'WEBSITE':return`Our website is ${val}.`;case'EMAIL':return`Our email address is ${val}.`;case'PHONE':return`Our contact number is ${val}.`;case'LOCATION':return`Our business is located at ${val}.`;case'HOURS':return`Our business hours are ${val}.`;case'PAYMENT':return`We currently accept ${val}.`;case'DELIVERY':return n?`${n} is delivered via ${val}.`:`Our delivery information is ${val}.`;case'REFUND / RETURN':return n?`${n} follows this refund or return policy: ${val}`:`Our refund and return policy is: ${val}`;case'PRICE':return n?`${n} is priced at ${val}.`:`The configured price is ${val}.`;case'QUOTE':return n?`The configured starting price for ${n} is ${val}.`:`The configured quote information is ${val}.`;case'PRODUCT PURPOSE':return n?`${n} is described as follows: ${period(val)}`:period(val);case'FEATURES':return n?`${n} includes: ${val}`:val;case'WHAT IS INCLUDED':return n?`Included with ${n}: ${val}`:val;case'WHO IT IS FOR':return n?`${n} is designed for ${val}.`:val;case'AVAILABILITY':return n?`${n}: ${val}.`:val;case'LEAD TIME':return n?`The expected lead time for ${n} is ${val}.`:`The configured lead time is ${val}.`;case'CUSTOMIZATION':return n?`${n} customization: ${val}.`:val;case'DEMO / TRIAL':return n?`${n}: ${val}.`:val;case'LINK':return n?`You can find ${n} here: ${val}`:`You can find us here: ${val}`;case'PURCHASE':return n?`You can purchase ${n} here: ${val}`:`You can continue your purchase here: ${val}`;case'DISCOUNT':return n?`${n}: ${val}.`:`Our configured offer is ${val}.`;case'COMPATIBILITY':return n?`${n}: ${val}.`:val;case'ORDER STATUS':return val;case'CANCELLATION':return n?`${n} cancellation policy: ${val}.`:`Our cancellation policy is: ${val}`;case'TAX':return n?`${n} tax information: ${val}.`:val;case'WHOLESALE / BULK':return n?`${n} bulk or wholesale information: ${val}.`:val;case'LICENSE / USAGE':return n?`${n} usage or licensing information: ${val}.`:val;case'INVOICE / RECEIPT':return `For an invoice or receipt, please use ${val}.`;case'WHATSAPP':return `Our WhatsApp contact is ${val}.`;case'SOCIAL / COMMUNITY':return `Our social and community links are: ${val}.`;case'SUPPORT':return `Our support contact is ${val}.`;default:return val}}
function formalJoin(parts){return parts.filter(Boolean).join(' ').replace(/\s+/g,' ').replace(/\.\s*\./g,'.').trim()}
function styleResponse(text){const st=K.business.style||'formal';if(st==='concise')return text.replace(/Our business is located at /,'Located at ');if(st==='direct')return text;return text}
function analyze(text){
const original=String(text||'').trim();if(!original)return{confidence:0,status:'neutral',intents:[],entity:null,evidence:[],missing:['message'],response:'Enter a message to analyze.',reason:'No input was provided.'};
const ic=intentCandidates(original),rawEntity=resolveEntity(original);let selected=ic.slice(0,5);if(selected.length>1){const max=selected[0].score;const multi=/(\band\b|\balso\b|\bplus\b|&)/.test(normalize(original));const threshold=multi?Math.max(6,max*.40):Math.max(7,max*.64);selected=selected.filter((x,i)=>i===0||x.score>=threshold);if(multi){selected=selected.filter((x,i)=>i===0||x.evidence.some(v=>!String(v).startsWith('near:'))||x.score>=max*.72)}}
const multi=/(\band\b|\balso\b|\bplus\b|&)/.test(normalize(original));if(selected[0]?.key==='CUSTOM_FACT'&&!multi)selected=[selected[0]];if(!multi&&selected.length>1)selected=selected.filter((x,i)=>i===0||x.evidence.some(v=>!String(v).startsWith('near:')));const required=selected.some(x=>x.needsEntity),configuredEntities=entities(),nt=normalize(original);let entity=rawEntity;
if(!entity&&required){if(configuredEntities.length===1)entity={...configuredEntities[0],score:.79,matched:configuredEntities[0].name,method:'single-configured-entry'};else{const ps=selected.some(x=>['PRICE','PRODUCT_PURPOSE','AVAILABILITY','DELIVERY','PURCHASE','DISCOUNT','INCLUDED','FEATURES','AUDIENCE','CUSTOMIZATION'].includes(x.key));const productWords=/(product|item|package|bundle|vault|ebook|template|digital|file|download|stock)/.test(nt);const serviceWords=/(service|project|website|development|consultation|agency|appointment)/.test(nt);const quantity=/(\b\d+(?:\.\d+)?\b)/.test(nt);const psProducts=configuredEntities.filter(x=>x.type==='PRODUCT'),psServices=configuredEntities.filter(x=>x.type==='SERVICE');if(ps&&productWords&&!serviceWords&&psProducts.length===1)entity={...psProducts[0],score:.74,matched:psProducts[0].name,method:'product-context inference'};else if(ps&&quantity&&!serviceWords&&psProducts.length===1)entity={...psProducts[0],score:.76,matched:psProducts[0].name,method:'quantity-product inference'};else if(ps&&serviceWords&&!productWords&&psServices.length===1)entity={...psServices[0],score:.74,matched:psServices[0].name,method:'service-context inference'}}}
const ambiguous=Boolean(entity?.ambiguous);let answers=[],missing=[],factHits=[],used=[];
for(const r of selected){let e=entity;if(r.entityName&&!e)e=entities().find(x=>normalize(x.name)===normalize(r.entityName))||e;let f=factFor(r.key,e,r.customFact);if(f){answers.push(r.key==='CUSTOM_FACT'?`${r.customFact.key}: ${f}`:sentence(r.label,f,e));factHits.push(`${r.label} → ${f}`);used.push(r.label)}else if(r.needsEntity&&!e){missing.push(`${r.label.toLowerCase()} product/service`)}else if(r.key==='DISCOUNT'&&configuredEntities.length){missing.push('discount rule')}else missing.push(r.label.toLowerCase())}
let confidence=16;const maxIntent=ic[0]?.score||0,topEntity=entity?.score||0;if(ic.length)confidence+=Math.min(46,maxIntent*2.6);if(topEntity)confidence+=Math.min(27,topEntity*27);if(!required&&selected.length)confidence+=15;const explicit=selected[0]?.evidence?.some(v=>!String(v).startsWith('near:'));if(!required&&explicit)confidence+=10;if(selected.length>1)confidence+=6;if(factHits.length)confidence+=Math.min(16,factHits.length*4.5);if(missing.length)confidence-=Math.min(32,missing.length*12);if(ambiguous)confidence-=30;if(words(original).length>=4)confidence+=4;if(/\b(maybe|perhaps|probably|not sure|i think)\b/.test(nt))confidence-=8;if(/\?/.test(original))confidence+=2;confidence=Math.max(8,Math.min(99,Math.round(confidence)));let status='neutral';if(confidence>=78&&!missing.length&&!ambiguous)status='good';else if(confidence>=48)status='warn';if(ambiguous&&status==='good')status='warn';
let response='';if(answers.length)response=styleResponse(formalJoin(answers));if(missing.length){const m=uniq(missing).join(', ');response+=(response?' ':'')+`I can address the configured portion, but ${m} ${missing.length===1?'is':'are'} not configured yet.`}if(ambiguous)response=(response?response+' ':'')+'The message could refer to more than one configured product or service, so please review the intended item before responding.';if(!response)response='TORI could not establish a reliable business-specific answer from the configured knowledge.';let reason=status==='good'?'Strong intent match, entity resolution and fact coverage. The response is composed only from configured business knowledge.':status==='warn'?(ambiguous?'More than one entity is plausible, so TORI lowered confidence for review.':'The message has a plausible interpretation, but a fact, entity or context signal needs review.'):'The current message does not contain enough reliable context or configured facts for a business-specific answer.';return{original,normalized:nt,confidence,status,intents:selected,entity,evidence:uniq([...selected.flatMap(x=>x.evidence),...(entity?[entity.method+': '+entity.matched]:[])]),missing,used,factHits,response,reason};}
function fieldsForProfile(){const map={bizName:'name',bizLegal:'legalName',bizCategory:'category',bizTagline:'tagline',bizDesc:'description',bizWebsite:'website',bizEmail:'email',bizPhone:'phone',bizWhatsapp:'whatsapp',bizCountry:'country',bizCity:'city',bizAddress:'address',bizHours:'hours',bizSupportHours:'supportHours',bizPayments:'payments',bizCurrencies:'currencies',bizDelivery:'delivery',bizLeadTime:'leadTime',bizRefund:'refund',bizReturns:'returns',bizSocial:'social',bizCta:'cta',bizStyle:'style'};return map}
function renderProfile(){if(!$('bizName'))return;const b=K.business;for(const[id,key]of Object.entries(fieldsForProfile())){const el=$(id);if(el)el.value=b[key]||''}}
function renderEntries(){
  if(!$('entryList'))return;
  const all=[...K.products.map((x,i)=>({type:'products',index:i,kind:'PRODUCT',name:x.name,meta:x.price||'NO PRICE',body:[x.description,x.aliases].filter(Boolean).join(' · ')})),...K.services.map((x,i)=>({type:'services',index:i,kind:'SERVICE',name:x.name,meta:x.price||'QUOTE',body:[x.description,x.aliases].filter(Boolean).join(' · ')})),...K.facts.map((x,i)=>({type:'facts',index:i,kind:'FACT',name:x.key,meta:'CUSTOM',body:x.value})),...K.keywords.map((x,i)=>({type:'keywords',index:i,kind:'KEYWORD',name:x,meta:'TRIGGER',body:'Custom business phrase'})),...K.learned.map((x,i)=>({type:'learned',index:i,kind:'LEARNED',name:x.phrase,meta:x.intent||'CUSTOM',body:x.entity||'General rule'}))];
  $('entryCount').textContent=`${all.length} ${all.length===1?'ENTRY':'ENTRIES'}`;$('entryList').innerHTML=all.length?all.map(x=>`<div class="entry"><div class="entryTop"><div class="entryTitle">${esc(x.name||'(unnamed)')}</div><div class="entryMeta">${x.kind} · ${esc(x.meta)}</div></div><div class="entryBody">${esc(x.body||'No description')}</div><div class="entryActions"><button class="mini" data-remove="${x.type}" data-index="${x.index}">REMOVE</button></div></div>`).join(''):`<div class="entry"><div class="entryTitle">Knowledge pack is empty.</div><div class="entryBody">There is no default business data. Add your profile, then add products, services or custom facts.</div></div>`;
  document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{const t=b.dataset.remove,i=+b.dataset.index;K[t].splice(i,1);save();renderEntries();toast('Entry removed.')});
}
function render(){renderProfile();renderEntries();}
function readProfile(){for(const[id,key]of Object.entries(fieldsForProfile()))K.business[key]=$(id).value.trim()}
function addProduct(){const x={name:$('pName').value.trim(),price:$('pPrice').value.trim(),currency:$('pCurrency').value.trim(),stock:$('pStock').value.trim(),link:$('pLink').value.trim(),aliases:$('pAliases').value.trim(),delivery:$('pDelivery').value.trim(),description:$('pDesc').value.trim(),features:$('pFeatures').value.trim(),included:$('pIncluded').value.trim(),audience:$('pAudience').value.trim(),compatibility:$('pCompatibility').value.trim(),customization:$('pCustomization').value.trim(),trial:$('pTrial').value.trim(),discount:$('pDiscount').value.trim(),refund:$('pRefund').value.trim(),license:$('pLicense').value.trim(),tax:$('pTax').value.trim(),wholesale:$('pWholesale').value.trim(),cancellation:$('pCancellation').value.trim(),access:$('pAccess').value.trim(),orderStatus:''};if(!x.name){toast('Product name is required.');return}K.products.push(x);save();renderEntries();['pName','pPrice','pCurrency','pStock','pLink','pAliases','pDelivery','pDesc','pFeatures','pIncluded','pAudience','pCompatibility','pCustomization','pTrial','pDiscount','pRefund','pLicense','pTax','pWholesale','pCancellation','pAccess'].forEach(id=>$(id).value='');toast('Product added to local knowledge.')}
function addService(){const x={name:$('sName').value.trim(),price:$('sPrice').value.trim(),aliases:$('sAliases').value.trim(),description:$('sDesc').value.trim(),availability:$('sAvailability').value.trim(),link:$('sLink').value.trim(),delivery:$('sDelivery').value.trim(),features:$('sFeatures').value.trim(),included:$('sIncluded').value.trim(),audience:$('sAudience').value.trim(),leadTime:$('sLeadTime').value.trim(),customization:$('sCustomization').value.trim(),trial:$('sTrial').value.trim(),discount:$('sDiscount').value.trim(),refund:$('sRefund').value.trim(),compatibility:$('sCompatibility').value.trim(),tax:$('sTax').value.trim(),wholesale:$('sWholesale').value.trim(),cancellation:$('sCancellation').value.trim(),license:$('sLicense').value.trim(),access:$('sAccess').value.trim(),orderStatus:''};if(!x.name){toast('Service name is required.');return}K.services.push(x);save();renderEntries();['sName','sPrice','sAliases','sDesc','sAvailability','sLink','sDelivery','sFeatures','sIncluded','sAudience','sLeadTime','sCustomization','sTrial','sDiscount','sRefund','sCompatibility','sTax','sWholesale','sCancellation','sLicense','sAccess'].forEach(id=>$(id).value='');toast('Service added to local knowledge.')}
function addFact(){const x={key:$('fKey').value.trim(),value:$('fValue').value.trim(),aliases:$('fAliases').value.trim()};if(!x.key||!x.value){toast('Fact name and value are required.');return}K.facts.push(x);save();renderEntries();['fKey','fValue','fAliases'].forEach(id=>$(id).value='');toast('Fact added to local knowledge.')}
function addKeyword(){const x=$('customKeyword').value.trim();if(!x){toast('Enter a keyword or phrase.');return}if(!K.keywords.includes(x))K.keywords.push(x);save();renderEntries();$('customKeyword').value='';toast('Keyword added.')}
function showResult(r){$('confidence').textContent=r.confidence?String(r.confidence):'—';$('status').textContent=r.status==='good'?'CONFIRMED':r.status==='warn'?'REVIEW':'UNCONFIRMED';$('status').className='status '+r.status;$('intent').textContent=r.intents.map(x=>x.label).join(' + ')||'UNKNOWN';$('entity').textContent=r.entity?.name?.toUpperCase()||'UNRESOLVED';$('evidence').textContent=r.evidence.length?`${r.evidence.length} signals`:'NONE';$('missing').textContent=r.missing.length?r.missing.slice(0,2).join(', '):'NONE';$('response').textContent=r.response;$('explain').textContent=r.reason;$('explain').className='explain '+r.status;$('intentStack').innerHTML=r.intents.length?r.intents.map(x=>`<span class="pill">${esc(x.label)} ${Math.round(x.score)}</span>`).join(''):'<span class="pill">NO INTENT</span>';$('evidenceStack').innerHTML=r.evidence.length?r.evidence.slice(0,12).map(x=>`<span class="pill">${esc(x)}</span>`).join(''):'<span class="pill">NO EVIDENCE</span>';lastAnalysis=r}
let lastAnalysis=null;
function runAnalysis(){lastAnalysis=analyze($('incoming').value);showResult(lastAnalysis)}
function teach(){if(!lastAnalysis||!lastAnalysis.original){toast('Analyze a message first.');return}const primary=lastAnalysis.intents[0];if(!primary){toast('No intent to teach.');return}const entity=lastAnalysis.entity?.name||'';K.learned.unshift({phrase:lastAnalysis.original,intent:primary.key,entity});K.learned=K.learned.slice(0,300);save();renderEntries();toast('Message taught as an explicit local rule.')}
function setExample(t){$('incoming').value=t;runAnalysis()}
function clearPack(){if(!confirm('Clear all TORI local knowledge in this browser?'))return;K=blank();save();render();$('incoming').value='';resetResult();toast('Local knowledge cleared.')}
function resetResult(){$('confidence').textContent='—';$('status').textContent='WAITING';$('status').className='status neutral';$('intent').textContent='—';$('entity').textContent='—';$('evidence').textContent='—';$('missing').textContent='—';$('response').textContent='Add business knowledge and analyze a message.';$('explain').textContent='TORI will show the signals, facts and uncertainty used in its decision.';$('explain').className='explain neutral';$('intentStack').innerHTML='';$('evidenceStack').innerHTML=''}
function toast(t){const x=$('toast');x.textContent=t;x.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>x.classList.remove('show'),2300)}

function getSupabaseClient(){
  if(!window.supabase||!window.TORI_SUPABASE)return null;
  if(window.__TORI_SUPABASE_CLIENT)return window.__TORI_SUPABASE_CLIENT;
  window.__TORI_SUPABASE_CLIENT=window.supabase.createClient(window.TORI_SUPABASE.url,window.TORI_SUPABASE.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  return window.__TORI_SUPABASE_CLIENT;
}
function isAdultDate(value){
  if(!value)return false;
  const dob=new Date(value+"T00:00:00");if(Number.isNaN(dob.getTime()))return false;
  const now=new Date();let age=now.getFullYear()-dob.getFullYear();
  const before=now.getMonth()<dob.getMonth()||(now.getMonth()===dob.getMonth()&&now.getDate()<dob.getDate());if(before)age--;
  return age>=18;
}
async function getToriProfile(client,user){
  if(!client||!user)return null;
  const {data}=await client.from("profiles").select("*").eq("id",user.id).maybeSingle();
  return data||null;
}
async function ensureToriAccess(redirect=true){
  const client=getSupabaseClient();if(!client)return null;
  const {data}=await client.auth.getSession();if(!data?.session?.user){if(redirect)location.href="auth.html?mode=signin";return null}
  const profile=await getToriProfile(client,data.session.user);
  if(!profile?.age_verified){if(redirect)location.href="auth.html?mode=profile";return null}
  return {client,user:data.session.user,profile};
}

function initAuth(){
  const form=$("authForm"),client=getSupabaseClient();if(!form||!client)return;
  const msg=$("authMsg"),submit=$("authSubmit"),tabs=[...document.querySelectorAll(".authTab")];
  const nameField=$("nameField"),dobField=$("dobField"),ageAttest=$("ageAttest"),termsAttest=$("termsAttest");
  const fullName=$("fullName"),dob=$("dateOfBirth"),email=$("email"),password=$("password"),ageCheck=$("ageCheck"),termsCheck=$("termsCheck");
  const forgot=$("forgotPassword"),pending=$("pendingConfirm"),pendingText=$("pendingText"),resend=$("resendConfirm");
  const recoveryPanel=$("recoveryPanel"),newPassword=$("newPassword"),confirmPassword=$("confirmPassword"),updatePassword=$("updatePassword"),cancelRecovery=$("cancelRecovery");
  const signedIn=$("signedIn"),signedEmail=$("signedEmail"),signOut=$("signOut");
  const state={mode:new URLSearchParams(location.search).get("mode")==="signin"?"signin":"signup",pendingEmail:"",recovery:false};
  const maxDob=()=>{const d=new Date();d.setFullYear(d.getFullYear()-18);const iso=d.toISOString().slice(0,10);if(dob)dob.max=iso};maxDob();
  const setMsg=(t,type="neutral")=>{if(msg){msg.textContent=t;msg.className="authMsg "+type}};
  const hide=(n,v=true)=>{if(n)n.hidden=v};
  const showForm=()=>{hide(form,false);hide(signedIn,true);hide(pending,true);hide(recoveryPanel,!state.recovery);const signup=state.mode==="signup";hide(nameField,!signup);hide(dobField,!signup);hide(ageAttest,!signup);hide(termsAttest,!signup);hide(forgot,signup);if(password)password.autocomplete=signup?"new-password":"current-password";if(submit){submit.disabled=false;submit.textContent=signup?"CREATE ACCOUNT":"SIGN IN"}tabs.forEach(t=>t.classList.toggle("active",t.dataset.mode===state.mode))};
  const signOutLocal=async()=>{try{await client.auth.signOut({scope:"local"})}catch(_){try{await client.auth.signOut()}catch(__){}}};
  const showPending=mail=>{state.pendingEmail=mail||state.pendingEmail||email?.value.trim()||"";hide(form,true);hide(signedIn,true);hide(recoveryPanel,true);hide(pending,false);if(pendingText)pendingText.textContent=state.pendingEmail?"A verification link was sent to "+state.pendingEmail+". Confirm the address, then sign in.":"Check your inbox for the verification link.";setMsg("Email verification is required. You are not signed in.","warn")};
  const showSigned=user=>{state.pendingEmail="";hide(form,true);hide(pending,true);hide(recoveryPanel,true);hide(signedIn,false);if(signedEmail)signedEmail.textContent=user?.email||"Authenticated account";setMsg("Signed in successfully.","good")};
  const verified=user=>!!user&&(!!user.email_confirmed_at||!!user.confirmed_at);
  const renderSession=async session=>{const user=session?.user;if(!user){showForm();setMsg(state.mode==="signin"?"Sign in with your verified account.":"Create your TORI account. You must be 18 or older.","neutral");return}if(!verified(user)&&state.mode!=="signup"){state.pendingEmail=user.email||"";await signOutLocal();showPending(state.pendingEmail);return}const p=await getToriProfile(client,user);if(!p?.age_verified){await signOutLocal();showForm();setMsg("This account is missing its required age verification profile.","warn");return}showSigned(user)};
  const setMode=mode=>{state.mode=mode==="signin"?"signin":"signup";state.pendingEmail="";state.recovery=false;history.replaceState(null,"","auth.html?mode="+state.mode);showForm();setMsg(state.mode==="signin"?"Sign in with your verified email and password.":"Create your TORI account. You must be 18 or older.","neutral")};
  tabs.forEach(t=>t.addEventListener("click",()=>setMode(t.dataset.mode)));
  forgot?.addEventListener("click",async()=>{const mail=email?.value.trim();if(!mail){setMsg("Enter your email first, then choose FORGOT PASSWORD.","warn");email?.focus();return}forgot.disabled=true;setMsg("Sending password reset email…","neutral");const {error}=await client.auth.resetPasswordForEmail(mail,{redirectTo:TORI_SITE_URL+"/auth.html?mode=recovery"});forgot.disabled=false;if(error)setMsg(error.message||"Could not send password reset email.","warn");else setMsg("Password reset email sent. Check your inbox.","good")});
  resend?.addEventListener("click",async()=>{const mail=state.pendingEmail||email?.value.trim();if(!mail){setMsg("Enter the account email before resending.","warn");return}resend.disabled=true;const {error}=await client.auth.resend({type:"signup",email:mail,options:{emailRedirectTo:TORI_SITE_URL+"/auth.html"}});resend.disabled=false;if(error)setMsg(error.message||"Could not resend confirmation.","warn");else setMsg("A new confirmation email was sent to "+mail+".","good")});
  cancelRecovery?.addEventListener("click",()=>setMode("signin"));
  updatePassword?.addEventListener("click",async()=>{const a=newPassword?.value||"",b=confirmPassword?.value||"";if(a.length<10){setMsg("New password must be at least 10 characters.","warn");return}if(a!==b){setMsg("Passwords do not match.","warn");return}updatePassword.disabled=true;const {error}=await client.auth.updateUser({password:a});updatePassword.disabled=false;if(error){setMsg(error.message||"Could not update password.","warn");return}await signOutLocal();history.replaceState(null,"","auth.html?mode=signin");state.recovery=false;showForm();setMsg("Password updated. Sign in with the new password.","good")});
  signOut?.addEventListener("click",async()=>{signOut.disabled=true;await signOutLocal();signOut.disabled=false;state.mode="signin";history.replaceState(null,"","auth.html?mode=signin");showForm();setMsg("Signed out.","good")});
  form.addEventListener("submit",async e=>{e.preventDefault();const mail=email?.value.trim()||"",pass=password?.value||"";if(!mail||!pass){setMsg("Email and password are required.","warn");return}if(pass.length<10){setMsg("Password must be at least 10 characters.","warn");return}if(state.mode==="signup"){if(!fullName?.value.trim()){setMsg("Enter your full name.","warn");fullName?.focus();return}if(!isAdultDate(dob?.value)){setMsg("TORI requires users to be 18 or older.","warn");return}if(!ageCheck?.checked||!termsCheck?.checked){setMsg("Confirm your age and accept the policies.","warn");return}}submit.disabled=true;submit.textContent=state.mode==="signup"?"CREATING…":"SIGNING IN…";if(state.mode==="signup"){const {data,error}=await client.auth.signUp({email:mail,password:pass,options:{emailRedirectTo:TORI_SITE_URL+"/auth.html",data:{full_name:fullName.value.trim(),date_of_birth:dob.value,age_attested:true,terms_accepted_at:new Date().toISOString(),terms_version:"2026-09-23"}}});submit.disabled=false;if(error){setMsg(error.message||"Could not create account.","warn");return}if(data?.user&&Array.isArray(data.user.identities)&&data.user.identities.length===0){state.mode="signin";history.replaceState(null,"","auth.html?mode=signin");showForm();setMsg("An account with this email already exists. Sign in instead, or use FORGOT PASSWORD if needed.","warn");return}state.pendingEmail=data?.user?.email||mail;if(data?.session)await signOutLocal();showPending(state.pendingEmail);return}const {data,error}=await client.auth.signInWithPassword({email:mail,password:pass});submit.disabled=false;if(error){showForm();setMsg(error.message||"Sign in failed.","warn");return}await renderSession(data.session)});
  const handleAuthCallbackError=()=>{const h=new URLSearchParams((location.hash||"").replace(/^#/,"")),q=new URLSearchParams(location.search);const code=h.get("error_code")||q.get("error_code"),desc=h.get("error_description")||q.get("error_description"),msgText=code||desc;if(msgText){setMsg(decodeURIComponent(String(desc||msgText).replace(/\\+/g," ")), "warn");return true}return false};
  (async()=>{maxDob();handleAuthCallbackError();const mode=new URLSearchParams(location.search).get("mode");if(mode==="recovery"){state.recovery=true;hide(form,true);hide(pending,true);hide(signedIn,true);hide(recoveryPanel,false);tabs.forEach(t=>t.classList.remove("active"));return}if(mode==="profile"){history.replaceState(null,"","auth.html?mode=signin");showForm();return}showForm();const {data}=await client.auth.getSession();await renderSession(data.session)})();
  client.auth.onAuthStateChange((event,session)=>{if(event==="PASSWORD_RECOVERY"){state.recovery=true;hide(form,true);hide(signedIn,true);hide(pending,true);hide(recoveryPanel,false);return}if(event==="SIGNED_IN"||event==="INITIAL_SESSION")setTimeout(()=>renderSession(session),0);if(event==="SIGNED_OUT"&&!state.pendingEmail&&!state.recovery)setTimeout(()=>{showForm();setMsg("Signed out.","neutral")},0)});
}


function initTheme(){
  const root=document.documentElement;
  if(!document.querySelector('.starfield')){
    const field=document.createElement('div');field.className='starfield';field.setAttribute('aria-hidden','true');
    const frag=document.createDocumentFragment();
    for(let i=0;i<115;i++){
      const s=document.createElement('span');
      const left=(i*47)%100,top=(i*83+17)%100,size=i%17===0?2:i%5===0?1.5:1;
      s.className='star';s.style.left=left+'%';s.style.top=top+'%';s.style.width=size+'px';s.style.height=size+'px';
      s.style.setProperty('--star-opacity',(0.34+(i%7)*0.08).toFixed(2));s.style.animationDelay=(-((i*0.37)%7))+'s';
      frag.appendChild(s);
    }
    field.appendChild(frag);document.body.prepend(field);
  }
  let theme=localStorage.getItem(THEME_KEY)||'light';
  if(theme!=='dark'&&theme!=='light')theme='light';
  const apply=()=>{
    root.dataset.theme=theme;
    const btn=document.querySelector('[data-theme-toggle]');
    if(btn){const dark=theme==='dark';const icon=btn.querySelector('.themeIcon');if(icon)icon.textContent=dark?'☀':'☾';btn.title=dark?'Switch to light mode':'Switch to dark mode';btn.setAttribute('aria-label',btn.title);}
  };
  let btn=document.querySelector('[data-theme-toggle]');
  if(!btn){
    const actions=document.querySelector('.actions');
    if(actions){
      btn=document.createElement('button');btn.type='button';btn.className='themeToggle';btn.setAttribute('data-theme-toggle','true');
      btn.innerHTML='<span class="themeIcon" aria-hidden="true">☾</span>';
      const menu=actions.querySelector('#menu');if(menu)actions.insertBefore(btn,menu);else actions.appendChild(btn);
      btn.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';localStorage.setItem(THEME_KEY,theme);apply();});
    }
  }
  apply();
}

function initSourceConnectors(accessArg){
  if(!$('messageList'))return;
  const access=accessArg||window.__TORI_ACCESS;if(!access)return;
  const {client,user}=access,cfg=window.TORI_CONNECTORS||{},labels={whatsapp:'WhatsApp Business',instagram:'Instagram',messenger:'Messenger',telegram:'Telegram',email:'Email',website:'Website'};
  let integrations=(access.profile?.integrations&&typeof access.profile.integrations==='object')?access.profile.integrations:{};
  const validLink=(source,value)=>{
    try{
      const u=new URL(value);if(u.protocol!=='https:'&&u.protocol!=='http:')return false;
      if(source==='whatsapp')return /(^|\.)wa\.me$|(^|\.)whatsapp\.com$/i.test(u.hostname);
      if(source==='instagram')return /(^|\.)instagram\.com$/i.test(u.hostname);
      return true;
    }catch{return false}
  };
  const saveIntegrations=async next=>{
    const {error}=await client.from('profiles').update({integrations:next,updated_at:new Date().toISOString()}).eq('id',user.id);
    if(error){toast(error.message||'Could not save connection.');return false}
    integrations=next;access.profile.integrations=next;return true;
  };
  let modal=document.querySelector('.connectorModal');
  if(!modal){
    modal=document.createElement('div');modal.className='connectorModal';modal.hidden=true;
    modal.innerHTML='<div class="connectorDialog" role="dialog" aria-modal="true" aria-labelledby="connectorTitle"><div class="connectorDialogHead"><div><div class="kicker">TORI / CONNECTION</div><h3 id="connectorTitle">CONNECT CHANNEL</h3></div><button class="connectorClose" id="connectorClose" type="button" aria-label="Close">×</button></div><p id="connectorCopy"></p><div class="connectorOption"><strong>Platform authorization</strong><span id="connectorAuthStatus">Provider authorization is not configured yet.</span><div class="connectorActions"><button class="btn" id="connectorAuthorize" type="button">AUTHORIZE ACCOUNT</button></div></div><div class="connectorOption"><strong>Direct business link</strong><span>Save the public link you want TORI to open for this channel. This does not grant API message access.</span><input class="connectLinkInput" id="connectorLink" type="url" placeholder="https://…"><div class="connectorActions"><button class="btn dark" id="connectorSaveLink" type="button">SAVE LINK</button><button class="btn dark" id="connectorOpenLink" type="button" hidden>OPEN LINK</button></div><div class="connectHint" id="connectorHint">Use a secure HTTPS link from the official platform.</div></div><div class="connectHint">Authorization and message syncing are controlled by the platform. TORI never asks you to paste passwords or private access tokens here.</div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click',e=>{if(e.target===modal)modal.hidden=true;});
    document.getElementById('connectorClose')?.addEventListener('click',()=>{modal.hidden=true;});
  }
  let active='';
  const renderCards=()=>{
    document.querySelectorAll('[data-source]').forEach(b=>{
      const saved=!!integrations[b.dataset.source]?.link;
      b.textContent=saved?'OPEN LINK':'CONNECT';
      b.classList.toggle('linked',saved);b.classList.toggle('primary',!saved);
    });
  };
  document.querySelectorAll('[data-source]').forEach(b=>b.addEventListener('click',()=>{
    active=b.dataset.source;const name=labels[active]||active.toUpperCase(),item=integrations[active]||{},conf=cfg[active]||{};
    document.getElementById('connectorTitle').textContent='CONNECT '+name.toUpperCase();
    document.getElementById('connectorCopy').textContent='Choose platform authorization when TORI is configured for this provider, or save the business link now for a clean one-click workflow.';
    document.getElementById('connectorLink').value=item.link||'';
    document.getElementById('connectorOpenLink').hidden=!item.link;
    const auth=document.getElementById('connectorAuthorize'),status=document.getElementById('connectorAuthStatus');
    auth.disabled=!conf.authUrl;auth.textContent=conf.authUrl?'AUTHORIZE ACCOUNT':'AUTHORIZE · SETUP REQUIRED';
    status.textContent=conf.authUrl?'Platform authorization is ready. The platform will ask you to approve access.':'The public site is ready for the OAuth flow, but the provider app credentials/authorization URL still need to be configured.';
    modal.hidden=false;
  }));
  document.getElementById('connectorSaveLink')?.addEventListener('click',async()=>{
    const value=document.getElementById('connectorLink').value.trim();
    if(!active||!validLink(active,value)){toast('Enter a valid platform link.');return}
    const next={...integrations,[active]:{link:value,linkedAt:new Date().toISOString(),mode:'link'}};
    if(!await saveIntegrations(next))return;
    document.getElementById('connectorOpenLink').hidden=false;renderCards();toast((labels[active]||active)+' link saved.');
  });
  document.getElementById('connectorOpenLink')?.addEventListener('click',()=>{
    const value=integrations[active]?.link;if(value)window.open(value,'_blank','noopener,noreferrer');
  });
  document.getElementById('connectorAuthorize')?.addEventListener('click',()=>{
    const url=cfg[active]?.authUrl;if(url)window.location.href=url;
  });
  renderCards();
}

function initProtectedPage(){
  if(document.body?.dataset.protected!=="true")return;
  ensureToriAccess(true).then(async x=>{
    window.__TORI_ACCESS=x||null;
    if(x?.profile?.knowledge&&typeof x.profile.knowledge==="object"&&Object.keys(x.profile.knowledge).length){
      K=normalizePack(x.profile.knowledge);save();render();
    }
  });
}
async function initMessages(){
  if(!$("messageList")||document.body?.dataset.protected!=="true")return;
  const access=window.__TORI_ACCESS||await ensureToriAccess(true);if(!access)return;
  const {client,user}=access,state={messages:[],selected:null,filter:"all",profile:access.profile};
  if(state.profile?.knowledge&&typeof state.profile.knowledge==="object"&&Object.keys(state.profile.knowledge).length)K=normalizePack(state.profile.knowledge);
  const limits=p=>p==="premium"?100:p==="pro"?25:5;
  const label=s=>({whatsapp:"WHATSAPP",instagram:"INSTAGRAM",messenger:"MESSENGER",telegram:"TELEGRAM",email:"EMAIL",website:"WEBSITE",manual:"MANUAL"}[s]||String(s||"SOURCE").toUpperCase());
  const fmt=v=>{try{return new Intl.DateTimeFormat(undefined,{dateStyle:"medium",timeStyle:"short"}).format(new Date(v))}catch{return String(v||"")}};
  const txt=(id,v)=>{const e=$(id);if(e)e.textContent=v};
  const updateToggle=enabled=>{const n=document.querySelector(".toggleRow .smallNote");if(n)n.textContent=enabled?"Auto replies only run for confident, grounded answers. Turn this off anytime.":"Auto reply is OFF. Messages stay in review until you reply manually."};
  const analyzeMsg=m=>{try{return analyze(m.body)}catch{return{confidence:0,status:"neutral",response:"",missing:["analysis"],intents:[]}}};
  const load=async()=>{const {data,error}=await client.from("messages").select("*").order("received_at",{ascending:false}).limit(150);if(error){toast(error.message||"Could not load messages.");return}state.messages=data||[];txt("storedCount",state.messages.length+" / "+limits(state.profile?.plan));txt("replyCount",state.messages.filter(x=>["auto_replied","manual_reply"].includes(x.status)).length+" / "+limits(state.profile?.plan));txt("planName",(state.profile?.plan||"free").toUpperCase());renderList();renderDetail()};
  const visible=()=>state.filter==="all"?state.messages:state.messages.filter(x=>x.status===state.filter);
  const renderList=()=>{const list=$("messageList"),items=visible();txt("inboxCount",items.length);if(!items.length){list.innerHTML='<div class="emptyState">No messages in this view.</div>';return}list.innerHTML=items.map(x=>{const tag=x.status==="review"?'<span class="tag red">REVIEW</span>':x.status==="auto_replied"?'<span class="tag green">AUTO-REPLIED</span>':x.status==="manual_reply"?'<span class="tag green">REPLIED</span>':'<span class="tag gray">'+esc(String(x.status||"OPEN").toUpperCase())+'</span>';return '<div class="messageItem'+(state.selected===x.id?" active":"")+'" data-message-id="'+x.id+'"><div class="messageItemTop"><div class="messageSender">'+esc(x.sender_name||x.sender_handle||"Customer")+'</div><div class="messageTime">'+esc(fmt(x.received_at))+'</div></div><div class="messagePreview">'+esc(x.body)+'</div><div class="tagRow"><span class="tag gray">'+esc(label(x.source))+'</span>'+tag+'</div></div>'}).join("");list.querySelectorAll("[data-message-id]").forEach(el=>el.onclick=()=>{state.selected=el.dataset.messageId;renderList();renderDetail()})};
  const renderDetail=()=>{const box=$("detailBody"),m=state.messages.find(x=>x.id===state.selected);if(!m){txt("detailTitle","SELECT A MESSAGE");txt("detailStatus","—");box.innerHTML='<div class="emptyState">Select a message from the inbox to review it.</div>';return}txt("detailTitle",m.sender_name||m.sender_handle||"Customer");txt("detailStatus",label(m.source)+" · "+String(m.status||"OPEN").toUpperCase());const a=analyzeMsg(m),tag=m.status==="review"?'<span class="tag red">RED · REVIEW REQUIRED</span>':m.status==="auto_replied"?'<span class="tag green">AUTO-REPLIED</span>':'<span class="tag gray">'+esc(String(m.status||"OPEN").toUpperCase())+'</span>';box.innerHTML='<div class="messageMeta"><span>'+esc(label(m.source))+'</span><span>'+esc(fmt(m.received_at))+'</span><span>BUSINESS '+Number(m.relevance_confidence||0)+'%</span><span>REPLY '+Number(a.confidence||m.reply_confidence||0)+'%</span></div><div class="tagRow">'+tag+'</div><div class="messageBody">'+esc(m.body)+'</div><div class="replyBox"><div class="field"><label>TORI RESPONSE</label><textarea id="replyDraft" placeholder="Write a response or use TORI draft.">'+esc(m.reply_text||a.response||"")+'</textarea></div><div class="replyActions"><button class="btn" id="sendManualReply">MARK REPLIED</button><button class="btn dark" id="useToriDraft">USE TORI DRAFT</button><button class="mini" id="ignoreMessage">IGNORE</button></div><div class="helper">'+(a.status==="good"?"TORI has enough configured facts for a grounded draft.":"TORI is not confident enough to auto-answer this message; review it before sending.")+'</div></div>';$("useToriDraft")?.addEventListener("click",()=>{$("replyDraft").value=a.response||""});$("ignoreMessage")?.addEventListener("click",async()=>{const {error}=await client.from("messages").update({status:"ignored"}).eq("id",m.id);if(error){toast(error.message);return}m.status="ignored";renderList();renderDetail();toast("Message moved out of the active inbox.")});$("sendManualReply")?.addEventListener("click",async()=>{const t=$("replyDraft").value.trim();if(!t){toast("Write a reply first.");return}const {data,error}=await client.rpc("tori_mark_reply",{p_message_id:m.id,p_reply_text:t,p_status:"manual_reply"});if(error){toast(error.message);return}Object.assign(m,data);renderList();renderDetail();toast("Reply recorded. A live channel connector is required to dispatch it externally.")})};
  const maybeAutoReply=async()=>{if(!state.profile?.auto_reply_enabled)return;const pending=state.messages.filter(x=>x.business_related&&x.status==="review"&&x.source==="manual");for(const m of pending){const a=analyzeMsg(m);if(a.status!=="good"||!a.response||a.missing.length)continue;const {data,error}=await client.rpc("tori_mark_reply",{p_message_id:m.id,p_reply_text:a.response,p_status:"auto_replied"});if(!error&&data){Object.assign(m,data)}}};
  document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{state.filter=b.dataset.filter;document.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));renderList()}));
  $("refreshMessages")?.addEventListener("click",async()=>{await load();await maybeAutoReply();await load();toast("Inbox refreshed.")});
  $("autoReplyToggle")?.addEventListener("change",async e=>{const enabled=e.target.checked,{error}=await client.from("profiles").update({auto_reply_enabled:enabled,updated_at:new Date().toISOString()}).eq("id",user.id);if(error){e.target.checked=!enabled;toast(error.message);return}state.profile.auto_reply_enabled=enabled;updateToggle(enabled);toast(enabled?"Auto reply enabled.":"Auto reply disabled.")});
  $("addManualMessage")?.addEventListener("click",async()=>{const body=$("manualMessage")?.value.trim()||"",source=$("manualSource")?.value||"manual",sender=$("manualSender")?.value.trim()||"Customer";if(!body){toast("Enter a customer message first.");return}const a=analyzeMsg({body});if(a.confidence<40||!a.intents?.length){toast("TORI kept this out: it does not look sufficiently business-related.");return}const auto=state.profile.auto_reply_enabled&&a.status==="good"&&!a.missing.length&&source==="manual";const {data,error}=await client.rpc("tori_store_message",{p_source:source,p_body:body,p_sender_name:sender,p_received_at:new Date().toISOString(),p_business_related:true,p_relevance_confidence:Math.max(40,a.confidence),p_reply_confidence:a.confidence,p_status:auto?"auto_replied":"review",p_reply_text:auto?a.response:null,p_metadata:{test:true,analysis_status:a.status,dispatch:"manual_test"}});if(error){toast(error.message||"Could not store message.");return}state.selected=data?.id||null;$("manualMessage").value="";$("manualSender").value="";await load();toast(auto?"Business message stored and auto-reply simulated for the local test flow.":"Business message stored for review.")});
  initSourceConnectors(access);
  $("autoReplyToggle").checked=!!state.profile?.auto_reply_enabled;updateToggle(!!state.profile?.auto_reply_enabled);
  await load();await maybeAutoReply();await load();
}


function init(){
  document.querySelectorAll('[data-page]').forEach(a=>{if(a.getAttribute('href')===location.pathname.split('/').pop()||((!location.pathname.split('/').pop()||location.pathname.endsWith('/'))&&a.getAttribute('href')==='index.html'))a.classList.add('active')});
  $('menu')?.addEventListener('click',()=>{const m=$('menu'),n=$('navlinks'),open=n.classList.toggle('open');m.setAttribute('aria-expanded',String(open));});
  document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>{$('navlinks').classList.remove('open');$('menu')?.setAttribute('aria-expanded','false')}));document.addEventListener('click',e=>{const n=$('navlinks'),m=$('menu');if(n?.classList.contains('open')&&!n.contains(e.target)&&!m?.contains(e.target)){n.classList.remove('open');m?.setAttribute('aria-expanded','false')}});
  document.querySelectorAll('[data-toast]').forEach(b=>b.addEventListener('click',()=>toast(b.dataset.toast)));
  if($('savePack'))$('savePack').onclick=()=>{readProfile();save();toast('Knowledge pack saved locally.')};
  if($('clearPack'))$('clearPack').onclick=clearPack;if($('addProduct'))$('addProduct').onclick=addProduct;if($('addService'))$('addService').onclick=addService;if($('addFact'))$('addFact').onclick=addFact;if($('addKeyword'))$('addKeyword').onclick=addKeyword;
  if($('analyze'))$('analyze').onclick=runAnalysis;if($('teach'))$('teach').onclick=teach;
  document.querySelectorAll('[data-example]').forEach(b=>b.onclick=()=>setExample(b.dataset.example));
  if($('incoming'))$('incoming').addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter')runAnalysis()});
  if($('exportPack'))$('exportPack').onclick=()=>{readProfile();const blob=new Blob([JSON.stringify(K,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='tori-knowledge.json';a.click();URL.revokeObjectURL(a.href);toast('Knowledge pack exported.')};
  if($('importFile'))$('importFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{try{const x=JSON.parse(rd.result);if(!x.business||typeof x.business!=='object')throw new Error('Invalid');K=normalizePack(x);save();render();toast('Knowledge pack imported.')}catch{toast('Invalid TORI knowledge file.')}};rd.readAsText(f)};
  render();if($('incoming'))resetResult();
  initTheme();initAuth();initProtectedPage();initMessages();
}
window.TORI={analyze,load:()=>K,save,normalize,INTENTS,reset:()=>{K=blank();save();return K}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
