(() => {
  const $ = s => document.querySelector(s);
  const input = $('#promptInput'), form = $('#chatForm'), messages = $('#messages'), welcome = $('#welcome');
  const toast = text => { const el=$('#toast'); el.textContent=text; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2100); };
  const fit = () => { input.style.height='auto'; input.style.height=Math.min(input.scrollHeight,180)+'px'; };
  const addMessage = (text,who) => {
    const item=document.createElement('article'); item.className='message '+who;
    const avatar=document.createElement('div'); avatar.className='message-avatar'; avatar.textContent=who==='user'?'أ':'✳';
    const body=document.createElement('div'); body.className='message-body';
    if(who==='assistant'){ const label=document.createElement('div'); label.className='message-label'; label.textContent='Pix'; body.append(label); }
    const content=document.createElement('div'); content.textContent=text; body.append(content);
    item.append(avatar,body); messages.append(item); item.scrollIntoView({behavior:'smooth',block:'nearest'});
  };
  const send = text => {
    const value=(text||input.value).trim(); if(!value) return;
    welcome.hidden=true; addMessage(value,'user'); input.value=''; fit();
    window.setTimeout(()=>addMessage('واجهة العرض المحلية جاهزة. تم استلام رسالتك بنجاح، لكن ربط نموذج ذكاء اصطناعي يحتاج إلى توصيل Backend منفصل.','assistant'),350);
  };
  form.addEventListener('submit',e=>{e.preventDefault();send();});
  input.addEventListener('input',fit);
  input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();send();}});
  $('#suggestions').addEventListener('click',e=>{const b=e.target.closest('[data-prompt]');if(b){input.value=b.dataset.prompt;fit();input.focus();}});
  $('#newChat').addEventListener('click',()=>{messages.replaceChildren();welcome.hidden=false;input.value='';fit();$('#sidebar').classList.remove('open');input.focus();});
  $('#openSidebar').addEventListener('click',()=>$('#sidebar').classList.add('open'));
  $('#closeSidebar').addEventListener('click',()=>$('#sidebar').classList.remove('open'));
  $('#themeToggle').addEventListener('click',()=>{const root=document.documentElement;const light=root.dataset.theme!=='light';root.dataset.theme=light?'light':'dark';$('#themeToggle').innerHTML=window.PixIcons.render(light?'moon':'sun');});
  const modelMenu=$('#modelMenu');
  $('#modelButton').addEventListener('click',()=>modelMenu.classList.toggle('hidden'));
  modelMenu.addEventListener('click',e=>{const b=e.target.closest('[data-model]');if(!b)return;$('#modelName').textContent=b.dataset.model;modelMenu.classList.add('hidden');toast('تم اختيار '+b.dataset.model);});
  document.addEventListener('click',e=>{if(!e.target.closest('#modelMenu')&&!e.target.closest('#modelButton'))modelMenu.classList.add('hidden');});
  $('#shareButton').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);toast('تم نسخ رابط الصفحة');}catch{toast('المشاركة غير متاحة في هذا المتصفح');}});
  $('#attachButton').addEventListener('click',()=>toast('إرفاق الملفات غير مفعّل في النسخة المحلية'));
  $('#toolsButton').addEventListener('click',()=>toast('الأدوات ستُضاف عند توصيل الخدمات'));
  $('#profileButton').addEventListener('click',()=>toast('هذه مساحة تجريبية محلية'));
  $('#searchChats').addEventListener('input',e=>{const q=e.target.value.trim();let found=0;document.querySelectorAll('.history-item').forEach(row=>{const yes=row.textContent.toLowerCase().includes(q.toLowerCase());row.hidden=!yes;if(yes)found++;});if(q&&!found)toast('لا توجد محادثات مطابقة');});
  $('#clearSearch').addEventListener('click',()=>{$('#searchChats').value='';document.querySelectorAll('.history-item').forEach(row=>row.hidden=false);});
  document.querySelectorAll('.history-item').forEach(row=>row.addEventListener('click',()=>{document.querySelectorAll('.history-item').forEach(x=>x.classList.remove('selected'));row.classList.add('selected');toast('هذه محادثة تجريبية');$('#sidebar').classList.remove('open');}));
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#newChat').click();}if(e.key==='Escape'){$('#sidebar').classList.remove('open');modelMenu.classList.add('hidden');}});
})();