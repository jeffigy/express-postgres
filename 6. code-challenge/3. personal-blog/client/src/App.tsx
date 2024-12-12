import { Route, Routes } from "react-router";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import SignUpPage from "@/pages/signup";
import Layout from "@/components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
};

export default App;
