const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
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
    title: "Poke Bingo",
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

  if(dev){
    mainWindow.webContents.openDevTools()
  }
  mainWindow.loadURL(windowURL);
  mainWindow.removeMenu();

  ipcMain.handle("selectDirectory", async function () {
    let dir = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
    });

    return dir.filePaths[0];
  });

  ipcMain.handle("selectFile", async function () {
    let file = await dialog.showOpenDialog(win, {
      properties: ["openFile"],
    });

    return file.filePaths[0];
  });
}

app.whenReady().then(() => {
  app.setAppUserModelId("Poke Bingo");
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
