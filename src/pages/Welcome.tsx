import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"; // Імпортуємо компонент Button
import styles from "../styles/Welcome.module.css";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome</h1>
      <div className={styles.container}>
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/signup")}>Sign Up</Button>
      </div>
    </>
  );
};

export default Welcome;
