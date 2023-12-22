import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Poll from "../components/Poll";
import styles from "./Landing.module.css";

export default function Landing() {
  const [list, setList] = useState<any>([]);

  const getPollsList = async () => {
    const res = await axios.get(`/`);
    if (res.status !== 200) return alert("데이터 통신 이상");

    const pollList = await res.data;

    setList(pollList);
  };

  useEffect(() => {
    getPollsList();
  }, []);

  return (
    <div className={styles.listBox}>
      <h1>투표 목록</h1>
      {list?.map((poll: any) => {
        return <Poll key={poll.id} id={poll.id} subject={poll.subject} />;
      })}
    </div>
  );
}
