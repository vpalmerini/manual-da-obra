import React from "react";

import { Card } from "antd";
import { EditOutlined, InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const CardConstruction = ({ title, description, actions }) => {
  const { Meta } = Card;

  return (
    <Card
      style={{ width: 300, textAlign: "center" }}
      actions={[
        <InfoCircleOutlined onClick={actions && actions.info} />,
        <EditOutlined key="edit" onClick={actions && actions.edit} />,
        <DeleteOutlined onClick={actions && actions.delete} />,
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
