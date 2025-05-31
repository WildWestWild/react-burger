import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { getUserInfo } from "../../services/userAuth/thunks";
import { useNavigate } from "react-router-dom";

export const BlockIfAuthTrue = (user) => ({ 
    isBlocked: Boolean(user), 
    path: "/" 
});

export const BlockIfAuthFalse = (user) => ({ 
    isBlocked: !user, 
    path: "/login" 
});
export function ProtectedRouteElement({ element, block }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((store) => store.userAuth);

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch]);

  useEffect(() => {
    let result = block(user)
    if (result.isBlocked) {
      navigate(result.path, { replace: true });
    }
  }, [user, navigate, block]);

  return !block(user).isBlocked ? element : null;
}
