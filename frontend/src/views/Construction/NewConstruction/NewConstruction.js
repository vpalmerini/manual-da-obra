import React, { useState } from "react";

import { create } from "services/construction.service";
import routes from "routes/routes";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./NewConstruction.module.scss";

const NewConstruction = ({ history }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitConstruction = (e, data) => {
    e.preventDefault();
    setIsSubmitting(true);

    create(data)
      .then(() => {
        history.push(routes.HOME);
        toast.success("Obra adicionada!");
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro");
        setIsSubmitting(false);
      });
  };

  return (
    <Page>
      <Container>
        <div className={styles.newConstruction}>
          <div className={styles.title}>
            <h1>Adicionar Obra</h1>
          </div>
          <form onSubmit={(e) => submitConstruction(e, { name, location })}>
            <div className={styles.input}>
              <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className={styles.input}>
              <Input placeholder="Localização" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <div className={styles.buttons}>
              <Button onClick={() => history.push(routes.HOME)}>Cancelar</Button>
              <Button type="primary" icon={<PlusOutlined />} loading={isSubmitting} htmlType="submit">Adicionar</Button>
            </div>
          </form>
        </div>
      </Container>
    </Page>
  );
};

export default NewConstruction;
