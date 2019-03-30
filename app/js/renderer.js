//renderer.js
const { ipcRenderer, shell } = require('electron');

let linkSobre = document.querySelector('#link-sobre');

linkSobre.addEventListener('click', function() {
  ipcRenderer.send('abrir-janela-sobre');
});

let linkTwitter = document.querySelector('#link-twitter');

linkTwitter.addEventListener('click', function() {
  shell.openExternal('https://www.twitter.com/angeliski_');
});

let versaoElectron = document.querySelector('#versao-electron');
window.onload = function() {
  versaoElectron.textContent = process.versions.electron;
};

ipcRenderer.on('atalho-global-a', () => {
  new Notification('Electron Testes!', {
    body: `O Atalho foi acionado`,
    icon: 'icon-tray.png'
  });
});
