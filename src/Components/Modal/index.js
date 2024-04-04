import React, { useState } from "react";
import { Button, Modal, Space, Table, Tag, List } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";

export const ModalComp = ({ record }) => {
  console.log("matches", record);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //   const data = [record.homeTeamUsers, record.awayTeamUsers];

  //   const columns = [
  //     {
  //       title: `${record.homeTeam}`,
  //       dataIndex: "group1",
  //       key: "group1",
  //     },
  //     {
  //       title: `${record.awayTeam}`,
  //       dataIndex: "group2",
  //       key: "group2",
  //     },
  //   ];

  // Transform the data into a format compatible with Ant Design Table
  //   const tableData = [];
  //   const maxLength = Math.max(data[0].length, data[1].length);
  //   for (let i = 0; i < maxLength; i++) {
  //     tableData.push({
  //       key: i,
  //       group1: data[0][i] || "",
  //       group2: data[1][i] || "",
  //     });
  //   }

  return (
    <>
      <a onClick={showModal}>
        <InfoCircleTwoTone />
      </a>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            <h3>{record.homeTeam}</h3>
            <List
              dataSource={record?.homeTeamUsers}
              renderItem={(user, index) => (
                <List.Item key={index}>{user}</List.Item>
              )}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h3>{record.awayTeam}</h3>
            <List
              dataSource={record?.awayTeamUsers}
              renderItem={(user, index) => (
                <List.Item key={index}>{user}</List.Item>
              )}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
