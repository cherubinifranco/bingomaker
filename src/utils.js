export function getRandomInt(min, max) {
  return Math.floor(Math.random() * max + min);
}

export async function getDir() {
  const folderPath = await window.electronAPI.getFolder();
  if (folderPath == undefined) return "";
  return folderPath;
}

export async function getFile() {
  const filePath = await window.electronAPI.getFile();
  if (filePath == undefined) return "";
  return filePath;
}

export async function getFileCount(path) {
  const fileCount = await window.electronAPI.getFileCount(path);
  return fileCount;
}

export function generateUniqueCombination(
  valuesArray,
  numberOfCombinations,
  arrayLength
) {
  const allCombinations = generateSortedUniqueCombinations(
    valuesArray,
    arrayLength
  );
  const subset = shuffle(allCombinations);
  return subset.slice(0, numberOfCombinations);
}

function generateSortedUniqueCombinations(Z, k) {
  const results = [];
  function backtrack(start, combo) {
    if (combo.length === k) {
      results.push([...combo]);
      return;
    }

    for (let i = start; i < Z.length; i++) {
      combo.push(Z[i]);
      backtrack(i + 1, combo);
      combo.pop();
    }
  }

  backtrack(0, []);
  return results;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
