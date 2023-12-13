import React, { useEffect, useRef, useState } from "react";
import styles from "./PollComponent.module.css";

const PollComponent: React.FC = () => {
  const [left, setLeft] = useState<number>(2);
  const [right, setRight] = useState<number>(1);

  let total = left + right;
  let leftPercentageNum = (left / total) * 100;
  let rightPercentageNum = (right / total) * 100;

  let leftPercentageStr = leftPercentageNum.toFixed(1) + "%";
  let rightPercentageStr = rightPercentageNum.toFixed(1) + "%";

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

  return (
    <>
      <div className={styles.box}>
        <div ref={leftDivRef} className={styles.left}>
          {leftPercentageStr}
        </div>
        <div ref={rightDivRef} className={styles.right}>
          {rightPercentageStr}
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
