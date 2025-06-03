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

  useEffect(() => {
    let result = block(userAuth, userReset)
    if (result.isBlocked) {
      navigate(result.path, { replace: true });
    }
    
  }, [userAuth, navigate, block, userReset]);

  const blockObject = block(userAuth, userReset);
  const isblockDesicion = blockObject.isBlocked;
  if (!userAuth.user && location.pathname !== "/login") {
    console.log("ProtectedRouteElement: setting block path to: ", isblockDesicion ? location.pathname : null);
      dispatch(setBlockPath(isblockDesicion ? location.pathname : null));
    }
 
  return isblockDesicion ? null : element;
}
