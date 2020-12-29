import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import { list, remove } from "services/construction.service";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import CardConstruction from "components/Card/CardConstruction";
import { toast } from "react-toastify";
import { Spin, Button, Modal } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import routes from "routes/routes";
import styles from "./Dashboard.module.scss";

const { confirm } = Modal;

interface Construction {
  _id: string;
  name: string;
  location: string;
}

const Dashboard: React.FC<RouteComponentProps> = ({ history }) => {
  const [constructions, setConstructions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    getConstructions();
  }, []);

  const deleteConstruction = (id: string) => {
    remove(id)
      .then(() => {
        toast.success("Obra removida!");
        getConstructions();
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro pra remover a obra");
      });
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: "Tem certeza que deseja remover a obra?",
      icon: <ExclamationCircleOutlined />,
      okText: "Remover",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        return deleteConstruction(id);
      },
      onCancel() {},
    });
  };

  const actions = {
    info: (id: string) =>
      history.push(routes.DETAIL_CONSTRUCTION.replace(":id", id)),
    edit: (id: string) =>
      history.push(routes.EDIT_CONSTRUCTION.replace(":id", id)),
    delete: (id: string) => showDeleteConfirm(id),
  };

  return (
    <Page>
      <Container>
        {isLoading ? (
          <div className="spinner">
            <Spin size="large" />
          </div>
        ) : (
          <div className={styles.dashboard}>
            <div className={styles.title}>
              <h1>Obras</h1>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push(routes.NEW_CONSTRUCTION)}
            >
              Adicionar
            </Button>
            <div className={styles.cards}>
              {constructions && constructions.length > 0 ? (
                constructions.map((constr: Construction) => (
                  <div key={constr._id} className={styles.card}>
                    <CardConstruction
                      id={constr._id}
                      title={constr.name}
                      description={constr.location}
                      actions={actions}
                    />
                  </div>
                ))
              ) : (
                <h4>Nenhuma obra cadastrada</h4>
              )}
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default Dashboard;
