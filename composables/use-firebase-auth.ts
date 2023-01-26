import { useFireUser } from "./../store/fire-user";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
const { $firebaseAuthProvider } = useNuxtApp();

export const useFirebaseAuth = () => {
  const { setUser } = useFireUser();

  $firebaseAuthProvider?.onAuthStateChanged((user: User) => {
    setUser({
      user,
    });
  });

  const signin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword($firebaseAuthProvider, email, password);
    } catch (error: any) {
      console.log(error);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(
        $firebaseAuthProvider,
        email,
        password
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const google = new GoogleAuthProvider();
      signInWithPopup($firebaseAuthProvider, google).then((results) => {
        setUser({
          user: results.user,
        });
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return { signin, signup, signUpWithGoogle };
};
