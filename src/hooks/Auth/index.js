
import { getAuth, getIdToken, GoogleAuthProvider, onAuthStateChanged, signInWithPopup,signOut  } from "firebase/auth";
import { firebaseInit } from './../Firebase/index';
import { useEffect, useState } from "react";

function useFirebase() {
  const [user,setUser] = useState({});
  const [token,setToken] = useState("");
  firebaseInit();
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const logout = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
            getIdToken(user).then((idToken) => setToken(idToken));
        } else {
            setUser({});
        }
    });
}, []);

  return { loginWithGoogle,logout,user,setUser,token };
}

export default useFirebase;
