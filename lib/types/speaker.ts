import { SetStateAction } from "react";

export const wordUtterance = (
  word: string,
  setSpeakingWord: React.Dispatch<React.SetStateAction<string | null>>,
  definition?: string,
) => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  setSpeakingWord(word);

  const utterance = new SpeechSynthesisUtterance(word);

  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1.0;
  utterance.volume = 1;

  // Try to use a British English voice
  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();

    // Priority order for British English voices
    const britishVoice = voices.find(
      (voice) =>
        // Check for British English language code
        voice.lang === "en-GB" ||
        voice.lang === "en-UK" ||
        // Check for British voice names (common patterns)
        voice.name.includes("British") ||
        voice.name.includes("UK") ||
        voice.name.includes("England") ||
        voice.name.includes("London") ||
        voice.name.includes("Daniel") || // Google UK voice
        voice.name.includes("Brian") || // Some systems use Brian for UK
        // Specific high-quality British voices
        voice.name === "Google UK English Female" ||
        voice.name === "Google UK English Male" ||
        voice.name === "Microsoft Hazel Desktop" ||
        voice.name === "Microsoft George Desktop" ||
        // Fallback: any English voice with British in the name
        (voice.lang.startsWith("en") &&
          voice.name.toLowerCase().includes("british")),
    );

    if (britishVoice) {
      utterance.voice = britishVoice;
      console.log("Using British voice:", britishVoice.name);
    } else {
      // Fallback to any English voice if British not available
      const englishVoice = voices.find((voice) => voice.lang.startsWith("en"));
      if (englishVoice) {
        utterance.voice = englishVoice;
        console.log("British voice not found, using:", englishVoice.name);
      } else {
        console.warn("No English voices found");
      }
    }
  };

  // Voices might not be loaded immediately
  if (window.speechSynthesis.getVoices().length > 0) {
    setVoice();
  } else {
    window.speechSynthesis.onvoiceschanged = setVoice;
  }

  utterance.onend = () => {
    setSpeakingWord(null);
  };

  utterance.onerror = () => {
    setSpeakingWord(null);
  };

  window.speechSynthesis.speak(utterance);
};

export const speakWordWithDefinitionUtterance = (
  word: string,
  setSpeakingWord: React.Dispatch<React.SetStateAction<string | null>>,
  definition: string,
) => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  setSpeakingWord(word);
  const text = `${word}. ${definition}`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1;

  utterance.onend = () => setSpeakingWord(null);
  utterance.onerror = () => setSpeakingWord(null);

  window.speechSynthesis.speak(utterance);
};
