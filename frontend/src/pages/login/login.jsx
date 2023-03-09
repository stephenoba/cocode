import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Link } from "react-router-dom";

import './login.scss'

const Login = () => {
  const { user, loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <section>
      {
        user ? <Navigate to="/dashboard" />
        : (
          <div className="login-page">
            <div className="form">
              <form className="login-form" onSubmit={handleSubmit}>
                <input id="username" type="text" placeholder="username"/>
                <input id="password" type="password" placeholder="password"/>
                <button>login</button>
              </form>
              <p className="message">Don't have an account? <Link to="/register">Register</Link></p>
            </div>
          </div>
        )
      }
    </section>
  );
};

export default Login;