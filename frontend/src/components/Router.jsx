import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersistLogin from "./PersistLogin";
import RequireAuth from "./RequireAuth";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/auth-callback/:token" element={<AuthCallbackPage />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" exact element={<IndexPage />} />
          </Route>
        </Route>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
