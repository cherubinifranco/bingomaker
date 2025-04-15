import { useState } from "react";
import { generateUniqueCombination } from "../utils";
import html2pdf from "html2pdf.js";

export default function SheetsPage() {
  const folder = localStorage.getItem("folder");
  const bingoArray = JSON.parse(localStorage.getItem("bingoArray")) ?? [];
  const [bingoSheets, updateBingoSheets] = useState(
    JSON.parse(localStorage.getItem("bingoSheets")) ?? []
  );
  const [sheetLength, updateSheetLength] = useState(1);
  const [sheetAmount, updateSheetAmount] = useState(1);

  function generateSheets() {
    const arr = generateUniqueCombination(
      bingoArray,
      sheetAmount * 1,
      sheetLength * 1
    );
    updateBingoSheets(arr);
    localStorage.setItem("bingoSheets", JSON.stringify(arr));
  }

  function handleValueChange(event, vvar) {
    let value = event.target.value;
    if (value <= 0 || value == undefined || value == "") {
      value = 1;
    }
    if (vvar == "sheetLength") {
      updateSheetLength(value);
    } else if (vvar == "sheetAmount") {
      updateSheetAmount(value);
    }
  }

  function handleSave(cardIndex) {
    const element = document.getElementById("bingoItem" + cardIndex);

    const fileNameWithIndex = "bingo-sheet-" + cardIndex + ".pdf";

    var opt = {
      margin: 1,
      filename: fileNameWithIndex,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  }
  return (
    <div className="">
      <div className="p-4 ml-4 gap-4 text-accent1hover">
        <a href="#/">Home</a>
      </div>
      {/* Menu for sheets */}
      <div className="w-[700px] bg-mainbg rounded-lg mx-auto flex flex-row">
        <div className="flex flex-row w-[280px] text-black font-normal border-2 border-sborder rounded-l-lg">
          <label htmlFor="sheetAmount" className="w-full indent-4 py-2">
            Sheets Amount
          </label>
          <input
            onChange={() => handleValueChange(event, "sheetAmount")}
            value={sheetAmount}
            id="sheetAmount"
            type="number"
            className="w-[100px] bg-mainbg p-2"
          />
        </div>
        <div className="flex flex-row w-[280px] text-black font-normal border-y-2 border-sborder">
          <label htmlFor="sheetLength" className="w-full indent-4 py-2">
            Options By Sheet
          </label>
          <input
            value={sheetLength}
            onChange={() => handleValueChange(event, "sheetLength")}
            type="number"
            id="sheetLength"
            className="w-[100px] bg-mainbg border-r-2 border-sborder p-2"
          />
        </div>
        <button
          className="text-white p-2 w-[140px] bg-accent1 hover:bg-accent1hover rounded-r-lg"
          onClick={generateSheets}
        >
          Generate
        </button>
      </div>
      {bingoSheets.map((el, index) => (
        <div
          className="my-2 bg-accent1 rounded-lg max-w-[900px] mx-auto"
          key={index + "sheetBingo"}
        >
          <div className="bg-accent1hover text-white p-2 rounded-t-lg indent-4 flex justify-between">
            <h1>Bingo Sheet {index + 1}</h1>
            {/* <button>Download</button> */}
          </div>
          <div className="flex flex-row flex-wrap justify-around p-2">
            {el.map((x, index) => (
              <div
                id={"bingoItem" + index}
                key={"bingoItem" + index}
                className="bg-mainbg mx-2 rounded-lg p-2"
              >
                <img
                  src={"file://" + folder + "/" + x + "/" + x + "-0.png"}
                  alt=""
                  className="w-32  h-32 relative"
                />
                <p className="bg-accent1 w-32 text-center text-white font-semibold py-1">
                  {x}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
