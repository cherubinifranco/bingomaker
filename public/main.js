const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { Notification } = require("electron");

const { autoUpdater } = require("electron-updater");

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let mainWindow;
let dev = true;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    minHeight: 650,
    minWidth: 800,
    frame: true,
    title: "Bingo Maker",
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, "/preload.js"),
      devTools: true,
      nodeIntegration: true,
      contextIsolation: true,
    },
  });
  const windowURL = dev
    ? "http://localhost:3000/"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  if (dev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.loadURL(windowURL);
  mainWindow.removeMenu();
  mainWindow.setFullScreen(!dev);

  ipcMain.handle("selectDirectory", async function () {
    let dir = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    });

    return dir.filePaths[0];
  });

  ipcMain.handle("selectFile", async function () {
    let file = await dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"],
    });

    return file.filePaths[0];
  });

  ipcMain.handle("getFileCount", async function (event, path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });
  });
}

app.whenReady().then(() => {
  app.setAppUserModelId("Bingo Maker");
  createWindow();
  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, "3000");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

autoUpdater.on("update-available", (info) => {
  autoUpdater.downloadUpdate();
});

autoUpdater.on("update-not-available", (info) => {
  console.log(info);
});

autoUpdater.on("update-downloaded", (info) => {
  mainWindow.send("updateDownloaded");
  showNotification(
    "New version Availble",
    "The new version has been downloaded. Restart to see changes"
  );
});

autoUpdater.on("error", (info) => {
  console.log(info);
});

function showNotification(title, body) {
  new Notification({
    title: title,
    body: body,
    icon: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  }).show();
}
