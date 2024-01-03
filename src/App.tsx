import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import PollComponent from "./components/PollComponent";
import Main from "./pages/Main";
import Landing from "./pages/Landing";
import KakaoRedirectHandler from "./lib/KakaoRedirectHandler";
import ScrollToTop from "./components/ScrollToTop";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Landing />} />
          <Route path="/poll/:id" element={<PollComponent />} />
          <Route path="/register" element={<Register />} />
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
