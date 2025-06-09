import { useEffect, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { useNavigate, useLocation } from "react-router-dom";
import { setBlockPath, UserState } from "../../services/userAuth/slice";
import { UserResetState } from "../../services/userReset/slice";

type BlockFunction = (userAuth: UserState, userReset?: UserResetState) => {
  isBlocked: boolean;
  path: string;
};

// Функции блокировки с типами
export const BlockIfAuthTrue: BlockFunction = (userAuth) => ({
  isBlocked: Boolean(userAuth.user),
  path: "/",
});

export const BlockIfAuthFalse: BlockFunction = (userAuth) => ({
  isBlocked: !Boolean(userAuth.user),
  path: "/login",
});

export const BlockIfAuthFalseResetPassword: BlockFunction = (userAuth, userReset) => ({
  isBlocked: Boolean(userAuth.user) || !userReset?.isForgotPasswordCompleted,
  path: "/forgot-password",
});

// Типизация пропсов ProtectedRouteElement
interface ProtectedRouteElementProps {
  element: ReactElement;
  block: BlockFunction;
}

export function ProtectedRouteElement({ element, block }: ProtectedRouteElementProps): ReactElement | null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userAuth = useAppSelector((store) => store.userAuth);
  const userReset = useAppSelector((store) => store.userReset);

  const { isBlocked, path: redirectPath } = block(userAuth, userReset);

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
