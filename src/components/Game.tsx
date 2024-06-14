import React, { useState, useEffect, useRef } from "react";

const letters: string = "abcdefghijklmnopqrstuvwxyz";
const lettersArray: string[] = letters.split("");

const Game = () => {
  const [letterArray, setLetterArray] = useState<string[]>(lettersArray);
  const [selectedLetter, setSelectedLetter] = useState<string>("");
  const [usedLetter, setUsedLetter] = useState<string[]>([]);
  const [count, setCount] = useState<number>(30);
  const [start, setStart] = useState<boolean>(false);
  const [audio] = useState<HTMLAudioElement>(new Audio("sound.wav"));
  const [, setPlaying] = useState(false);

  // Use a ref to store the interval ID
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (count === 0) audio.play();
  }, [count]);
  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleTimer = () => {
    intervalRef.current = window.setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    setStart(true);
  };

  const handleReset = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCount(30);
    setStart(false);
    setSelectedLetter("");
    setUsedLetter([]);
    setLetterArray(lettersArray);
    setPlaying(false);
  };

  const handleRandomLetter = () => {
    const randomNumber = Math.floor(Math.random() * letterArray.length);
    console.log({ randomNumber });

    const letter = letterArray[randomNumber];

    setUsedLetter((prevUsedLetter) => [...prevUsedLetter, letter]);
    setSelectedLetter(letter);

    // Remove the selected letter from letterArray
    setLetterArray((prevLetterArray) =>
      prevLetterArray.filter((l) => l !== letter)
    );

    if (!start) {
      handleTimer();
    }
    setCount(30);
  };

  const existsInList2 = (letter: string): boolean => {
    return usedLetter.includes(letter);
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

      <h3>{selectedLetter === "" ? "LETTER" : selectedLetter.toUpperCase()}</h3>

      <h2 className="time" style={{ color: count < 10 ? "red" : "" }}>
        {count > 0 ? count : "TIME UP"}
      </h2>
      <div>
        {letterArray.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              textAlign: "center",
              padding: "20px",
            }}
          >
            {lettersArray.map((letter, index) => (
              <p
                key={index}
                style={{
                  color: existsInList2(letter) ? "red" : "black",
                  textDecoration: existsInList2(letter)
                    ? "line-through"
                    : "none",
                  textTransform: "uppercase",
                  marginRight: "20px",
                  fontSize: "30px",
                }}
              >
                {letter}
              </p>
            ))}
          </div>
        ) : (
          <p
            style={{
              textTransform: "uppercase",
              fontSize: "30px",
            }}
          >
            You have used up all the letters
          </p>
        )}
      </div>
      <p>{usedLetter}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          alignItems: "center",
          margin: "30px 0",
        }}
      >
        {letterArray.length > 0 && (
          <button onClick={handleRandomLetter}>Generate Random Letter</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Game;
