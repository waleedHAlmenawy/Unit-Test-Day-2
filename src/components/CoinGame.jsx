import React, { useState } from "react";

export default function CoinGame() {
  const [result, setResult] = useState("");

  function handleThrowingCoin() {
    setResult(["Head", "Tail"][Math.floor(Math.random() * 2)]);
  }

  return (
    <>
      <div>
        <button onClick={handleThrowingCoin}>Throw the coin</button>
        <div role="cell">{result}</div>
      </div>
    </>
  );
}
