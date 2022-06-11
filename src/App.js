import initializeAuthentication from "./Firebase/Firebase.initialize";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import {useState} from 'react';
import './App.css';


initializeAuthentication();

const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    
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



  const handleEmailChange = (event) => {
    
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    
    setPassword(event.target.value);
  }

  const handleCreateUser = (e) => {
    e.preventDefault();
    if(password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }


    
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        })
        
        
      }

  return (
    <div className="mx-5 p-5">
      <form onSubmit={handleCreateUser}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input onBlur={handleEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input onBlur={handlePasswordChange} type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <div className="mb-3 text-danger">{error}</div>
        <button onClick={handleCreateUser} type="submit" className="btn btn-primary">Submit</button>
      </form>

      <div>===================================================</div>
      <br /><br /><br />
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
