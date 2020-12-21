import React from "react";

import { Card, Tooltip } from "antd";
import {
  EditOutlined, InfoCircleOutlined, DeleteOutlined,
} from "@ant-design/icons";

const CardFileEdit = ({
  title, type, actions, construction, nickname, file_id,
}) => {
  const { Meta } = Card;

  return (
    <Card
      style={{ width: 300, textAlign: "center" }}
      actions={[
        <Tooltip placement="left" title="Detalhe">
          <InfoCircleOutlined onClick={() => actions.info(construction, nickname, file_id)} />
        </Tooltip>,
        <Tooltip placement="bottom" title="Editar">
          <EditOutlined key="edit" onClick={() => actions.edit(construction, nickname, file_id)} />
        </Tooltip>,
        <Tooltip placement="right" title="Remover">
          <DeleteOutlined onClick={() => actions.delete(construction)} />
        </Tooltip>,
      ]}
    >
      <Meta
        title={title}
        description={type}
      />
    </Card>
  );
};

export default CardFileEdit;
