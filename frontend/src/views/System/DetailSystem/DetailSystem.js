import React, { useState, useEffect } from "react";

import { detail } from "services/system.service";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import { Spin } from "antd";
import { toast } from "react-toastify";

import styles from "./DetailSystem.module.scss";

const DetailSystem = ({ match }) => {
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
          </div>
        )}
      </Container>
    </Page>
  );
};

export default DetailSystem;
