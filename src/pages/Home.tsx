import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { logout } from "../store/userSlice";
import Button from "../components/Button";
import styles from "../styles/Home.module.css"; // Правильний імпорт модулів стилів

const Home: React.FC = () => {
  const email = useSelector((state: RootState) => state.user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <h2>
        Logged in as <br />
        {email}
      </h2>
      <div className={styles.logout_btn}>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Home;
