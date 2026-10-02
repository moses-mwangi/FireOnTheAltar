// // "use client";

// // import React, { useState, useEffect } from "react";

// // // --- TypeScript Interfaces ---
// // interface Verse {
// //   verse: number;
// //   text: string;
// // }

// // interface ChapterData {
// //   reference: string;
// //   verses: Verse[];
// //   translation: string;
// // }

// // // --- DEMO DATA: Gospel of John (Chapters 1-3) ---
// // const DEMO_BIBLE: { [key: string]: { [key: number]: ChapterData } } = {
// //   John: {
// //     1: {
// //       reference: "John 1",
// //       translation: "KJV",
// //       verses: [
// //         {
// //           verse: 1,
// //           text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
// //         },
// //         { verse: 2, text: "The same was in the beginning with God." },
// //         {
// //           verse: 3,
// //           text: "All things were made by him; and without him was not any thing made that was made.",
// //         },
// //         {
// //           verse: 4,
// //           text: "In him was life; and the life was the light of men.",
// //         },
// //         {
// //           verse: 5,
// //           text: "And the light shineth in darkness; and the darkness comprehended it not.",
// //         },
// //         {
// //           verse: 6,
// //           text: "There was a man sent from God, whose name was John.",
// //         },
// //         {
// //           verse: 7,
// //           text: "The same came for a witness, to bear witness of the Light, that all men through him might believe.",
// //         },
// //         {
// //           verse: 8,
// //           text: "He was not that Light, but was sent to bear witness of that Light.",
// //         },
// //         {
// //           verse: 9,
// //           text: "That was the true Light, which lighteth every man that cometh into the world.",
// //         },
// //         {
// //           verse: 10,
// //           text: "He was in the world, and the world was made by him, and the world knew him not.",
// //         },
// //         {
// //           verse: 11,
// //           text: "He came unto his own, and his own received him not.",
// //         },
// //         {
// //           verse: 12,
// //           text: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:",
// //         },
// //         {
// //           verse: 13,
// //           text: "Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God.",
// //         },
// //         {
// //           verse: 14,
// //           text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
// //         },
// //         {
// //           verse: 15,
// //           text: "John bare witness of him, and cried, saying, This was he of whom I spake, He that cometh after me is preferred before me: for he was before me.",
// //         },
// //         {
// //           verse: 16,
// //           text: "And of his fulness have all we received, and grace for grace.",
// //         },
// //         {
// //           verse: 17,
// //           text: "For the law was given by Moses, but grace and truth came by Jesus Christ.",
// //         },
// //         {
// //           verse: 18,
// //           text: "No man hath seen God at any time; the only begotten Son, which is in the bosom of the Father, he hath declared him.",
// //         },
// //         {
// //           verse: 19,
// //           text: "And this is the record of John, when the Jews sent priests and Levites from Jerusalem to ask him, Who art thou?",
// //         },
// //         {
// //           verse: 20,
// //           text: "And he confessed, and denied not; but confessed, I am not the Christ.",
// //         },
// //         {
// //           verse: 21,
// //           text: "And they asked him, What then? Art thou Elias? And he saith, I am not. Art thou that prophet? And he answered, No.",
// //         },
// //         {
// //           verse: 22,
// //           text: "Then said they unto him, Who art thou? that we may give an answer to them that sent us. What sayest thou of thyself?",
// //         },
// //         {
// //           verse: 23,
// //           text: "He said, I am the voice of one crying in the wilderness, Make straight the way of the Lord, as said the prophet Esaias.",
// //         },
// //         { verse: 24, text: "And they which were sent were of the Pharisees." },
// //         {
// //           verse: 25,
// //           text: "And they asked him, and said unto him, Why baptizest thou then, if thou be not that Christ, nor Elias, neither that prophet?",
// //         },
// //         {
// //           verse: 26,
// //           text: "John answered them, saying, I baptize with water: but there standeth one among you, whom ye know not;",
// //         },
// //         {
// //           verse: 27,
// //           text: "He it is, who coming after me is preferred before me, whose shoe's latchet I am not worthy to unloose.",
// //         },
// //         {
// //           verse: 28,
// //           text: "These things were done in Bethabara beyond Jordan, where John was baptizing.",
// //         },
// //         {
// //           verse: 29,
// //           text: "The next day John seeth Jesus coming unto him, and saith, Behold the Lamb of God, which taketh away the sin of the world.",
// //         },
// //         {
// //           verse: 30,
// //           text: "This is he of whom I said, After me cometh a man which is preferred before me: for he was before me.",
// //         },
// //         {
// //           verse: 31,
// //           text: "And I knew him not: but that he should be made manifest to Israel, therefore am I come baptizing with water.",
// //         },
// //         {
// //           verse: 32,
// //           text: "And John bare record, saying, I saw the Spirit descending from heaven like a dove, and it abode upon him.",
// //         },
// //         {
// //           verse: 33,
// //           text: "And I knew him not: but he that sent me to baptize with water, the same said unto me, Upon whom thou shalt see the Spirit descending, and remaining on him, the same is he which baptizeth with the Holy Ghost.",
// //         },
// //         {
// //           verse: 34,
// //           text: "And I saw, and bare record that this is the Son of God.",
// //         },
// //         {
// //           verse: 35,
// //           text: "Again the next day after John stood, and two of his disciples;",
// //         },
// //         {
// //           verse: 36,
// //           text: "And looking upon Jesus as he walked, he saith, Behold the Lamb of God!",
// //         },
// //         {
// //           verse: 37,
// //           text: "And the two disciples heard him speak, and they followed Jesus.",
// //         },
// //         {
// //           verse: 38,
// //           text: "Then Jesus turned, and saw them following, and saith unto them, What seek ye? They said unto him, Rabbi, (which is to say, being interpreted, Master,) where dwellest thou?",
// //         },
// //         {
// //           verse: 39,
// //           text: "He saith unto them, Come and see. They came and saw where he dwelt, and abode with him that day: for it was about the tenth hour.",
// //         },
// //         {
// //           verse: 40,
// //           text: "One of the two which heard John speak, and followed him, was Andrew, Simon Peter's brother.",
// //         },
// //         {
// //           verse: 41,
// //           text: "He first findeth his own brother Simon, and saith unto him, We have found the Messias, which is, being interpreted, the Christ.",
// //         },
// //         {
// //           verse: 42,
// //           text: "And he brought him to Jesus. And when Jesus beheld him, he said, Thou art Simon the son of Jona: thou shalt be called Cephas, which is by interpretation, A stone.",
// //         },
// //         {
// //           verse: 43,
// //           text: "The day following Jesus would go forth into Galilee, and findeth Philip, and saith unto him, Follow me.",
// //         },
// //         {
// //           verse: 44,
// //           text: "Now Philip was of Bethsaida, the city of Andrew and Peter.",
// //         },
// //         {
// //           verse: 45,
// //           text: "Philip findeth Nathanael, and saith unto him, We have found him, of whom Moses in the law, and the prophets, did write, Jesus of Nazareth, the son of Joseph.",
// //         },
// //         {
// //           verse: 46,
// //           text: "And Nathanael said unto him, Can there any good thing come out of Nazareth? Philip saith unto him, Come and see.",
// //         },
// //         {
// //           verse: 47,
// //           text: "Jesus saw Nathanael coming to him, and saith of him, Behold an Israelite indeed, in whom is no guile!",
// //         },
// //         {
// //           verse: 48,
// //           text: "Nathanael saith unto him, Whence knowest thou me? Jesus answered and said unto him, Before that Philip called thee, when thou wast under the fig tree, I saw thee.",
// //         },
// //         {
// //           verse: 49,
// //           text: "Nathanael answered and saith unto him, Rabbi, thou art the Son of God; thou art the King of Israel.",
// //         },
// //         {
// //           verse: 50,
// //           text: "Jesus answered and said unto him, Because I said unto thee, I saw thee under the fig tree, believest thou? thou shalt see greater things than these.",
// //         },
// //         {
// //           verse: 51,
// //           text: "And he saith unto him, Verily, verily, I say unto you, Hereafter ye shall see heaven open, and the angels of God ascending and descending upon the Son of man.",
// //         },
// //       ],
// //     },
// //     2: {
// //       reference: "John 2",
// //       translation: "KJV",
// //       verses: [
// //         {
// //           verse: 1,
// //           text: "And the third day there was a marriage in Cana of Galilee; and the mother of Jesus was there:",
// //         },
// //         {
// //           verse: 2,
// //           text: "And both Jesus was called, and his disciples, to the marriage.",
// //         },
// //         {
// //           verse: 3,
// //           text: "And when they wanted wine, the mother of Jesus saith unto him, They have no wine.",
// //         },
// //         {
// //           verse: 4,
// //           text: "Jesus saith unto her, Woman, what have I to do with thee? mine hour is not yet come.",
// //         },
// //         {
// //           verse: 5,
// //           text: "His mother saith unto the servants, Whatsoever he saith unto you, do it.",
// //         },
// //         {
// //           verse: 6,
// //           text: "And there were set there six waterpots of stone, after the manner of the purifying of the Jews, containing two or three firkins apiece.",
// //         },
// //         {
// //           verse: 7,
// //           text: "Jesus saith unto them, Fill the waterpots with water. And they filled them up to the brim.",
// //         },
// //         {
// //           verse: 8,
// //           text: "And he saith unto them, Draw out now, and bear unto the governor of the feast. And they bare it.",
// //         },
// //         {
// //           verse: 9,
// //           text: "When the ruler of the feast had tasted the water that was made wine, and knew not whence it was: (but the servants which drew the water knew;) the governor of the feast called the bridegroom,",
// //         },
// //         {
// //           verse: 10,
// //           text: "And saith unto him, Every man at the beginning doth set forth good wine; and when men have well drunk, then that which is worse: but thou hast kept the good wine until now.",
// //         },
// //         {
// //           verse: 11,
// //           text: "This beginning of miracles did Jesus in Cana of Galilee, and manifested forth his glory; and his disciples believed on him.",
// //         },
// //         {
// //           verse: 12,
// //           text: "After this he went down to Capernaum, he, and his mother, and his brethren, and his disciples: and they continued there not many days.",
// //         },
// //         {
// //           verse: 13,
// //           text: "And the Jews' passover was at hand, and Jesus went up to Jerusalem,",
// //         },
// //         {
// //           verse: 14,
// //           text: "And found in the temple those that sold oxen and sheep and doves, and the changers of money sitting:",
// //         },
// //         {
// //           verse: 15,
// //           text: "And when he had made a scourge of small cords, he drove them all out of the temple, and the sheep, and the oxen; and poured out the changers' money, and overthrew the tables;",
// //         },
// //         {
// //           verse: 16,
// //           text: "And said unto them that sold doves, Take these things hence; make not my Father's house an house of merchandise.",
// //         },
// //         {
// //           verse: 17,
// //           text: "And his disciples remembered that it was written, The zeal of thine house hath eaten me up.",
// //         },
// //         {
// //           verse: 18,
// //           text: "Then answered the Jews and said unto him, What sign shewest thou unto us, seeing that thou doest these things?",
// //         },
// //         {
// //           verse: 19,
// //           text: "Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up.",
// //         },
// //         {
// //           verse: 20,
// //           text: "Then said the Jews, Forty and six years was this temple in building, and wilt thou rear it up in three days?",
// //         },
// //         { verse: 21, text: "But he spake of the temple of his body." },
// //         {
// //           verse: 22,
// //           text: "When therefore he was risen from the dead, his disciples remembered that he had said this unto them; and they believed the scripture, and the word which Jesus had said.",
// //         },
// //         {
// //           verse: 23,
// //           text: "Now when he was in Jerusalem at the passover, in the feast day, many believed in his name, when they saw the miracles which he did.",
// //         },
// //         {
// //           verse: 24,
// //           text: "But Jesus did not commit himself unto them, because he knew all men,",
// //         },
// //         {
// //           verse: 25,
// //           text: "And needed not that any should testify of man: for he knew what was in man.",
// //         },
// //       ],
// //     },
// //     3: {
// //       reference: "John 3",
// //       translation: "KJV",
// //       verses: [
// //         {
// //           verse: 1,
// //           text: "There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:",
// //         },
// //         {
// //           verse: 2,
// //           text: "The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him.",
// //         },
// //         {
// //           verse: 3,
// //           text: "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God.",
// //         },
// //         {
// //           verse: 4,
// //           text: "Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother's womb, and be born?",
// //         },
// //         {
// //           verse: 5,
// //           text: "Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.",
// //         },
// //         {
// //           verse: 6,
// //           text: "That which is born of the flesh is flesh; and that which is born of the Spirit is spirit.",
// //         },
// //         {
// //           verse: 7,
// //           text: "Marvel not that I said unto thee, Ye must be born again.",
// //         },
// //         {
// //           verse: 8,
// //           text: "The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh, and whither it goeth: so is every one that is born of the Spirit.",
// //         },
// //         {
// //           verse: 9,
// //           text: "Nicodemus answered and said unto him, How can these things be?",
// //         },
// //         {
// //           verse: 10,
// //           text: "Jesus answered and said unto him, Art thou a master of Israel, and knowest not these things?",
// //         },
// //         {
// //           verse: 11,
// //           text: "Verily, verily, I say unto thee, We speak that we do know, and testify that we have seen; and ye receive not our witness.",
// //         },
// //         {
// //           verse: 12,
// //           text: "If I have told you earthly things, and ye believe not, how shall ye believe, if I tell you of heavenly things?",
// //         },
// //         {
// //           verse: 13,
// //           text: "And no man hath ascended up to heaven, but he that came down from heaven, even the Son of man which is in heaven.",
// //         },
// //         {
// //           verse: 14,
// //           text: "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:",
// //         },
// //         {
// //           verse: 15,
// //           text: "That whosoever believeth in him should not perish, but have eternal life.",
// //         },
// //         {
// //           verse: 16,
// //           text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
// //         },
// //         {
// //           verse: 17,
// //           text: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved.",
// //         },
// //         {
// //           verse: 18,
// //           text: "He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.",
// //         },
// //         {
// //           verse: 19,
// //           text: "And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil.",
// //         },
// //         {
// //           verse: 20,
// //           text: "For every one that doeth evil hateth the light, neither cometh to the light, lest his deeds should be reproved.",
// //         },
// //         {
// //           verse: 21,
// //           text: "But he that doeth truth cometh to the light, that his deeds may be made manifest, that they are wrought in God.",
// //         },
// //         {
// //           verse: 22,
// //           text: "After these things came Jesus and his disciples into the land of Judaea; and there he tarried with them, and baptized.",
// //         },
// //         {
// //           verse: 23,
// //           text: "And John also was baptizing in Aenon near to Salim, because there was much water there: and they came, and were baptized.",
// //         },
// //         { verse: 24, text: "For John was not yet cast into prison." },
// //         {
// //           verse: 25,
// //           text: "Then there arose a question between some of John's disciples and the Jews about purifying.",
// //         },
// //         {
// //           verse: 26,
// //           text: "And they came unto John, and said unto him, Rabbi, he that was with thee beyond Jordan, to whom thou barest witness, behold, the same baptizeth, and all men come to him.",
// //         },
// //         {
// //           verse: 27,
// //           text: "John answered and said, A man can receive nothing, except it be given him from heaven.",
// //         },
// //         {
// //           verse: 28,
// //           text: "Ye yourselves bear me witness, that I said, I am not the Christ, but that I am sent before him.",
// //         },
// //         {
// //           verse: 29,
// //           text: "He that hath the bride is the bridegroom: but the friend of the bridegroom, which standeth and heareth him, rejoiceth greatly because of the bridegroom's voice: this my joy therefore is fulfilled.",
// //         },
// //         { verse: 30, text: "He must increase, but I must decrease." },
// //         {
// //           verse: 31,
// //           text: "He that cometh from above is above all: he that is of the earth is earthly, and speaketh of the earth: he that cometh from heaven is above all.",
// //         },
// //         {
// //           verse: 32,
// //           text: "And what he hath seen and heard, that he testifieth; and no man receiveth his testimony.",
// //         },
// //         {
// //           verse: 33,
// //           text: "He that hath received his testimony hath set to his seal that God is true.",
// //         },
// //         {
// //           verse: 34,
// //           text: "For he whom God hath sent speaketh the words of God: for God giveth not the Spirit by measure unto him.",
// //         },
// //         {
// //           verse: 35,
// //           text: "The Father loveth the Son, and hath given all things into his hand.",
// //         },
// //         {
// //           verse: 36,
// //           text: "He that believeth on the Son hath everlasting life: and he that believeth not the Son shall not see life; but the wrath of God abideth on him.",
// //         },
// //       ],
// //     },
// //   },
// // };

// // // List of available books and chapters
// // const AVAILABLE_BOOKS = ["John"];
// // const AVAILABLE_CHAPTERS = [1, 2, 3];

