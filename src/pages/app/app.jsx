import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import AppMain from "../../components/app-main/app-main";
import AppHeader from "../../components/app-header/app-header";
import Registration from "../registration/registration";
import Login from "../login/login";
import ForgotPassword from "../forgot-password/forgot-password";
import ResetPassword from "../reset-password/reset-password";
import Profile from "../profile/profile";
import { BlockIfAuthFalse, BlockIfAuthTrue, ProtectedRouteElement } from "../../components/protected-route-element/protected-route-element";
import NotFound from "../not-found/not-found";

export function App() {
  return (
    <div className={styles.App}>
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<AppMain />} />
          <Route path="/login" element={<ProtectedRouteElement element={<Login/>} block={BlockIfAuthTrue}/>}/>
          <Route path="/register" element={<ProtectedRouteElement element={<Registration/>} block={BlockIfAuthTrue}/>}/>
          <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPassword />} block={BlockIfAuthTrue}/>} />
          <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPassword/>} block={BlockIfAuthTrue}/>}/>
          <Route path="/profile" element={<ProtectedRouteElement element={<Profile/>} block={BlockIfAuthFalse}/>}/>
          <Route path="/ingredients/:id" />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}
