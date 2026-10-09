"use client";

import { useState } from "react";
import styles from "./puzzle.module.css";

const flagKeys = "abcdefghijk".split("");
const puzzleUrl = "https://www.wikipedia.com";
const finalUrl = "https://example.com";

export default function PuzzlePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [flags, setFlags] = useState<string[]>(() => flagKeys.map(() => ""));
  const correctCount = flags.reduce(
    (count, flag, index) =>
      count + (flag.trim().toLowerCase() === flagKeys[index] ? 1 : 0),
    0,
  );
  const hasAllFlags = correctCount === flagKeys.length;

  function updateFlag(index: number, value: string) {
    setFlags((current) =>
      current.map((flag, flagIndex) => (flagIndex === index ? value : flag)),
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.orbit} aria-hidden="true">
        <span>♡</span>
      </div>

      <div className={styles.shell}>
        <header className={styles.topbar}>
          <a className={styles.wordmark} href="/birthday">
            <span className={styles.wordmarkMark}>P.S.</span>
            <span>JUST BETWEEN US</span>
          </a>
          <span className={styles.topbarRight}>
            <span className={styles.signalDot} />
            A PRIVATE LITTLE FREQUENCY
          </span>
        </header>

        <section className={styles.transmission}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>
              {hasStarted ? "THE STORY CONTINUES" : "A BIRTHDAY SIDE QUEST"}
              <span aria-hidden="true"> · </span>
              {hasStarted ? "11 LITTLE SECRETS" : "MADE WITH LOVE"}
            </p>

            <h1 className={styles.title}>
              <a
                href={puzzleUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setHasStarted(true)}
                aria-label="Open the puzzle in a new tab"
              >
                A little mystery,
                <br />
                <em>my love.</em>
              </a>
            </h1>

            <p className={styles.copy}>
              I tucked a few little secrets into a longer adventure.
              <br className={styles.desktopBreak} />
              Go find them, then come back to me.
            </p>
          </div>

          <div className={styles.signalLine} aria-hidden="true">
            <span />
            <i />
            <i />
            <i />
            <span />
            <b>♡</b>
          </div>

          {hasStarted ? (
            <div className={styles.flagSection}>
              <div className={styles.sectionHeading}>
                <div>
                  <p className={styles.formEyebrow}>WHEN YOU FIND YOUR WAY BACK</p>
                  <h2>Leave the little secrets here.</h2>
                </div>
                <p className={styles.progress} aria-live="polite">
                  <span>{String(correctCount).padStart(2, "0")}</span>
                  <i>/ 11 found</i>
                </p>
              </div>

              <div className={styles.flagGrid}>
                {flagKeys.map((key, index) => {
                  const isCorrect =
                    flags[index].trim().toLowerCase() === key;
                  const hasInput = flags[index].length > 0;
                  const fieldClassName = isCorrect
                    ? styles.flagFieldCorrect
                    : hasInput
                      ? styles.flagFieldIncorrect
                      : "";

                  return (
                    <label
                      className={`${styles.flagField} ${fieldClassName}`}
                      key={key}
                    >
                      <span className={styles.flagNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <input
                        aria-label={`Secret ${index + 1} of 11`}
                        autoComplete="off"
                        className={isCorrect ? styles.correctInput : undefined}
                        maxLength={32}
                        onChange={(event) => updateFlag(index, event.target.value)}
                        placeholder={key}
                        spellCheck={false}
                        type="text"
                        value={flags[index]}
                      />
                      <span className={styles.flagStatus} aria-hidden="true">
                        {isCorrect ? "♡" : "—"}
                      </span>
                    </label>
                  );
                })}
              </div>

              {hasAllFlags ? (
                <div className={styles.finalMessage}>
                  <p>ALL FOUND · I KNEW YOU’D FIND YOUR WAY TO ME</p>
                  <a href={finalUrl} className={styles.finalLink}>
                    There&apos;s one more thing, just for you <span>↗</span>
                  </a>
                </div>
              ) : (
                <p className={styles.reassurance}>
                  No rush, sweetheart. I&apos;ll be right here.
                </p>
              )}
            </div>
          ) : (
            <p className={styles.prompt}>
              <span className={styles.promptHeart}>♡</span>
              <span>Tap the title to begin</span>
              <span className={styles.promptRule} />
            </p>
          )}

          <p className={styles.signoff}>
            Every trail I follow leads back to you.
          </p>
        </section>

        <footer className={styles.footer}>
          <span>A MESSAGE WITH YOUR NAME ON IT</span>
          <span className={styles.footerMark}>
            ALWAYS YOURS <span>♥</span>
          </span>
        </footer>
      </div>
    </main>
  );
}
