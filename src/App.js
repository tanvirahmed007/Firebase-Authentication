import initializeAuthentication from "./Firebase/Firebase.initialize";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import {useState} from 'react';
import './App.css';

initializeAuthentication();

const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({});

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        const {email, displayName, photoURL} = result.user;
        const signedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(signedInUser);
      })
      .catch(error => {
        console.log(error);
      });

  };

  const handleSignOut = () => {
    
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      {
        !user.name ? 
        <button onClick={handleGoogleSignIn}>Click To Sign In</button>:
        <button onClick={handleSignOut}>Sign Out</button>
      }
      {
        user.name && (
          <div>
            <img src={user.photo} alt=""/>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        )
      }
    </div>
  );
}

export default App;
