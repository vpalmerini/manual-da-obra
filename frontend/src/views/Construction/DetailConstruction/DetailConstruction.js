import React, { useState, useEffect } from "react";

import { detail } from "services/construction.service";
import routes from "routes/routes";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import Card from "components/Card/Card";
import { Spin, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./DetailConstruction.module.scss";

const DetailConstruction = ({ history, match }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [systems, setSystems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
    getConstruction(match.params.id);
  }, []);

  const actions = {
    info: () => alert("info"),
    edit: (id, nickname) => history.push(routes.EDIT_SYSTEM.replace(":id", id).replace(":nickname", nickname)),
    delete: () => alert("delete"),
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
            <Button type="primary" icon={<PlusOutlined />} onClick={() => history.push(routes.NEW_SYSTEM.replace(":id", match.params.id))}>Adicionar Sistema</Button>
            <div className={styles.systems}>
              {systems && systems.length > 0 ? (
                systems.map((sys) => (
                  <div className={styles.card}>
                    <Card
                      id={sys._id}
                      title={sys.name}
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
