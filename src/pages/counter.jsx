import { useEffect, useState } from "react";
import { getFileCount, getRandomInt } from "../utils";

export default function CounterPage() {
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
          return -0.3;
        }
        return updated;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [playing, chosenValue, filteredValueList]);

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
  }

  async function setVariation(pickedValue) {
    const cardVariationSelection = await getFileCount(
      folder + "/" + pickedValue
    );
    console.log(cardVariationSelection);
    console.log("variations: " + cardVariationSelection.length);
    if (cardVariationSelection.length == 1) {
      console.log("No variations available");
      updateCardVariation(0);
    } else {
      const number = getRandomInt(1, cardVariationSelection.length - 1);
      console.log("selected variation: " + number);
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
    let newArray = [...lastValues];
    newArray.unshift(value);
    updateLastValues(newArray);
  }

  const togglePlay = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <section className="overflow-x-hidden">
      <div className="p-1">
        <a href="#/" className="text-white ml-4 px-4">
          {" "}
          Home{" "}
        </a>
        <button onClick={togglePlay} className="text-white px-4">
          {playing ? "Pause" : "Play"}
        </button>
        <button onClick={restart} className="text-white px-4">
          Reset
        </button>
      </div>
      <div className="h-[440px] w-[440px] border border-4 border-sborder rounded-full flex items-center justify-center mx-auto bg-mainbg">
        <div className="flex items-center justify-center w-96 h-96">
          {chosenValue == "" ? (
            <h1 className="font-2xl text-white text-wrap text-center">
              New Game Starting Soon
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
              className="h-80 w-80 border border-4 border-sborder rounded-full object-cover rotate-x-15 -rotate-y-30 z-50"
              alt=""
            />
          )}

          {/* Lines around the center */}
          <div className="absolute w-96 h-96 z-40  rounded-full">
            <div className="absolute top-1/2 left-1/2 w-3 h-8 origin-center rotate-[0deg] translate-y-[-202px] translate-x-[-7px] bg-stext"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-8 origin-center rotate-[0deg] translate-y-[169px] translate-x-[-7px] bg-stext"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-8 origin-center rotate-[90deg] translate-y-[-14px] translate-x-[179px] bg-stext"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-8 origin-center rotate-[90deg] translate-y-[-14px] translate-x-[-192px] bg-stext"></div>
          </div>
          <div className="absolute w-96 h-96 z-40 rotate-[45deg] rounded-full">
            <div className="absolute top-1/2 left-1/2 w-2 h-6 origin-center rotate-[0deg] translate-y-[-193px] translate-x-[-7px] bg-stext"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-6 origin-center rotate-[0deg] translate-y-[170px] translate-x-[-7px] bg-stext"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-6 origin-center rotate-[90deg] translate-y-[-14px] translate-x-[177px] bg-stext"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-6 origin-center rotate-[90deg] translate-y-[-14px] translate-x-[-186px] bg-stext"></div>
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
              className="text-accent1 opacity-50"
            />
          </svg>
        </div>
      </div>
      <h1 className="text-lg text-center pt-6 text-white poppins font-normal">
        {chosenValue}
      </h1>
      <div className="w-screen flex items-center justify-center flex-wrap">
        {lastValues.slice(0, 10).map((el, index) => (
          <div className="w-28 m-4" key={index + "picked"}>
            <img
              src={"file://" + folder + "/" + el + "/" + el + "-0.png"}
              alt=""
              className="w-28 h-28 relative translate-y-[16px]"
            />
            <h1 className="text-center text-white poppins pt-6 pb-2 bg-mainbg rounded-b-lg">
              {el}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
}
