import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { login } from "../store/userSlice";
import Input from "../components/Input"; // Імпортуємо наш компонент Input
import styles from "../styles/Login.module.css";
import Button from "../components/Button";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(""); // Новий стан для зберігання повідомлення про помилку
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (password.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (!emailError && !passwordError) {
      try {
        await dispatch(login({ email, password }));
        if (isAuthenticated) {
          navigate("/home");
        } else {
          setLoginError("Failed to log in. Please check your credentials.");
        }
      } catch (error) {
        setLoginError("An error occurred during login. Please try again.");
      }
    }
  };

  if (isAuthenticated) {
    navigate("/home");
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.form_container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="label-email">
            <label>
              <b>Email</b>
            </label>
            <br />
            <Input
              placeholder="michael@dundermiffin.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isError={emailError}
              errorMessage="Please verify your email"
            />
          </div>
          <div className="label-email">
            <label>
              <b>Password</b>
            </label>
            <br />
            <Input
              placeholder="Type in your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isError={passwordError}
              errorMessage="Your password is too short"
            />
          </div>
          {loginError && <div className={styles.error}>{loginError}</div>}{" "}
          {/* Відображення повідомлення про помилку */}
          <div className={styles.login_btn}>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
