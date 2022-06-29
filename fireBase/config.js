// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDgweCybf0qwUmXdvuYOL2SS3NuMStO_7I",
//   authDomain: "expense-de1eb.firebaseapp.com",
//   projectId: "expense-de1eb",
//   storageBucket: "expense-de1eb.appspot.com",
//   messagingSenderId: "525255036595",
//   appId: "1:525255036595:web:3434d333f360db8c94eac6",
//   measurementId: "G-QRC75JJGX7",
// };

// export const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// // auth.languageCode = "it";

// export const db = getFirestore(app);

// export const provider = new GoogleAuthProvider();
// provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
// provider.addScope("profile");
// provider.addScope("email");

// export const google = async () => {
//   console.log("1");
//   await signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log("2");

//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       console.log("3");

//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
// };
