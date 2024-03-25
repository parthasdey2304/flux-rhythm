const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const reload = require('electron-reload');

reload(__dirname);

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1000,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, "preload.js")
		}
	});

	win.loadFile('templates/loading.html');
}

app.whenReady().then(() => {
	createWindow();
})

console.log("Electron app is running...");
