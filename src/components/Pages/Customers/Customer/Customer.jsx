import React from "react";
import axios from "axios";
import "./Customer.css";
import { Table, Button, Modal, Input } from "antd";

const Customer = ({ customers }) => {
  const dataSource = customers.map((item) => ({
    ...item,
    key: item.customerId,
    count: customers.indexOf(item),
  }));

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [identif, setIdentif] = React.useState(0);
  const [customerName, setCustomerName] = React.useState("");
  const [customerCompany, setCustomerCompany] = React.useState("");
  const [customerAddress, setCustomerAddress] = React.useState("");
  const [customerCity, setCustomerCity] = React.useState("");
  const [customerState, setCustomerState] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState(0);

  const showModal = (id, count) => {
    let {
      customerName,
      customerCompany,
      customerAddress,
      customerCity,
      customerState,
      customerPhone,
    } = dataSource[count];
    setIsModalOpen(true);
    setCustomerName(customerName);
    setCustomerCompany(customerCompany);
    setCustomerAddress(customerAddress);
    setCustomerCity(customerCity);
    setCustomerState(customerState);
    setCustomerPhone(customerPhone);
    setIdentif(id);
  };

  const handleOk = () => {
    let customerName = document.getElementById("customerNameP").value;
    let customerCompany = document.getElementById("customerCompanyP").value;
    let customerAddress = document.getElementById("customerAddressP").value;
    let customerCity = document.getElementById("customerCityP").value;
    let customerState = document.getElementById("customerStateP").value;
    let customerPhone = document.getElementById("customerPhoneP").value;

    if (
      customerName === "" ||
      customerCompany === "" ||
      customerAddress === "" ||
      customerCity === "" ||
      customerState === "" ||
      customerPhone === 0
    ) {
      alert("Заполните все поля");
    } else {
      axios
        .put("https://localhost:7161/api/customers", {
          customerId: identif,
          customerName: customerName,
          customerCompany: customerCompany,
          customerAddress: customerAddress,
          customerCity: customerCity,
          customerState: customerState,
          customerPhone: customerPhone,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addDelete = (id) => {
    axios.delete(`https://localhost:7161/api/customers?customerId=${id}`, {
      customerId: id,
    });
  };

  const colums = [
    {
      className: "customerId",
      title: "ID",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      className: "customerName",
      title: "Поставщик",
      dataIndex: "customerName",
      key: "customerName",
    },

    {
      className: "customerCompany",
      title: "Компания поставщика",
      dataIndex: "customerCompany",
      key: "customerCompany",
    },
    {
      className: "customerAddress",
      title: "Адрес",
      dataIndex: "customerAddress",
      key: "customerAddress",
    },
    {
      className: "customerCity",
      title: "Город",
      dataIndex: "customerCity",
      key: "customerCity",
    },
    {
      className: "customerState",
      title: "Статус",
      dataIndex: "customerState",
      key: "customerState",
    },
    {
      className: "customerPhone",
      title: "Телефон",
      dataIndex: "customerPhone",
      key: "customerPhone",
    },

    {
      title: "Actions",
      key: "actions",
      render: (dataSource) => (
        <div>
          <Button
            type={Text}
            className="btn__delete"
            onClick={() => addDelete(dataSource.customerId)}
          >
            Удалить
          </Button>
          <Button
            type={Text}
            className="btn__open"
            onClick={() => showModal(dataSource.customerId, dataSource.count)}
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
        key={identif}
        title="Внести изменения"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Поставщик"
          id="customerNameP"
          defaultValue={customerName}
          required
          addonBefore="Поставщик"
        />

        <Input
          placeholder="Компания поставщика"
          id="customerCompanyP"
          defaultValue={customerCompany}
          required
          addonBefore="Компания поставщика"
        />

        <Input
          placeholder="Адрес"
          id="customerAddressP"
          defaultValue={customerAddress}
          required
          addonBefore="Адрес"
        />

        <Input
          placeholder="Город"
          id="customerCityP"
          value={customerCity}
          required
          addonBefore="Город"
        />

        <Input
          placeholder="Статус"
          id="customerStateP"
          defaultValue={customerState}
          required
          addonBefore="Статус"
        />

        <Input
          placeholder="Телефон"
          id="customerPhoneP"
          type="tel"
          defaultValue={customerPhone}
          required
          addonBefore="Телефон"
        />
      </Modal>
    </>
  );
};

export default Customer;
