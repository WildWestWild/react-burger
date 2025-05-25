import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import AppMain from "../../components/app-main/app-main";
import AppHeader from "../../components/app-header/app-header";

export function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
      <div className={styles["App-h1"]}>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<AppMain />} />
          <Route path="/login" />
          <Route path="/register" />
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
