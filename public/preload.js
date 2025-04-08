const { contextBridge, ipcRenderer } = require("electron");

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
  getFileCount: getFileCount
};


contextBridge.exposeInMainWorld("electronAPI", electronBridge);
