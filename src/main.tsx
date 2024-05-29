// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const initialUsers = [
  { email: "user1@example.com", password: "password1" },
  { email: "user2@example.com", password: "password2" },
  { email: "user3@example.com", password: "password3" },
  { email: "user4@example.com", password: "password4" },
  { email: "user5@example.com", password: "password5" },
  { email: "user6@example.com", password: "password6" },
  { email: "user7@example.com", password: "password7" },
  { email: "user8@example.com", password: "password8" },
  { email: "user9@example.com", password: "password9" },
  { email: "user10@example.com", password: "password10" },
];

localStorage.setItem("users", JSON.stringify(initialUsers));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
