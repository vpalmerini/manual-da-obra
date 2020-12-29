import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import { detail } from "services/system.service";
import { remove } from "services/file.service";
import routes from "routes/routes";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import CardFileEdit from "components/Card/CardFileEdit";
import { Spin, Button, Modal } from "antd";
import {
  ArrowLeftOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

import styles from "./FilesSystem.module.scss";

const { confirm } = Modal;

interface RouteParams {
  id: string;
  nickname: string;
}

const FilesSystem: React.FC<RouteComponentProps<RouteParams>> = ({
  history,
  match,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSystem = (id: string, nickname: string) => {
    setIsLoading(true);
    detail(id, nickname)
      .then((response) => {
        const { name, description, files } = response.data.system;
        setName(name);
        setDescription(description);
        setFiles(files);
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

  const deleteFile = (id: string, nickname: string, file_id: string) => {
    remove(id, nickname, file_id)
      .then(() => {
        toast.success("Arquivo excluído!");
        getSystem(id, nickname);
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro pra excluir o arquivo");
      });
  };

  const showDeleteConfirm = (id: string, nickname: string, file_id: string) => {
    confirm({
      title: "Tem certeza que deseja excluir o arquivo?",
      icon: <ExclamationCircleOutlined />,
      okText: "Remover",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        return deleteFile(id, nickname, file_id);
      },
      onCancel() {},
    });
  };

  const actions = {
    info: (id: string, nickname: string, file_id: string) =>
      history.push(
        routes.DETAIL_FILE.replace(":id", id)
          .replace(":nickname", nickname)
          .replace(":file_id", file_id)
      ),
    edit: (id: string, nickname: string, file_id: string) =>
      history.push(
        routes.EDIT_FILE.replace(":id", id)
          .replace(":nickname", nickname)
          .replace(":file_id", file_id)
      ),
    delete: (id: string, nickname: string, file_id: string) =>
      showDeleteConfirm(id, nickname, file_id),
  };

  return (
    <Page>
      <Container>
        {isLoading ? (
          <div className="spinner">
            <Spin size="large" />
          </div>
        ) : (
          <div className={styles.system}>
            <div className={styles.title}>
              <h1>{name}</h1>
            </div>
            <div className={styles.description}>
              <h3>{description}</h3>
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
                icon={<UploadOutlined />}
                onClick={() =>
                  history.push(
                    routes.UPLOAD_SYSTEM.replace(":id", id).replace(
                      ":nickname",
                      nickname
                    )
                  )
                }
              >
                Upar Arquivo
              </Button>
            </div>
            <div className={styles.cards}>
              {files && files.length > 0 ? (
                files.map((file) => (
                  <div className={styles.card} key={file._id}>
                    <CardFileEdit
                      file_id={file._id}
                      title={file.name}
                      type={file.type}
                      actions={actions}
                      construction={id}
                      nickname={nickname}
                    />
                  </div>
                ))
              ) : (
                <h4>Este sistema não possui nenhum arquivo</h4>
              )}
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default FilesSystem;
