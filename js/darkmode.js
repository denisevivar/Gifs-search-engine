darkBtn.addEventListener('click', switchSheet)
lightBtn.addEventListener('click', switchSheet)
lightBtn.addEventListener('click', changeToLightMode)

function changeToLightMode() { 
    lightBtn.classList.replace('lightmode-off','light-mode-btn')
    darkBtn.classList.replace('darkmode-on','dark-mode-btn')
}

function switchSheet() {
    if (theme.getAttribute("href") == "/light-mode.css") {
      theme.href = "/dark-mode.css";
    } else {
      theme.href = "/light-mode.css";
    }
  }