// // // --- Main Component ---
// // export default function BibleStudyPlatform() {
// //   // State Management
// //   const [selectedBook, setSelectedBook] = useState<string>("John");
// //   const [selectedChapter, setSelectedChapter] = useState<number>(1);
// //   const [chapterData, setChapterData] = useState<ChapterData | null>(null);

// //   // Note-taking state
// //   const [notes, setNotes] = useState<{ [key: string]: string }>({});
// //   const [activeNoteVerse, setActiveNoteVerse] = useState<number | null>(null);
// //   const [noteInput, setNoteInput] = useState<string>("");

// //   // Load chapter when book/chapter changes
// //   useEffect(() => {
// //     const bookData = DEMO_BIBLE[selectedBook as keyof typeof DEMO_BIBLE];
// //     if (bookData && bookData[selectedChapter]) {
// //       setChapterData(bookData[selectedChapter]);
// //     } else {
// //       setChapterData(null);
// //     }
// //   }, [selectedBook, selectedChapter]);

// //   // Load saved notes from localStorage on mount
// //   useEffect(() => {
// //     const savedNotes = localStorage.getItem("bibleStudyNotes");
// //     if (savedNotes) {
// //       try {
// //         setNotes(JSON.parse(savedNotes));
// //       } catch (e) {
// //         console.error("Failed to parse saved notes");
// //       }
// //     }
// //   }, []);

// //   // Save notes to localStorage whenever they change
// //   useEffect(() => {
// //     localStorage.setItem("bibleStudyNotes", JSON.stringify(notes));
// //   }, [notes]);

// //   // --- Helper Functions ---
// //   const getVerseKey = (verse: number) =>
// //     `${selectedBook}_${selectedChapter}_${verse}`;

// //   const handleSaveNote = (verse: number) => {
// //     if (noteInput.trim()) {
// //       setNotes((prev) => ({
// //         ...prev,
// //         [getVerseKey(verse)]: noteInput.trim(),
// //       }));
// //       setActiveNoteVerse(null);
// //       setNoteInput("");
// //     }
// //   };

// //   const handleDeleteNote = (verse: number) => {
// //     setNotes((prev) => {
// //       const newNotes = { ...prev };
// //       delete newNotes[getVerseKey(verse)];
// //       return newNotes;
// //     });
// //     setActiveNoteVerse(null);
// //   };

// //   // Highlight potential cross-references (numbers in parentheses or brackets)
// //   const renderVerseText = (text: string) => {
// //     // Check for patterns like (1), [2], or just standalone numbers
// //     const parts = text.split(/(\([^)]+\)|\[[^\]]+\])/);
// //     return parts.map((part, index) => {
// //       // If it's a reference in parentheses/brackets, highlight it
// //       if (part.match(/^\([^)]+\)$/) || part.match(/^\[[^\]]+\]$/)) {
// //         return (
// //           <span key={index} className="cross-ref">
// //             {part}
// //           </span>
// //         );
// //       }
// //       return part;
// //     });
// //   };

// //   return (
// //     <div className="bible-container">
// //       {/* --- HEADER --- */}
// //       <header className="bible-header">
// //         <h1>📖 Personal Bible Study</h1>
// //         <p>Demo: Gospel of John (Chapters 1-3) • KJV Translation</p>
// //         <p style={{ fontSize: "0.8rem", color: "#8a7a6a", marginTop: "4px" }}>
// //           💡 Your notes are saved locally in your browser
// //         </p>
// //       </header>

// //       {/* --- CONTROLS --- */}
// //       <div className="controls">
// //         <div className="control-group">
// //           <label htmlFor="book-select">Book</label>
// //           <select
// //             id="book-select"
// //             value={selectedBook}
// //             onChange={(e) => setSelectedBook(e.target.value)}
// //           >
// //             {AVAILABLE_BOOKS.map((book) => (
// //               <option key={book} value={book}>
// //                 {book}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="control-group">
// //           <label htmlFor="chapter-select">Chapter</label>
// //           <select
// //             id="chapter-select"
// //             value={selectedChapter}
// //             onChange={(e) => setSelectedChapter(Number(e.target.value))}
// //           >
// //             {AVAILABLE_CHAPTERS.map((ch) => (
// //               <option key={ch} value={ch}>
// //                 Chapter {ch}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="demo-badge">
// //           📚 Demo Data • Add more chapters in DEMO_BIBLE
// //         </div>
// //       </div>

// //       {/* --- CONTENT --- */}
// //       <div className="content-area">
// //         {chapterData ? (
// //           <>
// //             <div className="chapter-header">
// //               <h2>{chapterData.reference}</h2>
// //               <span className="translation-badge">
// //                 {chapterData.translation}
// //               </span>
// //             </div>

// //             <div className="verses-container">
// //               {chapterData.verses.map((v) => {
// //                 const verseKey = getVerseKey(v.verse);
// //                 const hasNote = notes[verseKey] !== undefined;

// //                 return (
// //                   <div key={v.verse} className="verse-block" id={`v${v.verse}`}>
// //                     <div className="verse-header">
// //                       <span className="verse-number">{v.verse}</span>
// //                       <div className="verse-actions">
// //                         <button
// //                           className="note-toggle"
// //                           onClick={() => {
// //                             if (activeNoteVerse === v.verse) {
// //                               setActiveNoteVerse(null);
// //                             } else {
// //                               setActiveNoteVerse(v.verse);
// //                               setNoteInput(notes[verseKey] || "");
// //                             }
// //                           }}
// //                           title="Add/Edit Note"
// //                         >
// //                           {hasNote ? "✏️" : "📝"}
// //                         </button>
// //                       </div>
// //                     </div>

// //                     <div className="verse-text">{renderVerseText(v.text)}</div>

// //                     {/* Note Editor */}
// //                     {activeNoteVerse === v.verse && (
// //                       <div className="note-editor">
// //                         <textarea
// //                           value={noteInput}
// //                           onChange={(e) => setNoteInput(e.target.value)}
// //                           placeholder="Write your personal insight, cross-reference, or question here..."
// //                           rows={3}
// //                           autoFocus
// //                         />
// //                         <div className="note-actions">
// //                           <button
// //                             className="save-note-btn"
// //                             onClick={() => handleSaveNote(v.verse)}
// //                           >
// //                             💾 Save Note
// //                           </button>
// //                           {hasNote && (
// //                             <button
// //                               className="delete-note-btn"
// //                               onClick={() => handleDeleteNote(v.verse)}
// //                             >
// //                               🗑️ Delete
// //                             </button>
// //                           )}
// //                           <button
// //                             className="cancel-note-btn"
// //                             onClick={() => {
// //                               setActiveNoteVerse(null);
// //                               setNoteInput("");
// //                             }}
// //                           >
// //                             Cancel
// //                           </button>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {/* Display saved note below verse */}
// //                     {hasNote && activeNoteVerse !== v.verse && (
// //                       <div className="saved-note">
// //                         <span className="note-label">📌 Insight:</span>
// //                         <p>{notes[verseKey]}</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 );
// //               })}
// //             </div>

// //             {/* Chapter Summary Stats */}
// //             <div className="chapter-stats">
// //               <p>
// //                 📊 {chapterData.verses.length} verses • 💡
// //                 {
// //                   Object.keys(notes).filter((key) =>
// //                     key.startsWith(`${selectedBook}_${selectedChapter}`),
// //                   ).length
// //                 }{" "}
// //                 personal notes
// //               </p>
// //             </div>
// //           </>
// //         ) : (
// //           <div className="loading">
// //             <p>📖 No data available for this chapter.</p>
// //             <p style={{ fontSize: "0.9rem", color: "#8a7a6a" }}>
// //               Add it to the DEMO_BIBLE object in the code.
// //             </p>
// //           </div>
// //         )}
// //       </div>

// //       {/* --- STYLES (Embedded for single-file demo) --- */}
// //       <style jsx>{`
// //         .bible-container {
// //           max-width: 900px;
// //           margin: 0 auto;
// //           padding: 20px;
// //           font-family:
// //             -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
// //           background: #faf9f7;
// //           min-height: 100vh;
// //         }

// //         .bible-header {
// //           text-align: center;
// //           padding: 20px 0;
// //           border-bottom: 2px solid #d4c5a9;
// //           margin-bottom: 24px;
// //         }

// //         .bible-header h1 {
// //           margin: 0;
// //           color: #2c1810;
// //           font-size: 2rem;
// //         }

// //         .bible-header p {
// //           margin: 4px 0 0;
// //           color: #6b5a4a;
// //           font-size: 0.9rem;
// //         }

// //         .controls {
// //           display: flex;
// //           flex-wrap: wrap;
// //           gap: 16px;
// //           align-items: flex-end;
// //           background: white;
// //           padding: 16px 20px;
// //           border-radius: 12px;
// //           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
// //           margin-bottom: 24px;
// //         }

// //         .control-group {
// //           display: flex;
// //           flex-direction: column;
// //           flex: 1;
// //           min-width: 140px;
// //         }

// //         .control-group label {
// //           font-size: 0.75rem;
// //           font-weight: 600;
// //           text-transform: uppercase;
// //           letter-spacing: 0.5px;
// //           color: #6b5a4a;
// //           margin-bottom: 4px;
// //         }

// //         .control-group select {
// //           padding: 8px 12px;
// //           border: 1px solid #d4c5a9;
// //           border-radius: 8px;
// //           background: white;
// //           font-size: 0.95rem;
// //           color: #2c1810;
// //           cursor: pointer;
// //         }

// //         .demo-badge {
// //           padding: 8px 16px;
// //           background: #f0ece3;
// //           border-radius: 8px;
// //           font-size: 0.8rem;
// //           color: #5a4a3a;
// //           border: 1px dashed #b8a690;
// //           white-space: nowrap;
// //         }

// //         .content-area {
// //           background: white;
// //           border-radius: 12px;
// //           padding: 24px 28px;
// //           box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
// //         }

// //         .loading {
// //           text-align: center;
// //           padding: 40px 0;
// //           color: #6b5a4a;
// //         }

// //         .chapter-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           border-bottom: 1px solid #e8e0d6;
// //           padding-bottom: 12px;
// //           margin-bottom: 20px;
// //         }

// //         .chapter-header h2 {
// //           margin: 0;
// //           color: #2c1810;
// //           font-size: 1.5rem;
// //         }

// //         .translation-badge {
// //           background: #e8e0d6;
// //           padding: 4px 12px;
// //           border-radius: 20px;
// //           font-size: 0.75rem;
// //           font-weight: 600;
// //           color: #4a3f33;
// //         }

// //         .verses-container {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 12px;
// //         }

// //         .verse-block {
// //           padding: 12px 16px;
// //           border-radius: 8px;
// //           transition: background 0.15s;
// //           border-left: 3px solid transparent;
// //         }

// //         .verse-block:hover {
// //           background: #f8f5f0;
// //           border-left-color: #d4c5a9;
// //         }

// //         .verse-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 4px;
// //         }

// //         .verse-number {
// //           font-weight: 700;
// //           color: #8a7a6a;
// //           font-size: 0.8rem;
// //           min-width: 32px;
// //         }

// //         .verse-actions {
// //           display: flex;
// //           gap: 6px;
// //         }

// //         .note-toggle {
// //           background: none;
// //           border: none;
// //           cursor: pointer;
// //           font-size: 1rem;
// //           padding: 2px 6px;
// //           border-radius: 4px;
// //           opacity: 0.6;
// //           transition: opacity 0.2s;
// //         }

// //         .note-toggle:hover {
// //           opacity: 1;
// //           background: #e8e0d6;
// //         }

// //         .verse-text {
// //           font-size: 1.05rem;
// //           line-height: 1.7;
// //           color: #1a1410;
// //           padding-left: 36px;
// //         }

// //         .verse-text .cross-ref {
// //           background: #f0ece3;
// //           color: #7a4a2a;
// //           padding: 1px 6px;
// //           border-radius: 4px;
// //           font-size: 0.8rem;
// //           font-weight: 500;
// //           margin: 0 2px;
// //           cursor: help;
// //           border-bottom: 1px dashed #b8a690;
// //         }

// //         .note-editor {
// //           margin-top: 10px;
// //           margin-left: 36px;
// //           padding: 12px;
// //           background: #f8f5f0;
// //           border-radius: 8px;
// //           border: 1px solid #e0d6c8;
// //         }

// //         .note-editor textarea {
// //           width: 100%;
// //           padding: 10px;
// //           border: 1px solid #d4c5a9;
// //           border-radius: 6px;
// //           font-family: inherit;
// //           font-size: 0.95rem;
// //           resize: vertical;
// //           background: white;
// //         }

// //         .note-actions {
// //           display: flex;
// //           gap: 8px;
// //           margin-top: 8px;
// //           flex-wrap: wrap;
// //         }

// //         .note-actions button {
// //           padding: 6px 16px;
// //           border: none;
// //           border-radius: 6px;
// //           font-size: 0.85rem;
// //           cursor: pointer;
// //           transition: background 0.2s;
// //         }

// //         .save-note-btn {
// //           background: #2c1810;
// //           color: white;
// //         }
// //         .save-note-btn:hover {
// //           background: #4a2f24;
// //         }

// //         .delete-note-btn {
// //           background: #d4a0a0;
// //           color: #4a1a1a;
// //         }
// //         .delete-note-btn:hover {
// //           background: #c08080;
// //         }

// //         .cancel-note-btn {
// //           background: #e8e0d6;
// //           color: #4a3f33;
// //         }
// //         .cancel-note-btn:hover {
// //           background: #d4c5a9;
// //         }

// //         .saved-note {
// //           margin-top: 6px;
// //           margin-left: 36px;
// //           padding: 10px 14px;
// //           background: #f0ece3;
// //           border-left: 4px solid #8a7a6a;
// //           border-radius: 4px;
// //           font-size: 0.92rem;
// //         }

// //         .saved-note .note-label {
// //           font-weight: 600;
// //           color: #5a4a3a;
// //           margin-right: 8px;
// //         }

// //         .saved-note p {
// //           margin: 4px 0 0;
// //           color: #2c1810;
// //           line-height: 1.5;
// //         }

// //         .chapter-stats {
// //           margin-top: 24px;
// //           padding-top: 16px;
// //           border-top: 1px solid #e8e0d6;
// //           color: #6b5a4a;
// //           font-size: 0.85rem;
// //           text-align: center;
// //         }

// //         @media (max-width: 600px) {
// //           .bible-container {
// //             padding: 12px;
// //           }
// //           .content-area {
// //             padding: 16px;
// //           }
// //           .controls {
// //             flex-direction: column;
// //           }
// //           .control-group {
// //             min-width: 100%;
// //           }
// //           .demo-badge {
// //             white-space: normal;
// //             text-align: center;
// //           }
// //           .verse-text {
// //             font-size: 0.95rem;
// //             padding-left: 4px;
// //           }
// //           .note-editor {
// //             margin-left: 0;
// //           }
// //           .saved-note {
// //             margin-left: 0;
// //           }
// //           .verse-header {
// //             flex-wrap: wrap;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect } from "react";

// // --- TYPES ---
// interface Verse {
//   verse: number;
//   text: string;
// }

// interface ChapterData {
//   reference: string;
//   verses: Verse[];
//   translation: string;
// }

// interface SermonPoint {
//   id: string;
//   title: string;
//   description: string;
//   scriptures: string[];
// }

// interface Sermon {
//   id: string;
//   title: string;
//   topic: string;
//   date: string;
//   mainScripture: string;
//   points: SermonPoint[];
//   summary: string;
//   status: "draft" | "prepared" | "preached";
//   tags: string[];
//   createdAt: string;
//   updatedAt: string;
// }

// interface PendingTopic {
//   id: string;
//   title: string;
//   description: string;
//   priority: "low" | "medium" | "high";
//   status: "pending" | "studying" | "completed";
//   createdAt: string;
//   notes: string;
// }

// interface ConfusingPart {
//   id: string;
//   scripture: string;
//   question: string;
//   context: string;
//   status: "unresolved" | "researching" | "resolved";
//   insights: string;
//   createdAt: string;
//   resolvedAt?: string;
// }

// interface ResearchTopic {
//   id: string;
//   title: string;
//   description: string;
//   mainScriptures: string[];
//   keyPoints: string[];
//   myFindings: string;
//   questions: string[];
//   resources: string[]; // Books, articles, podcasts, etc.
//   status: "not-started" | "studying" | "deep-dive" | "completed";
//   priority: "low" | "medium" | "high";
//   tags: string[];
//   createdAt: string;
//   updatedAt: string;
//   lastStudied?: string;
// }

