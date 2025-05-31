import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { getUserInfo } from "../../services/userAuth/thunks";
import { useNavigate } from "react-router-dom";

export const BlockIfAuthTrue = (userAuth, _) => ({ 
    isBlocked: userAuth && Boolean(userAuth.user), 
    path: "/" 
});

export const BlockIfAuthFalse = (userAuth, _) => ({ 
    isBlocked: userAuth && !Boolean(userAuth.user), 
    path: "/login" 
});

export const BlockIfAuthFalseResetPassword = (userAuth, userReset) => ({
    isBlocked: userAuth && Boolean(userAuth.user) && !userReset.isForgotPasswordCompleted,
    path: "/forgot-password"
});

export function ProtectedRouteElement({ element, block }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userAuth = useAppSelector((store) => store.userAuth);
  const userReset = useAppSelector((store) => store.resetPassword);

  useEffect(() => {
    if (!userAuth.user && !userAuth.isLoading) {
      dispatch(getUserInfo());
    }
  }, [userAuth, dispatch]);

  useEffect(() => {
    let result = block(userAuth, userReset)
    console.log("ProtectedRouteElement: ", result);
    if (result.isBlocked) {
      navigate(result.path, { replace: true });
    }
  }, [userAuth, navigate, block, userReset]);

  return userAuth && !block(userAuth, userReset).isBlocked ? element : null;
}
