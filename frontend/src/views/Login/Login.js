import React, { useState } from "react";

import { Card, Input, Button } from "antd";
import Crane from "assets/images/crane.svg";
import styles from "./Login.module.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Card style={{ width: 300 }}>
          <img src={Crane} alt="crane-logo" />
          <h1>Manual da Obra</h1>
          <form action="">
            <div className={styles.input}>
              <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className={styles.input}>
              <Input placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            </div>
            <Button type="primary">Entrar</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
