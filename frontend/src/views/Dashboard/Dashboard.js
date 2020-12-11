import React, { useState, useEffect } from "react";

import { list } from "services/construction.service";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import Card from "components/Card/Card";
import { toast } from "react-toastify";
import { Spin } from "antd";

import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [constructions, setConstructions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getConstructions = () => {
      setIsLoading(true);
      list()
        .then((response) => {
          setConstructions(response.data.constructions);
        })
        .catch(() => {
          toast.error("Ops! Aconteceu algum erro pra carregar as obras");
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getConstructions();
  }, []);

  const actions = {
    info: () => alert("info"),
    edit: () => alert("edit"),
    delete: () => alert("delete"),
  };

  return (
    <Page>
      <Container>
        {isLoading ? (<div className="spinner"><Spin size="large" /></div>) : (
          <div className={styles.dashboard}>
            <div className={styles.title}>
              <h1>Obras</h1>
            </div>
            <div className={styles.cards}>
              {constructions && constructions.map((constr) => (
                <div className={styles.card}>
                  <Card title={constr.name} description={constr.location} actions={actions} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default Dashboard;
