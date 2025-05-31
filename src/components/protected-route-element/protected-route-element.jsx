import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { getUserInfo } from "../../services/userAuth/thunks";
import { useNavigate } from "react-router-dom";

export const BlockIfAuthTrue = (userAuth) => ({ 
    isBlocked: userAuth && Boolean(userAuth.user), 
    path: "/" 
});

export const BlockIfAuthFalse = (userAuth) => ({ 
    isBlocked: userAuth && !Boolean(userAuth.user), 
    path: "/login" 
});
export function ProtectedRouteElement({ element, block }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userAuth = useAppSelector((store) => store.userAuth);

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch]);

  useEffect(() => {
    let result = block(userAuth)
    if (result.isBlocked) {
      navigate(result.path, { replace: true });
    }
  }, [userAuth, navigate, block]);

  return userAuth && !block(userAuth).isBlocked ? element : null;
}
