import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { SiTwitter, SiGithub } from "react-icons/si";
import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
export default function OAuthUI() {
  const handleGoogleLogin = () => {
    axios
      .get("/auth/google")
      .then((res) => {})
      .catch((err) => {
        console.log("somthe is wrong please try again leter");
      });
  };
  return (
    <Center>
      <Stack spacing={2} align={"center"} maxW={"md"} w={"full"}>
        <Button w={"full"} variant={"outline"} leftIcon={<FcGoogle />}>
          <Center>
            <Text onClick={handleGoogleLogin}>Sign in with Google</Text>
          </Center>
        </Button>
      </Stack>
    </Center>
  );
}
