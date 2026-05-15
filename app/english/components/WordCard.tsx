import { useState } from "react";
import {
  Trash2,
  ChevronDown,
  ChevronUp,
  Copy,
  Link,
  Speaker,
  Voicemail,
  LucideMic,
} from "lucide-react";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { Word } from "../types";

interface Props {
  word: Partial<Word>;
  onDelete: () => void;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
}

export default function WordCard({
  word,
  onDelete,
  showDetails,
  setShowDetails,
}: Props) {
  const [showWordFamily, setShowWordFamily] = useState(false);
  const [showSynonyms, setShowSynonyms] = useState(false);
  const [showAnatomys, setShowAnatomys] = useState(false);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  const speakWord = (word: string, definition?: string) => {
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
        const englishVoice = voices.find((voice) =>
          voice.lang.startsWith("en"),
        );
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
      console.error("Speech synthesis failed");
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div
        // className={`${} bg-linear-to-r from-purple-600 to-pink-600 px-4 py-2 text-white`}
        className={`${showDetails ? "bg-linear-to-r from-purple-600 to-pink-600" : "bg-linear-to-r from-purple-600 to-pink-600 dark:bg-gray-700"} px-3 py-1 text-white`}
      >
        <div
          onClick={() => setShowDetails(!showDetails)}
          className={` ${showDetails ? "text-[15px]" : "text-[16px]"} flex cursor-pointer justify-between items-start`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex gap-3 items-center justify-between"
          >
            <button
              onClick={() => speakWord(word.word)}
              disabled={speakingWord === word.word}
              className={`p-[3px] rounded-full transition-all ${
                speakingWord === word.word
                  ? "bg-green-100 text-green-600 animate-pulse"
                  : "bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600"
              }`}
              title={`Pronounce ${word.word}`}
            >
              {speakingWord === word.word ? (
                <HiOutlineSpeakerXMark className="w-5 h-5 animate-pulse text-green-600" />
              ) : (
                <>
                  <LucideMic className="w-5 h-5 animate-pulse text-green-600" />
                </>
              )}
            </button>
            <h3 className=" font-semibold mb-1">{word.word}</h3>
          </div>
          <button
            onClick={onDelete}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        {/* {word.example && (
          <p className="text-sm italic text-purple-100 mt-2">
            &quot;{word.example}&quot;
          </p>
        )} */}
      </div>

      {showDetails && (
        <>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowWordFamily(!showWordFamily)}
              className={`${showWordFamily ? "bg-gray-50" : ""} cursor-pointer w-full p-3 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-xs">Word Family</span>
                <span className="text-xs text-gray-500">
                  ({word?.wordFamily?.length})
                </span>
              </div>
              {showWordFamily ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {showWordFamily && (
              <div className="p-4 bg-white dark:bg-gray-700/50">
                <div className="flex flex-wrap gap-2 ">
                  {word?.wordFamily?.map((member) => (
                    <div
                      key={member.id}
                      className=" dark:bg-gray-800 rounded-lg"
                    >
                      <p
                        onClick={() => speakWord(member.word)}
                        className="text-xs cursor-pointer text-purple-600 dark:text-purple-400 g px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full"
                      >
                        {member.word}
                        {/* (
                    <span className="text-xs font-light">
                      {member.partOfSpeech}
                    </span>
                    ) */}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowSynonyms(!showSynonyms)}
              className={`${showSynonyms ? "bg-gray-50" : ""} cursor-pointer w-full p-3 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-xs">Synonyms</span>
                <span className="text-xs text-gray-500">
                  ({word?.synonyms?.length})
                </span>
              </div>
              {showSynonyms ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {showSynonyms && (
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {word?.synonyms?.map((synonym, idx) => (
                    <span
                      key={idx}
                      onClick={() => speakWord(synonym)}
                      className="px-3 cursor-pointer text-xs py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full "
                    >
                      {synonym}
                    </span>
                  ))}
                </div>
                {word.antonyms && word.antonyms.length > 0 && (
                  <>
                    <p className="text-xs text-gray-500 mt-3 mb-2">
                      Opposites:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {word.antonyms.map((antonym, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs"
                        >
                          {antonym}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowAnatomys(!showAnatomys)}
              className={`${showAnatomys ? "bg-gray-50" : ""} cursor-pointer w-full p-3 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-xs">Antonyms</span>
                <span className="text-xs text-gray-500">
                  ({word?.antonyms?.length || 0})
                </span>
              </div>
              {showAnatomys ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {showAnatomys && (
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {word?.antonyms?.map((antonym, idx) => (
                    <span
                      key={idx}
                      onClick={() => speakWord(antonym)}
                      className="px-3 cursor-pointer text-xs py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full "
                    >
                      {antonym} MMM
                    </span>
                  ))}
                </div>
                {word.antonyms && word.antonyms.length > 0 && (
                  <>
                    <p className="text-xs text-gray-500 mt-3 mb-2">
                      Opposites:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {word.antonyms.map((antonym, idx) => (
                        <span
                          key={idx}
                          onClick={() => speakWord(antonym)}
                          className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs"
                        >
                          {antonym}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
