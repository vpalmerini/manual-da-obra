import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import { detail, edit } from "services/construction.service";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import { Input, Button, Spin } from "antd";
import { toast } from "react-toastify";

import styles from "./EditConstruction.module.scss";

interface RouteParams {
  id: string;
}

interface Data {
  name: string;
  location: string;
  image: string;
}

const EditConstruction: React.FC<RouteComponentProps<RouteParams>> = ({
  history,
  match,
}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getConstruction = (id: string) => {
      setIsLoading(true);
      detail(id)
        .then((response) => {
          const { name, location, image } = response.data.construction;
          setName(name);
          setLocation(location);
          setImageURL(image);
        })
        .catch(() => {
          toast.error("Ops! Aconteceu algum erro pra pegar os dados da obra");
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getConstruction(match.params.id);
  }, []);

  const submitConstruction = (
    e: React.FormEvent<HTMLElement>,
    id: string,
    data: Data
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    edit(id, data)
      .then(() => {
        history.goBack();
        toast.success("Obra atualizada!");
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro pra atualizar a obra");
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
          <div className={styles.editConstruction}>
            <div className={styles.title}>
              <h1>Editar Obra</h1>
            </div>
            <form
              onSubmit={(e) => {
                submitConstruction(e, match.params.id, {
                  name,
                  location,
                  image: imageURL,
                });
              }}
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
                  placeholder="Localização"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className={styles.input}>
                <Input
                  placeholder="URL da Imagem"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
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

export default EditConstruction;