// // --- DEMO BIBLE DATA (Gospel of John, Chapters 1-3) ---
// const DEMO_BIBLE: { [key: string]: { [key: number]: ChapterData } } = {
//   John: {
//     1: {
//       reference: "John 1",
//       translation: "KJV",
//       verses: [
//         {
//           verse: 1,
//           text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
//         },
//         { verse: 2, text: "The same was in the beginning with God." },
//         {
//           verse: 3,
//           text: "All things were made by him; and without him was not any thing made that was made.",
//         },
//         {
//           verse: 4,
//           text: "In him was life; and the life was the light of men.",
//         },
//         {
//           verse: 5,
//           text: "And the light shineth in darkness; and the darkness comprehended it not.",
//         },
//         {
//           verse: 6,
//           text: "There was a man sent from God, whose name was John.",
//         },
//         {
//           verse: 7,
//           text: "The same came for a witness, to bear witness of the Light, that all men through him might believe.",
//         },
//         {
//           verse: 8,
//           text: "He was not that Light, but was sent to bear witness of that Light.",
//         },
//         {
//           verse: 9,
//           text: "That was the true Light, which lighteth every man that cometh into the world.",
//         },
//         {
//           verse: 10,
//           text: "He was in the world, and the world was made by him, and the world knew him not.",
//         },
//         {
//           verse: 11,
//           text: "He came unto his own, and his own received him not.",
//         },
//         {
//           verse: 12,
//           text: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:",
//         },
//         {
//           verse: 13,
//           text: "Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God.",
//         },
//         {
//           verse: 14,
//           text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
//         },
//         {
//           verse: 15,
//           text: "John bare witness of him, and cried, saying, This was he of whom I spake, He that cometh after me is preferred before me: for he was before me.",
//         },
//         {
//           verse: 16,
//           text: "And of his fulness have all we received, and grace for grace.",
//         },
//         {
//           verse: 17,
//           text: "For the law was given by Moses, but grace and truth came by Jesus Christ.",
//         },
//         {
//           verse: 18,
//           text: "No man hath seen God at any time; the only begotten Son, which is in the bosom of the Father, he hath declared him.",
//         },
//         {
//           verse: 19,
//           text: "And this is the record of John, when the Jews sent priests and Levites from Jerusalem to ask him, Who art thou?",
//         },
//         {
//           verse: 20,
//           text: "And he confessed, and denied not; but confessed, I am not the Christ.",
//         },
//         {
//           verse: 21,
//           text: "And they asked him, What then? Art thou Elias? And he saith, I am not. Art thou that prophet? And he answered, No.",
//         },
//         {
//           verse: 22,
//           text: "Then said they unto him, Who art thou? that we may give an answer to them that sent us. What sayest thou of thyself?",
//         },
//         {
//           verse: 23,
//           text: "He said, I am the voice of one crying in the wilderness, Make straight the way of the Lord, as said the prophet Esaias.",
//         },
//         { verse: 24, text: "And they which were sent were of the Pharisees." },
//         {
//           verse: 25,
//           text: "And they asked him, and said unto him, Why baptizest thou then, if thou be not that Christ, nor Elias, neither that prophet?",
//         },
//         {
//           verse: 26,
//           text: "John answered them, saying, I baptize with water: but there standeth one among you, whom ye know not;",
//         },
//         {
//           verse: 27,
//           text: "He it is, who coming after me is preferred before me, whose shoe's latchet I am not worthy to unloose.",
//         },
//         {
//           verse: 28,
//           text: "These things were done in Bethabara beyond Jordan, where John was baptizing.",
//         },
//         {
//           verse: 29,
//           text: "The next day John seeth Jesus coming unto him, and saith, Behold the Lamb of God, which taketh away the sin of the world.",
//         },
//         {
//           verse: 30,
//           text: "This is he of whom I said, After me cometh a man which is preferred before me: for he was before me.",
//         },
//         {
//           verse: 31,
//           text: "And I knew him not: but that he should be made manifest to Israel, therefore am I come baptizing with water.",
//         },
//         {
//           verse: 32,
//           text: "And John bare record, saying, I saw the Spirit descending from heaven like a dove, and it abode upon him.",
//         },
//         {
//           verse: 33,
//           text: "And I knew him not: but he that sent me to baptize with water, the same said unto me, Upon whom thou shalt see the Spirit descending, and remaining on him, the same is he which baptizeth with the Holy Ghost.",
//         },
//         {
//           verse: 34,
//           text: "And I saw, and bare record that this is the Son of God.",
//         },
//         {
//           verse: 35,
//           text: "Again the next day after John stood, and two of his disciples;",
//         },
//         {
//           verse: 36,
//           text: "And looking upon Jesus as he walked, he saith, Behold the Lamb of God!",
//         },
//         {
//           verse: 37,
//           text: "And the two disciples heard him speak, and they followed Jesus.",
//         },
//         {
//           verse: 38,
//           text: "Then Jesus turned, and saw them following, and saith unto them, What seek ye? They said unto him, Rabbi, (which is to say, being interpreted, Master,) where dwellest thou?",
//         },
//         {
//           verse: 39,
//           text: "He saith unto them, Come and see. They came and saw where he dwelt, and abode with him that day: for it was about the tenth hour.",
//         },
//         {
//           verse: 40,
//           text: "One of the two which heard John speak, and followed him, was Andrew, Simon Peter's brother.",
//         },
//         {
//           verse: 41,
//           text: "He first findeth his own brother Simon, and saith unto him, We have found the Messias, which is, being interpreted, the Christ.",
//         },
//         {
//           verse: 42,
//           text: "And he brought him to Jesus. And when Jesus beheld him, he said, Thou art Simon the son of Jona: thou shalt be called Cephas, which is by interpretation, A stone.",
//         },
//         {
//           verse: 43,
//           text: "The day following Jesus would go forth into Galilee, and findeth Philip, and saith unto him, Follow me.",
//         },
//         {
//           verse: 44,
//           text: "Now Philip was of Bethsaida, the city of Andrew and Peter.",
//         },
//         {
//           verse: 45,
//           text: "Philip findeth Nathanael, and saith unto him, We have found him, of whom Moses in the law, and the prophets, did write, Jesus of Nazareth, the son of Joseph.",
//         },
//         {
//           verse: 46,
//           text: "And Nathanael said unto him, Can there any good thing come out of Nazareth? Philip saith unto him, Come and see.",
//         },
//         {
//           verse: 47,
//           text: "Jesus saw Nathanael coming to him, and saith of him, Behold an Israelite indeed, in whom is no guile!",
//         },
//         {
//           verse: 48,
//           text: "Nathanael saith unto him, Whence knowest thou me? Jesus answered and said unto him, Before that Philip called thee, when thou wast under the fig tree, I saw thee.",
//         },
//         {
//           verse: 49,
//           text: "Nathanael answered and saith unto him, Rabbi, thou art the Son of God; thou art the King of Israel.",
//         },
//         {
//           verse: 50,
//           text: "Jesus answered and said unto him, Because I said unto thee, I saw thee under the fig tree, believest thou? thou shalt see greater things than these.",
//         },
//         {
//           verse: 51,
//           text: "And he saith unto him, Verily, verily, I say unto you, Hereafter ye shall see heaven open, and the angels of God ascending and descending upon the Son of man.",
//         },
//       ],
//     },
//     2: {
//       reference: "John 2",
//       translation: "KJV",
//       verses: [
//         {
//           verse: 1,
//           text: "And the third day there was a marriage in Cana of Galilee; and the mother of Jesus was there:",
//         },
//         {
//           verse: 2,
//           text: "And both Jesus was called, and his disciples, to the marriage.",
//         },
//         {
//           verse: 3,
//           text: "And when they wanted wine, the mother of Jesus saith unto him, They have no wine.",
//         },
//         {
//           verse: 4,
//           text: "Jesus saith unto her, Woman, what have I to do with thee? mine hour is not yet come.",
//         },
//         {
//           verse: 5,
//           text: "His mother saith unto the servants, Whatsoever he saith unto you, do it.",
//         },
//         {
//           verse: 6,
//           text: "And there were set there six waterpots of stone, after the manner of the purifying of the Jews, containing two or three firkins apiece.",
//         },
//         {
//           verse: 7,
//           text: "Jesus saith unto them, Fill the waterpots with water. And they filled them up to the brim.",
//         },
//         {
//           verse: 8,
//           text: "And he saith unto them, Draw out now, and bear unto the governor of the feast. And they bare it.",
//         },
//         {
//           verse: 9,
//           text: "When the ruler of the feast had tasted the water that was made wine, and knew not whence it was: (but the servants which drew the water knew;) the governor of the feast called the bridegroom,",
//         },
//         {
//           verse: 10,
//           text: "And saith unto him, Every man at the beginning doth set forth good wine; and when men have well drunk, then that which is worse: but thou hast kept the good wine until now.",
//         },
//         {
//           verse: 11,
//           text: "This beginning of miracles did Jesus in Cana of Galilee, and manifested forth his glory; and his disciples believed on him.",
//         },
//         {
//           verse: 12,
//           text: "After this he went down to Capernaum, he, and his mother, and his brethren, and his disciples: and they continued there not many days.",
//         },
//         {
//           verse: 13,
//           text: "And the Jews' passover was at hand, and Jesus went up to Jerusalem,",
//         },
//         {
//           verse: 14,
//           text: "And found in the temple those that sold oxen and sheep and doves, and the changers of money sitting:",
//         },
//         {
//           verse: 15,
//           text: "And when he had made a scourge of small cords, he drove them all out of the temple, and the sheep, and the oxen; and poured out the changers' money, and overthrew the tables;",
//         },
//         {
//           verse: 16,
//           text: "And said unto them that sold doves, Take these things hence; make not my Father's house an house of merchandise.",
//         },
//         {
//           verse: 17,
//           text: "And his disciples remembered that it was written, The zeal of thine house hath eaten me up.",
//         },
//         {
//           verse: 18,
//           text: "Then answered the Jews and said unto him, What sign shewest thou unto us, seeing that thou doest these things?",
//         },
//         {
//           verse: 19,
//           text: "Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up.",
//         },
//         {
//           verse: 20,
//           text: "Then said the Jews, Forty and six years was this temple in building, and wilt thou rear it up in three days?",
//         },
//         { verse: 21, text: "But he spake of the temple of his body." },
//         {
//           verse: 22,
//           text: "When therefore he was risen from the dead, his disciples remembered that he had said this unto them; and they believed the scripture, and the word which Jesus had said.",
//         },
//         {
//           verse: 23,
//           text: "Now when he was in Jerusalem at the passover, in the feast day, many believed in his name, when they saw the miracles which he did.",
//         },
//         {
//           verse: 24,
//           text: "But Jesus did not commit himself unto them, because he knew all men,",
//         },
//         {
//           verse: 25,
//           text: "And needed not that any should testify of man: for he knew what was in man.",
//         },
//       ],
//     },
//     3: {
//       reference: "John 3",
//       translation: "KJV",
//       verses: [
//         {
//           verse: 1,
//           text: "There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:",
//         },
//         {
//           verse: 2,
//           text: "The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him.",
//         },
//         {
//           verse: 3,
//           text: "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God.",
//         },
//         {
//           verse: 4,
//           text: "Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother's womb, and be born?",
//         },
//         {
//           verse: 5,
//           text: "Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.",
//         },
//         {
//           verse: 6,
//           text: "That which is born of the flesh is flesh; and that which is born of the Spirit is spirit.",
//         },
//         {
//           verse: 7,
//           text: "Marvel not that I said unto thee, Ye must be born again.",
//         },
//         {
//           verse: 8,
//           text: "The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh, and whither it goeth: so is every one that is born of the Spirit.",
//         },
//         {
//           verse: 9,
//           text: "Nicodemus answered and said unto him, How can these things be?",
//         },
//         {
//           verse: 10,
//           text: "Jesus answered and said unto him, Art thou a master of Israel, and knowest not these things?",
//         },
//         {
//           verse: 11,
//           text: "Verily, verily, I say unto thee, We speak that we do know, and testify that we have seen; and ye receive not our witness.",
//         },
//         {
//           verse: 12,
//           text: "If I have told you earthly things, and ye believe not, how shall ye believe, if I tell you of heavenly things?",
//         },
//         {
//           verse: 13,
//           text: "And no man hath ascended up to heaven, but he that came down from heaven, even the Son of man which is in heaven.",
//         },
//         {
//           verse: 14,
//           text: "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:",
//         },
//         {
//           verse: 15,
//           text: "That whosoever believeth in him should not perish, but have eternal life.",
//         },
//         {
//           verse: 16,
//           text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
//         },
//         {
//           verse: 17,
//           text: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved.",
//         },
//         {
//           verse: 18,
//           text: "He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.",
//         },
//         {
//           verse: 19,
//           text: "And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil.",
//         },
//         {
//           verse: 20,
//           text: "For every one that doeth evil hateth the light, neither cometh to the light, lest his deeds should be reproved.",
//         },
//         {
//           verse: 21,
//           text: "But he that doeth truth cometh to the light, that his deeds may be made manifest, that they are wrought in God.",
//         },
//         {
//           verse: 22,
//           text: "After these things came Jesus and his disciples into the land of Judaea; and there he tarried with them, and baptized.",
//         },
//         {
//           verse: 23,
//           text: "And John also was baptizing in Aenon near to Salim, because there was much water there: and they came, and were baptized.",
//         },
//         { verse: 24, text: "For John was not yet cast into prison." },
//         {
//           verse: 25,
//           text: "Then there arose a question between some of John's disciples and the Jews about purifying.",
//         },
//         {
//           verse: 26,
//           text: "And they came unto John, and said unto him, Rabbi, he that was with thee beyond Jordan, to whom thou barest witness, behold, the same baptizeth, and all men come to him.",
//         },
//         {
//           verse: 27,
//           text: "John answered and said, A man can receive nothing, except it be given him from heaven.",
//         },
//         {
//           verse: 28,
//           text: "Ye yourselves bear me witness, that I said, I am not the Christ, but that I am sent before him.",
//         },
//         {
//           verse: 29,
//           text: "He that hath the bride is the bridegroom: but the friend of the bridegroom, which standeth and heareth him, rejoiceth greatly because of the bridegroom's voice: this my joy therefore is fulfilled.",
//         },
//         { verse: 30, text: "He must increase, but I must decrease." },
//         {
//           verse: 31,
//           text: "He that cometh from above is above all: he that is of the earth is earthly, and speaketh of the earth: he that cometh from heaven is above all.",
//         },
//         {
//           verse: 32,
//           text: "And what he hath seen and heard, that he testifieth; and no man receiveth his testimony.",
//         },
//         {
//           verse: 33,
//           text: "He that hath received his testimony hath set to his seal that God is true.",
//         },
//         {
//           verse: 34,
//           text: "For he whom God hath sent speaketh the words of God: for God giveth not the Spirit by measure unto him.",
//         },
//         {
//           verse: 35,
//           text: "The Father loveth the Son, and hath given all things into his hand.",
//         },
//         {
//           verse: 36,
//           text: "He that believeth on the Son hath everlasting life: and he that believeth not the Son shall not see life; but the wrath of God abideth on him.",
//         },
//       ],
//     },
//   },
// };

// const AVAILABLE_BOOKS = ["John"];
// const AVAILABLE_CHAPTERS = [1, 2, 3];

// // --- SAMPLE DATA ---
// const SAMPLE_SERMONS: Sermon[] = [
//   {
//     id: "1",
//     title: "The Power of New Beginnings",
//     topic: "Transformation",
//     date: "2026-01-12",
//     mainScripture: "John 3:3",
//     points: [
//       {
//         id: "p1",
//         title: "Born Again",
//         description:
//           "Spiritual rebirth is essential for entering God's kingdom",
//         scriptures: ["John 3:3"],
//       },
//       {
//         id: "p2",
//         title: "Water and Spirit",
//         description: "Baptism and the Holy Spirit work together in salvation",
//         scriptures: ["John 3:5"],
//       },
//     ],
//     summary:
//       "Being born again transforms everything about our identity and purpose.",
//     status: "prepared",
//     tags: ["Salvation", "Holy Spirit", "Rebirth"],
//     createdAt: "2026-01-10T10:00:00Z",
//     updatedAt: "2026-01-10T10:00:00Z",
//   },
//   {
//     id: "2",
//     title: "God's Extravagant Love",
//     topic: "God's Character",
//     date: "2026-01-19",
//     mainScripture: "John 3:16",
//     points: [
//       {
//         id: "p3",
//         title: "God's Love is Global",
//         description:
//           "God's love extends to the entire world, not just one nation",
//         scriptures: ["John 3:16"],
//       },
//       {
//         id: "p4",
//         title: "The Ultimate Gift",
//         description: "God gave His Son, the most precious gift",
//         scriptures: ["John 3:16"],
//       },
//     ],
//     summary: "God's love is the foundation of our faith and hope.",
//     status: "draft",
//     tags: ["Love", "Grace", "Gospel"],
//     createdAt: "2026-01-15T10:00:00Z",
//     updatedAt: "2026-01-15T10:00:00Z",
//   },
// ];

