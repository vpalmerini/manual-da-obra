import React, { useState, useEffect } from "react";

import { get, edit } from "services/system.service";
import routes from "routes/routes";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import { Spin, Input, Button } from "antd";
import { toast } from "react-toastify";

import styles from "./EditSystem.module.scss";

const { TextArea } = Input;

const EditSystem = ({ history, match }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id, nickname } = match.params;

  const getSystem = () => {
    setIsLoading(true);
    get(id, nickname)
      .then((response) => {
        const { name, description } = response.data.system;
        setName(name);
        setDescription(description);
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro pra carregar os dados do sistema");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getSystem();
  }, []);

  const submitSystem = (e, id, nickname, data) => {
    e.preventDefault();
    setIsSubmitting(true);

    edit(id, nickname, data)
      .then(() => {
        history.push(routes.DETAIL_CONSTRUCTION.replace(":id", match.params.id));
        toast.success("Sistema atualizado!");
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro");
        setIsSubmitting(false);
      });
  };

  return (
    <Page>
      <Container>
        {isLoading ? (<div className="spinner"><Spin size="large" /></div>) : (
          <div className={styles.editSystem}>
            <div className={styles.title}>
              <h1>Editar Sistema</h1>
            </div>
            <form onSubmit={(e) => submitSystem(e, id, nickname, { name, description })}>
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
        )}
      </Container>
    </Page>
  );
};

export default EditSystem;
