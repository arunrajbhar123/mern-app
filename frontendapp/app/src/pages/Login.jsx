import { useState } from "react";
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import OAuthUI from "./../components/OAuthUI";
export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [danger, setDanger] = useState({ status: false });
  const handleform = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSumbit = () => {
    axios
      .post("/login", form)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          document.cookie = `token=${res.data.token}`;
          setDanger({
            ...danger,
            status: false,
          });
          return navigate("/profile", { replace: true });
        } else {
          const { message } = res.data;
          setDanger({
            ...danger,
            message,
            status: true,
          });
        }
      })
      .catch((err) => {
        console.log("error");
      });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        {danger?.status ? (
          <Stack h="7">
            <Badge p="4" colorScheme="red" textAlign="start">
              {danger?.message}
            </Badge>
          </Stack>
        ) : null}

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" onChange={handleform} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={handleform} />
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <RouterLink to="/forgotpassword" color={"blue.400"}>
                  Forgot password?
                </RouterLink>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => handleSumbit()}
              >
                Sign in
              </Button>
            </Stack>
            <Text>or</Text>
            <OAuthUI />
            <Text>or</Text>

            <Button
              bg={"transparent"}
              color={"#111"}
              border={"1px solid "}
              transition="all 0.2s"
              _hover={{
                bg: "blue.500",
                border: "none",
                color: "#fff",
              }}
            >
              <RouterLink to="/signup"> Create new account</RouterLink>
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
