import React, { useState, useEffect } from "react";

import { detail } from "services/system.service";
import routes from "routes/routes";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import CardFile from "components/Card/CardFile";
import { Spin, Button } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./FilesSystem.module.scss";

const FilesSystem = ({ history, match }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSystem = (id, nickname) => {
    setIsLoading(true);
    detail(id, nickname)
      .then((response) => {
        const {
          name,
          description,
          files,
        } = response.data.system;
        setName(name);
        setDescription(description);
        setFiles(files);
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
              <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}>Voltar</Button>
              <Button type="primary" icon={<UploadOutlined />} onClick={() => history.push(routes.UPLOAD_SYSTEM.replace(":id", id).replace(":nickname", nickname))}>Upar Arquivo</Button>
            </div>
            <div className={styles.cards}>
              {files && files.length > 0 ? (
                files.map((file) => (
                  <div className={styles.card}>
                    <CardFile title={file.name} url={file.url} type={file.type} />
                  </div>
                ))
              ) : <h4>Este sistema não possui nenhum arquivo</h4>}
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default FilesSystem;