import { Route, Routes } from "react-router";
import Matches from "./pages/Matches";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Matches />} />
    </Routes>
  );
}

export default App;
