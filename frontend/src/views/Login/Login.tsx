import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { RouteComponentProps, useLocation } from "react-router-dom";

import { context } from "store/store";
import types from "store/types";
import { login } from "services/auth.service";
import routes from "routes/routes";

import { toast } from "react-toastify";
import { Card, Input, Button } from "antd";
import Crane from "assets/images/crane.svg";
import styles from "./Login.module.scss";

interface LocationState {
  logout: boolean;
  error: any;
}

interface Data {
  username: string;
  password: string;
}

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { dispatch } = useContext(context);
  const location = useLocation<LocationState>();

  useEffect(() => {
    if (location && location.state) {
      if (location.state.logout) {
        dispatch({ type: types.LOGOUT });

        if (location.state.error) {
          toast.info("Sua sessão expirou. Faça login novamente");
        }
      }
    }
  }, [location]);

  const submitLogin = async (e: React.FormEvent<HTMLElement>, data: Data) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { username, password } = data;
    login(username, password)
      .then(() => {
        dispatch({ type: types.LOGIN });
        history.push(routes.HOME);
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
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.input}>
              <Input
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
