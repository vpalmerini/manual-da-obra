import * as React from "react";

import { Card, Tooltip } from "antd";
import {
  EditOutlined,
  InfoCircleOutlined,
  UploadOutlined,
  FileOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

interface Action {
  info(construction: string, nickname: string): void;
  edit(construction: string, nickname: string): void;
  upload(construction: string, nickname: string): void;
  files(construction: string, nickname: string): void;
  delete(construction: string, nickname: string): void;
}

interface IProps {
  name: string;
  nickname: string;
  description: string;
  construction: string;
  actions: Action;
}

const CardSystem: React.FC<IProps> = ({
  name,
  nickname,
  description,
  construction,
  actions,
}: IProps) => {
  const { Meta } = Card;

  return (
    <Card
      style={{ width: 300, textAlign: "center" }}
      actions={[
        <Tooltip placement="left" title="Detalhe">
          <InfoCircleOutlined
            onClick={() => actions.info(construction, nickname)}
          />
        </Tooltip>,
        <Tooltip placement="bottom" title="Editar">
          <EditOutlined
            key="edit"
            onClick={() => actions.edit(construction, nickname)}
          />
        </Tooltip>,
        <Tooltip placement="bottom" title="Upar Arquivos">
          <UploadOutlined
            onClick={() => actions.upload(construction, nickname)}
          />
        </Tooltip>,
        <Tooltip placement="bottom" title="Acessar Arquivos">
          <FileOutlined onClick={() => actions.files(construction, nickname)} />
        </Tooltip>,
        <Tooltip placement="right" title="Remover">
          <DeleteOutlined
            onClick={() => actions.delete(construction, nickname)}
          />
        </Tooltip>,
      ]}
    >
      <Meta title={name} description={description} />
    </Card>
  );
};

export default CardSystem;
