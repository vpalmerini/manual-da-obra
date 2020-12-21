import React, { useState } from "react";

import { create } from "services/construction.service";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import { Input, Button } from "antd";
import { toast } from "react-toastify";

import styles from "./NewConstruction.module.scss";

const NewConstruction = ({ history }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitConstruction = (e, data) => {
    e.preventDefault();
    setIsSubmitting(true);

    create(data)
      .then(() => {
        history.goBack();
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
          <form onSubmit={(e) => submitConstruction(e, { name, location, image: imageURL })}>
            <div className={styles.input}>
              <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className={styles.input}>
              <Input placeholder="Localização" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <div className={styles.input}>
              <Input placeholder="URL da Imagem" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
            </div>
            <div className={styles.buttons}>
              <Button onClick={() => history.goBack()}>Cancelar</Button>
              <Button type="primary" loading={isSubmitting} htmlType="submit">Enviar</Button>
            </div>
          </form>
        </div>
      </Container>
    </Page>
  );
};

export default NewConstruction;
