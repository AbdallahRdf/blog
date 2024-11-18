import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Posts from "./pages/Posts";
import AdminHomePage from "./pages/AdminHomePage";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import UsersList from "./pages/UsersList";
import NewPost from "./pages/NewPost";
import useDarkMode from "./hooks/useDarkMode";
import AccountActivation from './pages/AccountActivation'
import LoadingPage from './components/commun/LoadingPage'
import WaitAccountActivation from "./pages/WaitAccountActivation";
import ErrorPage from './pages/ErrorPage';
import userRoles from './enums/userRoles';
import { AuthContext, SupabaseContext, ThemeContext } from "./context/contexts";
import useCustomAxios from "./hooks/useCustomAxios";
import { createClient } from "@supabase/supabase-js";
import LayoutWithoutNavbar from "./components/LayoutWithoutNavbar";

export default function App() {

  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const customAxios = useCustomAxios();

  const [accessToken, setAccessToken] = useState(undefined);
  const [user, setUser] = useState(undefined);

  const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);

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
        console.log('app component: ' + error.message);
      } finally {
        setAccessToken(token);
        setUser(jwtBody)
      }
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
      <SupabaseContext.Provider value={supabase}>
        <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
          <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            <BrowserRouter>
              <Routes>

                <Route path="/" element={<Layout />}>
                  <Route index element={<Posts />} />
                  <Route path="posts" element={<Posts />} />
                  <Route path="posts/:slug" element={<Post />} />
                  {
                    (user?.role === userRoles.ADMIN || user?.role === userRoles.MODERATOR) // if admin or moderator
                    &&
                    <>
                      <Route path="dashboard" element={<AdminHomePage />} />
                      <Route path="users" element={<UsersList />} />
                      <Route path="posts/new" element={<NewPost />} />
                    </>
                  }
                </Route>

                <Route path="/" element={<LayoutWithoutNavbar />} >
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
                  <Route path="*" element={<ErrorPage />} />
                </Route>

              </Routes>
            </BrowserRouter>
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </SupabaseContext.Provider>
  )
}