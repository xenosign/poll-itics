import React, { useEffect, useRef, useState } from "react";
import styles from "./PollComponent.module.css";
import { Link, useParams } from "react-router-dom";

const PollComponent: React.FC = () => {
  const params = useParams();

  console.log(params);

  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(0);

  const leftDivRef = useRef<HTMLDivElement>(null);
  const rightDivRef = useRef<HTMLDivElement>(null);
  const centerDivRef = useRef<HTMLDivElement>(null);
  const leftDivTextBoxRef = useRef<HTMLDivElement>(null);
  const rightDivTextBoxRef = useRef<HTMLDivElement>(null);

  let total = left + right;
  let leftPercentageNum = (left / total) * 100;
  let rightPercentageNum = (right / total) * 100;
  let leftPercentageStr = leftPercentageNum.toFixed(1) + "%";
  let rightPercentageStr = rightPercentageNum.toFixed(1) + "%";

  const handleVoteLeft = () => setLeft((cur: number) => cur + 1);
  const handleVoteRight = () => setRight((cur: number) => cur + 1);

  const getPercentage = () => {
    total = left + right;

    leftPercentageNum = (left / total) * 100;
    rightPercentageNum = (right / total) * 100;
  };

  useEffect(() => {
    getPercentage();

    if (
      total !== 0 &&
      leftDivRef.current &&
      rightDivRef.current &&
      centerDivRef.current &&
      leftDivTextBoxRef.current &&
      rightDivTextBoxRef.current
    ) {
      leftDivRef.current.style.width = `${leftPercentageNum}%`;
      rightDivRef.current.style.width = `${rightPercentageNum}%`;

      centerDivRef.current.style.width = "0%";
      centerDivRef.current.innerText = "";

      left !== 0 && (leftDivTextBoxRef.current.style.opacity = "100%");

      right !== 0 && (rightDivTextBoxRef.current.style.opacity = "100%");
    }
  }, [left, right]);

  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <div ref={leftDivRef} className={styles.left}>
          <div ref={leftDivTextBoxRef} className={styles.votePercent}>
            {leftPercentageNum !== 0 && `${leftPercentageStr} (${left})`}
          </div>
        </div>
        <div ref={centerDivRef} className={styles.textBox}>
          첫 투표가 필요합니다
        </div>
        <div ref={rightDivRef} className={styles.right}>
          <div ref={rightDivTextBoxRef} className={styles.votePercent}>
            {rightPercentageNum !== 0 && `${rightPercentageStr} (${right})`}
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={handleVoteLeft}>left up</button>
        <button onClick={handleVoteRight}>right up</button>
      </div>
      <br />
      <Link to="/">홈으로</Link>
    </div>
  );
};

export default PollComponent;
