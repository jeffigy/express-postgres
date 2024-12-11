import { Route, Routes } from "react-router";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/signup";
import Layout from "@/components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
    </Routes>
  );
};

export default App;
