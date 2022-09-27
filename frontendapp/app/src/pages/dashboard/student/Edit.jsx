import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Input,  Button } from "@chakra-ui/react";

import axios from "axios";
const Edit = () => {
  const location = useLocation();
  const { _id, title, description, label } = location?.state?.data;
  const [data, setData] = useState({title,description,label});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    axios
      .patch("/data/edit", data, {
        headers: {
          postid: _id,
          authentication: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container mt="5" mb="5">
      <Input
        placeholder="title"
        value={data?.title}
        name="title"
        onChange={handleChange}
      />
      <br />
      <br />
      <Input
        placeholder="description"
        value={data?.description}
        name="description"
        onChange={handleChange}
      />
      <br />
      <br />
      <Input
        placeholder="label"
        value={data?.label}
        name="label"
        onChange={handleChange}
      />
      <br />
      <br />
      <Button onClick={handleUpdate}>Update</Button>
    </Container>
  );
};

export default Edit;
