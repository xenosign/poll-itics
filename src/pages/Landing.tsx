import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";

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
    <>
      {list?.map((poll: any) => {
        return (
          <Link to={`/${poll.id}`}>
            <h1>{poll.subject}</h1>
          </Link>
        );
      })}
    </>
  );
}
