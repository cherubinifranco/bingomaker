import { useState } from "react";
import { getFile } from "../utils";
export default function ConfigurationPage() {
  const [soundState, updateSoundState] = useState(
    JSON.parse(localStorage.getItem("soundState")) ?? true
  );
  const [trackWinnerState, updateTrackWinnerState] = useState(
    JSON.parse(localStorage.getItem("trackingState")) ?? false
  );
  const [lapSound, updateLapSound] = useState(
    localStorage.getItem("lapSoundRoute") ?? ""
  );
  const [restartSound, updateRestartSound] = useState(
    localStorage.getItem("restartSoundRoute") ?? ""
  );
  const [winnerSound, updateWinnerSound] = useState(
    localStorage.getItem("winnerSoundRoute") ?? ""
  );

  function clear(callback) {
    const value = "";
    if (callback == "lapSoundRoute") {
      localStorage.setItem("lapSoundRoute", value);
      updateLapSound(value);
    }
    if (callback == "restartSoundRoute") {
      localStorage.setItem("restartSoundRoute", value);
      updateRestartSound(value);
    }
    if (callback == "winnerSoundRoute") {
      localStorage.setItem("winnerSoundRoute", value);
      updateWinnerSound(value);
    }
  }

  async function handleFile(callback) {
    let value = await getFile();
    value = value.split(".");
    if (value[1] != "mp3") {
        alert("Sound Files must be mp3")
      value = "";
    }
    if (callback == "lapSoundRoute") {
      localStorage.setItem("lapSoundRoute", value);
      updateLapSound(value);
    }
    if (callback == "restartSoundRoute") {
      localStorage.setItem("restartSoundRoute", value);
      updateRestartSound(value);
    }
    if (callback == "winnerSoundRoute") {
      localStorage.setItem("winnerSoundRoute", value);
      updateWinnerSound(value);
    }
  }

  function handleSoundState() {
    updateSoundState(!soundState);
    localStorage.setItem("soundState", JSON.stringify(!soundState));
  }

  function handleTrackWinnerState() {
    updateTrackWinnerState(!trackWinnerState);
    localStorage.setItem("trackingState", JSON.stringify(!trackWinnerState));
  }
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="p-4 ml-4 gap-4 text-accent1hover">
        <a href="#/">Home</a>
      </div>
      {/* Menu for sheets */}

      <article className="py-4 bg-mainbg rounded-lg m-4">
        <div className="flex flex-row justify-between items-center pr-8">
          <label
            className="inline-block ps-[0.15rem] indent-4 hover:cursor-pointer w-36 text-nowrap pr-4 select-none"
            htmlFor="soundState"
          >
            Play Sounds
          </label>
          <div className="h-[1px] bg-slate-700 w-full"></div>
          <div className="pl-8">
            <input
              readOnly
              className="rounded-lg me-2 mt-[0.3rem] h-3.5 w-8 relative appearance-none rounded-[0.4375rem] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-accent2 after:shadow-switch-2 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ms-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-accent1 checked:after:shadow-switch-1 checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-switch-3 focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:before:ms-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-switch-3 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] bg-white/25 after:bg-surface-dark checked:bg-primary checked:after:bg-primary"
              type="checkbox"
              role="switch"
              id="soundState"
              onClick={handleSoundState}
              checked={soundState}
            />
          </div>
        </div>
      </article>

      <article className="py-4 bg-mainbg rounded-lg m-4">
        <div className="flex flex-row justify-between items-center pr-8">
          <label
            className="inline-block ps-[0.15rem] indent-4 hover:cursor-pointer w-36 text-nowrap pr-4 select-none"
            htmlFor="trackWinnerState"
          >
            Track Winner
          </label>
          <div className="h-[1px] bg-slate-700 w-full"></div>
          <div className="pl-8">
            <input
              readOnly
              className="rounded-lg me-2 mt-[0.3rem] h-3.5 w-8 relative appearance-none rounded-[0.4375rem] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-accent2 after:shadow-switch-2 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ms-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-accent1 checked:after:shadow-switch-1 checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-switch-3 focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:before:ms-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-switch-3 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] bg-white/25 after:bg-surface-dark checked:bg-primary checked:after:bg-primary"
              type="checkbox"
              role="switch"
              id="trackWinnerState"
              onClick={handleTrackWinnerState}
              checked={trackWinnerState}
            />
          </div>
        </div>
      </article>

      <article className="py-4 bg-mainbg rounded-lg m-4">
        <div className="flex flex-row">
          <label htmlFor="lapSound" className="indent-4 w-52">
            Lap Sound File
          </label>
          <input
            type="text"
            id="lapSound"
            className="mx-4 w-full bg-mainbg cursor-pointer"
            readOnly
            value={lapSound}
            onClick={() => handleFile("lapSoundRoute")}
          />
          <button
            onClick={() => clear("lapSoundRoute")}
            className="w-10 rounded-lg text-center hover:bg-red-400 mx-4"
          >
            X
          </button>
        </div>
      </article>

      <article className="py-4 bg-mainbg rounded-lg m-4">
        <div className="flex flex-row">
          <label htmlFor="lapSound" className="indent-4 w-52">
            Restart Sound File
          </label>
          <input
            type="text"
            id="lapSound"
            className="mx-4 w-full bg-mainbg cursor-pointer"
            readOnly
            value={restartSound}
            onClick={() => handleFile("restartSoundRoute")}
          />
          <button
            onClick={() => clear("restartSoundRoute")}
            className="w-10 rounded-lg text-center hover:bg-red-400 mx-4"
          >
            X
          </button>
        </div>
      </article>

      <article className="py-4 bg-mainbg rounded-lg m-4">
        <div className="flex flex-row">
          <label htmlFor="lapSound" className="indent-4 w-52">
            Winner Sound File
          </label>
          <input
            type="text"
            id="lapSound"
            className="mx-4 w-full bg-mainbg cursor-pointer"
            readOnly
            value={winnerSound}
            onClick={() => handleFile("winnerSoundRoute")}
          />
          <button
            onClick={() => clear("winnerSoundRoute")}
            className="w-10 rounded-lg text-center hover:bg-red-400 mx-4"
          >
            X
          </button>
        </div>
      </article>
    </div>
  );
}
