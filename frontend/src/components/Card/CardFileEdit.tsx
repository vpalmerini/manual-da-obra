import * as React from "react";

import { Card, Tooltip } from "antd";
import {
  EditOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

interface Action {
  info(id: string, nickname: string, file_id: string): void;
  edit(id: string, nickname: string, file_id: string): void;
  delete(id: string, nickname: string, file_id: string): void;
}

interface IProps {
  title: string;
  type: string;
  actions: Action;
  construction: string;
  nickname: string;
  file_id: string;
}

const CardFileEdit: React.FC<IProps> = ({
  title,
  type = "video",
  actions,
  construction,
  nickname,
  file_id,
}: IProps) => {
  const { Meta } = Card;

  return (
    <Card
      style={{ width: 300, textAlign: "center" }}
      actions={[
        <Tooltip placement="left" title="Detalhe">
          <InfoCircleOutlined
            onClick={() => actions.info(construction, nickname, file_id)}
          />
        </Tooltip>,
        <Tooltip placement="bottom" title="Editar">
          <EditOutlined
            key="edit"
            onClick={() => actions.edit(construction, nickname, file_id)}
          />
        </Tooltip>,
        <Tooltip placement="right" title="Remover">
          <DeleteOutlined
            onClick={() => actions.delete(construction, nickname, file_id)}
          />
        </Tooltip>,
      ]}
    >
      <Meta title={title} description={type} />
    </Card>
  );
};

export default CardFileEdit;
