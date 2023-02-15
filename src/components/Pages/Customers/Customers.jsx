import { Row, Col, Input } from "antd";
import axios from "axios";
import React from "react";
import Customer from "./Customer/Customer";
import Post from "./CustomerPost/Post";

const Customers = () => {
  const [error, setError] = React.useState(null);
  const [isLoader, setIsLoader] = React.useState(false);
  const [customers, setCustomers] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  const filtered = customers.filter((item) => {
    return item.customerName.toLowerCase().includes(searchValue.toLowerCase());
  });
  React.useEffect(() => {
    axios.get("https://localhost:7161/api/customers").then(
      (result) => {
        setIsLoader(true);
        setCustomers(result.data.result);
      },
      (error) => {
        setIsLoader(true);
        setError(error);
      }
    );
  }, [customers]);

  if (error) {
    return <div>Error message: {error}</div>;
  } else if (!isLoader) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="customer">
        <Row justify="center">
          <Col xs={10} sm={10} md={10} lg={10} xl={8}>
            <Post url={"https://localhost:7161/api/customers"} />
          </Col>
          <Col xs={10} sm={10} md={10} lg={10} xl={10}>
            <Input
              onChange={(event) => setSearchValue(event.target.value)}
              addonAfter="Поиск"
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={20} xl={20}>
            <Customer customers={filtered} />
          </Col>
        </Row>
      </div>
    );
  }
};

export default Customers;
