import { useEffect, useState } from "react";
import Modal from "../components/modal";
import { getDir, getFileCount } from "../utils";

export default function IndexPage() {
  const [showModal, updateShowModal] = useState(false);
  const [time, updateTimeChange] = useState(
    localStorage.getItem("timeForLap") || 5
  );
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
          <input
            type="text"
            readOnly
            value={folderPath}
            onClick={handleDirSelection}
            className="hover:cursor-pointer text-sm block w-full p-2 h-10 bg-extracontent placeholder-black hover:bg-extra  bg-mainbg indent-2 border border-sborder border-2 rounded-l-lg"
            placeholder="Assets Folder"
          />
          <input
            type="number"
            value={time}
            onChange={() => handleTimeChange(event)}
            className="hover:cursor-pointer text-sm  block w-[110px] p-2 h-10 bg-mainbg placeholder-black text-center indent-4 border-sborder border-y-2"
            placeholder="Lap Time"
          />
          <button
            className="px-5 p-2 h-10 rounded-r-lg  bg-accent1 border-2 border-accent1hover hover:bg-accent1hover"
            onClick={() => updateShowModal(!showModal)}
          >
            ?
          </button>
        </div>
      </div>

      <div className="m-4 flex items-center flex-row justify-center gap-10">
        {!folderPath || !time ? (
          <button
            disabled
            className="px-10 py-3 bg-gray-400 rounded-lg text-white semibold poppins"
          >
            Start
          </button>
        ) : (
          <a
            className="px-10 py-3 bg-accent1 rounded-lg text-white semibold poppins hover:bg-accent1hover border-2 border-accent1hover"
            href="#/counter"
          >
            Start
          </a>
        )}
        {folderPath == "" ? (
          <button
            disabled
            className="px-10 py-3 bg-gray-400 rounded-lg text-white semibold poppins"
          >
            Create Sheets
          </button>
        ) : (
          <a
            className="px-10 py-3 bg-accent2  rounded-lg text-white semibold poppins hover:bg-accent2hover  border-2 border-accent2hover"
            href="#/sheets"
          >
            Create Sheets
          </a>
        )}
      </div>
      {showModal ? (
        <Modal
          title="Tile"
          note="No olvides cargar el archivo XLSX"
          onExit={updateShowModal}
        >
          <div className="p-4 bg-mainbg">
            <ul className="list-disc p-3">
              <li className="m-2 text-pretty">
                <h1 className="font-medium">Cargar las variables</h1>
                <p>
                  Al seleccionarse un archivo XLSX se carga la primera fila como
                  titulos para utilizar en el momento de enviar mensajes
                </p>
                <img className="p-2" src="./assets/xlsxHelp.png" alt="Help" />
                <p>
                  En este caso se carga: "ID", "Nombre", "Apellido", "Mail" y
                  "sin valor"
                </p>
                <p>Tambien se carga la segunda fila como valores de muestra.</p>
              </li>
              <li className="m-2 py-2 text-pretty">
                <h1 className="font-medium">Utilizar las variables</h1>
                <p>
                  Al momento de escribir el mail, si se quiere usar el contenido
                  de una columna se debe ingresar el nombre de la misma entre{" "}
                  {"{}"}.
                </p>
                <p>
                  En este caso se podría utilizar {"{ID}"} y cuando se envie el
                  primer mail se cambiaría por "111", el segundo mail por "222"
                  y así continuamente.
                </p>
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
