import React, { useState } from "react";

import routes from "routes/routes";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./NewSystem.module.scss";

const { TextArea } = Input;

const NewSystem = ({ history, match }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Page>
      <Container>
        <div className={styles.newSystem}>
          <div className={styles.title}>
            <h1>Adicionar Sistema</h1>
          </div>
          <form>
            <div className={styles.input}>
              <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className={styles.input}>
              <TextArea rows={3} placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className={styles.buttons}>
              <Button onClick={() => history.push(routes.DETAIL_CONSTRUCTION.replace(":id", match.params.id))}>Cancelar</Button>
              <Button type="primary" icon={<PlusOutlined />} htmlType="submit">Adicionar</Button>
            </div>
          </form>
        </div>
      </Container>
    </Page>
  );
};

export default NewSystem;
