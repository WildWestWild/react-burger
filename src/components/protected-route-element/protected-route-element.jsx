import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { useNavigate, useLocation } from "react-router-dom";
import { setBlockPath } from "../../services/userAuth/slice";

export const BlockIfAuthTrue = (userAuth, _) => ({ 
    isBlocked: Boolean(userAuth.user), 
    path: "/" 
});

export const BlockIfAuthFalse = (userAuth, _) => ({ 
    isBlocked: !Boolean(userAuth.user), 
    path: "/login" 
});

export const BlockIfAuthFalseResetPassword = (userAuth, userReset) => ({
    isBlocked: (Boolean(userAuth.user) || !userReset?.isForgotPasswordCompleted),
    path: "/forgot-password"
});

export function ProtectedRouteElement({ element, block }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userAuth = useAppSelector((store) => store.userAuth);
  const userReset = useAppSelector((store) => store.userReset);

  const blockObject = block(userAuth, userReset);
  const isBlocked = blockObject.isBlocked;
  const redirectPath = blockObject.path;

  useEffect(() => {
    if (isBlocked) {
      navigate(redirectPath, { replace: true });
    }
  }, [isBlocked, redirectPath, navigate]);


  useEffect(() => {
    if (!userAuth.user && location.pathname !== "/login") {
      dispatch(setBlockPath(isBlocked ? location.pathname : null));
    }
  }, [userAuth.user, isBlocked, location.pathname, dispatch]);

  return isBlocked ? null : element;
}

