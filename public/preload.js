const { contextBridge, ipcRenderer } = require("electron");

async function exitApp() {
  ipcRenderer.send("closeApp");
}
async function getFolder() {
  return await ipcRenderer.invoke("selectDirectory");
}
async function getFile() {
  return await ipcRenderer.invoke("selectFile");
}
async function getFileCount(path) {
  return await ipcRenderer.invoke("getFileCount", path);
}

let electronBridge = {
  getFolder: getFolder,
  getFile: getFile,
  getFileCount: getFileCount,
  exitApp: exitApp
};


contextBridge.exposeInMainWorld("electronAPI", electronBridge);
