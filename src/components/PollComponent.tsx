import React, { useEffect, useRef, useState } from "react";
import styles from "./PollComponent.module.css";

const PollComponent: React.FC = () => {
  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(0);

  let total = left + right;
  let leftPercentageNum = (left / total) * 100;
  let rightPercentageNum = (right / total) * 100;

  const getPercentage = () => {
    total = left + right;

    leftPercentageNum = (left / total) * 100;
    rightPercentageNum = (right / total) * 100;
  };

  const leftDivRef = useRef<HTMLDivElement>(null);
  const rightDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getPercentage();

    if (leftDivRef.current && rightDivRef.current) {
      leftDivRef.current.style.width = `${leftPercentageNum}%`;
      rightDivRef.current.style.width = `${rightPercentageNum}%`;
    }
  }, [left, right]);

  if (total === 0) {
    return (
      <>
        <div className={styles.box}>첫 투표가 필요합니다</div>
        <div className={styles.buttons}>
          <button onClick={() => setLeft((cur) => cur + 1)}>left up</button>
          <button onClick={() => setRight((cur) => cur + 1)}>right up</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.box}>
        <div ref={leftDivRef} className={styles.left}>
          {leftPercentageNum === 0 ? "" : leftPercentageNum.toFixed(1) + "%"}
        </div>
        <div ref={rightDivRef} className={styles.right}>
          {rightPercentageNum === 0 ? "" : rightPercentageNum.toFixed(1) + "%"}
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => setLeft((cur) => cur + 1)}>left up</button>
        <button onClick={() => setRight((cur) => cur + 1)}>right up</button>
      </div>
    </>
  );
};

export default PollComponent;
