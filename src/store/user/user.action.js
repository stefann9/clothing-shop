import { USER_ACTION_TYPES } from "./user.types";
// export const setCurrentUser = (user) => {
//   return { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user };
// };

export const checkUserSession = () => ({ type: USER_ACTION_TYPES.CHECK_USER_SESSION });

// sign in
export const googleSignInStart = () => ({ type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START });
export const emailSignInStart = (email, password) => ({
  type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  payload: { email, password },
});
export const signInSuccess = (user) => ({ type: USER_ACTION_TYPES.SIGN_IN_SUCCESS, payload: user });
export const signInFailed = (error) => ({ type: USER_ACTION_TYPES.SIGN_IN_FAILED, payload: error });

// sign up
export const signUpStart = (email, password, displayName) => ({
  type: USER_ACTION_TYPES.SIGN_UP_START,
  payload: { email, password, displayName },
});
export const signUpSuccess = (user, additionalInfo) => ({
  type: USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  payload: { user, additionalInfo },
});
export const signUpFailed = (error) => ({ type: USER_ACTION_TYPES.SIGN_UP_FAILED, payload: error });

// sign out
export const signOutStart = () => ({
  type: USER_ACTION_TYPES.SIGN_OUT_START,
});
export const signOutSuccess = () => ({
  type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS,
});
export const signOutFaild = (error) => ({
  type: USER_ACTION_TYPES.SIGN_OUT_FAILED,
  payload: error,
});
