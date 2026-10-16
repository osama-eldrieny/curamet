"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** Word-by-word blur-fade, triggered when scrolled into view. */
export function BlurWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, filter: "blur(10px)", y: 14 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          {w}{" "}
        </motion.span>
      ))}
    </span>
  );
}

/** Cycles through phrases; letters blur/slide in, old phrase flips out. */
export function FlippingWords({ words, className, interval = 2600 }: { words: string[]; className?: string; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  const w = words[i];
  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={w}
          className="inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40, x: 40, filter: "blur(8px)", scale: 2, position: "absolute" }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          {w.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split("").map((c, ci) => (
                <motion.span
                  key={ci}
                  className="inline-block"
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: wi * 0.2 + ci * 0.04, duration: 0.3 }}
                >
                  {c}
                </motion.span>
              ))}
              {" "}
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Types text out with a blinking caret once in view. */
export function Typewriter({ text, className }: { text: string; className?: string }) {
  const [n, setN] = useState(0);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!on) return;
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), 22);
    return () => clearTimeout(t);
  }, [on, n, text]);
  return (
    <motion.span className={className} onViewportEnter={() => setOn(true)} viewport={{ once: true }}>
      {text.slice(0, n)}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-orange" />
    </motion.span>
  );
}

/**
 * Types each word out with a 3D flip per character (rotateY + blur), pauses, then deletes it with
 * the reverse flip. A small dot follows the text: blue/orange while typing, red while deleting.
 */
export function FlipTypeWords({
  words,
  className,
  typingSpeed = 85,
  deletingSpeed = 45,
  pause = 1700,
}: {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = words[i];

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && n < word.length) t = setTimeout(() => setN(n + 1), typingSpeed);
    else if (!deleting) t = setTimeout(() => setDeleting(true), pause);
    else if (n > 0) t = setTimeout(() => setN(n - 1), deletingSpeed);
    else {
      t = setTimeout(() => {
        setDeleting(false);
        setI((x) => (x + 1) % words.length);
      }, 300);
    }
    return () => clearTimeout(t);
  }, [n, deleting, word, words.length, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={`inline-flex items-center whitespace-pre [perspective:700px] ${className ?? ""}`}>
      <span className="sr-only">{word}</span>
      <span aria-hidden className="inline-flex">
        <AnimatePresence initial={false}>
          {word.slice(0, n).split("").map((c, k) => (
            <motion.span
              key={`${i}-${k}`}
              className="inline-block"
              initial={{ opacity: 0, rotateY: 90, filter: "blur(8px)" }}
              animate={{ opacity: 1, rotateY: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, rotateY: -90, filter: "blur(8px)", transition: { duration: 0.18 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {c}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
      <motion.span
        aria-hidden
        className="ml-2 inline-block rounded-full"
        animate={
          deleting
            ? { backgroundColor: "#ef4444", width: 10, height: 10 }
            : { backgroundColor: ["#3b82f6", "#e0622a", "#3b82f6"], width: [14, 10, 14], height: [14, 10, 14] }
        }
        transition={deleting ? { duration: 0.2 } : { duration: 1.1, repeat: Infinity }}
      />
    </span>
  );
}

type TypeLine = { text: string; className?: string };

/**
 * Aceternity-style typewriter: characters appear one by one with a blinking cursor.
 * Every character is laid out from the start (only its opacity changes), so centred text
 * never shifts while it types.
 */
export function TypewriterHeadline({
  lines,
  speed = 55,
  className,
}: {
  lines: TypeLine[];
  speed?: number;
  className?: string;
}) {
  const total = lines.reduce((a, l) => a + l.text.length, 0);
  const [n, setN] = useState(0);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!go || n >= total) return;
    const t = setTimeout(() => setN(n + 1), speed);
    return () => clearTimeout(t);
  }, [go, n, total, speed]);

  let idx = 0;
  return (
    <span className={className}>
      <span className="sr-only">{lines.map((l) => l.text).join(" ")}</span>
      <span aria-hidden>
        {lines.map((l, li) => (
          <span key={li} className={`block ${l.className ?? ""}`}>
            {l.text.split(" ").map((word, wi, arr) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split("").map((c) => {
                  const k = idx++;
                  const shown = k < n;
                  const cursorHere = k === Math.max(n - 1, 0) && (n > 0 || k === 0);
                  return (
                    <span key={k} className="relative inline-block" style={{ opacity: shown ? 1 : 0 }}>
                      {c}
                      {cursorHere && <Cursor typing={n < total} atStart={n === 0} />}
                    </span>
                  );
                })}
                {wi < arr.length - 1 && (() => { idx++; return " "; })()}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}

function Cursor({ typing, atStart }: { typing: boolean; atStart: boolean }) {
  return (
    <motion.span
      className={`absolute top-[0.12em] h-[0.78em] w-[0.07em] rounded-sm bg-blue-500 ${atStart ? "left-[-0.1em]" : "right-[-0.1em]"}`}
      animate={{ opacity: typing ? 1 : [1, 0, 1] }}
      transition={typing ? { duration: 0 } : { duration: 0.9, repeat: Infinity }}
    />
  );
}
