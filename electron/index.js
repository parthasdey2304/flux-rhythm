const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.loadURL('http://localhost:5173'); // Load the local server URL
}

app.whenReady().then(() => {
    const reload = require('electron-reload');
    reload(__dirname);

    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

console.log("Electron app is running...");
