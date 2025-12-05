import { Route, Routes } from "react-router";
import Matches from "./pages/Matches";
import Header from "./compontents/Header";
import Players from "./pages/Players";
import Ranking from "./pages/Ranking";
import Statistics from "./pages/Stadistics";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Ranking />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/players" element={<Players />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </>
  );
}

export default App;
