import React, { useState } from "react";

import { create } from "services/system.service";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import {
  Input, Button, Upload, message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./NewSystem.module.scss";

const { TextArea } = Input;
const { Dragger } = Upload;

const NewSystem = ({ history, match }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitSystem = (e, id, data) => {
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

  const props = {
    name: "file",
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
            <div className={styles.files}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Clique ou arraste arquivos pra cá!</p>
                <p className="ant-upload-hint">
                  Arquivos .pdf ou .mp4
                </p>
              </Dragger>
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

export default NewSystem;
