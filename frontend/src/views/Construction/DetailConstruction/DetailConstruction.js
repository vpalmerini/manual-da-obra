import React, { useState, useEffect } from "react";

import { detail } from "services/construction.service";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import { Spin } from "antd";
import { toast } from "react-toastify";

import styles from "./DetailConstruction.module.scss";

const DetailConstruction = ({ match }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getConstruction = (id) => {
      setIsLoading(true);
      detail(id)
        .then((response) => {
          const { name, location } = response.data.construction;
          setName(name);
          setLocation(location);
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

  return (
    <Page>
      <Container>
        {isLoading ? (<div className="spinner"><Spin size="large" /></div>) : (
          <div className={styles.construction}>
            <div className={styles.title}>
              <h1>{name}</h1>
            </div>
            <div className={styles.description}>
              <h3>{location}</h3>
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default DetailConstruction;
