import { Route, Routes } from "react-router";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import SignUpPage from "@/pages/signup";
import Layout from "@/components/Layout";
import RequireAuth from "@/features/auth/RequireAuth";
import PersistLogin from "@/features/auth/PersistLogin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            {" "}
            <Route path="my-blogs">
              <Route index element={"hello world"} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
