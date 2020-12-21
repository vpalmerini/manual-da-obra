import React, { useState, useEffect } from "react";

import { detail } from "services/system.service";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import CardFile from "components/Card/CardFile";
import { Spin, Button, message } from "antd";
import { ArrowLeftOutlined, CopyOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./DetailSystem.module.scss";

const DetailSystem = ({ history, match }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
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
          construction,
        } = response.data.system;
        setName(name);
        setDescription(description);
        setImageURL(construction.image);
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

  const copyLink = (text) => {
    navigator.clipboard.writeText(text);
    message.info("Link copiado!");
  };

  return (
    <Page>
      <div style={{
        minHeight: "100vh",
        height: "100%",
        backgroundImage: `url(${imageURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      >
        <Container>
          {isLoading ? (<div className="spinner"><Spin size="large" /></div>) : (
            <div className={styles.system}>
              <div className={styles.title}>
                <h1 style={{ color: imageURL ? "#fff" : "#444" }}>{name}</h1>
              </div>
              <div className={styles.description}>
                <h3 style={{ color: imageURL ? "#fff" : "#444" }}>{description}</h3>
              </div>
              <div className={styles.buttons}>
                <Button
                  icon={<ArrowLeftOutlined />}
                  onClick={() => history.goBack()}
                >
                  Voltar
                </Button>
                <Button type="primary" icon={<CopyOutlined />} onClick={() => copyLink(window.location.href)}>Copiar Link</Button>
              </div>
              <div className={styles.cards}>
                {files && files.length > 0 ? (
                  files.map((file) => (
                    <div className={styles.card}>
                      <CardFile title={file.name} url={file.url} type={file.type} />
                    </div>
                  ))
                ) : <h4 style={{ color: imageURL ? "#fff" : "#444" }}>Este sistema não possui nenhum arquivo</h4>}
              </div>
            </div>
          )}
        </Container>
      </div>
    </Page>
  );
};

export default DetailSystem;
