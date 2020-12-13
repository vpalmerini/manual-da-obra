import React from "react";

import { Card, Tooltip } from "antd";
import {
  EditOutlined, InfoCircleOutlined, UploadOutlined, DeleteOutlined,
} from "@ant-design/icons";

const CardSystem = ({
  name, nickname, description, construction, actions,
}) => {
  const { Meta } = Card;

  return (
    <Card
      style={{ width: 300, textAlign: "center" }}
      actions={[
        <Tooltip placement="left" title="Detalhe">
          <InfoCircleOutlined onClick={() => actions.info(construction, nickname)} />
        </Tooltip>,
        <Tooltip placement="bottom" title="Editar">
          <EditOutlined key="edit" onClick={() => actions.edit(construction, nickname)} />
        </Tooltip>,
        <Tooltip placement="bottom" title="Upar Arquivos">
          <UploadOutlined onClick={() => actions.upload()} />
        </Tooltip>,
        <Tooltip placement="right" title="Remover">
          <DeleteOutlined onClick={() => actions.delete(construction, nickname)} />
        </Tooltip>,
      ]}
    >
      <Meta
        title={name}
        description={description}
      />
    </Card>
  );
};

export default CardSystem;
