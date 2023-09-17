import { Route, Routes } from "react-router-dom";
import IndexPage from "./components/IndexPage.jsx";
import InvalidPage from "./components/InvalidPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route exact path="/" element={<IndexPage />} />
      </Route>

      <Route path="/*" element={<InvalidPage />} />
    </Routes>
  );
};

export default App;
