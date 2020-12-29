import * as React from "react";

import { Card, Tooltip } from "antd";
import {
  EditOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

interface Action {
  info(id: string): void;
  edit(id: string): void;
  delete(id: string): void;
}

interface IProps {
  id: string;
  title: string;
  description: string;
  actions: Action;
}

const CardConstruction: React.FC<IProps> = ({
  id,
  title,
  description,
  actions,
}: IProps) => {
  return (
    <Card
      style={{ width: 300, textAlign: "center" }}
      actions={[
        <Tooltip placement="left" title="Detalhe">
          <InfoCircleOutlined onClick={() => actions.info(id)} />
        </Tooltip>,
        <Tooltip placement="bottom" title="Editar">
          <EditOutlined key="edit" onClick={() => actions.edit(id)} />
        </Tooltip>,
        <Tooltip placement="right" title="Remover">
          <DeleteOutlined onClick={() => actions.delete(id)} />
        </Tooltip>,
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default CardConstruction;
