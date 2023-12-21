import React, { useEffect, useRef, useState } from "react";
import styles from "./PollComponent.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "../lib/axios";

const PollComponent: React.FC = () => {
  const { id } = useParams();

  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(0);
  const [subject, setSubject] = useState<string>("");
  const [render, setRender] = useState<boolean>(true);

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

  const handleVote = async (direction: string) => {
    const res: any = await axios.post(`/${id}/${direction}`);

    if (res.status !== 200)
      return alert("데이터 통신 오류, 다시 시도해 주세요 :)");

    setRender((cur) => !cur);
  };

  const getPollsInfo = async () => {
    const fetchResult = await fetch(`http://localhost:3001/${id}`);
    let pollsInfo: any;
    if (fetchResult.status === 200) pollsInfo = await fetchResult.json();
    console.log(pollsInfo);

    if (!pollsInfo) return alert("데이터 통신 이상");

    setLeft(pollsInfo.left);
    setRight(pollsInfo.right);
    setSubject(pollsInfo.subject);
  };

  const getPercentage = () => {
    total = left + right;

    leftPercentageNum = (left / total) * 100;
    rightPercentageNum = (right / total) * 100;
  };

  useEffect(() => {
    getPollsInfo();
  }, [render]);

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
      <h2>{subject}</h2>
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
        <button onClick={() => handleVote("left")}>left up</button>
        <button onClick={() => handleVote("right")}>right up</button>
      </div>
      <br />
      <Link to="/">홈으로</Link>
    </div>
  );
};

export default PollComponent;
