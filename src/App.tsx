import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import PollComponent from "./components/PollComponent";
import Main from "./pages/Main";
import Landing from "./pages/Landing";
import KakaoRedirectHandler from "./lib/KakaoRedirectHandler";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Landing />} />
          <Route path=":id" element={<PollComponent />} />
        </Route>
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler />}
        />
        <Route
          path="*"
          element={
            <Link to="/">
              <h1>404 Not Found</h1>
              <h1>홈으로</h1>
            </Link>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
