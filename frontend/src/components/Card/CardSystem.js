import React from "react";

import { Card } from "antd";
import {
  EditOutlined, InfoCircleOutlined, DeleteOutlined,
} from "@ant-design/icons";

const CardSystem = ({
  name, nickname, description, construction, actions,
}) => {
  const { Meta } = Card;

  return (
    <Card
      style={{ width: 300, textAlign: "center" }}
      actions={[
        <InfoCircleOutlined onClick={() => actions.info()} />,
        <EditOutlined key="edit" onClick={() => actions.edit(construction, nickname)} />,
        <DeleteOutlined onClick={() => actions.delete(construction, nickname)} />,
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
