import { Box, Button, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { UserContext } from "../Provider/UserProvider"
import { updateCompanyInformations } from "../Services/APIs"

const CompanyForm = () => {
	const token = localStorage.getItem("token")
	const context = useContext(UserContext)
	const { company, isLoading, setCompany } = context
	const {
		register,
		handleSubmit,
		isSubmitting,
		setValue,
		formState: { errors }
	} = useForm()
	const onSubmit = async (companyData) => {
		const formData = new FormData()
		formData.append("name", companyData.name)
		formData.append("address", companyData.address)
		formData.append("logo", companyData.logo[0])
		try {
			let { data, request } = await updateCompanyInformations(formData, token)
			if (request.status === 201) {
				setCompany(data)
				toast.success("The company has been updated !")
			} else {
				toast.error(request.statusText)
			}
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		const { name, address } = company
		setValue("name", name)
		setValue("address", address)
	}, [company])
	// console.log(errors)
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box>
				<FormLabel htmlFor="name">Company Name</FormLabel>
				<Input type="text" id="name" placeholder="Company Name" {...register("name", {})} />
				<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
			</Box>
			<Box>
				<FormLabel htmlFor="address">Address</FormLabel>
				<Input type="text" id="address" placeholder="address" {...register("address", {})} />
				<FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
			</Box>
			<Box>
				<FormLabel htmlFor="logo">Address</FormLabel>
				<Input type="file" id="logo" placeholder="logo" {...register("logo", {})} />
				<FormErrorMessage>{errors.logo && errors.logo.message}</FormErrorMessage>
			</Box>
			<Button mt={4} colorScheme="blue" isLoading={isSubmitting} type="submit">
				Update
			</Button>
		</form>
	)
}

export default CompanyForm
