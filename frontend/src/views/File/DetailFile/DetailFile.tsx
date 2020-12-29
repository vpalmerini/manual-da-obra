import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import { detail } from "services/file.service";

import Page from "components/Page/Page";
import Container from "components/Container/Container";

import { Spin, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./DetailFile.module.scss";

interface RouteParams {
  id: string;
  nickname: string;
  file_id: string;
}

const DetailFile: React.FC<RouteComponentProps<RouteParams>> = ({
  history,
  match,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getFile = (id: string, nickname: string, file_id: string) => {
    setIsLoading(true);
    detail(id, nickname, file_id)
      .then((response) => {
        const { name, type, url } = response.data.file;
        setName(name);
        setType(type);
        setUrl(url);
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro pra pegar os dados do arquivo");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { id, nickname, file_id } = match.params;

  useEffect(() => {
    getFile(id, nickname, file_id);
  }, []);

  return (
    <Page>
      <Container>
        {isLoading ? (
          <div className="spinner">
            <Spin size="large" />
          </div>
        ) : (
          <div className={styles.file}>
            <div className={styles.title}>
              <h1>{name}</h1>
            </div>
            <div className={styles.type}>
              <h3>{type}</h3>
            </div>
            <div className={styles.link}>
              <a href={url} target="_blank" rel="noreferrer">
                URL
              </a>
            </div>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => history.goBack()}
            >
              Voltar
            </Button>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default DetailFile;
