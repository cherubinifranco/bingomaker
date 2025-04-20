import { useEffect, useState } from "react";
import Modal from "../components/modal";
import { exitApp, getDir, getFileCount } from "../utils";

export default function IndexPage() {
  const [showModal, updateShowModal] = useState(false);
  const [time, updateTimeChange] = useState(localStorage.getItem("timeForLap") || 5);
  const [folderPath, updateFolderPath] = useState("");
  useEffect(() => {
    updateFolderPath(localStorage.getItem("folder") || "");
  }, []);

  function handleTimeChange(event) {
    const time = event.target.value;
    localStorage.setItem("timeForLap", time);
    updateTimeChange(time);
  }
  async function handleDirSelection() {
    const dir = await getDir();
    updateFolderPath(dir);

    localStorage.setItem("folder", dir);
    if (dir == "") return;
    const fileCount = await getFileCount(dir);
    localStorage.setItem("counter", fileCount.length);
    localStorage.setItem("bingoArray", JSON.stringify(fileCount));
  }
  return (
    <section className="flex flex-col h-screen justify-end pb-20 bingobg">
      <div className="w-[600px] mx-auto rounded-lg bg-mainbg flex flex-col gap-10 justify-around">
        <div className="flex items-center justify-center text-white font-semibold text-shadow-lg/30">
          <input type="text" readOnly value={folderPath} onClick={handleDirSelection} className="hover:cursor-pointer text-sm block w-full p-2 h-10 bg-extracontent placeholder-white hover:bg-extra  bg-mainbg indent-2 border border-sborder border-2 rounded-l-lg" placeholder="Assets Folder" />
          <input type="number" value={time} onChange={() => handleTimeChange(event)} className="hover:cursor-pointer text-sm  block w-[110px] p-2 h-10 bg-mainbg placeholder-black text-center indent-4 border-sborder border-y-2" placeholder="Lap Time" />
          <button className="px-5 p-2 h-10 rounded-r-lg  bg-accent1 border-2 border-accent1hover hover:bg-accent1hover" onClick={() => updateShowModal(!showModal)}>
            ?
          </button>
        </div>
      </div>

      <div className="m-4 flex items-center flex-row justify-center gap-10">
        {!folderPath || !time ? (
          <button disabled className="px-10 py-3 bg-gray-400 rounded-lg text-white semibold poppins">
            Start
          </button>
        ) : (
          <a className="px-10 py-3 bg-accent1 rounded-lg text-white semibold poppins hover:bg-accent1hover border-2 border-accent1hover" href="#/counter">
            Start
          </a>
        )}
        {folderPath == "" ? (
          <button disabled className="px-10 py-3 bg-gray-400 rounded-lg text-white semibold poppins">
            Create Sheets
          </button>
        ) : (
          <a className="px-10 py-3 bg-accent1  rounded-lg text-white semibold poppins hover:bg-accent1hover  border-2 border-accent1hover" href="#/sheets">
            Create Sheets
          </a>
        )}
        <a href="#/configuration" className="px-10 py-3 bg-accent1 rounded-lg text-white semibold poppins border-2 border-accent1hover hover:bg-accent1hover">
          Config
        </a>
        <button className="px-10 py-3 bg-accent2  rounded-lg text-white semibold poppins hover:bg-accent2hover  border-2 border-accent2hover" onClick={exitApp}>
          Exit
        </button>
      </div>
      {showModal ? (
        <Modal title="How to load the game" note="" onExit={updateShowModal}>
          <div className="p-4">
            <ul className="list-disc p-3">
              <li className="m-2 text-pretty">
                <h1 className="font-medium">Selected folder</h1>
                <p>The selected folder is what manages the options for the bingo</p>
                <img className="p-2 mx-auto" src="../assets/exp1.png" alt="Help" />
                <p>In this case the options are 3: Arbok, Charizard and Pikachu</p>
              </li>
              <li className="m-2 py-2 text-pretty">
                <h1 className="font-medium">Content of each folder</h1>
                <img className="p-2 mx-auto" src="../assets/exp2.png" alt="Help" />
                <p>Each folder can contain multiple PNG cards with numbered names to add variety when displaying the selected value.</p>
                <p>
                  The 0.png card will always be used when displaying previously selected values.
                </p>
              </li>
              <li className="m-2 py-2 text-pretty">
                <h1 className="font-medium">Keeping track of the winner</h1>
                <p>This option, found in the configuration tab, enables the game to automatically restart after displaying the winner sheet when a winner is detected in the created sheets</p>
              </li>
            </ul>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
}
