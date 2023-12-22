import { Link } from "react-router-dom";
import styles from "./Poll.module.css";

export default function Poll({ id, subject }: any) {
  return (
    <Link to={`${id}`}>
      <button className={styles.poll}>{subject}</button>
    </Link>
  );
}
