import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import { detail, edit } from "services/file.service";
import { File } from "interfaces/file.interface";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import { Input, Button, Spin } from "antd";
import { toast } from "react-toastify";

import styles from "./EditFile.module.scss";

interface RouteParams {
  id: string;
  nickname: string;
  file_id: string;
}

const EditFile: React.FC<RouteComponentProps<RouteParams>> = ({
  history,
  match,
}) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFile = (id: string, nickname: string, file_id: string) => {
    setIsLoading(true);
    detail(id, nickname, file_id)
      .then((response) => {
        const { name, url } = response.data.file;
        setName(name);
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

  const submitFile = (
    e: React.FormEvent<HTMLElement>,
    id: string,
    nickname: string,
    file_id: string,
    data: File
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    edit(id, nickname, file_id, data)
      .then(() => {
        history.goBack();
        toast.success("Arquivo atualizado!");
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro pra atualizar o arquivo");
        setIsSubmitting(false);
      });
  };

  return (
    <Page>
      <Container>
        {isLoading ? (
          <div className="spinner">
            <Spin size="large" />
          </div>
        ) : (
          <div className={styles.editFile}>
            <div className={styles.title}>
              <h1>Editar Arquivo</h1>
            </div>
            <form
              onSubmit={(e) =>
                submitFile(e, id, nickname, file_id, { name, url })
              }
            >
              <div className={styles.input}>
                <Input
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.input}>
                <Input
                  placeholder="URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <div className={styles.buttons}>
                <Button onClick={() => history.goBack()}>Cancelar</Button>
                <Button type="primary" loading={isSubmitting} htmlType="submit">
                  Enviar
                </Button>
              </div>
            </form>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default EditFile;
