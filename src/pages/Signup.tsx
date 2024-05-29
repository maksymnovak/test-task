import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { register } from "../store/userSlice";
import Input from "../components/Input";
import styles from "../styles/Signup.module.css";
import Button from "../components/Button";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMatchError, setEmailMatchError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false); // Новий стан для помилки пароля
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(""); // Повідомлення про помилку пароля
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.user.error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUsers = localStorage.getItem("users");
    const users: { email: string; password: string }[] = storedUsers
      ? JSON.parse(storedUsers)
      : [];

    // Перевірка чи введено щось в поле електронної пошти
    if (!email.trim()) {
      setEmailMatchError(true);
      setEmailErrorMessage("Please enter your email.");
      return;
    }

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      setEmailMatchError(true);
      setEmailErrorMessage("This email is used by another user.");
      return;
    }

    if (email !== confirmEmail) {
      setEmailMatchError(true);
      setEmailErrorMessage("Your emails don't match.");
      return;
    }

    if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Your password is too short");
      return;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    dispatch(register({ email, password }));
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <div className={styles.form_container}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isError={emailMatchError}
              errorMessage={emailErrorMessage}
            />
          </div>
          <div>
            <label>Re-enter Email:</label>
            <Input
              placeholder="Re-enter your email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              isError={emailMatchError}
            />
          </div>
          <div>
            <label>Password:</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isError={passwordError} // Додаємо перевірку на помилку пароля
              errorMessage={passwordErrorMessage} // Додаємо повідомлення про помилку пароля
            />
          </div>
          <div className={styles.submit}>
            <Button type="submit">Sign Up</Button>
          </div>
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
