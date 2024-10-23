import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PollComponent.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../lib/axios';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { changeDateFormat } from '../lib/utils';
import Loading from './Loading';
import ServerError from './ServerError';

const PollComponent: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(0);
  const [subject, setSubject] = useState<string>('');
  const [leftSubject, setLeftSubject] = useState<string>('');
  const [rightSubject, setRightSubject] = useState<string>('');
  const [notYet, setNotYet] = useState<string>('');
  const [voteWhere, setVoteWhere] = useState<string>('');
  const [render, setRender] = useState<boolean>(true);
  const [serverErr, setServerErr] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
  let leftPercentageStr = leftPercentageNum.toFixed(1) + '%';
  let rightPercentageStr = rightPercentageNum.toFixed(1) + '%';

  const userInfo = useSelector((state: any) => state.user);

  const handleVote = async (direction: string) => {
    try {
      const res: any = await axios.post(`/poll/${id}/${direction}`, {
        code: userInfo.code,
      });

      setRender((cur) => !cur);
    } catch (err: any) {
      if (err.resonse?.message === 'Network Error')
        return alert('서버 통신 이상');
      alert(err.response?.data);
    }
  };

  const handleRefresh = useCallback(() => navigate(0), []);

  const getPollInfo = async () => {
    try {
      const res = await axios.get(`/poll/${id}`);
      let pollInfo: any;
      pollInfo = await res.data;

      setLeft(pollInfo.left);
      setRight(pollInfo.right);
      setSubject(pollInfo.subject);
      setLeftSubject(pollInfo.leftSubject);
      setRightSubject(pollInfo.rightSubject);
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'Network Error') {
        alert('서버 통신 이상');
        setServerErr(true);
        setLoading(false);
      } else {
        alert(err.response?.data);
      }
    }
  };

  const getPercentage = () => {
    total = left + right;

    leftPercentageNum = (left / total) * 100;
    rightPercentageNum = (right / total) * 100;
  };

  const getVoteInfo = async (code: string) => {
    try {
      const res: any = await axios.post(`/user/get/`, {
        code: code,
      });

      const votedList = res.data.histories;
      const voteInfo = votedList[`${id}`];

      if (voteInfo === undefined || voteInfo === '') return;

      const tmpArr = voteInfo.split('/');
      const where = tmpArr[0];
      const limitTimeStr = tmpArr[1];
      const limitTime = new Date(limitTimeStr);
      const now = new Date();

      if (limitTime > now) {
        setNotYet(changeDateFormat(limitTime));
      }

      setVoteWhere(where);
    } catch (err: any) {
      if (serverErr) return;
      alert(err.response?.data);
    }
  };

  useEffect(() => {
    getPollInfo();
    if (serverErr) return;
    if (userInfo.isLogin && !loading) getVoteInfo(userInfo.code);
  }, [render, loading]);

  useEffect(() => {
    if (loading || serverErr) return;

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

      centerDivRef.current.style.width = '0%';
      centerDivRef.current.innerText = '';

      left !== 0 && (leftDivTextBoxRef.current.style.opacity = '100%');

      right !== 0 && (rightDivTextBoxRef.current.style.opacity = '100%');
    }
  }, [left, right]);

  if (loading) return <Loading />;

  if (serverErr) return <ServerError />;

  return (
    <div className={styles.wrap}>
      <p className={styles.subject}>{subject}</p>
      {
        <p className={styles.voteSubject}>
          {!userInfo.isLogin
            ? '로그인 후 투표가 가능합니다 😅'
            : voteWhere === ''
            ? '투표 해주세요 🤩'
            : '투표 완료 😎'}
        </p>
      }
      {
        <p className={styles.timeSubject}>
          {!userInfo.isLogin
            ? ''
            : voteWhere === '' || voteWhere === undefined
            ? '(투표 가능)'
            : notYet
            ? `(변경 가능 시간 : ${notYet})`
            : '(투표 변경 가능)'}
        </p>
      }
      {
        <p className={styles.subSubject}>
          {!userInfo.isLogin ? '' : '투표는 하루에 한번만 가능합니다'}
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
        <div
          className={classNames(
            voteWhere === 'L' && styles.disabled,
            notYet && styles.disabled,
            !userInfo.isLogin && styles.disabled
          )}
        >
          <button
            className={classNames(
              styles.leftButton,
              voteWhere === 'L' && styles.leftVoted
            )}
            onClick={() => handleVote('left')}
            ref={leftButtonRef}
          >
            <h1 className={styles.leftThumb}>👍</h1>
            <h3 className={styles.leftRightSubject}>{leftSubject}</h3>
          </button>
        </div>
        <div
          className={classNames(
            voteWhere === 'R' && styles.disabled,
            notYet && styles.disabled,
            !userInfo.isLogin && styles.disabled
          )}
        >
          <button
            className={classNames(
              styles.rightButton,
              voteWhere === 'R' && styles.rightVoted
            )}
            onClick={() => handleVote('right')}
            ref={rightButtonRef}
          >
            <h1 className={styles.rightThumb}>👍</h1>
            <h3 className={styles.leftRightSubject}>{rightSubject}</h3>
          </button>
        </div>
      </div>
      <div className={styles.funcButtonBox}>
        <button className={styles.refreshButton} onClick={handleRefresh}>
          새로고침
        </button>
        <Link to="/">
          <button className={styles.homeButton}>목록으로</button>
        </Link>
      </div>
    </div>
  );
};

export default PollComponent;
