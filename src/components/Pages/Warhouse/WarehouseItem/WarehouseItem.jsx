import React from "react";
import axios from "axios";
import { Table, Button, Modal, Input } from "antd";
import "./WarehouseItem.css";

const WarehouseItem = ({ warehouse }) => {
  console.log(warehouse);
  const dataSource = warehouse.map((item) => ({
    ...item,
    key: item.warehouseId,
  }));
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [identif, setIdentif] = React.useState(0);

  const showModal = (id) => {
    setIsModalOpen(true);
    setIdentif(id);
  };

  const handleOk = () => {
    let warehouseName = document.getElementById("warehouseNameP").value;
    parseInt(warehouseName);
    let warehouseLocation = document.getElementById("warehouseLocationP").value;
    axios
      .put("https://localhost:7274/api/warehouses", {
        warehouseId: identif,
        warehouseName: warehouseName,
        warehouseLocation: warehouseLocation,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addDelete = (id) => {
    axios.delete(`https://localhost:7274/api/warehouses?warehouseId=${id}`, {
      warehouseId: id,
    });
  };

  const colums = [
    {
      title: "ID",
      dataIndex: "warehouseId",
      key: "warehouseId",
    },
    {
      title: "Warehouse Name",
      dataIndex: "warehouseName",
      key: "warehouseName",
    },
    {
      title: "Warehouse Location",
      dataIndex: "warehouseLocation",
      key: "warehouseLocation",
    },
    {
      title: "Actions",
      key: "actions",
      render: (dataSource) => (
        <div>
          <Button
            type={Text}
            className="btn__delete"
            onClick={() => addDelete(dataSource.warehouseId)}
          >
            Удалить
          </Button>
          <Button
            type={Text}
            className="btn__open"
            onClick={() => showModal(dataSource.warehouseId)}
          >
            Изменить
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={colums} />
      <Modal
        title="Внести изменения"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input placeholder="Warehouse Name" id="warehouseNameP" />
        <Input placeholder="Warehouse Location" id="warehouseLocationP" />
      </Modal>
    </>
  );
};

export default WarehouseItem;
