import React from "react";

import { Card } from "antd";
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
        <InfoCircleOutlined onClick={() => actions.info(id)} />,
        <EditOutlined key="edit" onClick={() => actions.edit(id)} />,
        <DeleteOutlined onClick={() => actions.delete(id)} />,
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