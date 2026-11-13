(() => {
 const $=s=>document.querySelector(s);
 const input=$('#promptInput'), form=$('#chatForm'), messages=$('#messages'), welcome=$('#welcome'), sidebar=$('#sidebar'), scrim=$('#scrim'), menu=$('#modelMenu'), modelButton=$('#inlineModel');
 
 let selectedModel='Pix Smart';
 const root=document.documentElement;
 
 // Preferences
 const prefs=(()=>{try{return JSON.parse(localStorage.getItem('pix-preferences')||'{}')}catch{return {}}})();
 let themeChoice=prefs.theme||'dark', fontSize=Number(prefs.fontSize)||14, enterSend=prefs.enterSend!==false;
 const savePrefs=()=>{try{localStorage.setItem('pix-preferences',JSON.stringify({theme:themeChoice,fontSize,enterSend}))}catch{}};
 
 // Theme & Font
 const applyTheme=()=>{
   const dark=themeChoice==='system'?matchMedia('(prefers-color-scheme: dark)').matches:themeChoice==='dark';
   root.dataset.theme=dark?'dark':'light';
   const metaTheme = document.querySelector('meta[name="theme-color"]');
   if(metaTheme) metaTheme.content=dark?'#28251f':'#f2eee4';
   document.querySelectorAll('[data-theme-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeChoice===themeChoice)))
 };
 const applyFont=()=>{
   root.dataset.chatFont=String(fontSize);
   const fsSetting = $('#fontSizeSetting');
   const fsValue = $('#fontSizeValue');
   if(fsSetting) fsSetting.value=fontSize;
   if(fsValue) fsValue.textContent=fontSize+'px';
 };
 applyTheme(); applyFont();

 // Settings Panel
 const settingsPanel=$('#settingsPanel'), settingsBackdrop=$('#settingsBackdrop');
 const openSettings=()=>{
   closeSidebar();
   if(settingsPanel && settingsBackdrop){
     settingsPanel.classList.add('open'); settingsBackdrop.classList.add('open');
     settingsPanel.setAttribute('aria-hidden','false'); settingsBackdrop.setAttribute('aria-hidden','false');
     const enterSendSetting = $('#enterSendSetting'); if(enterSendSetting) enterSendSetting.checked=enterSend;
     const fsSetting = $('#fontSizeSetting'); if(fsSetting) fsSetting.value=fontSize;
     const closeSettingsBtn = $('#closeSettings'); if(closeSettingsBtn) closeSettingsBtn.focus();
   }
 };
 const closeSettings=()=>{
   if(settingsPanel && settingsBackdrop){
     settingsPanel.classList.remove('open'); settingsBackdrop.classList.remove('open');
     settingsPanel.setAttribute('aria-hidden','true'); settingsBackdrop.setAttribute('aria-hidden','true');
   }
 };
 
 $('#openSettings')?.addEventListener('click',openSettings);
 $('#closeSettings')?.addEventListener('click',closeSettings);
 settingsBackdrop?.addEventListener('click',closeSettings);
 
 document.querySelectorAll('[data-theme-choice]').forEach(b=>b.addEventListener('click',()=>{themeChoice=b.dataset.themeChoice;applyTheme();savePrefs()}));
 $('#fontSizeSetting')?.addEventListener('input',e=>{fontSize=Number(e.target.value);applyFont();savePrefs()});
 $('#enterSendSetting')?.addEventListener('change',e=>{enterSend=e.target.checked;savePrefs()});
 if(themeChoice==='system')matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',applyTheme);

 // Helpers
 const toast=t=>{const el=$('#toast');if(!el)return;el.textContent=t;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2100)};
 const fit=()=>{if(!input)return;input.style.height='auto';input.style.height=Math.min(input.scrollHeight,180)+'px'};
 
 // Sidebar Functions
 const closeSidebar=()=>{
   if(sidebar) {
     sidebar.classList.remove('open');
     sidebar.style.transform = ''; // Reset inline styles from swipe
   }
   if(scrim) scrim.classList.remove('show');
 };
 const openSidebar=()=>{
   if(sidebar) {
     sidebar.classList.add('open');
     sidebar.style.transform = '';
   }
   if(scrim) scrim.classList.add('show');
 };
 
 // Model Menu
 const closeModelMenu=()=>{if(menu&&modelButton){menu.classList.add('hidden');modelButton.setAttribute('aria-expanded','false')}};
 const toggleModelMenu=()=>{
   if(!menu||!modelButton) return;
   const opening=menu.classList.contains('hidden');
   menu.classList.toggle('hidden',!opening);
   modelButton.setAttribute('aria-expanded',String(opening))
 };

 // Messages
 const addMessage=(text,who)=>{
   if(!messages) return;
   const item=document.createElement('article');item.className='message '+who;
   const body=document.createElement('div');body.className='message-body';
   if(who==='assistant'){const label=document.createElement('div');label.className='message-label';label.textContent='Pix';body.append(label)}
   const content=document.createElement('div');content.className='message-content';content.textContent=text;body.append(content);
   if(who==='assistant'){const note=document.createElement('div');note.className='message-disclaimer';note.textContent='قد يقدم Pix معلومات غير دقيقة. تحقق من المعلومات المهمة.';body.append(note)}
   item.append(body);messages.append(item);item.scrollIntoView({behavior:'smooth',block:'nearest'})
 };
 const send=text=>{
   if(!input) return;
   const value=(text||input.value).trim();if(!value)return;
   if(welcome) welcome.hidden=true;
   addMessage(value,'user');
   input.value='';fit();closeModelMenu();
   setTimeout(()=>addMessage('واجهة العرض المحلية استلمت رسالتك. ربط نموذج الذكاء الاصطناعي يحتاج إلى توصيل Backend منفصل.','assistant'),350)
 };

 // Forms & Inputs
 form?.addEventListener('submit',e=>{e.preventDefault();send()});
 input?.addEventListener('input',fit);
 input?.addEventListener('keydown',e=>{if(e.key==='Enter'&&enterSend&&!e.shiftKey&&!e.isComposing){e.preventDefault();send()}});
 
 // New Chat
 $('#newChat')?.addEventListener('click',()=>{
   if(messages) messages.replaceChildren();
   if(welcome) welcome.hidden=false;
   if(input) { input.value=''; fit(); }
   closeSidebar();closeModelMenu();
   input?.focus();
 });

 // File Attachment
 const fileInput=$('#fileInput'), attachmentPreview=$('#attachmentPreview');
 $('#attachButton')?.addEventListener('click',()=>fileInput?.click());
 fileInput?.addEventListener('change',()=>{
   if(!attachmentPreview) return;
   const files=[...fileInput.files];
   attachmentPreview.replaceChildren();
   files.forEach(file=>{const chip=document.createElement('span');chip.className='attachment-chip';chip.textContent=file.name;attachmentPreview.append(chip)});
   attachmentPreview.hidden=!files.length
 });

 // Tools Menu
 const toolsButton=$('#toolsButton'), toolsMenu=$('#toolsMenu');
 toolsButton?.addEventListener('click',e=>{e.stopPropagation();toolsMenu?.classList.toggle('hidden')});
 toolsMenu?.addEventListener('click',e=>{
   const b=e.target.closest('[data-tool]');if(!b)return;
   toast('تم اختيار: '+b.dataset.tool);toolsMenu.classList.add('hidden')
 });

 // Open/Close Sidebar Buttons
 $('#openSidebar')?.addEventListener('click',openSidebar);
 scrim?.addEventListener('click',closeSidebar);

 // ==========================================
 // Swipe to Close Sidebar (Touch)
 // ==========================================
 let touchStartX = 0;
 let touchStartY = 0;
 let isSwiping = false;

 sidebar?.addEventListener('touchstart', (e) => {
   touchStartX = e.touches[0].clientX;
   touchStartY = e.touches[0].clientY;
   isSwiping = false;
   if(sidebar) sidebar.style.transition = 'none'; 
 }, { passive: true });

 sidebar?.addEventListener('touchmove', (e) => {
   if (!touchStartX) return;
   const currentX = e.touches[0].clientX;
   const currentY = e.touches[0].clientY;
   const deltaX = currentX - touchStartX;
   const deltaY = currentY - touchStartY;

   // Check if horizontal swipe (right)
   if (!isSwiping) {
     if (deltaX > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
       isSwiping = true;
     }
   }

   if (isSwiping) {
     e.preventDefault(); // Prevent scrolling while swiping
     const moveX = Math.max(0, deltaX); 
     if(sidebar) sidebar.style.transform = `translateX(${moveX}px)`;
   }
 }, { passive: false });

 sidebar?.addEventListener('touchend', (e) => {
   if(sidebar) sidebar.style.transition = ''; 
   
   if (!isSwiping) return;

   const currentX = e.changedTouches[0].clientX;
   const deltaX = currentX - touchStartX;
   const threshold = sidebar ? sidebar.offsetWidth * 0.3 : 80;

   // If swiped enough, close. Else snap back.
   if (deltaX > 80 || deltaX > threshold) {
     closeSidebar();
   } else {
     if(sidebar) sidebar.style.transform = 'translateX(0)';
   }
   
   touchStartX = 0;
   touchStartY = 0;
   isSwiping = false;
 });
 // ==========================================

 // Model Selection
 modelButton?.addEventListener('click',e=>{e.stopPropagation();toggleModelMenu()});
 menu?.addEventListener('click',e=>{
   const b=e.target.closest('[data-model]');if(!b)return;
   selectedModel=b.dataset.model;
   const inlineName = $('#inlineModelName'); if(inlineName) inlineName.textContent=selectedModel;
   menu.querySelectorAll('.check').forEach(el=>el.innerHTML='');
   const active=menu.querySelector('[data-model="'+selectedModel+'"] .check');
   if(active && window.PixIcons) active.innerHTML=PixIcons.render('check',16);
   closeModelMenu()
 });

 // Global Click & Keydown handlers
 document.addEventListener('click',e=>{
   if(!e.target.closest('#modelMenu')&&!e.target.closest('#inlineModel'))closeModelMenu();
   if(!e.target.closest('#toolsMenu')&&!e.target.closest('#toolsButton'))toolsMenu?.classList.add('hidden')
 });
 document.querySelectorAll('.history-item').forEach(row=>row.addEventListener('click',()=>{
   document.querySelectorAll('.history-item').forEach(x=>x.classList.remove('selected'));
   row.classList.add('selected');closeSidebar();toast('محادثة تجريبية')
 }));
 document.addEventListener('keydown',e=>{
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#newChat')?.click()}
   if(e.key==='Escape'){closeSidebar();closeModelMenu();closeSettings()}
 });
})();