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
    console.log(time);
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
    console.log(fileCount);
  }
  return (
    <section className="flex flex-col h-screen justify-center">
      <div className="h-[500px] w-[500px] mx-auto rounded-lg border border-sborder border-2 bg-mainbg flex flex-col gap-10 justify-around">
        <h1 className="text-5xl text-white text-center poppins semibold py-8">
          Bingo Maker
        </h1>
        <div>
          <div className="flex items-center justify-center m-4">
            <h1 className="w-[100px] rounded-l-lg text-white bg-blue-600 p-2 h-10 indent-2">
              Folder
            </h1>
            <input
              type="text"
              readOnly
              value={folderPath}
              onClick={handleDirSelection}
              className="hover:cursor-pointer border text-sm block w-[300px] p-2 h-10  bg-extracontent border-border placeholder-gray-400 text-black hover:bg-extra"
              placeholder="Options Folder"
            />
            <button
              className="px-5 p-2 h-10  rounded-r-lg bg-blue-600 text-white font-semibold"
              onClick={() => updateShowModal(!showModal)}
            >
              ?
            </button>
          </div>
          <div className="flex items-center justify-center m-4">
            <h1 className="w-[200px] rounded-l-lg text-white bg-blue-600 p-2 h-10 indent-2">
              Time Between Card
            </h1>
            <input
              type="number"
              value={time}
              onChange={() => handleTimeChange(event)}
              className="hover:cursor-pointer border text-sm block w-[200px] p-2 h-10  bg-extracontent border-border placeholder-gray-400 text-black hover:bg-extra"
              placeholder="Time For Lap"
            />
            <button
              className="px-5 p-2 h-10  rounded-r-lg bg-blue-600 text-white font-semibold"
              onClick={() => updateShowModal(!showModal)}
            >
              ?
            </button>
          </div>
        </div>

        <div className="m-4 flex items-center flex-col">
          {folderPath == "" ? (
            <button
              disabled
              className="px-10 py-3 bg-gray-400 rounded-lg text-white semibold poppins"
            >
              Start
            </button>
          ) : (
            <a
              className="px-10 py-3 bg-blue-600 rounded-lg text-white semibold poppins hover:bg-blue-500"
              href="#/counter"
            >
              Start
            </a>
          )}
        </div>
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
