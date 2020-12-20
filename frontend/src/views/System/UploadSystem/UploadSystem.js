import React, { useState, useEffect } from "react";

import { detail, upload } from "services/system.service";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import {
  Spin, Button, Input, Upload, message,
} from "antd";
import { InboxOutlined, CheckCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./UploadSystem.module.scss";

const { Dragger } = Upload;

const UploadSystem = ({ history, match }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getSystem = (id, nickname) => {
    setIsLoading(true);
    detail(id, nickname)
      .then((response) => {
        const { name, description } = response.data.system;
        setName(name);
        setDescription(description);
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro pra pegar os dados do sistema");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { id, nickname } = match.params;

  useEffect(() => {
    getSystem(id, nickname);
  }, []);

  const submitFile = (id, nickname, fileName, options) => {
    const data = new FormData();
    data.append("file", options.file);
    data.append("name", fileName);
    upload(id, nickname, data)
      .then((response) => {
        options.onSuccess(response.data, options.file);
        history.goBack();
      })
      .catch((err) => {
        options.onError(err);
      });
  };

  const props = {
    name: "file",
    beforeUpload: () => {
      if (!fileName) {
        toast.error("Ops! Seu arquivo precisa de um nome");
        return false;
      }
      return true;
    },
    customRequest: (options) => {
      submitFile(id, nickname, fileName, options);
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} carregado com sucesso!.`);
      } else if (status === "error") {
        message.error(`Upload do arquivo ${info.file.name} falhou.`);
      }
    },
  };

  return (
    <Page>
      <Container>
        {isLoading ? (<div className="spinner"><Spin size="large" /></div>) : (
          <div className={styles.system}>
            <div className={styles.title}>
              <h1>{name}</h1>
            </div>
            <div className={styles.description}>
              <h3>{description}</h3>
            </div>
            <div className={styles.buttons}>
              <Button onClick={() => history.goBack()}>Cancelar</Button>
              <Button type="primary" icon={<CheckCircleFilled />} onClick={() => history.goBack()}>Concluído</Button>
            </div>
            <div className={styles.files}>
              <Input placeholder="Nome do arquivo" value={fileName} onChange={(e) => setFileName(e.target.value)} />
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Clique ou arraste um arquivo pra cá!</p>
                <p className="ant-upload-hint">
                  Arquivos .pdf ou .mp4
                </p>
              </Dragger>
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default UploadSystem;
