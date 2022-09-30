import React, { useState, useEffect } from "react";

const letters: string = "abcdefghijklmnopqrstuvwxyz";
const lettersArray: string[] = letters.split("");

const Game = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>("");
  const [count, setCount] = useState<number>(30);
  const [start, setStart] = useState<boolean>(false);
  const [audio] = useState<HTMLAudioElement>(new Audio("sound.wav"));
  const [, setPlaying] = useState(false);

  useEffect(() => {
    if (count === 0) audio.play();
  }, [count]);
  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  const handleTimer = () => {
    setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    setStart(true);
  };

  const handleRandomLetter = () => {
    const randomNumber = Math.floor(Math.random() * 26);
    console.log({ randomNumber });

    const letter = lettersArray[randomNumber];

    console.log({ letter });
    setSelectedLetter(letter);

    if (!start) {
      handleTimer();
    }
    setCount(30);
  };

  return (
    <div className="container">
      <header className="header">
        <h2>
          Random Letters <span> Game</span>
        </h2>
        <p style={{ lineHeight: "30px" }}>
          The aim of the game is to say the name of a{" "}
          <strong>COUNTRY, CELEBRITY,FRUIT,BRAND and ANIMAL</strong> of the
          selected letter within 30 seconds
        </p>
      </header>

      <h3 style={{ color: selectedLetter === "Alyssa" ? "#ff17b2" : "" }}>
        {selectedLetter === "" ? "LETTER" : selectedLetter.toUpperCase()}
      </h3>

      <h2 className="time" style={{ color: count < 10 ? "red" : "" }}>
        {count > 0 ? count : "TIME UP"}
      </h2>

      <button onClick={handleRandomLetter}>Generate Random Letter</button>
    </div>
  );
};

export default Game;
