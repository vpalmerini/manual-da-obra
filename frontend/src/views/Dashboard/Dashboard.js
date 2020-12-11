import React, { useState, useEffect } from "react";

import { list } from "services/construction.service";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import Card from "components/Card/Card";
import { toast } from "react-toastify";
import { Spin, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import routes from "routes/routes";
import styles from "./Dashboard.module.scss";

const Dashboard = ({ history }) => {
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
    edit: (id) => history.push(routes.EDIT_CONSTRUCTION.replace(":id", id)),
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
            <Button type="primary" icon={<PlusOutlined />} onClick={() => history.push(routes.NEW_CONSTRUCTION)}>Adicionar</Button>
            <div className={styles.cards}>
              {constructions && constructions.map((constr) => (
                <div key={constr._id} className={styles.card}>
                  <Card
                    id={constr._id}
                    title={constr.name}
                    description={constr.location}
                    actions={actions}
                  />
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
