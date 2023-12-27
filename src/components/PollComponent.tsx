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
  const [notYet, setNotYet] = useState<string>("");
  const [voteWhere, setVoteWhere] = useState<string>("");
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

  const changeDateFormat = (date: Date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() < 9 ? "0" + date.getDate() : date.getDate()) +
      ", " +
      (date.getHours() < 9 ? "0" + date.getHours() : date.getHours()) +
      ":" +
      date.getMinutes() +
      " 이후"
    );
  };

  const getVoteInfo = async (userId: string) => {
    const res: any = await axios.post(`/user/get/`, {
      userId: userId,
    });

    const votedList = res.data.histories;
    const voteInfo = votedList[`${id}`];

    if (voteInfo === undefined || voteInfo === "") return;

    const tmpArr = voteInfo.split("/");
    const where = tmpArr[0];
    const votedTime = tmpArr[1];
    const limitedTime = new Date(votedTime);
    limitedTime.setDate(limitedTime.getDate() + 1);
    const now = new Date();

    setVoteWhere(where);

    if (limitedTime > now) {
      setNotYet(changeDateFormat(limitedTime));
    }
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
      {
        <p className={styles.voteSubject}>
          {voteWhere === "" ? "투표 해주세요 🤩" : "투표 완료 😎"}
        </p>
      }
      {
        <p className={styles.timeSubject}>
          {notYet ? `(투표 가능 시간 : ${notYet})` : "(투표 가능)"}
        </p>
      }
      {
        <p className={styles.subSubject}>
          투표 및 수정은 하루에 한번만 가능합니다
        </p>
      }
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
        <div className={classNames(notYet && styles.disabled)}>
          <button
            className={classNames(
              styles.leftButton,
              voteWhere === "L" && styles.leftVoted
            )}
            onClick={() => handleVote("left")}
            ref={leftButtonRef}
          >
            <h1 className={styles.leftThumb}>👍</h1>
          </button>
        </div>
        <div className={classNames(notYet && styles.disabled)}>
          <button
            className={classNames(
              styles.rightButton,
              voteWhere === "R" && styles.rightVoted
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
