const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { spawn } = require('child_process');

let mainWindow;
let serverProcess;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Load the React app served by the Express server
    mainWindow.loadURL('http://localhost:3000'); // Ensure this matches your Express server port

    mainWindow.on('closed', () => {
        mainWindow = null;
        if (serverProcess) {
            serverProcess.kill();
        }
    });
};

app.whenReady().then(() => {
    // Start the Express server
    serverProcess = spawn('node', [path.join(__dirname, '../server/index.js')]);

    serverProcess.stdout.on('data', (data) => {
        console.log(`server: ${data}`);
        if (data.toString().includes('API server is running')) {
            createWindow();
        }
    });

    serverProcess.stderr.on('data', (data) => {
        console.error(`server error: ${data}`);
    });

    serverProcess.on('close', (code) => {
        console.log(`server process exited with code ${code}`);
    });

    // Electron reload setup
    const reload = require('electron-reload');
    reload(__dirname);
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

console.log('Electron app is running...');
