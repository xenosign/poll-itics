import React, { useEffect, useRef, useState } from "react";
import styles from "./PollComponent.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "../lib/axios";
import { useSelector } from "react-redux";
import classNames from "classnames";

const PollComponent: React.FC = () => {
  const { id } = useParams();

  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(0);
  const [subject, setSubject] = useState<string>("");
  const [voted, setVoted] = useState<string>("");
  const [render, setRender] = useState<boolean>(true);

  const leftDivRef = useRef<HTMLDivElement>(null);
  const rightDivRef = useRef<HTMLDivElement>(null);
  const centerDivRef = useRef<HTMLDivElement>(null);
  const leftDivTextBoxRef = useRef<HTMLDivElement>(null);
  const rightDivTextBoxRef = useRef<HTMLDivElement>(null);
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);

  let total = left + right;
  let leftPercentageNum = (left / total) * 100;
  let rightPercentageNum = (right / total) * 100;
  let leftPercentageStr = leftPercentageNum.toFixed(1) + "%";
  let rightPercentageStr = rightPercentageNum.toFixed(1) + "%";

  const handleVote = async (direction: string) => {
    const res: any = await axios.post(`/poll/${id}/${direction}`, {
      userId: 2,
    });

    if (res.status !== 200)
      return alert("데이터 통신 오류, 다시 시도해 주세요 :)");

    setRender((cur) => !cur);
  };

  const getPollInfo = async () => {
    const res = await axios.get(`/poll/${id}`);
    let pollInfo: any;
    if (res.status === 200) pollInfo = await res.data;

    if (!pollInfo) return alert("데이터 통신 이상");

    setLeft(pollInfo.left);
    setRight(pollInfo.right);
    setSubject(pollInfo.subject);
  };

  const getPercentage = () => {
    total = left + right;

    leftPercentageNum = (left / total) * 100;
    rightPercentageNum = (right / total) * 100;
  };

  const userInfo = useSelector((state: any) => state.user);

  const getVoteInfo = async (userId: string) => {
    const res: any = await axios.post(`/user/get/`, {
      userId: userId,
    });

    const votedList = res.data.histories;

    const isVoted = votedList[`${id}`];

    if (isVoted === undefined || isVoted === "") return;

    setVoted(isVoted);
  };

  useEffect(() => {
    getPollInfo();
    if (userInfo.isLogin) getVoteInfo(userInfo.id);
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
      <p className={styles.subject}>{subject}</p>
      {<p></p>}
      <div className={styles.box}>
        <div ref={leftDivRef} className={styles.leftBox}>
          <div ref={leftDivTextBoxRef} className={styles.votePercent}>
            {leftPercentageNum !== 0 && `${leftPercentageStr}`}
          </div>
        </div>
        <div ref={centerDivRef} className={styles.textBox}>
          첫 투표의 주인공, 바로 당신!
        </div>
        <div ref={rightDivRef} className={styles.rightBox}>
          <div ref={rightDivTextBoxRef} className={styles.votePercent}>
            {rightPercentageNum !== 0 && `${rightPercentageStr}`}
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <div>
          <button
            className={classNames(
              styles.leftButton,
              voted === "L" && styles.leftVoted
            )}
            onClick={() => handleVote("left")}
            ref={leftButtonRef}
          >
            <h1 className={styles.leftThumb}>👍</h1>
          </button>
        </div>
        <div>
          <button
            className={classNames(
              styles.rightButton,
              voted === "R" && styles.rightVoted
            )}
            onClick={() => handleVote("right")}
            ref={rightButtonRef}
          >
            <h1 className={styles.rightThumb}>👍</h1>
          </button>
        </div>
      </div>
      <Link to="/">
        <button className={styles.homeButton}>목록으로</button>
      </Link>
    </div>
  );
};

export default PollComponent;