// const SAMPLE_TOPICS: PendingTopic[] = [
//   {
//     id: "t1",
//     title: "The Meaning of 'Born Again'",
//     description:
//       "Explore what Jesus meant when He told Nicodemus he must be born again. Study the Greek word 'anothen' and its implications.",
//     priority: "high",
//     status: "studying",
//     createdAt: "2026-01-10T10:00:00Z",
//     notes: "Look into John 3:3-8. Compare with 1 Peter 1:23.",
//   },
//   {
//     id: "t2",
//     title: "Water and Spirit Baptism",
//     description:
//       "Understanding the relationship between water baptism and the baptism of the Holy Spirit.",
//     priority: "medium",
//     status: "pending",
//     createdAt: "2026-01-12T10:00:00Z",
//     notes: "Study Acts 2:38, Acts 19:1-6",
//   },
// ];

// const SAMPLE_CONFUSING: ConfusingPart[] = [
//   {
//     id: "c1",
//     scripture: "John 3:8",
//     question:
//       "How can the Spirit's work be compared to the wind? What does 'born of the Spirit' actually mean in practice?",
//     context:
//       "Nicodemus is confused about spiritual rebirth. Jesus uses the wind as an analogy.",
//     status: "researching",
//     insights:
//       "The Greek word 'pneuma' means both wind and spirit. Just as we see wind's effects but not its source, we see the Spirit's work but cannot fully understand it.",
//     createdAt: "2026-01-11T10:00:00Z",
//   },
//   {
//     id: "c2",
//     scripture: "John 3:13",
//     question: "How could Jesus be in heaven while speaking on earth?",
//     context: "Jesus is speaking to Nicodemus about ascending to heaven.",
//     status: "unresolved",
//     insights: "",
//     createdAt: "2026-01-14T10:00:00Z",
//   },
// ];

// // --- MAIN COMPONENT ---
// // type Tab = "bible" | "sermons" | "pending" | "confusing";
// type Tab = "bible" | "sermons" | "pending" | "confusing" | "research";

// export default function BibleStudyPlatform() {
//   // --- STATE ---
//   const [activeTab, setActiveTab] = useState<Tab>("bible");

//   // Bible state
//   const [selectedBook, setSelectedBook] = useState<string>("John");
//   const [selectedChapter, setSelectedChapter] = useState<number>(1);
//   const [chapterData, setChapterData] = useState<ChapterData | null>(null);
//   const [verseNotes, setVerseNotes] = useState<{ [key: string]: string }>({});
//   const [activeNoteVerse, setActiveNoteVerse] = useState<number | null>(null);
//   const [noteInput, setNoteInput] = useState<string>("");

//   // Sermon state
//   const [sermons, setSermons] = useState<Sermon[]>(SAMPLE_SERMONS);
//   const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
//   const [showSermonForm, setShowSermonForm] = useState(false);

//   // Pending topics state
//   const [pendingTopics, setPendingTopics] =
//     useState<PendingTopic[]>(SAMPLE_TOPICS);
//   const [editingTopic, setEditingTopic] = useState<PendingTopic | null>(null);
//   const [showTopicForm, setShowTopicForm] = useState(false);

//   // Confusing parts state
//   const [confusingParts, setConfusingParts] =
//     useState<ConfusingPart[]>(SAMPLE_CONFUSING);
//   const [editingConfusing, setEditingConfusing] =
//     useState<ConfusingPart | null>(null);
//   const [showConfusingForm, setShowConfusingForm] = useState(false);

//   // --- LOAD DATA FROM LOCALSTORAGE ---
//   useEffect(() => {
//     const savedNotes = localStorage.getItem("bibleStudyNotes");
//     if (savedNotes) {
//       try {
//         setVerseNotes(JSON.parse(savedNotes));
//       } catch (e) {}
//     }

//     const savedSermons = localStorage.getItem("sermons");
//     if (savedSermons) {
//       try {
//         setSermons(JSON.parse(savedSermons));
//       } catch (e) {}
//     }

//     const savedTopics = localStorage.getItem("pendingTopics");
//     if (savedTopics) {
//       try {
//         setPendingTopics(JSON.parse(savedTopics));
//       } catch (e) {}
//     }

//     const savedConfusing = localStorage.getItem("confusingParts");
//     if (savedConfusing) {
//       try {
//         setConfusingParts(JSON.parse(savedConfusing));
//       } catch (e) {}
//     }
//   }, []);

//   // --- SAVE DATA TO LOCALSTORAGE ---
//   useEffect(() => {
//     localStorage.setItem("bibleStudyNotes", JSON.stringify(verseNotes));
//   }, [verseNotes]);

//   useEffect(() => {
//     localStorage.setItem("sermons", JSON.stringify(sermons));
//   }, [sermons]);

//   useEffect(() => {
//     localStorage.setItem("pendingTopics", JSON.stringify(pendingTopics));
//   }, [pendingTopics]);

//   useEffect(() => {
//     localStorage.setItem("confusingParts", JSON.stringify(confusingParts));
//   }, [confusingParts]);

//   // --- BIBLE FUNCTIONS ---
//   useEffect(() => {
//     const bookData = DEMO_BIBLE[selectedBook as keyof typeof DEMO_BIBLE];
//     if (bookData && bookData[selectedChapter]) {
//       setChapterData(bookData[selectedChapter]);
//     } else {
//       setChapterData(null);
//     }
//   }, [selectedBook, selectedChapter]);

//   const getVerseKey = (verse: number) =>
//     `${selectedBook}_${selectedChapter}_${verse}`;

//   const handleSaveNote = (verse: number) => {
//     if (noteInput.trim()) {
//       setVerseNotes((prev) => ({
//         ...prev,
//         [getVerseKey(verse)]: noteInput.trim(),
//       }));
//       setActiveNoteVerse(null);
//       setNoteInput("");
//     }
//   };

//   const handleDeleteNote = (verse: number) => {
//     setVerseNotes((prev) => {
//       const newNotes = { ...prev };
//       delete newNotes[getVerseKey(verse)];
//       return newNotes;
//     });
//     setActiveNoteVerse(null);
//   };

//   const renderVerseText = (text: string) => {
//     const parts = text.split(/(\([^)]+\)|\[[^\]]+\])/);
//     return parts.map((part, index) => {
//       if (part.match(/^\([^)]+\)$/) || part.match(/^\[[^\]]+\]$/)) {
//         return (
//           <span
//             key={index}
//             className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded text-sm font-medium border-b border-dashed border-amber-300 mx-0.5"
//           >
//             {part}
//           </span>
//         );
//       }
//       return part;
//     });
//   };

//   // --- SERMON FUNCTIONS ---
//   const createSermon = (data: any) => {
//     const newSermon: Sermon = {
//       id: Date.now().toString(),
//       ...data,
//       points: data.points || [],
//       status: data.status || "draft",
//       tags: data.tags || [],
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
//     setSermons([newSermon, ...sermons]);
//     setShowSermonForm(false);
//     setEditingSermon(null);
//   };

//   const updateSermon = (id: string, data: any) => {
//     setSermons(
//       sermons.map((s) =>
//         s.id === id
//           ? { ...s, ...data, updatedAt: new Date().toISOString() }
//           : s,
//       ),
//     );
//     setShowSermonForm(false);
//     setEditingSermon(null);
//   };

//   const deleteSermon = (id: string) => {
//     if (confirm("Delete this sermon?")) {
//       setSermons(sermons.filter((s) => s.id !== id));
//     }
//   };

//   // --- PENDING TOPIC FUNCTIONS ---
//   const createTopic = (data: any) => {
//     const newTopic: PendingTopic = {
//       id: Date.now().toString(),
//       ...data,
//       priority: data.priority || "medium",
//       status: data.status || "pending",
//       createdAt: new Date().toISOString(),
//     };
//     setPendingTopics([newTopic, ...pendingTopics]);
//     setShowTopicForm(false);
//     setEditingTopic(null);
//   };

//   const updateTopic = (id: string, data: any) => {
//     setPendingTopics(
//       pendingTopics.map((t) => (t.id === id ? { ...t, ...data } : t)),
//     );
//     setShowTopicForm(false);
//     setEditingTopic(null);
//   };

//   const deleteTopic = (id: string) => {
//     if (confirm("Delete this topic?")) {
//       setPendingTopics(pendingTopics.filter((t) => t.id !== id));
//     }
//   };

//   // --- CONFUSING PART FUNCTIONS ---
//   const createConfusing = (data: any) => {
//     const newConfusing: ConfusingPart = {
//       id: Date.now().toString(),
//       ...data,
//       status: data.status || "unresolved",
//       createdAt: new Date().toISOString(),
//     };
//     setConfusingParts([newConfusing, ...confusingParts]);
//     setShowConfusingForm(false);
//     setEditingConfusing(null);
//   };

//   const updateConfusing = (id: string, data: any) => {
//     setConfusingParts(
//       confusingParts.map((c) => (c.id === id ? { ...c, ...data } : c)),
//     );
//     setShowConfusingForm(false);
//     setEditingConfusing(null);
//   };

//   const deleteConfusing = (id: string) => {
//     if (confirm("Delete this entry?")) {
//       setConfusingParts(confusingParts.filter((c) => c.id !== id));
//     }
//   };

//   // --- RENDER FUNCTIONS ---
//   const renderBibleTab = () => (
//     <div>
//       {/* Bible Controls */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-end">
//         <div className="flex-1 min-w-[140px]">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
//             Book
//           </label>
//           <select
//             className="w-full p-2.5 border border-stone-300 rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-800"
//             value={selectedBook}
//             onChange={(e) => setSelectedBook(e.target.value)}
//           >
//             {AVAILABLE_BOOKS.map((book) => (
//               <option key={book} value={book}>
//                 {book}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex-1 min-w-[140px]">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
//             Chapter
//           </label>
//           <select
//             className="w-full p-2.5 border border-stone-300 rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-800"
//             value={selectedChapter}
//             onChange={(e) => setSelectedChapter(Number(e.target.value))}
//           >
//             {AVAILABLE_CHAPTERS.map((ch) => (
//               <option key={ch} value={ch}>
//                 Chapter {ch}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="px-4 py-2 bg-stone-100 rounded-lg text-sm text-stone-600 border border-dashed border-stone-400 whitespace-nowrap">
//           📚 Demo: John 1-3
//         </div>
//       </div>

//       {/* Bible Content */}
//       <div className="bg-white rounded-xl shadow-sm p-6 md:p-7">
//         {chapterData ? (
//           <>
//             <div className="flex justify-between items-center border-b border-stone-200 pb-3 mb-5">
//               <h2 className="text-2xl font-bold text-stone-800">
//                 {chapterData.reference}
//               </h2>
//               <span className="bg-stone-200 px-3 py-1 rounded-full text-sm font-semibold text-stone-700">
//                 {chapterData.translation}
//               </span>
//             </div>
//             <div className="space-y-3">
//               {chapterData.verses.map((v) => {
//                 const verseKey = getVerseKey(v.verse);
//                 const hasNote = verseNotes[verseKey] !== undefined;

