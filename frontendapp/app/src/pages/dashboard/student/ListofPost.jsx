import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, Box, Container, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const ListofPost = () => {
  const [data, setData] = useState();
  const [change, setChange] = useState(0);
  useEffect(() => {
    axios
      .get("/data", {
        headers: {
          authentication: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);
  const handleDelete = (id) => {
    axios
      .delete("/data/delete", {
        headers: {
          postid: id,
          authentication: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((res) => {
        setChange(change + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box mb="5">
      <Box gap="5" textAlign="start">
        {data?.length > 0 &&
          data?.map((el, index) => (
            <Container key={index} border={"1px solid"} borderRadius="5" mt="5">
              <HStack justifyContent="space-between">
                <Box>
                  <Text>Title: {el.title}</Text>
                  <Text>des: {el.description}</Text>
                  <Text>label: {el.label}</Text>
                </Box>
                <Box gap="5">
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(el._id)}
                  >
                    Delete
                  </Button>
                  <Button>
                    <Link to="/edit" state={{ data: el }}>
                      Edit
                    </Link>
                  </Button>
                </Box>
              </HStack>
            </Container>
          ))}
      </Box>
    </Box>
  );
};

export default ListofPost;
