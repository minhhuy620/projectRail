import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
const config = {
  apiKey: "AIzaSyDH5WXItCqRV38gPjz6XJUo4nfpumNwlhs",
  authDomain: "capstone-446b9.firebaseapp.com",
  databaseURL: "https://capstone-446b9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "capstone-446b9",
  storageBucket: "capstone-446b9.appspot.com",
  messagingSenderId: "602111636330",
  appId: "1:602111636330:web:c43d173c331a1a4a13ab13",
  measurementId: "G-V06KVWXDMT"
};
app.initializeApp(config);
class Firebase {
  constructor() {
    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;
   /* Firebase APIs */
    this.auth = app.auth();
    this.db = app.database();
    // this.dbstore = app.firestore();
    // this.storage = app.storage();
    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  // *** Auth API ***

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);
  doSignOut = () => this.auth.signOut();

  // *** Merge Auth and DB User API *** //
  doCreateUser = (id, username, email, identityCard, phoneNumber, roles, photoURL, lock) =>
    this.db.ref(`users/${id}`).set({
      username,
      email,
      identityCard,
      phoneNumber,
      roles,
      photoURL,
      lock
    });
  //signup
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  //signin
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  //password reset
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  //password change
  doPasswordChange = password => this.auth.currentUser.updatePassword(password);
  //Verify Email
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: "http://localhost:3000",
    });
  //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              roles: authUser.roles,
              lock: authUser.lock,
              photoURL: authUser.photoURL,
              phoneNumber: authUser.phoneNumber,
              identityCard: authUser.identityCard,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`/users/${uid}`);
  userlock = uid => this.db.ref(`/users/${uid}/lock`);
  changeRoleStaff = uid => this.db.ref(`/users/${uid}/roles`);

  users = () => this.db.ref('/users');
  // productData =()=> this.db.ref('/products');
  // productNameImage = name => this.storage.ref(`product-images/${name}`);
  // productImage = () => this.storage.ref('product-images');
  // addProduct = () => this.dbstore.collection('Products');
}
const dbstore = app.firestore();
const storage = app.storage();
const auth = app.auth();
const db = app.database();
export { dbstore, storage, auth, db }
export default Firebase;
