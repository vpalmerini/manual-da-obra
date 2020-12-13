import React, { useState, useEffect } from "react";

import { detail, upload } from "services/system.service";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import { Spin, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./UploadSystem.module.scss";

const { Dragger } = Upload;

const UploadSystem = ({ match }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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

  const props = {
    name: "file",
    customRequest: (options) => {
      const data = new FormData();
      data.append("file", options.file);
      upload(id, nickname, data)
        .then((response) => {
          options.onSuccess(response.data, options.file);
        })
        .catch((err) => {
          options.onError(err);
        });
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} carregada com sucesso!.`);
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
          </div>
        )}
      </Container>
    </Page>
  );
};

export default UploadSystem;
