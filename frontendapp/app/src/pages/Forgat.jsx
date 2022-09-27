import axios from "axios";
import { useState } from "react";
import {
  FormControl,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";

export default function ForgotPassword(): JSX.Element {
  const [email, setEmail] = useState();
  const [successText, setSuccessText] = useState("");
  const [success, setSuccess] = useState(false);  
  const [errorText, setErrorText] = useState("");
  const [error, setError] = useState(false);

  const handleReSet = () => {
    axios
      .post("/reset/password", { email })
      .then((res) => {
        console.log(res);
        if(res.data.status){
          setSuccessText(res.data.message);
          setSuccess(true);
        }else{
          setError(true);
          setErrorText(res.data.message)
        }
        
      })
      .catch((err) => {
       
      });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        {success ? <Badge colorScheme="green">{successText}</Badge>: null}
        {error ? <Badge colorScheme="red">{errorText}</Badge>: null}
        
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleReSet}
          >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
