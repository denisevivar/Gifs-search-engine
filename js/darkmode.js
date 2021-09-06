darkBtn.addEventListener('click', switchSheet)
lightBtn.addEventListener('click', switchSheet)
lightBtn.addEventListener('click', changeToLightMode)

function changeToLightMode() { 
    lightBtn.classList.replace('lightmode-off','light-mode-btn')
    darkBtn.classList.replace('darkmode-on','dark-mode-btn')
}

function switchSheet() {
    theme.getAttribute("href") == "/light-mode.css" ?
      theme.href = "/dark-mode.css" :
      theme.href = "/light-mode.css" 
    }