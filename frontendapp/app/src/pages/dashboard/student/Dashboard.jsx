import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Input,
  Button,
  Text,
  Stack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {Link} from "react-router-dom"
import axios from "axios";
const Dashboard = () => {
  const [post, setPost] = useState({});
  const [success, setSuccess] = useState(false);
  const [danger, setDanger] = useState(false);

  useEffect(() => {
    if (success) {
      setInterval(() => {
        setSuccess(false);
      }, 5000);
    }
    if (danger) {
      setInterval(() => {
        setDanger(false);
      }, 5000);
    }
  }, [success, danger]);

  const handle = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handlePost = () => {
    axios
      .post("/data/create", post, {
        headers: {
          authentication: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setDanger(true);
      });
  };
  return (
    <Box>
      <Container mt="5" border={"1px solid"} p="12" borderRadius="5">
        <Stack spacing={3} mb="2">
          {danger ? (
            <Alert status="error">
              <AlertIcon />
              There was an error processing your request
            </Alert>
          ) : null}

          {success ? (
            <Alert status="success">
              <AlertIcon />
              Data uploaded to the server. Fire on!
            </Alert>
          ) : null}
        </Stack>
        <Input placeholder="Title" name="title" onChange={handle} /> <br />{" "}
        <br />
        <Input
          placeholder="description"
          name="description"
          onChange={handle}
        />{" "}
        <br /> <br />
        <Input placeholder="label" name="label" onChange={handle} />
        <br />
        <br />
        <Button p="6" w="185px" fontSize="21px" onClick={handlePost}>
          Post
        </Button>
      </Container>
      <br />
      <br />
      <Text fontSize="25px" fontWeight="bolder">
        <Link to="/listofPost"> View All Post</Link>

      </Text>
    </Box>
  );
};

export default Dashboard;
