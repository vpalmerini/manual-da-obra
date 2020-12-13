import React, { useState, useEffect } from "react";

import { detail } from "services/construction.service";
import { remove } from "services/system.service";
import routes from "routes/routes";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import CardSystem from "components/Card/CardSystem";
import { Spin, Button, Modal } from "antd";
import { PlusOutlined, ExclamationCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./DetailConstruction.module.scss";

const { confirm } = Modal;

const DetailConstruction = ({ history, match }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [systems, setSystems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getConstruction = (id) => {
    setIsLoading(true);
    detail(id)
      .then((response) => {
        const { name, location, systems } = response.data.construction;
        setName(name);
        setLocation(location);
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

  const deleteSystem = (id, nickname) => {
    remove(id, nickname)
      .then(() => {
        toast.success("Sistema removido!");
        getConstruction(id);
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro pra remover o sistema");
      });
  };

  const showDeleteConfirm = (id, nickname) => {
    confirm({
      title: "Tem certeza que deseja remover o sistema?",
      icon: <ExclamationCircleOutlined />,
      okText: "Remover",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        return deleteSystem(id, nickname);
      },
      onCancel() { },
    });
  };

  const actions = {
    info: (id, nickname) => history.push(routes.DETAIL_SYSTEM.replace(":id", id).replace(":nickname", nickname)),
    edit: (id, nickname) => history.push(routes.EDIT_SYSTEM.replace(":id", id).replace(":nickname", nickname)),
    upload: (id, nickname) => history.push(routes.UPLOAD_SYSTEM.replace(":id", id).replace(":nickname", nickname)),
    delete: (id, nickname) => showDeleteConfirm(id, nickname),
  };

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
            <div className={styles.buttons}>
              <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}>Voltar</Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => history.push(routes.NEW_SYSTEM.replace(":id", id))}>Adicionar Sistema</Button>
            </div>
            <div className={styles.systems}>
              {systems && systems.length > 0 ? (
                systems.map((sys) => (
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
              ) : <h4>Nenhum sistema cadastrado</h4>}
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default DetailConstruction;
