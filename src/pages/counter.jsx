import Modal from "../components/modal";
import { useEffect, useState } from "react";
import { getFileCount, getRandomInt } from "../utils";

export default function CounterPage() {
  const [showModal, updateShowModal] = useState(false);
  const [bingoSheets, updateBingoSheets] = useState(
    JSON.parse(localStorage.getItem("bingoSheets")) ?? []
  );
  const [winnerSheet, updateWS] = useState();
  const [filteredValueList, updateFilteredList] = useState([]);
  const [chosenValue, updateChosenValue] = useState("");
  const [cardVariation, updateCardVariation] = useState(1);
  const [lastValues, updateLastValues] = useState([]);
  const [playing, setPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const seconds = localStorage.getItem("timeForLap");
  const bingoArray = JSON.parse(localStorage.getItem("bingoArray"));
  const folder = localStorage.getItem("folder");
  useEffect(() => {
    updateFilteredList(bingoArray);
    const firstValue = pickValue();
    updateChosenValue(firstValue);
  }, []);

  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        const updated = prev + 0.1;

        if (updated > seconds) {
          onLap();
          return -0.1;
        }
        return updated;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [playing, chosenValue, filteredValueList]);

  function includesAll(arr, values) {
    return values.every((v) => arr.includes(v));
  }
  function checkIfWinners(allValuesArr) {
    let winner = false;
    for (let i = 0; i < bingoSheets.length; i++) {
      const res = includesAll(allValuesArr, bingoSheets[i]);
      if (res) {
        winner = true;
        updateWS(i);
      }
    }
    if (winner) {
      updateFilteredList([...bingoArray]);
      updateChosenValue("winnerFound");
      setCurrentTime(0);
    }
  }

  function restart() {
    updateFilteredList([...bingoArray]);
    updateChosenValue("");
    setCurrentTime(0);
  }

  function onLap() {
    addValue(chosenValue);
    if (filteredValueList.length == 0) {
      restart();
      return;
    }
    let cValue = pickValue();
    updateChosenValue(cValue);
    if (chosenValue != "" && chosenValue !== "winnerFound") {
      checkIfWinners([...lastValues, chosenValue]);
    }
  }

  async function setVariation(pickedValue) {
    const cardVariationSelection = await getFileCount(
      folder + "/" + pickedValue
    );
    if (cardVariationSelection.length == 1) {
      updateCardVariation(0);
    } else {
      const number = getRandomInt(1, cardVariationSelection.length - 1);
      updateCardVariation(number);
    }
  }
  function pickValue() {
    const number = getRandomInt(0, filteredValueList.length);
    const pickedValue = filteredValueList[number];
    if (pickedValue == undefined) {
      restart();
      return "";
    }
    setVariation(pickedValue);
    updateFilteredList(
      filteredValueList
        .slice(0, number)
        .concat(filteredValueList.slice(number + 1))
    );
    return pickedValue;
  }

  function addValue(value) {
    if (value == "") {
      updateLastValues([]);
      return;
    }
    if (value == "winnerFound") {
      updateLastValues([]);
      return;
    }
    let newArray = [...lastValues];
    newArray.unshift(value);
    updateLastValues(newArray);
  }

  const togglePlay = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <section className="overflow-x-hidden bingobg2 h-screen">
      <div className="p-2 text-black">
        <a href="#/" className="ml-4 px-4">
          {" "}
          Home{" "}
        </a>
        <button onClick={togglePlay} className="px-4">
          {playing ? "Pause" : "Play"}
        </button>
        <button onClick={restart} className="px-4">
          Reset
        </button>
      </div>
      <div className="h-[440px] w-[440px] border border-4 border-accent1 rounded-full flex items-center justify-center mx-auto bg-mainbg cursor-pointer">
        <div className="flex items-center justify-center w-96 h-96">
          {chosenValue == "" ? (
            <h1 className="text-2xl text-accent1 text-wrap text-center font-semibold">
              New Game Starting Soon
            </h1>
          ) : chosenValue == "winnerFound" ? (
            <h1 className="text-2xl text-accent1 text-wrap text-center font-semibold">
              Winner Found: Sheet {winnerSheet + 1}
            </h1>
          ) : (
            <img
              src={
                "file://" +
                folder +
                "/" +
                chosenValue +
                "/" +
                chosenValue +
                "-" +
                cardVariation +
                ".png"
              }
              className="h-80 w-80 rounded-full object-cover rotate-x-15 -rotate-y-30 z-50"
              alt=""
            />
          )}

          {/* Lines around the center */}
          <div className="absolute w-96 h-96 z-40  rounded-full">
            <div className="absolute top-1/2 left-1/2 w-3 h-8 origin-center rotate-[0deg] translate-y-[-202px] translate-x-[-7px] bg-accent1"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-8 origin-center rotate-[0deg] translate-y-[169px] translate-x-[-7px] bg-accent1"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-8 origin-center rotate-[90deg] translate-y-[-14px] translate-x-[179px] bg-accent1"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-8 origin-center rotate-[90deg] translate-y-[-14px] translate-x-[-192px] bg-accent1"></div>
          </div>
          <div className="absolute w-96 h-96 z-40 rotate-[45deg] rounded-full">
            <div className="absolute top-1/2 left-1/2 w-2 h-6 origin-center rotate-[0deg] translate-y-[-193px] translate-x-[-7px] bg-accent1"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-6 origin-center rotate-[0deg] translate-y-[170px] translate-x-[-7px] bg-accent1"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-6 origin-center rotate-[90deg] translate-y-[-14px] translate-x-[177px] bg-accent1"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-6 origin-center rotate-[90deg] translate-y-[-14px] translate-x-[-186px] bg-accent1"></div>
          </div>

          {/* Timer line */}
          <svg className="absolute w-96 h-96 rotate-[-90deg]">
            <circle
              cx="192"
              cy="192"
              r="180"
              stroke="currentColor"
              strokeWidth="20"
              fill="transparent"
              strokeDasharray="1131"
              strokeDashoffset={1131 - (1131 / seconds) * currentTime}
              className="text-accent2 opacity-50"
            />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl text-center pt-6 text-accent1 poppins font-semibold">
        {chosenValue!="winnerFound" ? chosenValue : ""}
      </h1>
      <div className="w-screen flex items-center justify-center flex-wrap">
        {lastValues.slice(0, 10).map((el, index) => (
          <div className="w-32 m-4" key={index + "picked"}>
            <img
              src={"file://" + folder + "/" + el + "/" + el + "-0.png"}
              alt=""
              className="w-32  h-32 relative translate-y-[16px]"
            />
            <h1 className="text-center text-black font-semibold poppins pt-6 pb-2 bg-mainbg rounded-b-lg border-2 border-accent1">
              {el}
            </h1>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {lastValues.length > 9 ? (
          <button
            className="py-2 px-4 bg-accent1 rounded-lg text-white"
            onClick={() => updateShowModal(!showModal)}
          >
            See Full List
          </button>
        ) : (
          ""
        )}
      </div>
      {showModal ? (
        <Modal title="All selected cards" note="" onExit={updateShowModal}>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            {lastValues.map((el, index) => (
              <div className="w-32 m-4" key={index + "picked"}>
                <img
                  src={"file://" + folder + "/" + el + "/" + el + "-0.png"}
                  alt=""
                  className="w-32  h-32 relative translate-y-[16px]"
                />
                <h1 className="text-center text-black font-semibold poppins pt-6 pb-2 bg-mainbg rounded-b-lg border-2 border-accent1">
                  {el}
                </h1>
              </div>
            ))}
          </div>
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
}
