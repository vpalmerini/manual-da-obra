import * as React from "react";
import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import { create } from "services/system.service";
import { System } from "interfaces/system.interface";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import { Input, Button } from "antd";
import { toast } from "react-toastify";

import styles from "./NewSystem.module.scss";

const { TextArea } = Input;

interface RouteParams {
  id: string;
}

const NewSystem: React.FC<RouteComponentProps<RouteParams>> = ({
  history,
  match,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitSystem = (
    e: React.FormEvent<HTMLElement>,
    id: string,
    data: System
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    create(id, data)
      .then(() => {
        history.goBack();
        toast.success("Sistema adicionado!");
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro");
        setIsSubmitting(false);
      });
  };

  return (
    <Page>
      <Container>
        <div className={styles.newSystem}>
          <div className={styles.title}>
            <h1>Adicionar Sistema</h1>
          </div>
          <form
            onSubmit={(e) =>
              submitSystem(e, match.params.id, { name, description })
            }
          >
            <div className={styles.input}>
              <Input
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.input}>
              <TextArea
                rows={3}
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={styles.buttons}>
              <Button onClick={() => history.goBack()}>Cancelar</Button>
              <Button type="primary" loading={isSubmitting} htmlType="submit">
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </Page>
  );
};

export default NewSystem;
