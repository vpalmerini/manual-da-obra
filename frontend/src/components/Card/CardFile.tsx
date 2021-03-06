import * as React from "react";

import { Card, Tooltip } from "antd";
import { PlayCircleOutlined, FilePdfOutlined } from "@ant-design/icons";

interface IProps {
  title: string;
  url: string;
  type: string;
}

const CardFile: React.FC<IProps> = ({ title, url, type }: IProps) => {
  const style = {
    fontSize: 26,
    width: "100%",
    color: "#1890ff",
  };

  return (
    <a href={url} target="_blank" rel="noreferrer">
      <Card style={{ width: 300, textAlign: "center" }} title={title}>
        <Tooltip placement="left" title={title}>
          {type === "video" ? (
            <PlayCircleOutlined style={style} />
          ) : (
            <FilePdfOutlined style={style} />
          )}
        </Tooltip>
      </Card>
    </a>
  );
};

export default CardFile;
