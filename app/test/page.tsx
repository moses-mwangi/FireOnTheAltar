"use client";
import React, { useMemo, useCallback, useEffect, useState } from "react";

export default function App() {
  const [count, setCount] = React.useState(0);

  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text);
    }, 500); // wait 500ms

    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (debouncedText) {
      console.log("API Call:", debouncedText);
    }
  }, [debouncedText]);

  const slowCalculation = useCallback((num: number) => {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {}
    return num * 2;
  }, []);

  const result = useMemo(() => {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {} // heavy work
    return count * 2;
  }, [count]);

  return (
    <div>
      <p>{result}</p>
      <p>This is a useCallBack: {slowCalculation(count)}</p>
      <button className=" cursor-pointer" onClick={() => setCount(count + 1)}>
        Add
      </button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}
