import { SyncLoader } from "react-spinners";

const nomalWeight = { fontWeight: 400 };

const Loading = () => {
  return (
    <>
      <h1 style={nomalWeight}>로딩중</h1>
      <br />
      <SyncLoader />
    </>
  );
};

export default Loading;
