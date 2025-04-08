export function getRandomInt(min, max) {
  return Math.floor(Math.random() * max + min);
}

export async function getDir() {
  const folderPath = await window.electronAPI.getFolder();
  if (folderPath == undefined) return "";
  return folderPath;
}

export async function getFileCount(path) {
  const fileCount = await window.electronAPI.getFileCount(path);
  return fileCount;
}
