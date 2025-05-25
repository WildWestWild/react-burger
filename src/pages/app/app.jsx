import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import AppMain from "../../components/app-main/app-main";
import AppHeader from "../../components/app-header/app-header";
import Registration from "../registration/registration";
import Login from "../login/login";

export function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
      <Router>
        <Routes>
          <Route path="/" element={<AppMain />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Registration />}/>
          <Route path="/forgot-password" />
          <Route path="/reset-password" />
          <Route path="/profile" />
          <Route path="/ingredients/:id" />
          <Route path="*" />
        </Routes>
      </Router>
    </div>
  );
}