//                 return (
//                   <div
//                     key={v.verse}
//                     className="p-3 rounded-lg hover:bg-stone-50 transition-colors border-l-2 border-transparent hover:border-stone-300"
//                   >
//                     <div className="flex justify-between items-start">
//                       <span className="font-bold text-stone-500 text-sm min-w-[32px]">
//                         {v.verse}
//                       </span>
//                       <button
//                         className="text-lg opacity-60 hover:opacity-100 hover:bg-stone-200 rounded px-1.5 py-0.5 transition-all"
//                         onClick={() => {
//                           if (activeNoteVerse === v.verse) {
//                             setActiveNoteVerse(null);
//                           } else {
//                             setActiveNoteVerse(v.verse);
//                             setNoteInput(verseNotes[verseKey] || "");
//                           }
//                         }}
//                       >
//                         {hasNote ? "✏️" : "📝"}
//                       </button>
//                     </div>
//                     <div className="text-stone-800 text-base leading-relaxed pl-9">
//                       {renderVerseText(v.text)}
//                     </div>
//                     {activeNoteVerse === v.verse && (
//                       <div className="mt-3 ml-9 p-3 bg-stone-50 rounded-lg border border-stone-200">
//                         <textarea
//                           className="w-full p-2.5 border border-stone-300 rounded-lg font-inherit text-sm resize-y bg-white focus:outline-none focus:ring-2 focus:ring-stone-800"
//                           value={noteInput}
//                           onChange={(e) => setNoteInput(e.target.value)}
//                           placeholder="Write your insight here..."
//                           rows={3}
//                           autoFocus
//                         />
//                         <div className="flex gap-2 mt-2 flex-wrap">
//                           <button
//                             className="px-4 py-1.5 bg-stone-800 text-white rounded-lg text-sm hover:bg-stone-700 transition-colors"
//                             onClick={() => handleSaveNote(v.verse)}
//                           >
//                             💾 Save
//                           </button>
//                           {hasNote && (
//                             <button
//                               className="px-4 py-1.5 bg-rose-100 text-rose-800 rounded-lg text-sm hover:bg-rose-200 transition-colors"
//                               onClick={() => handleDeleteNote(v.verse)}
//                             >
//                               🗑️ Delete
//                             </button>
//                           )}
//                           <button
//                             className="px-4 py-1.5 bg-stone-200 text-stone-700 rounded-lg text-sm hover:bg-stone-300 transition-colors"
//                             onClick={() => {
//                               setActiveNoteVerse(null);
//                               setNoteInput("");
//                             }}
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                     {hasNote && activeNoteVerse !== v.verse && (
//                       <div className="mt-2 ml-9 p-2.5 bg-amber-50 border-l-4 border-amber-700 rounded text-sm">
//                         <span className="font-semibold text-amber-800 mr-2">
//                           📌 Insight:
//                         </span>
//                         <p className="text-stone-700 mt-1">
//                           {verseNotes[verseKey]}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="mt-6 pt-4 border-t border-stone-200 text-center text-sm text-stone-500">
//               <p>
//                 📊 {chapterData.verses.length} verses • 💡{" "}
//                 {
//                   Object.keys(verseNotes).filter((key) =>
//                     key.startsWith(`${selectedBook}_${selectedChapter}`),
//                   ).length
//                 }{" "}
//                 notes
//               </p>
//             </div>
//           </>
//         ) : (
//           <div className="text-center py-12 text-stone-500">
//             No data available
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderSermonsTab = () => (
//     <div>
//       <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
//         <h2 className="text-2xl font-bold text-stone-800">
//           📖 Sermon & Topic Preparation
//         </h2>
//         <button
//           className="px-5 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
//           onClick={() => {
//             setEditingSermon(null);
//             setShowSermonForm(true);
//           }}
//         >
//           + New Sermon
//         </button>
//       </div>

//       {/* Sermon Form */}
//       {showSermonForm && (
//         <SermonForm
//           sermon={editingSermon}
//           onSave={(data) => {
//             if (editingSermon) {
//               updateSermon(editingSermon.id, data);
//             } else {
//               createSermon(data);
//             }
//           }}
//           onCancel={() => {
//             setShowSermonForm(false);
//             setEditingSermon(null);
//           }}
//         />
//       )}

//       {/* Sermon List */}
//       <div className="space-y-4">
//         {sermons.length === 0 ? (
//           <div className="text-center py-12 px-6 bg-stone-50 rounded-xl border-2 border-dashed border-stone-300 text-stone-500">
//             <p>No sermons yet. Start preparing your first sermon!</p>
//           </div>
//         ) : (
//           sermons.map((sermon) => (
//             <div
//               key={sermon.id}
//               className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-stone-500"
//             >
//               <div className="flex justify-between items-start flex-wrap gap-3">
//                 <div>
//                   <h3 className="text-xl font-bold text-stone-800">
//                     {sermon.title}
//                   </h3>
//                   <div className="flex flex-wrap gap-2 mt-1.5 text-sm text-stone-500">
//                     <span
//                       className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
//                         sermon.status === "draft"
//                           ? "bg-stone-200 text-stone-700"
//                           : sermon.status === "prepared"
//                             ? "bg-emerald-100 text-emerald-800"
//                             : "bg-stone-800 text-white"
//                       }`}
//                     >
//                       {sermon.status}
//                     </span>
//                     <span>📅 {new Date(sermon.date).toLocaleDateString()}</span>
//                     <span>📖 {sermon.mainScripture}</span>
//                   </div>
//                 </div>
//                 <div className="flex gap-1">
//                   <button
//                     className="p-1.5 hover:bg-stone-100 rounded transition-colors"
//                     onClick={() => {
//                       setEditingSermon(sermon);
//                       setShowSermonForm(true);
//                     }}
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     className="p-1.5 hover:bg-rose-100 rounded transition-colors"
//                     onClick={() => deleteSermon(sermon.id)}
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               </div>
//               <p className="text-stone-600 mt-2">
//                 Topic: <span className="font-medium">{sermon.topic}</span>
//               </p>
//               <div className="mt-3">
//                 <strong className="text-stone-700">Key Points:</strong>
//                 <ul className="list-disc ml-6 mt-1 space-y-1 text-stone-600">
//                   {sermon.points.map((point) => (
//                     <li key={point.id}>
//                       <span className="font-medium">{point.title}</span> -{" "}
//                       {point.description}
//                       {point.scriptures.length > 0 && (
//                         <span className="text-amber-700 text-sm ml-1">
//                           {" "}
//                           📖 {point.scriptures.join(", ")}
//                         </span>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               {sermon.summary && (
//                 <div className="mt-3 p-3 bg-stone-50 rounded-lg text-stone-600 text-sm">
//                   <strong>Summary:</strong> {sermon.summary}
//                 </div>
//               )}
//               {sermon.tags.length > 0 && (
//                 <div className="flex flex-wrap gap-1.5 mt-3">
//                   {sermon.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-2.5 py-0.5 bg-stone-100 text-stone-600 rounded-full text-xs"
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );

//   const renderPendingTab = () => (
//     <div>
//       <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
//         <h2 className="text-2xl font-bold text-stone-800">⏳ Pending Topics</h2>
//         <button
//           className="px-5 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
//           onClick={() => {
//             setEditingTopic(null);
//             setShowTopicForm(true);
//           }}
//         >
//           + New Topic
//         </button>
//       </div>

//       {showTopicForm && (
//         <TopicForm
//           topic={editingTopic}
//           onSave={(data) => {
//             if (editingTopic) {
//               updateTopic(editingTopic.id, data);
//             } else {
//               createTopic(data);
//             }
//           }}
//           onCancel={() => {
//             setShowTopicForm(false);
//             setEditingTopic(null);
//           }}
//         />
//       )}

//       <div className="space-y-3">
//         {pendingTopics.length === 0 ? (
//           <div className="text-center py-12 px-6 bg-stone-50 rounded-xl border-2 border-dashed border-stone-300 text-stone-500">
//             <p>No pending topics. Add ideas you want to study later!</p>
//           </div>
//         ) : (
//           pendingTopics.map((topic) => (
//             <div
//               key={topic.id}
//               className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${
//                 topic.priority === "high"
//                   ? "border-l-rose-500"
//                   : topic.priority === "medium"
//                     ? "border-l-amber-500"
//                     : "border-l-emerald-500"
//               }`}
//             >
//               <div className="flex justify-between items-start flex-wrap gap-3">
//                 <div>
//                   <h3 className="text-lg font-bold text-stone-800">
//                     {topic.title}
//                   </h3>
//                   <div className="flex flex-wrap gap-2 mt-1.5 text-sm">
//                     <span
//                       className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
//                         topic.status === "pending"
//                           ? "bg-amber-100 text-amber-800"
//                           : topic.status === "studying"
//                             ? "bg-blue-100 text-blue-800"
//                             : "bg-emerald-100 text-emerald-800"
//                       }`}
//                     >
//                       {topic.status}
//                     </span>
//                     <span
//                       className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
//                         topic.priority === "high"
//                           ? "bg-rose-100 text-rose-800"
//                           : topic.priority === "medium"
//                             ? "bg-amber-100 text-amber-800"
//                             : "bg-emerald-100 text-emerald-800"
//                       }`}
//                     >
//                       {topic.priority} priority
//                     </span>
//                     <span className="text-stone-400">
//                       📅 {new Date(topic.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex gap-1">
//                   <button
//                     className="p-1.5 hover:bg-stone-100 rounded transition-colors"
//                     onClick={() => {
//                       setEditingTopic(topic);
//                       setShowTopicForm(true);
//                     }}
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     className="p-1.5 hover:bg-rose-100 rounded transition-colors"
//                     onClick={() => deleteTopic(topic.id)}
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               </div>
//               <p className="text-stone-600 mt-2">{topic.description}</p>
//               {topic.notes && (
//                 <div className="mt-2.5 p-2.5 bg-stone-50 rounded-lg text-sm text-stone-600">
//                   <strong>Notes:</strong> {topic.notes}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );

//   const renderConfusingTab = () => (
//     <div>
//       <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
//         <h2 className="text-2xl font-bold text-stone-800">
//           ❓ Confusing Parts
//         </h2>
//         <button
//           className="px-5 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
//           onClick={() => {
//             setEditingConfusing(null);
//             setShowConfusingForm(true);
//           }}
//         >
//           + New Entry
//         </button>
//       </div>

//       {showConfusingForm && (
//         <ConfusingForm
//           entry={editingConfusing}
//           onSave={(data) => {
//             if (editingConfusing) {
//               updateConfusing(editingConfusing.id, data);
//             } else {
//               createConfusing(data);
//             }
//           }}
//           onCancel={() => {
//             setShowConfusingForm(false);
//             setEditingConfusing(null);
//           }}
//         />
//       )}

//       <div className="space-y-3">
//         {confusingParts.length === 0 ? (
//           <div className="text-center py-12 px-6 bg-stone-50 rounded-xl border-2 border-dashed border-stone-300 text-stone-500">
//             <p>
//               No confusing parts logged. Track passages you need to study
//               deeper!
//             </p>
//           </div>
//         ) : (
//           confusingParts.map((entry) => (
//             <div
//               key={entry.id}
//               className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${
//                 entry.status === "resolved"
//                   ? "border-l-emerald-500"
//                   : entry.status === "researching"
//                     ? "border-l-amber-500"
//                     : "border-l-rose-500"
//               }`}
//             >
//               <div className="flex justify-between items-start flex-wrap gap-3">
//                 <div>
//                   <h3 className="text-lg font-bold text-stone-800">
//                     📖 {entry.scripture}
//                   </h3>
//                   <div className="flex flex-wrap gap-2 mt-1.5 text-sm">
//                     <span
//                       className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
//                         entry.status === "unresolved"
//                           ? "bg-rose-100 text-rose-800"
//                           : entry.status === "researching"
//                             ? "bg-amber-100 text-amber-800"
//                             : "bg-emerald-100 text-emerald-800"
//                       }`}
//                     >
//                       {entry.status}
//                     </span>
//                     <span className="text-stone-400">
//                       📅 {new Date(entry.createdAt).toLocaleDateString()}
//                     </span>
//                     {entry.resolvedAt && (
//                       <span className="text-emerald-600">
//                         ✅ Resolved:{" "}
//                         {new Date(entry.resolvedAt).toLocaleDateString()}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex gap-1">
//                   <button
//                     className="p-1.5 hover:bg-stone-100 rounded transition-colors"
//                     onClick={() => {
//                       setEditingConfusing(entry);
//                       setShowConfusingForm(true);
//                     }}
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     className="p-1.5 hover:bg-rose-100 rounded transition-colors"
//                     onClick={() => deleteConfusing(entry.id)}
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               </div>
//               <p className="text-stone-700 mt-3">
//                 <strong>Question:</strong> {entry.question}
//               </p>
//               {entry.context && (
//                 <p className="text-stone-600 mt-1.5">
//                   <strong>Context:</strong> {entry.context}
//                 </p>
//               )}
//               {entry.insights && (
//                 <div className="mt-2.5 p-3 bg-emerald-50 rounded-lg text-sm text-stone-700 border border-emerald-100">
//                   <strong>💡 Insights:</strong> {entry.insights}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );

//   // --- MAIN RENDER ---
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6 bg-stone-50 min-h-screen font-sans">
//       <header className="text-center py-8 border-b-2 border-stone-300 mb-8">
//         <h1 className="text-3xl md:text-4xl font-bold text-stone-800">
//           📖 Personal Bible Study & Sermon Prep
//         </h1>
//         <p className="text-stone-500 mt-1">Study • Prepare • Organize • Grow</p>
//       </header>

//       {/* Navigation Tabs */}
//       <div className="flex flex-wrap gap-1.5 mb-6 border-b-2 border-stone-200 pb-1">
//         {[
//           { id: "bible", label: "📖 Bible", count: null },
//           { id: "sermons", label: "📝 Sermons", count: sermons.length },
//           { id: "pending", label: "⏳ Pending", count: pendingTopics.length },
//           {
//             id: "confusing",
//             label: "❓ Confusing",
//             count: confusingParts.length,
//           },
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             className={`px-4 py-2.5 rounded-t-lg font-medium transition-all ${
//               activeTab === tab.id
//                 ? "bg-stone-800 text-white"
//                 : "text-stone-600 hover:bg-stone-200"
//             }`}
//             onClick={() => setActiveTab(tab.id as Tab)}
//           >
//             {tab.label}
//             {tab.count !== null && (
//               <span className="ml-1.5 text-sm opacity-75">({tab.count})</span>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="mt-4">
//         {activeTab === "bible" && renderBibleTab()}
//         {activeTab === "sermons" && renderSermonsTab()}
//         {activeTab === "pending" && renderPendingTab()}
//         {activeTab === "confusing" && renderConfusingTab()}
//       </div>
//     </div>
//   );
// }

// // --- SUB-COMPONENTS ---

// // Sermon Form
// function SermonForm({
//   sermon,
//   onSave,
//   onCancel,
// }: {
//   sermon?: Sermon | null;
//   onSave: (data: any) => void;
//   onCancel: () => void;
// }) {
//   const [formData, setFormData] = useState({
//     title: sermon?.title || "",
//     topic: sermon?.topic || "",
//     date: sermon?.date || new Date().toISOString().split("T")[0],
//     mainScripture: sermon?.mainScripture || "",
//     points: sermon?.points || [
//       { id: Date.now().toString(), title: "", description: "", scriptures: [] },
//     ],
//     summary: sermon?.summary || "",
//     status: sermon?.status || "draft",
//     tags: sermon?.tags?.join(", ") || "",
//   });

//   const addPoint = () => {
//     setFormData({
//       ...formData,
//       points: [
//         ...formData.points,
//         {
//           id: Date.now().toString(),
//           title: "",
//           description: "",
//           scriptures: [],
//         },
//       ],
//     });
//   };

//   const updatePoint = (index: number, field: string, value: any) => {
//     const newPoints = [...formData.points];
//     newPoints[index] = { ...newPoints[index], [field]: value };
//     setFormData({ ...formData, points: newPoints });
//   };

//   const removePoint = (index: number) => {
//     setFormData({
//       ...formData,
//       points: formData.points.filter((_, i) => i !== index),
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave({
//       ...formData,
//       tags: formData.tags
//         .split(",")
//         .map((t) => t.trim())
//         .filter(Boolean),
//     });
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-stone-200">
//       <h3 className="text-xl font-bold text-stone-800 mt-0 mb-4">
//         {sermon ? "Edit Sermon" : "New Sermon"}
//       </h3>
//       <form onSubmit={handleSubmit}>
//         <div className="grid md:grid-cols-2 gap-4">
//           <div className="form-group">
//             <label className="block font-medium text-stone-700 mb-1 text-sm">
//               Title *
//             </label>
//             <input
//               className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//               required
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//             />
//           </div>
//           <div className="form-group">
//             <label className="block font-medium text-stone-700 mb-1 text-sm">
//               Topic *
//             </label>
//             <input
//               className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//               required
//               value={formData.topic}
//               onChange={(e) =>
//                 setFormData({ ...formData, topic: e.target.value })
//               }
//             />
//           </div>
//         </div>
//         <div className="grid md:grid-cols-2 gap-4 mt-3">
//           <div className="form-group">
//             <label className="block font-medium text-stone-700 mb-1 text-sm">
//               Date
//             </label>
//             <input
//               type="date"
//               className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//               value={formData.date}
//               onChange={(e) =>
//                 setFormData({ ...formData, date: e.target.value })
//               }
//             />
//           </div>
//           <div className="form-group">
//             <label className="block font-medium text-stone-700 mb-1 text-sm">
//               Main Scripture
//             </label>
//             <input
//               className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//               placeholder="e.g., John 3:16"
//               value={formData.mainScripture}
//               onChange={(e) =>
//                 setFormData({ ...formData, mainScripture: e.target.value })
//               }
//             />
//           </div>
//         </div>
//         <div className="form-group mt-3">
//           <label className="block font-medium text-stone-700 mb-1 text-sm">
//             Status
//           </label>
//           <select
//             className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//             value={formData.status}
//             onChange={(e) =>
//               setFormData({ ...formData, status: e.target.value as any })
//             }
//           >
//             <option value="draft">Draft</option>
//             <option value="prepared">Prepared</option>
//             <option value="preached">Preached</option>
//           </select>
//         </div>

//         <div className="form-group mt-3">
//           <label className="block font-medium text-stone-700 mb-2 text-sm">
//             Key Points
//           </label>
//           {formData.points.map((point, idx) => (
//             <div
//               key={point.id}
//               className="bg-stone-50 p-3 rounded-lg mb-2.5 border border-stone-200"
//             >
//               <div className="grid md:grid-cols-2 gap-3">
//                 <div className="form-group">
//                   <label className="block text-xs font-medium text-stone-600 mb-0.5">
//                     Point Title
//                   </label>
//                   <input
//                     className="w-full p-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//                     value={point.title}
//                     onChange={(e) => updatePoint(idx, "title", e.target.value)}
//                     placeholder="e.g., God's Love"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="block text-xs font-medium text-stone-600 mb-0.5">
//                     Scriptures (comma separated)
//                   </label>
//                   <input
//                     className="w-full p-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//                     value={point.scriptures.join(", ")}
//                     onChange={(e) =>
//                       updatePoint(
//                         idx,
//                         "scriptures",
//                         e.target.value
//                           .split(",")
//                           .map((s) => s.trim())
//                           .filter(Boolean),
//                       )
//                     }
//                     placeholder="e.g., John 3:16, Romans 8:28"
//                   />
//                 </div>
//               </div>
//               <div className="form-group mt-2">
//                 <label className="block text-xs font-medium text-stone-600 mb-0.5">
//                   Description
//                 </label>
//                 <textarea
//                   className="w-full p-2 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
//                   value={point.description}
//                   onChange={(e) =>
//                     updatePoint(idx, "description", e.target.value)
//                   }
//                   placeholder="What does this point mean?"
//                   rows={2}
//                 />
//               </div>
//               {formData.points.length > 1 && (
//                 <button
//                   type="button"
//                   className="mt-1.5 px-3 py-1 bg-rose-100 text-rose-800 rounded-lg text-xs hover:bg-rose-200 transition-colors"
//                   onClick={() => removePoint(idx)}
//                 >
//                   Remove Point
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             className="px-4 py-1.5 bg-stone-200 text-stone-700 rounded-lg text-sm hover:bg-stone-300 transition-colors"
//             onClick={addPoint}
//           >
//             + Add Point
//           </button>
//         </div>

//         <div className="form-group mt-3">
//           <label className="block font-medium text-stone-700 mb-1 text-sm">
//             Summary
//           </label>
//           <textarea
//             className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
//             value={formData.summary}
//             onChange={(e) =>
//               setFormData({ ...formData, summary: e.target.value })
//             }
//             rows={3}
//             placeholder="Brief summary of the sermon..."
//           />
//         </div>

//         <div className="form-group mt-3">
//           <label className="block font-medium text-stone-700 mb-1 text-sm">
//             Tags (comma separated)
//           </label>
//           <input
//             className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//             value={formData.tags}
//             onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
//             placeholder="e.g., Grace, Faith, Love"
//           />
//         </div>

//         <div className="flex gap-3 mt-5">
//           <button
//             type="submit"
//             className="px-6 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
//           >
//             💾 Save Sermon
//           </button>
//           <button
//             type="button"
//             className="px-6 py-2.5 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-medium"
//             onClick={onCancel}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// // Topic Form
// function TopicForm({
//   topic,
//   onSave,
//   onCancel,
// }: {
//   topic?: PendingTopic | null;
//   onSave: (data: any) => void;
//   onCancel: () => void;
// }) {
//   const [formData, setFormData] = useState({
//     title: topic?.title || "",
//     description: topic?.description || "",
//     priority: topic?.priority || "medium",
//     status: topic?.status || "pending",
//     notes: topic?.notes || "",
//   });

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-stone-200">
//       <h3 className="text-xl font-bold text-stone-800 mt-0 mb-4">
//         {topic ? "Edit Topic" : "New Topic"}
//       </h3>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           onSave(formData);
//         }}
//       >
//         <div className="form-group">
//           <label className="block font-medium text-stone-700 mb-1 text-sm">
//             Title *
//           </label>
//           <input
//             className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//             required
//             value={formData.title}
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//           />
//         </div>
//         <div className="form-group mt-3">
//           <label className="block font-medium text-stone-700 mb-1 text-sm">
//             Description
//           </label>
//           <textarea
//             className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//             rows={2}
//           />
//         </div>
//         <div className="grid md:grid-cols-2 gap-4 mt-3">
//           <div className="form-group">
//             <label className="block font-medium text-stone-700 mb-1 text-sm">
//               Priority
//             </label>
//             <select
//               className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//               value={formData.priority}
//               onChange={(e) =>
//                 setFormData({ ...formData, priority: e.target.value as any })
//               }
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label className="block font-medium text-stone-700 mb-1 text-sm">
//               Status
//             </label>
//             <select
//               className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//               value={formData.status}
//               onChange={(e) =>
//                 setFormData({ ...formData, status: e.target.value as any })
//               }
//             >
//               <option value="pending">Pending</option>
//               <option value="studying">Studying</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//         </div>
//         <div className="form-group mt-3">
//           <label className="block font-medium text-stone-700 mb-1 text-sm">
//             Notes
//           </label>
//           <textarea
//             className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
//             value={formData.notes}
//             onChange={(e) =>
//               setFormData({ ...formData, notes: e.target.value })
//             }
//             rows={3}
//             placeholder="Additional thoughts..."
//           />
//         </div>
//         <div className="flex gap-3 mt-5">
//           <button
//             type="submit"
//             className="px-6 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
//           >
//             💾 Save Topic
//           </button>
//           <button
//             type="button"
//             className="px-6 py-2.5 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-medium"
//             onClick={onCancel}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// // Confusing Form
// function ConfusingForm({
//   entry,
//   onSave,
//   onCancel,
// }: {
//   entry?: ConfusingPart | null;
//   onSave: (data: any) => void;
//   onCancel: () => void;
// }) {
//   const [formData, setFormData] = useState({
//     scripture: entry?.scripture || "",
//     question: entry?.question || "",
//     context: entry?.context || "",
//     status: entry?.status || "unresolved",
//     insights: entry?.insights || "",
//   });

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-stone-200">
//       <h3 className="text-xl font-bold text-stone-800 mt-0 mb-4">
//         {entry ? "Edit Entry" : "New Confusing Part"}
//       </h3>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           onSave(formData);
//         }}
//       >
//         <div className="form-group">
//           <label className="block font-medium text-stone-700 mb-1 text-sm">
//             Scripture *
//           </label>
//           <input
//             className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//             required
//             value={formData.scripture}
//             onChange={(e) =>
//               setFormData({ ...formData, scripture: e.target.value })
//             }
//             placeholder="e.g., John 3:16"
//           />
//         </div>
//         <div className="form-group mt-3">
//           <label className="block font-medium text-stone-700 mb-1 text-sm">
//             Question *
//           </label>
//           <textarea
//             className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
//             required
//             value={formData.question}
//             onChange={(e) =>
//               setFormData({ ...formData, question: e.target.value })
//             }
//             rows={2}
//             placeholder="What confuses you about this passage?"
//           />
//         </div>
//         <div className="form-group mt-3">
//           <label className="block font-medium text-stone-700 mb-1 text-sm">
//             Context
//           </label>
//           <textarea
//             className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
//             value={formData.context}
//             onChange={(e) =>
//               setFormData({ ...formData, context: e.target.value })
//             }
//             rows={2}
//             placeholder="Chapter context, surrounding verses..."
//           />
//         </div>
//         <div className="form-group mt-3">
//           <label className="block font-medium text-stone-700 mb-1 text-sm">
//             Status
//           </label>
//           <select
//             className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
//             value={formData.status}
//             onChange={(e) =>
//               setFormData({ ...formData, status: e.target.value as any })
//             }
//           >
//             <option value="unresolved">Unresolved</option>
//             <option value="researching">Researching</option>
//             <option value="resolved">Resolved</option>
//           </select>
//         </div>
//         <div className="form-group mt-3">
//           <label className="block font-medium text-stone-700 mb-1 text-sm">
//             Insights
//           </label>
//           <textarea
//             className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
//             value={formData.insights}
//             onChange={(e) =>
//               setFormData({ ...formData, insights: e.target.value })
//             }
//             rows={3}
//             placeholder="What have you learned?"
//           />
//         </div>
//         <div className="flex gap-3 mt-5">
//           <button
//             type="submit"
//             className="px-6 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
//           >
//             💾 Save Entry
//           </button>
//           <button
//             type="button"
//             className="px-6 py-2.5 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-medium"
//             onClick={onCancel}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";

// --- TYPES ---
interface Verse {
  verse: number;
  text: string;
}

interface ChapterData {
  reference: string;
  verses: Verse[];
  translation: string;
}

interface SermonPoint {
  id: string;
  title: string;
  description: string;
  scriptures: string[];
}

interface Sermon {
  id: string;
  title: string;
  topic: string;
  date: string;
  mainScripture: string;
  points: SermonPoint[];
  summary: string;
  status: "draft" | "prepared" | "preached";
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface PendingTopic {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "studying" | "completed";
  createdAt: string;
  notes: string;
}

interface ConfusingPart {
  id: string;
  scripture: string;
  question: string;
  context: string;
  status: "unresolved" | "researching" | "resolved";
  insights: string;
  createdAt: string;
  resolvedAt?: string;
}

interface ResearchTopic {
  id: string;
  title: string;
  description: string;
  mainScriptures: string[];
  keyPoints: string[];
  myFindings: string;
  questions: string[];
  resources: string[];
  status: "not-started" | "studying" | "deep-dive" | "completed";
  priority: "low" | "medium" | "high";
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastStudied?: string;
}

// --- DEMO BIBLE DATA (John 1, few verses) ---
const DEMO_BIBLE: { [key: string]: { [key: number]: ChapterData } } = {
  John: {
    1: {
      reference: "John 1",
      translation: "KJV",
      verses: [
        {
          verse: 1,
          text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
        },
        { verse: 2, text: "The same was in the beginning with God." },
        {
          verse: 3,
          text: "All things were made by him; and without him was not any thing made that was made.",
        },
        {
          verse: 4,
          text: "In him was life; and the life was the light of men.",
        },
        {
          verse: 5,
          text: "And the light shineth in darkness; and the darkness comprehended it not.",
        },
        {
          verse: 6,
          text: "There was a man sent from God, whose name was John.",
        },
        {
          verse: 7,
          text: "The same came for a witness, to bear witness of the Light, that all men through him might believe.",
        },
        {
          verse: 8,
          text: "He was not that Light, but was sent to bear witness of that Light.",
        },
        {
          verse: 9,
          text: "That was the true Light, which lighteth every man that cometh into the world.",
        },
        {
          verse: 10,
          text: "He was in the world, and the world was made by him, and the world knew him not.",
        },
        {
          verse: 11,
          text: "He came unto his own, and his own received him not.",
        },
        {
          verse: 12,
          text: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:",
        },
        {
          verse: 13,
          text: "Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God.",
        },
        {
          verse: 14,
          text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
        },
        {
          verse: 15,
          text: "John bare witness of him, and cried, saying, This was he of whom I spake, He that cometh after me is preferred before me: for he was before me.",
        },
        {
          verse: 16,
          text: "And of his fulness have all we received, and grace for grace.",
        },
        {
          verse: 17,
          text: "For the law was given by Moses, but grace and truth came by Jesus Christ.",
        },
        {
          verse: 18,
          text: "No man hath seen God at any time; the only begotten Son, which is in the bosom of the Father, he hath declared him.",
        },
      ],
    },
  },
};

const AVAILABLE_BOOKS = ["John"];
const AVAILABLE_CHAPTERS = [1];

// --- SAMPLE DATA ---
const SAMPLE_SERMONS: Sermon[] = [
  {
    id: "1",
    title: "The Power of New Beginnings",
    topic: "Transformation",
    date: "2026-01-12",
    mainScripture: "John 3:3",
    points: [
      {
        id: "p1",
        title: "Born Again",
        description:
          "Spiritual rebirth is essential for entering God's kingdom",
        scriptures: ["John 3:3"],
      },
      {
        id: "p2",
        title: "Water and Spirit",
        description: "Baptism and the Holy Spirit work together in salvation",
        scriptures: ["John 3:5"],
      },
    ],
    summary:
      "Being born again transforms everything about our identity and purpose.",
    status: "prepared",
    tags: ["Salvation", "Holy Spirit", "Rebirth"],
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "2",
    title: "God's Extravagant Love",
    topic: "God's Character",
    date: "2026-01-19",
    mainScripture: "John 3:16",
    points: [
      {
        id: "p3",
        title: "God's Love is Global",
        description: "God's love extends to the entire world",
        scriptures: ["John 3:16"],
      },
      {
        id: "p4",
        title: "The Ultimate Gift",
        description: "God gave His Son, the most precious gift",
        scriptures: ["John 3:16"],
      },
    ],
    summary: "God's love is the foundation of our faith and hope.",
    status: "draft",
    tags: ["Love", "Grace", "Gospel"],
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
];

const SAMPLE_TOPICS: PendingTopic[] = [
  {
    id: "t1",
    title: "The Meaning of 'Born Again'",
    description:
      "Explore what Jesus meant when He told Nicodemus he must be born again.",
    priority: "high",
    status: "studying",
    createdAt: "2026-01-10T10:00:00Z",
    notes: "Look into John 3:3-8. Compare with 1 Peter 1:23.",
  },
  {
    id: "t2",
    title: "Water and Spirit Baptism",
    description:
      "Understanding the relationship between water baptism and the baptism of the Holy Spirit.",
    priority: "medium",
    status: "pending",
    createdAt: "2026-01-12T10:00:00Z",
    notes: "Study Acts 2:38, Acts 19:1-6",
  },
];

const SAMPLE_CONFUSING: ConfusingPart[] = [
  {
    id: "c1",
    scripture: "John 3:8",
    question: "How can the Spirit's work be compared to the wind?",
    context: "Nicodemus is confused about spiritual rebirth.",
    status: "researching",
    insights: "The Greek word 'pneuma' means both wind and spirit.",
    createdAt: "2026-01-11T10:00:00Z",
  },
  {
    id: "c2",
    scripture: "John 3:13",
    question: "How could Jesus be in heaven while speaking on earth?",
    context: "Jesus is speaking to Nicodemus about ascending to heaven.",
    status: "unresolved",
    insights: "",
    createdAt: "2026-01-14T10:00:00Z",
  },
];

const SAMPLE_RESEARCH_TOPICS: ResearchTopic[] = [
  {
    id: "r1",
    title: "The Person and Work of the Holy Spirit",
    description:
      "Understanding who the Holy Spirit is, His role in the Trinity, and His work in the life of believers today.",
    mainScriptures: [
      "John 14:16-17===",
      "John 16:7-15",
      "Acts 2:1-4",
      "Romans 8:26-27",
    ],
    keyPoints: [
      "The Holy Spirit is a person, not just a force",
      "He is fully God - co-equal with the Father and Son",
      "He convicts the world of sin, righteousness, and judgment",
      "He indwells believers and seals them for salvation",
    ],
    myFindings:
      "The Holy Spirit is not an 'it' but a 'He' - this changes how we relate to Him. He is not just a power we tap into, but a person we commune with.",
    questions: [
      "What does it mean to 'quench' the Spirit?",
      "How do I discern the Spirit's leading vs. my own desires?",
    ],
    resources: [
      "Systematic Theology - Wayne Grudem",
      "Forgotten God - Francis Chan",
    ],
    status: "deep-dive",
    priority: "high",
    tags: ["Holy Spirit", "Trinity", "Theology"],
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
    lastStudied: "2026-01-15T10:00:00Z",
  },
  {
    id: "r2",
    title: "Understanding Our Relationship with God",
    description:
      "Exploring the nature of our relationship with God - what it means to be children of God.",
    mainScriptures: ["John 1:12", "Romans 8:14-17", "Galatians 4:4-7"],
    keyPoints: [
      "We are adopted as children of God through faith in Christ",
      "Relationship with God is based on grace, not performance",
      "Intimacy with God grows through prayer, Word, and obedience",
    ],
    myFindings:
      "The fatherhood of God is central to understanding our relationship with Him. Unlike earthly fathers who may fail, God is the perfect Father.",
    questions: [
      "How do I balance reverent fear of God with intimate love?",
      "What does it practically look like to 'abide' in Christ?",
    ],
    resources: ["Knowing God - J.I. Packer", "The Pursuit of God - A.W. Tozer"],
    status: "studying",
    priority: "high",
    tags: ["Relationship with God", "Adoption", "Identity"],
    createdAt: "2026-01-12T10:00:00Z",
    updatedAt: "2026-01-14T10:00:00Z",
    lastStudied: "2026-01-14T10:00:00Z",
  },
  {
    id: "r3",
    title: "The Doctrine of Grace",
    description:
      "Understanding God's unmerited favor - what grace truly means.",
    mainScriptures: ["Ephesians 2:8-9", "Romans 3:23-24", "Titus 2:11-14"],
    keyPoints: [
      "Grace is God's unmerited favor - we don't earn it",
      "Salvation is entirely by grace through faith",
      "Grace teaches us to say no to ungodliness",
    ],
    myFindings:
      "Grace is both the foundation of salvation and the power for sanctification. We're saved by grace AND we grow by grace.",
    questions: [
      "How do I avoid turning grace into a license to sin?",
      "What's the difference between cheap grace and costly grace?",
    ],
    resources: [
      "What's So Amazing About Grace? - Philip Yancey",
      "The Cost of Discipleship - Dietrich Bonhoeffer",
    ],
    status: "not-started",
    priority: "medium",
    tags: ["Grace", "Salvation", "Sanctification"],
    createdAt: "2026-01-13T10:00:00Z",
    updatedAt: "2026-01-13T10:00:00Z",
  },
];

// --- MAIN COMPONENT ---
type Tab = "bible" | "sermons" | "pending" | "confusing" | "research";

export default function BibleStudyPlatform() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState<Tab>("bible");

  // Bible state
  const [selectedBook, setSelectedBook] = useState<string>("John");
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [verseNotes, setVerseNotes] = useState<{ [key: string]: string }>({});
  const [activeNoteVerse, setActiveNoteVerse] = useState<number | null>(null);
  const [noteInput, setNoteInput] = useState<string>("");

  // Sermon state
  const [sermons, setSermons] = useState<Sermon[]>(SAMPLE_SERMONS);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [showSermonForm, setShowSermonForm] = useState(false);

  // Pending topics state
  const [pendingTopics, setPendingTopics] =
    useState<PendingTopic[]>(SAMPLE_TOPICS);
  const [editingTopic, setEditingTopic] = useState<PendingTopic | null>(null);
  const [showTopicForm, setShowTopicForm] = useState(false);

  // Confusing parts state
  const [confusingParts, setConfusingParts] =
    useState<ConfusingPart[]>(SAMPLE_CONFUSING);
  const [editingConfusing, setEditingConfusing] =
    useState<ConfusingPart | null>(null);
  const [showConfusingForm, setShowConfusingForm] = useState(false);

  // Research topics state
  const [researchTopics, setResearchTopics] = useState<ResearchTopic[]>(
    SAMPLE_RESEARCH_TOPICS,
  );
  const [editingResearch, setEditingResearch] = useState<ResearchTopic | null>(
    null,
  );
  const [showResearchForm, setShowResearchForm] = useState(false);
  const [selectedResearchId, setSelectedResearchId] = useState<string | null>(
    null,
  );

  // --- LOAD DATA FROM LOCALSTORAGE ---
  useEffect(() => {
    const savedNotes = localStorage.getItem("bibleStudyNotes");
    if (savedNotes) {
      try {
        setVerseNotes(JSON.parse(savedNotes));
      } catch (e) {}
    }

    const savedSermons = localStorage.getItem("sermons");
    if (savedSermons) {
      try {
        setSermons(JSON.parse(savedSermons));
      } catch (e) {}
    }

    const savedTopics = localStorage.getItem("pendingTopics");
    if (savedTopics) {
      try {
        setPendingTopics(JSON.parse(savedTopics));
      } catch (e) {}
    }

    const savedConfusing = localStorage.getItem("confusingParts");
    if (savedConfusing) {
      try {
        setConfusingParts(JSON.parse(savedConfusing));
      } catch (e) {}
    }

    const savedResearch = localStorage.getItem("researchTopics");
    if (savedResearch) {
      try {
        setResearchTopics(JSON.parse(savedResearch));
      } catch (e) {}
    }
  }, []);

  // --- SAVE DATA TO LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem("bibleStudyNotes", JSON.stringify(verseNotes));
  }, [verseNotes]);

  useEffect(() => {
    localStorage.setItem("sermons", JSON.stringify(sermons));
  }, [sermons]);

  useEffect(() => {
    localStorage.setItem("pendingTopics", JSON.stringify(pendingTopics));
  }, [pendingTopics]);

  useEffect(() => {
    localStorage.setItem("confusingParts", JSON.stringify(confusingParts));
  }, [confusingParts]);

  useEffect(() => {
    localStorage.setItem("researchTopics", JSON.stringify(researchTopics));
  }, [researchTopics]);

  // --- BIBLE FUNCTIONS ---
  useEffect(() => {
    const bookData = DEMO_BIBLE[selectedBook as keyof typeof DEMO_BIBLE];
    if (bookData && bookData[selectedChapter]) {
      setChapterData(bookData[selectedChapter]);
    } else {
      setChapterData(null);
    }
  }, [selectedBook, selectedChapter]);

  const getVerseKey = (verse: number) =>
    `${selectedBook}_${selectedChapter}_${verse}`;

  const handleSaveNote = (verse: number) => {
    if (noteInput.trim()) {
      setVerseNotes((prev) => ({
        ...prev,
        [getVerseKey(verse)]: noteInput.trim(),
      }));
      setActiveNoteVerse(null);
      setNoteInput("");
    }
  };

  const handleDeleteNote = (verse: number) => {
    setVerseNotes((prev) => {
      const newNotes = { ...prev };
      delete newNotes[getVerseKey(verse)];
      return newNotes;
    });
    setActiveNoteVerse(null);
  };

  const renderVerseText = (text: string) => {
    const parts = text.split(/(\([^)]+\)|\[[^\]]+\])/);
    return parts.map((part, index) => {
      if (part.match(/^\([^)]+\)$/) || part.match(/^\[[^\]]+\]$/)) {
        return (
          <span
            key={index}
            className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded text-sm font-medium border-b border-dashed border-amber-300 mx-0.5"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // --- SERMON FUNCTIONS ---
  const createSermon = (data: any) => {
    const newSermon: Sermon = {
      id: Date.now().toString(),
      ...data,
      points: data.points || [],
      status: data.status || "draft",
      tags: data.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSermons([newSermon, ...sermons]);
    setShowSermonForm(false);
    setEditingSermon(null);
  };

  const updateSermon = (id: string, data: any) => {
    setSermons(
      sermons.map((s) =>
        s.id === id
          ? { ...s, ...data, updatedAt: new Date().toISOString() }
          : s,
      ),
    );
    setShowSermonForm(false);
    setEditingSermon(null);
  };

  const deleteSermon = (id: string) => {
    if (confirm("Delete this sermon?")) {
      setSermons(sermons.filter((s) => s.id !== id));
    }
  };

  // --- PENDING TOPIC FUNCTIONS ---
  const createTopic = (data: any) => {
    const newTopic: PendingTopic = {
      id: Date.now().toString(),
      ...data,
      priority: data.priority || "medium",
      status: data.status || "pending",
      createdAt: new Date().toISOString(),
    };
    setPendingTopics([newTopic, ...pendingTopics]);
    setShowTopicForm(false);
    setEditingTopic(null);
  };

  const updateTopic = (id: string, data: any) => {
    setPendingTopics(
      pendingTopics.map((t) => (t.id === id ? { ...t, ...data } : t)),
    );
    setShowTopicForm(false);
    setEditingTopic(null);
  };

  const deleteTopic = (id: string) => {
    if (confirm("Delete this topic?")) {
      setPendingTopics(pendingTopics.filter((t) => t.id !== id));
    }
  };

  // --- CONFUSING PART FUNCTIONS ---
  const createConfusing = (data: any) => {
    const newConfusing: ConfusingPart = {
      id: Date.now().toString(),
      ...data,
      status: data.status || "unresolved",
      createdAt: new Date().toISOString(),
    };
    setConfusingParts([newConfusing, ...confusingParts]);
    setShowConfusingForm(false);
    setEditingConfusing(null);
  };

  const updateConfusing = (id: string, data: any) => {
    setConfusingParts(
      confusingParts.map((c) => (c.id === id ? { ...c, ...data } : c)),
    );
    setShowConfusingForm(false);
    setEditingConfusing(null);
  };

  const deleteConfusing = (id: string) => {
    if (confirm("Delete this entry?")) {
      setConfusingParts(confusingParts.filter((c) => c.id !== id));
    }
  };

  // --- RESEARCH TOPIC FUNCTIONS ---
  const createResearch = (data: any) => {
    const newResearch: ResearchTopic = {
      id: Date.now().toString(),
      ...data,
      keyPoints: data.keyPoints || [],
      questions: data.questions || [],
      resources: data.resources || [],
      mainScriptures: data.mainScriptures || [],
      status: data.status || "not-started",
      priority: data.priority || "medium",
      tags: data.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setResearchTopics([newResearch, ...researchTopics]);
    setShowResearchForm(false);
    setEditingResearch(null);
  };

  const updateResearch = (id: string, data: any) => {
    setResearchTopics(
      researchTopics.map((r) =>
        r.id === id
          ? { ...r, ...data, updatedAt: new Date().toISOString() }
          : r,
      ),
    );
    setShowResearchForm(false);
    setEditingResearch(null);
  };

  const deleteResearch = (id: string) => {
    if (confirm("Delete this research topic?")) {
      setResearchTopics(researchTopics.filter((r) => r.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "not-started": "bg-stone-200 text-stone-700",
      studying: "bg-blue-100 text-blue-800",
      "deep-dive": "bg-amber-100 text-amber-800",
      completed: "bg-emerald-100 text-emerald-800",
    };
    return (
      colors[status as keyof typeof colors] || "bg-stone-200 text-stone-700"
    );
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "border-l-emerald-500",
      medium: "border-l-amber-500",
      high: "border-l-rose-500",
    };
    return colors[priority as keyof typeof colors] || "border-l-stone-500";
  };

  // --- RENDER FUNCTIONS ---
  const renderBibleTab = () => (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
            Book
          </label>
          <select
            className="w-full p-2.5 border border-stone-300 rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            {AVAILABLE_BOOKS.map((book) => (
              <option key={book} value={book}>
                {book}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
            Chapter
          </label>
          <select
            className="w-full p-2.5 border border-stone-300 rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(Number(e.target.value))}
          >
            {AVAILABLE_CHAPTERS.map((ch) => (
              <option key={ch} value={ch}>
                Chapter {ch}
              </option>
            ))}
          </select>
        </div>
        <div className="px-4 py-2 bg-stone-100 rounded-lg text-sm text-stone-600 border border-dashed border-stone-400 whitespace-nowrap">
          📚 John 1 (Sample)
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 md:p-7">
        {chapterData ? (
          <>
            <div className="flex justify-between items-center border-b border-stone-200 pb-3 mb-5">
              <h2 className="text-2xl font-bold text-stone-800">
                {chapterData.reference}
              </h2>
              <span className="bg-stone-200 px-3 py-1 rounded-full text-sm font-semibold text-stone-700">
                {chapterData.translation}
              </span>
            </div>
            <div className="space-y-3">
              {chapterData.verses.map((v) => {
                const verseKey = getVerseKey(v.verse);
                const hasNote = verseNotes[verseKey] !== undefined;

                return (
                  <div
                    key={v.verse}
                    className="p-3 rounded-lg hover:bg-stone-50 transition-colors border-l-2 border-transparent hover:border-stone-300"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-stone-500 text-sm min-w-[32px]">
                        {v.verse}
                      </span>
                      <button
                        className="text-lg opacity-60 hover:opacity-100 hover:bg-stone-200 rounded px-1.5 py-0.5 transition-all"
                        onClick={() => {
                          if (activeNoteVerse === v.verse) {
                            setActiveNoteVerse(null);
                          } else {
                            setActiveNoteVerse(v.verse);
                            setNoteInput(verseNotes[verseKey] || "");
                          }
                        }}
                      >
                        {hasNote ? "✏️" : "📝"}
                      </button>
                    </div>
                    <div className="text-stone-800 text-base leading-relaxed pl-9">
                      {renderVerseText(v.text)}
                    </div>
                    {activeNoteVerse === v.verse && (
                      <div className="mt-3 ml-9 p-3 bg-stone-50 rounded-lg border border-stone-200">
                        <textarea
                          className="w-full p-2.5 border border-stone-300 rounded-lg font-inherit text-sm resize-y bg-white focus:outline-none focus:ring-2 focus:ring-stone-800"
                          value={noteInput}
                          onChange={(e) => setNoteInput(e.target.value)}
                          placeholder="Write your insight here..."
                          rows={3}
                          autoFocus
                        />
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <button
                            className="px-4 py-1.5 bg-stone-800 text-white rounded-lg text-sm hover:bg-stone-700 transition-colors"
                            onClick={() => handleSaveNote(v.verse)}
                          >
                            💾 Save
                          </button>
                          {hasNote && (
                            <button
                              className="px-4 py-1.5 bg-rose-100 text-rose-800 rounded-lg text-sm hover:bg-rose-200 transition-colors"
                              onClick={() => handleDeleteNote(v.verse)}
                            >
                              🗑️ Delete
                            </button>
                          )}
                          <button
                            className="px-4 py-1.5 bg-stone-200 text-stone-700 rounded-lg text-sm hover:bg-stone-300 transition-colors"
                            onClick={() => {
                              setActiveNoteVerse(null);
                              setNoteInput("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    {hasNote && activeNoteVerse !== v.verse && (
                      <div className="mt-2 ml-9 p-2.5 bg-amber-50 border-l-4 border-amber-700 rounded text-sm">
                        <span className="font-semibold text-amber-800 mr-2">
                          📌 Insight:
                        </span>
                        <p className="text-stone-700 mt-1">
                          {verseNotes[verseKey]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-stone-200 text-center text-sm text-stone-500">
              <p>
                📊 {chapterData.verses.length} verses • 💡{" "}
                {
                  Object.keys(verseNotes).filter((key) =>
                    key.startsWith(`${selectedBook}_${selectedChapter}`),
                  ).length
                }{" "}
                notes
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-stone-500">
            No data available
          </div>
        )}
      </div>
    </div>
  );

  const renderSermonsTab = () => (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
        <h2 className="text-2xl font-bold text-stone-800">
          📖 Sermon & Topic Preparation
        </h2>
        <button
          className="px-5 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
          onClick={() => {
            setEditingSermon(null);
            setShowSermonForm(true);
          }}
        >
          + New Sermon
        </button>
      </div>

      {showSermonForm && (
        <SermonForm
          sermon={editingSermon}
          onSave={(data) => {
            if (editingSermon) {
              updateSermon(editingSermon.id, data);
            } else {
              createSermon(data);
            }
          }}
          onCancel={() => {
            setShowSermonForm(false);
            setEditingSermon(null);
          }}
        />
      )}

      <div className="space-y-4">
        {sermons.length === 0 ? (
          <div className="text-center py-12 px-6 bg-stone-50 rounded-xl border-2 border-dashed border-stone-300 text-stone-500">
            <p>No sermons yet. Start preparing your first sermon!</p>
          </div>
        ) : (
          sermons.map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-stone-500"
            >
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                  <h3 className="text-xl font-bold text-stone-800">
                    {sermon.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1.5 text-sm text-stone-500">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                        sermon.status === "draft"
                          ? "bg-stone-200 text-stone-700"
                          : sermon.status === "prepared"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-stone-800 text-white"
                      }`}
                    >
                      {sermon.status}
                    </span>
                    <span>📅 {new Date(sermon.date).toLocaleDateString()}</span>
                    <span>📖 {sermon.mainScripture}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    className="p-1.5 hover:bg-stone-100 rounded transition-colors"
                    onClick={() => {
                      setEditingSermon(sermon);
                      setShowSermonForm(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="p-1.5 hover:bg-rose-100 rounded transition-colors"
                    onClick={() => deleteSermon(sermon.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <p className="text-stone-600 mt-2">
                Topic: <span className="font-medium">{sermon.topic}</span>
              </p>
              <div className="mt-3">
                <strong className="text-stone-700">Key Points:</strong>
                <ul className="list-disc ml-6 mt-1 space-y-1 text-stone-600">
                  {sermon.points.map((point) => (
                    <li key={point.id}>
                      <span className="font-medium">{point.title}</span> -{" "}
                      {point.description}
                      {point.scriptures.length > 0 && (
                        <span className="text-amber-700 text-sm ml-1">
                          {" "}
                          📖 {point.scriptures.join(", ")}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {sermon.summary && (
                <div className="mt-3 p-3 bg-stone-50 rounded-lg text-stone-600 text-sm">
                  <strong>Summary:</strong> {sermon.summary}
                </div>
              )}
              {sermon.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {sermon.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 bg-stone-100 text-stone-600 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderPendingTab = () => (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
        <h2 className="text-2xl font-bold text-stone-800">⏳ Pending Topics</h2>
        <button
          className="px-5 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
          onClick={() => {
            setEditingTopic(null);
            setShowTopicForm(true);
          }}
        >
          + New Topic
        </button>
      </div>

      {showTopicForm && (
        <TopicForm
          topic={editingTopic}
          onSave={(data) => {
            if (editingTopic) {
              updateTopic(editingTopic.id, data);
            } else {
              createTopic(data);
            }
          }}
          onCancel={() => {
            setShowTopicForm(false);
            setEditingTopic(null);
          }}
        />
      )}

      <div className="space-y-3">
        {pendingTopics.length === 0 ? (
          <div className="text-center py-12 px-6 bg-stone-50 rounded-xl border-2 border-dashed border-stone-300 text-stone-500">
            <p>No pending topics. Add ideas you want to study later!</p>
          </div>
        ) : (
          pendingTopics.map((topic) => (
            <div
              key={topic.id}
              className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${
                topic.priority === "high"
                  ? "border-l-rose-500"
                  : topic.priority === "medium"
                    ? "border-l-amber-500"
                    : "border-l-emerald-500"
              }`}
            >
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-bold text-stone-800">
                    {topic.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1.5 text-sm">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                        topic.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : topic.status === "studying"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {topic.status}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                        topic.priority === "high"
                          ? "bg-rose-100 text-rose-800"
                          : topic.priority === "medium"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {topic.priority} priority
                    </span>
                    <span className="text-stone-400">
                      📅 {new Date(topic.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    className="p-1.5 hover:bg-stone-100 rounded transition-colors"
                    onClick={() => {
                      setEditingTopic(topic);
                      setShowTopicForm(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="p-1.5 hover:bg-rose-100 rounded transition-colors"
                    onClick={() => deleteTopic(topic.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <p className="text-stone-600 mt-2">{topic.description}</p>
              {topic.notes && (
                <div className="mt-2.5 p-2.5 bg-stone-50 rounded-lg text-sm text-stone-600">
                  <strong>Notes:</strong> {topic.notes}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderConfusingTab = () => (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
        <h2 className="text-2xl font-bold text-stone-800">
          ❓ Confusing Parts
        </h2>
        <button
          className="px-5 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
          onClick={() => {
            setEditingConfusing(null);
            setShowConfusingForm(true);
          }}
        >
          + New Entry
        </button>
      </div>

      {showConfusingForm && (
        <ConfusingForm
          entry={editingConfusing}
          onSave={(data) => {
            if (editingConfusing) {
              updateConfusing(editingConfusing.id, data);
            } else {
              createConfusing(data);
            }
          }}
          onCancel={() => {
            setShowConfusingForm(false);
            setEditingConfusing(null);
          }}
        />
      )}

      <div className="space-y-3">
        {confusingParts.length === 0 ? (
          <div className="text-center py-12 px-6 bg-stone-50 rounded-xl border-2 border-dashed border-stone-300 text-stone-500">
            <p>
              No confusing parts logged. Track passages you need to study
              deeper!
            </p>
          </div>
        ) : (
          confusingParts.map((entry) => (
            <div
              key={entry.id}
              className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${
                entry.status === "resolved"
                  ? "border-l-emerald-500"
                  : entry.status === "researching"
                    ? "border-l-amber-500"
                    : "border-l-rose-500"
              }`}
            >
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-bold text-stone-800">
                    📖 {entry.scripture}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1.5 text-sm">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                        entry.status === "unresolved"
                          ? "bg-rose-100 text-rose-800"
                          : entry.status === "researching"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {entry.status}
                    </span>
                    <span className="text-stone-400">
                      📅 {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                    {entry.resolvedAt && (
                      <span className="text-emerald-600">
                        ✅ Resolved:{" "}
                        {new Date(entry.resolvedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    className="p-1.5 hover:bg-stone-100 rounded transition-colors"
                    onClick={() => {
                      setEditingConfusing(entry);
                      setShowConfusingForm(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="p-1.5 hover:bg-rose-100 rounded transition-colors"
                    onClick={() => deleteConfusing(entry.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <p className="text-stone-700 mt-3">
                <strong>Question:</strong> {entry.question}
              </p>
              {entry.context && (
                <p className="text-stone-600 mt-1.5">
                  <strong>Context:</strong> {entry.context}
                </p>
              )}
              {entry.insights && (
                <div className="mt-2.5 p-3 bg-emerald-50 rounded-lg text-sm text-stone-700 border border-emerald-100">
                  <strong>💡 Insights:</strong> {entry.insights}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderResearchTab = () => {
    const selectedTopic = researchTopics.find(
      (r) => r.id === selectedResearchId,
    );

    return (
      <div>
        <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
          <h2 className="text-2xl font-bold text-stone-800">
            🔬 Research Topics
          </h2>
          <button
            className="px-5 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
            onClick={() => {
              setEditingResearch(null);
              setShowResearchForm(true);
            }}
          >
            + New Research
          </button>
        </div>

        {showResearchForm && (
          <ResearchForm
            topic={editingResearch}
            onSave={(data) => {
              if (editingResearch) {
                updateResearch(editingResearch.id, data);
              } else {
                createResearch(data);
              }
            }}
            onCancel={() => {
              setShowResearchForm(false);
              setEditingResearch(null);
            }}
          />
        )}

        <div
          className={`grid gap-4 ${
            selectedResearchId ? "md:grid-cols-1" : "md:grid-cols-2"
          }`}
        >
          {/* <p></p> */}
          {researchTopics.length === 0 ? (
            <div className="col-span-2 text-center py-12 px-6 bg-stone-50 rounded-xl border-2 border-dashed border-stone-300 text-stone-500">
              <p>
                No research topics yet. Start studying a topic that interests
                you!
              </p>
            </div>
          ) : (
            researchTopics.map((topic) => (
              <div
                key={topic.id}
                className={`${topic.id === selectedResearchId ? "md:grid-cols-1" : "md:grid-cols-1"} bg-white rounded-xl shadow-sm p-5 border-l-4 ${getPriorityColor(topic.priority)} cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() =>
                  setSelectedResearchId(
                    topic.id === selectedResearchId ? null : topic.id,
                  )
                }
              >
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-stone-800">
                      {topic.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1.5 text-sm">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${getStatusColor(topic.status)}`}
                      >
                        {topic.status.replace("-", " ")}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                          topic.priority === "high"
                            ? "bg-rose-100 text-rose-800"
                            : topic.priority === "medium"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {topic.priority} priority
                      </span>
                      {topic.lastStudied && (
                        <span className="text-stone-400 text-xs">
                          📅 Last studied:{" "}
                          {new Date(topic.lastStudied).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className="flex gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="p-1.5 hover:bg-stone-100 rounded transition-colors"
                      onClick={() => {
                        setEditingResearch(topic);
                        setShowResearchForm(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="p-1.5 hover:bg-rose-100 rounded transition-colors"
                      onClick={() => deleteResearch(topic.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <p className="text-stone-600 mt-2 text-sm line-clamp-2">
                  {topic.description}
                </p>

                {topic.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {topic.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {topic.tags.length > 3 && (
                      <span className="text-stone-400 text-xs">
                        +{topic.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {selectedResearchId === topic.id && (
                  <div
                    className="mt-4 pt-4 border-t border-stone-200 space-y-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {topic.mainScriptures.length > 0 && (
                      <div>
                        <strong className="text-stone-700 text-sm">
                          📖 Key Scriptures:
                        </strong>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {topic.mainScriptures.map((scripture) => (
                            <span
                              key={scripture}
                              className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-sm border border-amber-200"
                            >
                              {scripture}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {topic.keyPoints.length > 0 && (
                      <div>
                        <strong className="text-stone-700 text-sm">
                          💡 Key Points:
                        </strong>
                        <ul className="list-disc ml-5 mt-1 space-y-1 text-sm text-stone-600">
                          {topic.keyPoints.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {topic.myFindings && (
                      <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                        <strong className="text-emerald-800 text-sm">
                          ✍️ My Findings:
                        </strong>
                        <p className="text-stone-700 text-sm mt-1">
                          {topic.myFindings}
                        </p>
                      </div>
                    )}

                    {topic.questions.length > 0 && (
                      <div>
                        <strong className="text-stone-700 text-sm">
                          ❓ Questions to Explore:
                        </strong>
                        <ul className="list-disc ml-5 mt-1 space-y-1 text-sm text-stone-600">
                          {topic.questions.map((q, idx) => (
                            <li key={idx}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {topic.resources.length > 0 && (
                      <div>
                        <strong className="text-stone-700 text-sm">
                          📚 Resources:
                        </strong>
                        <ul className="list-disc ml-5 mt-1 space-y-1 text-sm text-stone-600">
                          {topic.resources.map((r, idx) => (
                            <li key={idx}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="text-xs text-stone-400 flex gap-4">
                      <span>
                        Created:{" "}
                        {new Date(topic.createdAt).toLocaleDateString()}
                      </span>
                      <span>
                        Updated:{" "}
                        {new Date(topic.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // --- MAIN RENDER ---
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-stone-50 min-h-screen font-sans">
      <header className="text-center py-8 border-b-2 border-stone-300 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800">
          📖 Personal Bible Study & Sermon Prep
        </h1>
        <p className="text-stone-500 mt-1">Study • Prepare • Organize • Grow</p>
      </header>

      <div className="flex flex-wrap gap-1.5 mb-6 border-b-2 border-stone-200 pb-1">
        {[
          { id: "bible", label: "📖 Bible", count: null },
          { id: "sermons", label: "📝 Sermons", count: sermons.length },
          {
            id: "research",
            label: "🔬 Research",
            count: researchTopics.length,
          },
          { id: "pending", label: "⏳ Pending", count: pendingTopics.length },
          {
            id: "confusing",
            label: "❓ Confusing",
            count: confusingParts.length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2.5 rounded-t-lg font-medium transition-all ${
              activeTab === tab.id
                ? "bg-stone-800 text-white"
                : "text-stone-600 hover:bg-stone-200"
            }`}
            onClick={() => setActiveTab(tab.id as Tab)}
          >
            {tab.label}
            {tab.count !== null && (
              <span className="ml-1.5 text-sm opacity-75">({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "bible" && renderBibleTab()}
        {activeTab === "sermons" && renderSermonsTab()}
        {activeTab === "research" && renderResearchTab()}
        {activeTab === "pending" && renderPendingTab()}
        {activeTab === "confusing" && renderConfusingTab()}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

// Sermon Form
function SermonForm({
  sermon,
  onSave,
  onCancel,
}: {
  sermon?: Sermon | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: sermon?.title || "",
    topic: sermon?.topic || "",
    date: sermon?.date || new Date().toISOString().split("T")[0],
    mainScripture: sermon?.mainScripture || "",
    points: sermon?.points || [
      { id: Date.now().toString(), title: "", description: "", scriptures: [] },
    ],
    summary: sermon?.summary || "",
    status: sermon?.status || "draft",
    tags: sermon?.tags?.join(", ") || "",
  });

  const addPoint = () => {
    setFormData({
      ...formData,
      points: [
        ...formData.points,
        {
          id: Date.now().toString(),
          title: "",
          description: "",
          scriptures: [],
        },
      ],
    });
  };

  const updatePoint = (index: number, field: string, value: any) => {
    const newPoints = [...formData.points];
    newPoints[index] = { ...newPoints[index], [field]: value };
    setFormData({ ...formData, points: newPoints });
  };

  const removePoint = (index: number) => {
    setFormData({
      ...formData,
      points: formData.points.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-stone-200">
      <h3 className="text-xl font-bold text-stone-800 mt-0 mb-4">
        {sermon ? "Edit Sermon" : "New Sermon"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block font-medium text-stone-700 mb-1 text-sm">
              Title *
            </label>
            <input
              className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="block font-medium text-stone-700 mb-1 text-sm">
              Topic *
            </label>
            <input
              className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
              required
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div className="form-group">
            <label className="block font-medium text-stone-700 mb-1 text-sm">
              Date
            </label>
            <input
              type="date"
              className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="block font-medium text-stone-700 mb-1 text-sm">
              Main Scripture
            </label>
            <input
              className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
              placeholder="e.g., John 3:16"
              value={formData.mainScripture}
              onChange={(e) =>
                setFormData({ ...formData, mainScripture: e.target.value })
              }
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Status
          </label>
          <select
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value as any })
            }
          >
            <option value="draft">Draft</option>
            <option value="prepared">Prepared</option>
            <option value="preached">Preached</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-2 text-sm">
            Key Points
          </label>
          {formData.points.map((point, idx) => (
            <div
              key={point.id}
              className="bg-stone-50 p-3 rounded-lg mb-2.5 border border-stone-200"
            >
              <div className="grid md:grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="block text-xs font-medium text-stone-600 mb-0.5">
                    Point Title
                  </label>
                  <input
                    className="w-full p-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
                    value={point.title}
                    onChange={(e) => updatePoint(idx, "title", e.target.value)}
                    placeholder="e.g., God's Love"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-xs font-medium text-stone-600 mb-0.5">
                    Scriptures (comma separated)
                  </label>
                  <input
                    className="w-full p-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
                    value={point.scriptures.join(", ")}
                    onChange={(e) =>
                      updatePoint(
                        idx,
                        "scriptures",
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      )
                    }
                    placeholder="e.g., John 3:16, Romans 8:28"
                  />
                </div>
              </div>
              <div className="form-group mt-2">
                <label className="block text-xs font-medium text-stone-600 mb-0.5">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
                  value={point.description}
                  onChange={(e) =>
                    updatePoint(idx, "description", e.target.value)
                  }
                  placeholder="What does this point mean?"
                  rows={2}
                />
              </div>
              {formData.points.length > 1 && (
                <button
                  type="button"
                  className="mt-1.5 px-3 py-1 bg-rose-100 text-rose-800 rounded-lg text-xs hover:bg-rose-200 transition-colors"
                  onClick={() => removePoint(idx)}
                >
                  Remove Point
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="px-4 py-1.5 bg-stone-200 text-stone-700 rounded-lg text-sm hover:bg-stone-300 transition-colors"
            onClick={addPoint}
          >
            + Add Point
          </button>
        </div>

        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Summary
          </label>
          <textarea
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            rows={3}
            placeholder="Brief summary of the sermon..."
          />
        </div>

        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Tags (comma separated)
          </label>
          <input
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="e.g., Grace, Faith, Love"
          />
        </div>

        <div className="flex gap-3 mt-5">
          <button
            type="submit"
            className="px-6 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
          >
            💾 Save Sermon
          </button>
          <button
            type="button"
            className="px-6 py-2.5 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Topic Form
function TopicForm({
  topic,
  onSave,
  onCancel,
}: {
  topic?: PendingTopic | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: topic?.title || "",
    description: topic?.description || "",
    priority: topic?.priority || "medium",
    status: topic?.status || "pending",
    notes: topic?.notes || "",
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-stone-200">
      <h3 className="text-xl font-bold text-stone-800 mt-0 mb-4">
        {topic ? "Edit Topic" : "New Topic"}
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}
      >
        <div className="form-group">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Title *
          </label>
          <input
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Description
          </label>
          <textarea
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={2}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div className="form-group">
            <label className="block font-medium text-stone-700 mb-1 text-sm">
              Priority
            </label>
            <select
              className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value as any })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-group">
            <label className="block font-medium text-stone-700 mb-1 text-sm">
              Status
            </label>
            <select
              className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as any })
              }
            >
              <option value="pending">Pending</option>
              <option value="studying">Studying</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Notes
          </label>
          <textarea
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            rows={3}
            placeholder="Additional thoughts..."
          />
        </div>
        <div className="flex gap-3 mt-5">
          <button
            type="submit"
            className="px-6 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
          >
            💾 Save Topic
          </button>
          <button
            type="button"
            className="px-6 py-2.5 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Confusing Form
function ConfusingForm({
  entry,
  onSave,
  onCancel,
}: {
  entry?: ConfusingPart | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    scripture: entry?.scripture || "",
    question: entry?.question || "",
    context: entry?.context || "",
    status: entry?.status || "unresolved",
    insights: entry?.insights || "",
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-stone-200">
      <h3 className="text-xl font-bold text-stone-800 mt-0 mb-4">
        {entry ? "Edit Entry" : "New Confusing Part"}
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}
      >
        <div className="form-group">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Scripture *
          </label>
          <input
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
            required
            value={formData.scripture}
            onChange={(e) =>
              setFormData({ ...formData, scripture: e.target.value })
            }
            placeholder="e.g., John 3:16"
          />
        </div>
        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Question *
          </label>
          <textarea
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
            required
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            rows={2}
            placeholder="What confuses you about this passage?"
          />
        </div>
        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Context
          </label>
          <textarea
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.context}
            onChange={(e) =>
              setFormData({ ...formData, context: e.target.value })
            }
            rows={2}
            placeholder="Chapter context, surrounding verses..."
          />
        </div>
        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Status
          </label>
          <select
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value as any })
            }
          >
            <option value="unresolved">Unresolved</option>
            <option value="researching">Researching</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Insights
          </label>
          <textarea
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.insights}
            onChange={(e) =>
              setFormData({ ...formData, insights: e.target.value })
            }
            rows={3}
            placeholder="What have you learned?"
          />
        </div>
        <div className="flex gap-3 mt-5">
          <button
            type="submit"
            className="px-6 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
          >
            💾 Save Entry
          </button>
          <button
            type="button"
            className="px-6 py-2.5 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Research Form
function ResearchForm({
  topic,
  onSave,
  onCancel,
}: {
  topic?: ResearchTopic | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: topic?.title || "",
    description: topic?.description || "",
    mainScriptures: topic?.mainScriptures?.join(", ") || "",
    keyPoints: topic?.keyPoints?.join("\n") || "",
    myFindings: topic?.myFindings || "",
    questions: topic?.questions?.join("\n") || "",
    resources: topic?.resources?.join("\n") || "",
    status: topic?.status || "not-started",
    priority: topic?.priority || "medium",
    tags: topic?.tags?.join(", ") || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      mainScriptures: formData.mainScriptures
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      keyPoints: formData.keyPoints.split("\n").filter(Boolean),
      questions: formData.questions.split("\n").filter(Boolean),
      resources: formData.resources.split("\n").filter(Boolean),
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-stone-200">
      <h3 className="text-xl font-bold text-stone-800 mt-0 mb-4">
        {topic ? "Edit Research Topic" : "New Research Topic"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Topic Title *
          </label>
          <input
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g., The Holy Spirit"
          />
        </div>

        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Description
          </label>
          <textarea
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={2}
            placeholder="What do you want to study about this topic?"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div className="form-group">
            <label className="block font-medium text-stone-700 mb-1 text-sm">
              Status
            </label>
            <select
              className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as any })
              }
            >
              <option value="not-started">Not Started</option>
              <option value="studying">Studying</option>
              <option value="deep-dive">Deep Dive</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label className="block font-medium text-stone-700 mb-1 text-sm">
              Priority
            </label>
            <select
              className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value as any })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Key Scriptures (comma separated)
          </label>
          <input
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.mainScriptures}
            onChange={(e) =>
              setFormData({ ...formData, mainScriptures: e.target.value })
            }
            placeholder="e.g., John 14:16-17, Acts 2:1-4"
          />
        </div>

        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Key Points (one per line)
          </label>
          <textarea
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.keyPoints}
            onChange={(e) =>
              setFormData({ ...formData, keyPoints: e.target.value })
            }
            rows={4}
            placeholder="The Holy Spirit is a person&#10;He is fully God&#10;He convicts the world of sin"
          />
        </div>

        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            My Findings
          </label>
          <textarea
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.myFindings}
            onChange={(e) =>
              setFormData({ ...formData, myFindings: e.target.value })
            }
            rows={4}
            placeholder="What have you discovered in your study?"
          />
        </div>

        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Questions (one per line)
          </label>
          <textarea
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.questions}
            onChange={(e) =>
              setFormData({ ...formData, questions: e.target.value })
            }
            rows={3}
            placeholder="What does it mean to quench the Spirit?&#10;How do I discern the Spirit's leading?"
          />
        </div>

        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Resources (one per line)
          </label>
          <textarea
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.resources}
            onChange={(e) =>
              setFormData({ ...formData, resources: e.target.value })
            }
            rows={3}
            placeholder="Knowing God - J.I. Packer&#10;The Pursuit of God - A.W. Tozer"
          />
        </div>

        <div className="form-group mt-3">
          <label className="block font-medium text-stone-700 mb-1 text-sm">
            Tags (comma separated)
          </label>
          <input
            className="w-full p-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="e.g., Holy Spirit, Theology, Prayer"
          />
        </div>

        <div className="flex gap-3 mt-5">
          <button
            type="submit"
            className="px-6 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
          >
            💾 Save Research
          </button>
          <button
            type="button"
            className="px-6 py-2.5 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
