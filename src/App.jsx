import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";

import Home from "./Pages/Home";
import SetupInterview from "./Pages/SetupInterview";
import Interview from "./Pages/Interview";
import Result from "./Pages/Result";
import History from "./Pages/History";
import Dashboard from "./Pages/Dashboard";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/setup"
          element={<SetupInterview />}
        />

        <Route
          path="/interview"
          element={<Interview />}
        />

        <Route
          path="/result"
          element={<Result />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;