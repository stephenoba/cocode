import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Link } from "react-router-dom";

import HomeNavbar from "../../components/homenavbar/homeNavbar";

import './login.scss'

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { user, registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

  return (
    <section>
      <HomeNavbar/>
      {
        user ? <Navigate to="/dashboard" />
        : (
          <div className="login-page">
            <div className="form">
              <form className="register-form" onSubmit={handleSubmit}>
                <input 
                  type="text"
                  id="username"
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
                <input 
                  type="password"
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <input
                  type="password"
                  id="confirm-password"
                  onChange={e => setPassword2(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
                <p className="error">{password2 !== password ? "Passwords do not match" : ""}</p>
                <button>Register</button>
                <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
              </form>
            </div>
          </div>
        )
      }
    </section>
  );
};

export default Register;