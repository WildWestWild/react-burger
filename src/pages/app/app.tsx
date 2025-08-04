import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import styles from "./app.module.css";
import AppMain from "../../components/app-main/app-main";
import AppHeader from "../../components/app-header/app-header";
import Registration from "../registration/registration";
import Login from "../login/login";
import ForgotPassword from "../forgot-password/forgot-password";
import ResetPassword from "../reset-password/reset-password";
import Profile from "../profile/profile";
import {
  BlockIfAuthFalse,
  BlockIfAuthFalseResetPassword,
  BlockIfAuthTrue,
  ProtectedRouteElement,
} from "../../components/protected-route-element/protected-route-element";
import NotFound from "../not-found/not-found";
import Modal from "../../components/model/model";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { JSX } from "react";
import ProfileOrders from "../profile-orders/profile-order";
import { FeedOrderDetailsCardWindow } from "../../components/feed-order-details-card/feed-order-details-card-window";
import Feed from "../feed/feed";
import FeedOrderDetailsCardModal from "../../components/feed-order-details-card/feed-order-details-card-modal";
import ProfileOrderDetailsCardModal from "../../components/profile-order-details-card-window/profile-order-details-card-modal";
import { ProfileOrderDetailsCardWindow } from "../../components/profile-order-details-card-window/profile-order-details-card-window";

export function App(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const handleModalClose = () => navigate(-1);
  return (
    <div className={styles.App}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<AppMain />} />
        <Route
          path="/login"
          element={
            <ProtectedRouteElement
              element={<Login />}
              block={BlockIfAuthTrue}
            />
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement
              element={<Registration />}
              block={BlockIfAuthTrue}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement
              element={<ForgotPassword />}
              block={BlockIfAuthTrue}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement
              element={<ResetPassword />}
              block={BlockIfAuthFalseResetPassword}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement
              element={<Profile />}
              block={BlockIfAuthFalse}
            />
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRouteElement
              element={<ProfileOrders />}
              block={BlockIfAuthFalse}
            />
          }
        />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/ingredients/:id"
          element={<IngredientDetails isNotModal={true} />}
        />
        <Route
          path="/feed/:number"
          element={<FeedOrderDetailsCardWindow isNotModal={true} />}
        />
        <Route
          path="/profile/orders/:number"
          element={
            <ProtectedRouteElement
              element={<ProfileOrderDetailsCardWindow isNotModal={true} />}
              block={BlockIfAuthFalse}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleModalClose} title="Детали ингредиента">
                <IngredientDetails isNotModal={false} />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path="/feed/:number"
            element={
              <FeedOrderDetailsCardModal handleModalClose={handleModalClose} />
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path="/profile/orders/:number"
            element={
              <ProfileOrderDetailsCardModal
                handleModalClose={handleModalClose}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}
