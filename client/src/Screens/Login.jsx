import { Box, Heading } from "@chakra-ui/layout"
import React from "react"
import LoginForm from "../Components/LoginForm"

const Login = () => {
	return (
		<Box height="100vh" bg="blue.500" width="100%" p={[2, 4, 6, 8]} display="flex" alignItems="center" justifyContent="center" gridGap="1rem">
			<Box display="flex" flexDirection="column" alignItems="center" p="10" bg="gray.50" borderRadius="5" width="30rem" boxShadow="xl">
				<Heading as="h1" size="xl">
					Login
				</Heading>
				<LoginForm />
			</Box>
		</Box>
	)
}

export default Login
