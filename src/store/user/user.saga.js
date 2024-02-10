import { all, call, takeLatest, put } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";

import {
  signInFailed,
  signInSuccess,
  signOutFaild,
  signOutSuccess,
  signUpSuccess,
} from "./user.action";

import {
  createAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

// Worker Saga create a user document (if dosen't exist) && dispatch user
function* getSnapshotFromUserAuth(userAuth, additionalInfo = {}) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalInfo);
    const user = { id: userSnapshot.id, ...userSnapshot.data() };
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// Worker Saga for checking user session
function* isUserAuth() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// Worker sign in with google
function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    // console.log(user);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// Worker sign in with email
function* signInWithEmail({ payload }) {
  const { email, password } = payload;
  try {
    const { user } = yield call(signInUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// Worker for sign up
function* signUp({ payload }) {
  const { email, password, displayName } = payload;
  try {
    const { user } = yield call(createAuthWithEmailAndPassword, email, password);
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {}
}
// Worker for sign in after sign up
function* signInAfterSignUp({ payload }) {
  const { user, additionalInfo } = payload;
  try {
    yield call(getSnapshotFromUserAuth, user, additionalInfo);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

//Worker for sign out
function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFaild());
  }
}

// Watcher Saga check session
function* watchCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuth);
}

// Watcher Saga sign in with google
function* watchSignInWithGoogle() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// Watcher Saga sign in with email
function* watchSignInWithEmail() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

// Watcher Saga sign up
function* watchSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}
// Watcher Saga sign in after sign up
function* watchSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// Watcher Saga sign out
function* watchSignOut() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

// Root Saga
export function* userSaga() {
  yield all([
    call(watchCheckUserSession),
    call(watchSignInWithGoogle),
    call(watchSignInWithEmail),
    call(watchSignUpStart),
    call(watchSignUpSuccess),
    call(watchSignOut),
  ]);
}
