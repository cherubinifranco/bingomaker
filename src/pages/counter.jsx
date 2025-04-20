import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";
import { motion } from "framer-motion";

import Modal from "../components/modal";
import { getFileCount, getRandomInt } from "../utils";

import notificationSFX from "../assets/notification.mp3";
import winnerSFX from "../assets/winner.mp3";
import restartSFX from "../assets/restart.mp3";

const BINGO_STATES = {
  WINNER: "winnerState",
  PLAYING: "playingState",
  RESTART: "restartState",
};

export default function CounterPage() {
  // Settings & State
  const [gameState, setGameState] = useState(BINGO_STATES.PLAYING);
  const bingoSheets = JSON.parse(localStorage.getItem("bingoSheets")) ?? [];
  const [filteredList, setFilteredList] = useState([]);
  const [lastValues, setLastValues] = useState([]);
  const [currentValue, setCurrentValue] = useState("");
  const [winnerIndex, setWinnerIndex] = useState(null);
  const [variation, setVariation] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Config from localStorage
  const seconds = Number(localStorage.getItem("timeForLap")) || 5;
  const soundEnabled = JSON.parse(localStorage.getItem("soundState")) ?? true;
  const [trackWinners, setTrackWinners] = useState(JSON.parse(localStorage.getItem("trackingState")) ?? false)
  const folder = localStorage.getItem("folder");
  const bingoArray = JSON.parse(localStorage.getItem("bingoArray"));


  // Security Measure
  if(bingoSheets == []){
    setTrackWinners(false)
  }


  // Sounds
  const [playLap] = useSound(localStorage.getItem("lapSoundRoute") || notificationSFX);
  const [playRestart] = useSound(localStorage.getItem("restartSoundRoute") || restartSFX);
  const [playWinner] = useSound(localStorage.getItem("winnerSoundRoute") || winnerSFX);
  // Animation Config
  const flipAnimation = {
    rotateY: 360,
    scale: [1, 1.4, 1],
    transition: {
      rotateY: { duration: 0.6 },
    },
  };
  const defaultAnimation = {
    rotateY: 0,
    scale: [1, 1.4, 1],
    transition: { duration: 0.6 },
  };

  // Init Game
  useEffect(() => {
    setFilteredList(bingoArray);
    handleLap();
  }, []);

  // Timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        const updated = prev + 0.1;
        if (updated >= seconds) {
          handleLap();
          return 0;
        }
        return updated;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isPlaying, currentValue, filteredList]);

  const handleLap = () => {
    addToLastValues(currentValue);
    playSFX();
    if (gameState == BINGO_STATES.WINNER) {
      setCurrentValue("winnerFound");
      setGameState(BINGO_STATES.RESTART);
      return;
    } else if (gameState == BINGO_STATES.RESTART) {
      resetGame();
      return;
    } else {
      setIsFlipped((prev) => !prev);

      if (filteredList.length === 0) return resetGame();

      const next = selectNextValue(filteredList);
      setCurrentValue(next);

      if (trackWinners && next) {
        checkForWinners([...lastValues, currentValue, next]);
      }
    }
  };

  const checkForWinners = (values) => {
    bingoSheets.forEach((sheet, index) => {
      const isWinner = sheet.every((val) => values.includes(val));
      if (isWinner) {
        setGameState(BINGO_STATES.WINNER);
        setWinnerIndex(index);
      }
    });
  };

  const setCardVariation = async (value) => {
    const options = await getFileCount(`${folder}/${value}`);
    setVariation(options.length <= 1 ? 0 : getRandomInt(1, options.length - 1));
  };

  const addToLastValues = (value) => {
    if (!value || value === "winnerFound") return;
    setLastValues((prev) => [value, ...prev]);
  };

  const resetGame = () => {
    setFilteredList([...bingoArray]);
    setCurrentValue("");
    setCurrentTime(0);
    setLastValues([]);
    setGameState(BINGO_STATES.PLAYING);
    if (soundEnabled) playRestart();
  };

  function playSFX() {
    if (gameState == BINGO_STATES.WINNER) {
      playWinner();
    } else if (gameState == BINGO_STATES.RESTART) {
      playRestart();
    } else {
      playLap();
    }
  }

  const selectNextValue = (list) => {
    const index = getRandomInt(0, list.length);
    const value = list[index];
    if (!value) return "";

    setCardVariation(value);
    const newList = list.filter((_, i) => i !== index);
    setFilteredList(newList);
    return value;
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section className="overflow-x-hidden bingobg2 h-screen">
      <div className="p-2 text-black">
        <a href="#/" className="ml-4 px-4">
          {" "}
          Home{" "}
        </a>
        <button onClick={togglePlay} className="px-4">
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={resetGame} className="px-4">
          Reset
        </button>
      </div>
      <div className="h-[440px] w-[440px] border border-4 border-accent1 rounded-full flex items-center justify-center mx-auto bg-mainbg cursor-pointer">
        <div className="flex items-center justify-center w-96 h-96">
          <motion.div animate={isFlipped ? flipAnimation : defaultAnimation} className="relative w-96 h-96 cursor-pointer flex items-center justify-center " style={{ transformStyle: "preserve-3d" }}>
            {currentValue == "" ? <h1 className="text-2xl text-accent1 text-wrap text-center font-semibold">New Game Starting Soon</h1> : currentValue == "winnerFound" ? <h1 className="text-2xl text-accent1 text-wrap text-center font-semibold">Winner Found: Sheet {winnerIndex + 1}</h1> : <img id="cardImage" src={"file://" + folder + "/" + currentValue + "/" + variation + ".png"} className="h-80 w-80 rounded-full object-cover rotate-x-15 -rotate-y-30 z-50" alt="" />}
          </motion.div>

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
            <circle cx="192" cy="192" r="180" stroke="currentColor" strokeWidth="20" fill="transparent" strokeDasharray="1131" strokeDashoffset={1131 - (1131 / seconds) * currentTime} className="text-accent2 opacity-50" />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl text-center pt-6 text-accent1 poppins font-semibold">{currentValue != "winnerFound" ? currentValue : ""}</h1>
      <div className="w-screen flex items-center justify-center flex-wrap">
        {lastValues.slice(0, 10).map((el, index) => (
          <div className="w-32 m-4" key={index + "picked"}>
            <img src={"file://" + folder + "/" + el + "/" + "0.png"} alt="" className="w-32  h-32 relative translate-y-[16px]" />
            <h1 className="text-center text-black font-semibold poppins pt-6 pb-2 bg-mainbg rounded-b-lg border-2 border-accent1">{el}</h1>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {lastValues.length > 6 ? (
          <button className="py-2 px-4 bg-accent1 rounded-lg text-white" onClick={() => setShowModal(!showModal)}>
            See Full List
          </button>
        ) : (
          ""
        )}
      </div>
      {showModal ? (
        <Modal title="All selected cards" note="" onExit={setShowModal}>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            {lastValues.map((el, index) => (
              <div className="w-32 m-4" key={index + "picked"}>
                <img src={"file://" + folder + "/" + el + "/" + "0.png"} alt="" className="w-32  h-32 relative translate-y-[16px]" />
                <h1 className="text-center text-black font-semibold poppins pt-6 pb-2 bg-mainbg rounded-b-lg border-2 border-accent1">{el}</h1>
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
