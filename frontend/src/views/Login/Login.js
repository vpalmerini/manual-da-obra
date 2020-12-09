import React, { useState } from "react";

import login from "services/auth.service";
import routes from "routes/routes";

import { toast } from "react-toastify";
import { Card, Input, Button } from "antd";
import Crane from "assets/images/crane.svg";
import styles from "./Login.module.scss";

const Login = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLogin = async (e, data) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { username, password } = data;
    login(username, password)
      .then(() => {
        history.push(routes.DASHBOARD);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          toast.error("Credenciais Inválidas");
        } else {
          toast.error("Ops! Aconteceu algum erro");
        }
        setIsSubmitting(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Card style={{ width: 300 }}>
          <img src={Crane} alt="crane-logo" />
          <h1>Manual da Obra</h1>
          <form onSubmit={(e) => submitLogin(e, { username, password })}>
            <div className={styles.input}>
              <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className={styles.input}>
              <Input placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            </div>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>Entrar</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
