import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { login } from "../Services/APIs"
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from "@chakra-ui/react"
import { FormHelperText } from "@chakra-ui/form-control"

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm()
	let navigate = useNavigate()

	const onSubmit = async (form) => {
		try {
			let { token } = await login(form)
			localStorage.setItem("token", token)
			navigate("/orders")
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
			<FormControl isInvalid={errors.name} display="flex" flexDirection="column" p="10" width="100%">
				<FormLabel htmlFor="email">Email</FormLabel>
				<Input type="text" id="email" {...register("username", { required: true, pattern: /^\S+@\S+$/i })} />
				<FormHelperText>We'll never share your email.</FormHelperText>
				<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
				<FormLabel htmlFor="email">Password</FormLabel>
				<Input type="password" {...register("password", { required: true })} />
				<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>

				<Button mt={4} colorScheme="blue" isLoading={isSubmitting} type="submit">
					Login
				</Button>
			</FormControl>
		</form>
	)
}

export default LoginForm
