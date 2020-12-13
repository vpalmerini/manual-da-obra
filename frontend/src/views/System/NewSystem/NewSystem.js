import React, { useState } from "react";

import { create } from "services/system.service";
import routes from "routes/routes";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import { Input, Button } from "antd";
import { toast } from "react-toastify";

import styles from "./NewSystem.module.scss";

const { TextArea } = Input;

const NewSystem = ({ history, match }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitSystem = (e, id, data) => {
    e.preventDefault();
    setIsSubmitting(true);

    create(id, data)
      .then(() => {
        history.push(routes.DETAIL_CONSTRUCTION.replace(":id", match.params.id));
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
          <form onSubmit={(e) => submitSystem(e, match.params.id, { name, description })}>
            <div className={styles.input}>
              <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className={styles.input}>
              <TextArea rows={3} placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className={styles.buttons}>
              <Button onClick={() => history.push(routes.DETAIL_CONSTRUCTION.replace(":id", match.params.id))}>Cancelar</Button>
              <Button type="primary" loading={isSubmitting} htmlType="submit">Enviar</Button>
            </div>
          </form>
        </div>
      </Container>
    </Page>
  );
};

export default NewSystem;
