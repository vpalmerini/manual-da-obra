import React from "react";

import { Card, Tooltip } from "antd";
import {
  EditOutlined, InfoCircleOutlined, DeleteOutlined,
} from "@ant-design/icons";

const CardConstruction = ({
  id, title, description, actions,
}) => {
  const { Meta } = Card;

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
      <Meta
        title={title}
        description={description}
      />
    </Card>
  );
};

export default CardConstruction;