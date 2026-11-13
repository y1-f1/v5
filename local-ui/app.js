(() => {
  // تفعيل أيقونات Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const $=s=>document.querySelector(s),input=$('#promptInput'),form=$('#chatForm'),messages=$('#messages'),welcome=$('#welcome'),sidebar=$('#sidebar'),scrim=$('#scrim'),menu=$('#modelMenu'),modelButton=$('#inlineModel');
  let selectedModel='Pix Smart';
  const root=document.documentElement;
  const prefs=(()=>{try{return JSON.parse(localStorage.getItem('pix-preferences')||'{}')}catch{return {}}})();
  let themeChoice=prefs.theme||'dark',fontSize=Number(prefs.fontSize)||14,enterSend=prefs.enterSend!==false;
  const savePrefs=()=>{try{localStorage.setItem('pix-preferences',JSON.stringify({theme:themeChoice,fontSize,enterSend}))}catch{}};
  const applyTheme=()=>{const dark=themeChoice==='system'?matchMedia('(prefers-color-scheme: dark)').matches:themeChoice==='dark';root.dataset.theme=dark?'dark':'light';document.querySelector('meta[name="theme-color"]').content=dark?'#28251f':'#f2eee4';document.querySelectorAll('[data-theme-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeChoice===themeChoice)))};
  const applyFont=()=>{root.dataset.chatFont=String(fontSize);$('#fontSizeSetting').value=fontSize;$('#fontSizeValue').textContent=fontSize+'px'};
  applyTheme();applyFont();
  const settingsPanel=$('#settingsPanel'),settingsBackdrop=$('#settingsBackdrop');
  const openSettings=()=>{closeSidebar();settingsPanel.classList.add('open');settingsBackdrop.classList.add('open');settingsPanel.setAttribute('aria-hidden','false');settingsBackdrop.setAttribute('aria-hidden','false');$('#enterSendSetting').checked=enterSend;$('#fontSizeSetting').value=fontSize;$('#fontSizeValue').textContent=fontSize+'px';$('#closeSettings').focus()};
  const closeSettings=()=>{settingsPanel.classList.remove('open');settingsBackdrop.classList.remove('open');settingsPanel.setAttribute('aria-hidden','true');settingsBackdrop.setAttribute('aria-hidden','true')};
  $('#openSettings').addEventListener('click',openSettings);$('#closeSettings').addEventListener('click',closeSettings);settingsBackdrop.addEventListener('click',closeSettings);
  document.querySelectorAll('[data-theme-choice]').forEach(b=>b.addEventListener('click',()=>{themeChoice=b.dataset.themeChoice;applyTheme();savePrefs()}));
  $('#fontSizeSetting').addEventListener('input',e=>{fontSize=Number(e.target.value);applyFont();savePrefs()});
  $('#enterSendSetting').addEventListener('change',e=>{enterSend=e.target.checked;savePrefs()});
  if(themeChoice==='system')matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',applyTheme);
  const toast=t=>{const el=$('#toast');el.textContent=t;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2100)};
  const fit=()=>{input.style.height='auto';input.style.height=Math.min(input.scrollHeight,180)+'px'};
  const closeSidebar=()=>{sidebar.classList.remove('open');scrim.classList.remove('show')};
  const openSidebar=()=>{sidebar.classList.add('open');scrim.classList.add('show')};
  const closeModelMenu=()=>{menu.classList.add('hidden');modelButton.setAttribute('aria-expanded','false')};
  // ... (باقي الكود الأصلي لـ app.js يبقى كما هو)
})();