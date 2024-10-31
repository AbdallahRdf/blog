import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import UserHomePage from "./pages/UserHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import Login from "./pages/Login";
import PostPage from "./pages/PostPage";
import Signup from "./pages/Signup";
import UsersList from "./pages/UsersList";
import NewPost from "./pages/NewPost";
import useDarkMode from "./hooks/useDarkMode";
import { createContext } from "react";

export const ThemeContext = createContext({});

export default function App() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<UserHomePage />} /> */}
            <Route index element={<AdminHomePage />} />
            <Route path="posts" element={<UserHomePage />} />
            <Route path="post" element={<PostPage />} />
            <Route path="users" element={<UsersList />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="posts/new" element={<NewPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}