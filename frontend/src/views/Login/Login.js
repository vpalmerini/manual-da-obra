import React from "react";

import { Card, Input } from "antd";
import Crane from "assets/images/crane.svg";
import styles from "./Login.module.scss";

const Login = () => (
  <div className={styles.container}>
    <div className={styles.card}>
      <Card style={{ width: 300 }}>
        <img src={Crane} alt="crane-logo" />
        <div className={styles.input}>
          <Input placeholder="Username" />
        </div>
        <div className={styles.input}>
          <Input placeholder="Senha" />
        </div>
      </Card>
    </div>
  </div>
);

export default Login;
