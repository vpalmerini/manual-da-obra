import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import { detail } from "services/construction.service";
import { remove } from "services/system.service";
import routes from "routes/routes";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import CardSystem from "components/Card/CardSystem";
import { Spin, Button, Modal } from "antd";
import {
  PlusOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./DetailConstruction.module.scss";

const { confirm } = Modal;

interface RouteParams {
  id: string;
}

interface System {
  _id: string;
  name: string;
  nickname: string;
  description: string;
  construction: string;
}

const DetailConstruction: React.FC<RouteComponentProps<RouteParams>> = ({
  history,
  match,
}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [systems, setSystems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getConstruction = (id: string) => {
    setIsLoading(true);
    detail(id)
      .then((response) => {
        const { name, location, image, systems } = response.data.construction;
        setName(name);
        setLocation(location);
        setImageURL(image);
        setSystems(systems);
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro pra pegar os dados da obra");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { id } = match.params;

  useEffect(() => {
    getConstruction(id);
  }, []);

  const deleteSystem = (id: string, nickname: string) => {
    remove(id, nickname)
      .then(() => {
        toast.success("Sistema removido!");
        getConstruction(id);
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro pra remover o sistema");
      });
  };

  const showDeleteConfirm = (id: string, nickname: string) => {
    confirm({
      title: "Tem certeza que deseja remover o sistema?",
      icon: <ExclamationCircleOutlined />,
      okText: "Remover",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        return deleteSystem(id, nickname);
      },
      onCancel() {},
    });
  };

  const actions = {
    info: (id: string, nickname: string) =>
      history.push(
        routes.DETAIL_SYSTEM.replace(":id", id).replace(":nickname", nickname)
      ),
    edit: (id: string, nickname: string) =>
      history.push(
        routes.EDIT_SYSTEM.replace(":id", id).replace(":nickname", nickname)
      ),
    upload: (id: string, nickname: string) =>
      history.push(
        routes.UPLOAD_SYSTEM.replace(":id", id).replace(":nickname", nickname)
      ),
    files: (id: string, nickname: string) =>
      history.push(
        routes.FILES_SYSTEM.replace(":id", id).replace(":nickname", nickname)
      ),
    delete: (id: string, nickname: string) => showDeleteConfirm(id, nickname),
  };

  return (
    <Page>
      <div
        style={{
          minHeight: "100vh",
          height: "100%",
          backgroundImage: `url(${imageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Container>
          {isLoading ? (
            <div className="spinner">
              <Spin size="large" />
            </div>
          ) : (
            <div className={styles.construction}>
              <div className={styles.title}>
                <h1 style={{ color: imageURL ? "#fff" : "#444" }}>{name}</h1>
              </div>
              <div className={styles.description}>
                <h3 style={{ color: imageURL ? "#fff" : "#444" }}>
                  {location}
                </h3>
              </div>
              <div className={styles.buttons}>
                <Button
                  icon={<ArrowLeftOutlined />}
                  onClick={() => history.goBack()}
                >
                  Voltar
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    history.push(routes.NEW_SYSTEM.replace(":id", id))
                  }
                >
                  Adicionar Sistema
                </Button>
              </div>
              <div className={styles.systems}>
                {systems && systems.length > 0 ? (
                  systems.map((sys: System) => (
                    <div className={styles.card} key={sys._id}>
                      <CardSystem
                        name={sys.name}
                        nickname={sys.nickname}
                        description={sys.description}
                        construction={sys.construction}
                        actions={actions}
                      />
                    </div>
                  ))
                ) : (
                  <h4 style={{ color: imageURL ? "#fff" : "#444" }}>
                    Nenhum sistema cadastrado
                  </h4>
                )}
              </div>
            </div>
          )}
        </Container>
      </div>
    </Page>
  );
};

export default DetailConstruction;
