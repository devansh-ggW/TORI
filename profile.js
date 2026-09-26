(function(){
  const $=id=>document.getElementById(id);
  const accessApi=()=>window.ReplyFlix?.apiFetch;
  const state={user:null,profile:null,image:null,originalImage:null,zoom:1,rotation:0,offsetX:0,offsetY:0,dirty:false,drawing:false,lastX:0,lastY:0};
  const canvas=$("imageCanvas"),ctx=canvas?.getContext("2d");
  const imageUrl=()=>state.image?.src||"";
  const setMessage=(text,type="neutral")=>{const el=$("profileMessage");if(el){el.textContent=text;el.className="profileMessage "+type}};
  const setDirty=dirty=>{
    state.dirty=!!dirty;
    $("dirtyBadge")?.toggleAttribute("hidden",!state.dirty);
    const btn=$("saveChanges"); if(btn){btn.disabled=!state.dirty;btn.textContent=state.dirty?"SAVE CHANGES":"SAVED";}
    const title=$("saveTitle"),hint=$("saveHint");
    if(title)title.textContent=state.dirty?"UNSAVED CHANGES":"NO UNSAVED CHANGES";
    if(hint)hint.textContent=state.dirty?"Save to apply your profile changes to your ReplyFlix account.":"All profile changes are saved.";
    $("profileState")?.replaceChildren(document.createTextNode(state.dirty?"EDITING":"SYNCED"));
  };
  const draw=()=>{
    if(!ctx)return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--surface2")||"#f4f5f6";ctx.fillRect(0,0,canvas.width,canvas.height);
    if(!state.image){$("imagePlaceholder")?.removeAttribute("hidden");return}
    $("imagePlaceholder")?.setAttribute("hidden","");
    const img=state.image;
    const base=Math.max(canvas.width/img.width,canvas.height/img.height);
    const scale=base*state.zoom;
    ctx.save();
    ctx.translate(canvas.width/2+state.offsetX,canvas.height/2+state.offsetY);
    ctx.rotate(state.rotation*Math.PI/180);
    ctx.drawImage(img,-img.width*scale/2,-img.height*scale/2,img.width*scale,img.height*scale);
    ctx.restore();
  };
  const readFile=file=>new Promise((resolve,reject)=>{
    const rd=new FileReader();rd.onload=()=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error("Could not open that image."));img.src=String(rd.result)};rd.onerror=()=>reject(new Error("Could not read that image."));rd.readAsDataURL(file);
  });
  const loadImageSrc=src=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error("Could not load profile image."));img.src=src});
  const canvasToWebp=()=>new Promise((resolve,reject)=>{
    const out=document.createElement("canvas"),size=256;out.width=size;out.height=size;const c=out.getContext("2d");
    c.fillStyle="#ffffff";c.fillRect(0,0,size,size);
    if(!state.image)return resolve("");
    const scale=Math.max(size/state.image.width,size/state.image.height)*state.zoom;
    c.save();c.translate(size/2+state.offsetX*(size/canvas.width),size/2+state.offsetY*(size/canvas.width));c.rotate(state.rotation*Math.PI/180);
    c.drawImage(state.image,-state.image.width*scale/2,-state.image.height*scale/2,state.image.width*scale,state.image.height*scale);c.restore();
    out.toBlob(blob=>{
      if(!blob){reject(new Error("Could not prepare the image."));return}
      const rd=new FileReader();rd.onload=()=>resolve(String(rd.result));rd.onerror=()=>reject(new Error("Could not encode the image."));rd.readAsDataURL(blob)
    },"image/webp",.84);
  });
  const loadProfile=async()=>{
    const api=accessApi();if(!api){location.href="auth.html?mode=signin";return}
    try{
      const data=await api("/auth/me");state.user=data.user;state.profile=data.profile;
      $("profileName").value=data.user?.full_name||"";$("profileEmail").value=data.user?.email||"";
      if(data.profile?.avatar_data_url){state.originalImage=data.profile.avatar_data_url;state.image=await loadImageSrc(state.originalImage)}
      draw();setDirty(false);setMessage("Your changes stay local until you press SAVE CHANGES.","neutral");
    }catch{location.href="auth.html?mode=signin"}
  };
  $("profileName")?.addEventListener("input",()=>setDirty(true));
  $("imageInput")?.addEventListener("change",async e=>{
    const file=e.target.files?.[0];if(!file)return;
    if(!/^image\/(png|jpeg|webp)$/i.test(file.type)){setMessage("Use a PNG, JPEG, or WebP image.","warn");e.target.value="";return}
    if(file.size>8*1024*1024){setMessage("Choose an image smaller than 8 MB.","warn");e.target.value="";return}
    try{state.image=await readFile(file);state.originalImage=null;state.zoom=1;state.rotation=0;state.offsetX=0;state.offsetY=0;draw();setDirty(true);setMessage("Image uploaded locally. Adjust it, then press SAVE CHANGES.","good")}catch(err){setMessage(err.message,"warn")}
  });
  $("zoom")?.addEventListener("input",e=>{state.zoom=Number(e.target.value);draw();setDirty(true)});
  $("rotateLeft")?.addEventListener("click",()=>{state.rotation=(state.rotation+270)%360;draw();setDirty(true)});
  $("rotateRight")?.addEventListener("click",()=>{state.rotation=(state.rotation+90)%360;draw();setDirty(true)});
  $("resetImage")?.addEventListener("click",()=>{if(!state.image)return;state.zoom=1;state.rotation=0;state.offsetX=0;state.offsetY=0;$("zoom").value="1";draw();setDirty(true)});
  canvas?.addEventListener("pointerdown",e=>{if(!state.image)return;state.drawing=true;state.lastX=e.clientX;state.lastY=e.clientY;canvas.setPointerCapture?.(e.pointerId)});
  canvas?.addEventListener("pointermove",e=>{if(!state.drawing)return;state.offsetX+=e.clientX-state.lastX;state.offsetY+=e.clientY-state.lastY;state.lastX=e.clientX;state.lastY=e.clientY;draw();setDirty(true)});
  canvas?.addEventListener("pointerup",()=>state.drawing=false);
  canvas?.addEventListener("pointercancel",()=>state.drawing=false);
  $("deleteAccount")?.addEventListener("click",async()=>{
    const confirmed=window.confirm("Delete your ReplyFlix account permanently? This removes your profile, knowledge, messages, sessions, and profile picture.");
    if(!confirmed)return;
    const password=window.prompt("Enter your current password to confirm deletion:");
    if(password===null)return;
    const phrase=window.prompt('Type DELETE MY ACCOUNT to confirm:');
    if(phrase!=="DELETE MY ACCOUNT"){setMessage("Account deletion cancelled. Confirmation text did not match.","warn");return}
    const btn=$("deleteAccount");btn.disabled=true;btn.textContent="DELETING…";
    try{
      await window.ReplyFlix.apiFetch("/account",{method:"DELETE",body:JSON.stringify({password,confirmation:phrase})});
      try{sessionStorage.removeItem("replyflix_session")}catch{}
      window.__REPLYFLIX_ACCESS=null;
      setMessage("Account deleted. Redirecting to sign up…","good");
      setTimeout(()=>location.href="auth.html?mode=signup",500);
    }catch(err){
      btn.disabled=false;btn.textContent="DELETE ACCOUNT";setMessage(err.message||"Could not delete account.","warn");
    }
  });
  $("saveChanges")?.addEventListener("click",async()=>{
    if(!state.dirty)return;
    const api=accessApi();if(!api)return;
    const btn=$("saveChanges");btn.disabled=true;btn.textContent="SAVING…";
    try{
      const avatar=await canvasToWebp();
      const name=$("profileName").value.trim();
      if(!name){setMessage("Display name is required.","warn");btn.disabled=false;return}
      const data=await api("/profile",{method:"PUT",body:JSON.stringify({full_name:name,avatar_data_url:avatar||null})});
      state.profile=data.profile;state.user.full_name=name;state.originalImage=avatar||null;
      setDirty(false);setMessage("Changes saved successfully.","good");
    }catch(err){btn.disabled=false;setMessage(err.message||"Could not save changes.","warn");setDirty(true)}
  });
  window.addEventListener("beforeunload",e=>{if(state.dirty){e.preventDefault();e.returnValue=""}});
  loadProfile();
})();