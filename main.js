const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
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
