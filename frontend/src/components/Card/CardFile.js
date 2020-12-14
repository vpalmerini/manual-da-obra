import React from "react";

import { Card, Tooltip } from "antd";
import { PlayCircleOutlined, FilePdfOutlined } from "@ant-design/icons";

const CardFile = ({
  title, url, type,
}) => {
  const style = {
    fontSize: 26,
    width: "100%",
    color: "#f2c94c",
  };

  return (
    <a href={url} target="_blank" rel="noreferrer">
      <Card
        style={{ width: 300, textAlign: "center" }}
      >
        <Tooltip placement="left" title={title}>
          {type === "video" ? <PlayCircleOutlined style={style} /> : <FilePdfOutlined style={style} />}
        </Tooltip>
      </Card>
    </a>
  );
};

export default CardFile;
