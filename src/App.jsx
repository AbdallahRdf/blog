import { createContext, useEffect, useState } from "react";
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
import AccountActivation from './pages/AccountActivation'
import LoadingPage from './components/commun/LoadingPage'
import WaitAccountActivation from "./pages/WaitAccountActivation";
import ErrorPage from './pages/ErrorPage';
import userRoles from './enums/userRoles';
import customAxios from "./axios/customAxios";
import { AuthContext, ThemeContext } from "./context/contexts";

export default function App() {

  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const [accessToken, setAccessToken] = useState(undefined);
  const [user, setUser] = useState(undefined);

  console.log(accessToken);
  console.log(user);

  useEffect(() => {
    const authenticate = async () => {
      let token = null;
      let jwtBody = null;
      try {
        const response = await customAxios.post('/auth/refresh-token');
        token = response.data.accessToken;
        const jwtBodyBase64 = token.split('.')[1];
        jwtBody = JSON.parse(atob(jwtBodyBase64));
      } catch (error) {
        console.log(error.message);
      }
      setAccessToken(token);
      setUser(jwtBody)
    }

    if (accessToken === undefined) {
      authenticate();
    }
  }, []);

  return (
    (accessToken === undefined)
      ?
      <LoadingPage />
      :
      <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>

                {
                  user?.role !== userRoles.USER // if admin or moderator
                    ?
                    <Route index element={<AdminHomePage />} />
                    :
                    <Route index element={<UserHomePage />} />
                }

                {
                  !accessToken // if not logged in
                  &&
                  <>
                    <Route path="auth/login" element={<Login />} />
                    <Route path="auth/register" element={<Signup />} />
                    <Route path="auth/account-activation" element={<WaitAccountActivation />} />
                    <Route path="auth/account-activation/:token" element={<AccountActivation />} />
                  </>
                }

                <Route path="users" element={<UsersList />} />
                <Route path="posts/new" element={<NewPost />} />
                <Route path="post" element={<PostPage />} />
                <Route path="posts" element={<UserHomePage />} />

                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </AuthContext.Provider>
  )
}