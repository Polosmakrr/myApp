import auth from '@react-native-firebase/auth';
import {authSlice} from './authReducer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId:
    '525255036595-291c2mo1q0bpof2s7v1hjaf64c4fon83.apps.googleusercontent.com',
});

export const authSignInUser =
  ({email, password}) =>
  async (dispatch, getState) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error:', error);
      console.log('error.message:', error.message);
    }
  };

export const authSignUpUser =
  ({email, password, name}) =>
  async (dispatch, getState) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.log('create user ERROR', error);
        });

      await auth().currentUser.updateProfile({displayName: name});

      const {uid, displayName, email} = await auth().currentUser;
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          Name: displayName,
        }),
      );
    } catch (error) {
      console.log('main error:', error);
      console.log('error.message:', error.message);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            Name: user.displayName,
            email: user.email,
          }),
        );
        dispatch(
          authSlice.actions.authStateChange({
            stateChange: true,
          }),
        );
      }
    });
  } catch (error) {
    console.log('error:', error);
    console.log('error.message:', error.message);
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await GoogleSignin.signOut();
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.log('error:', error);
    console.log('error.message:', error.message);
  }
};

export const onGoogleButtonPress = async () => {
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

export const onFacebookButtonPress = async () => {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);
  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );
  return auth().signInWithCredential(facebookCredential);
};
