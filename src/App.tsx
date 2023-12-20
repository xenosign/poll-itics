import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import PollComponent from "./components/PollComponent";
import Main from "./pages/Main";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="" element={<Landing />} />
          <Route path=":id" element={<PollComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
