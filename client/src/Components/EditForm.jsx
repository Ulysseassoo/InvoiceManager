import { Button } from "@chakra-ui/button"
import { FormErrorMessage, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { updateOrder } from "../Services/APIs"

const EditForm = ({ order }) => {
	const { firstname, lastname, id, payment, products, address, phoneNumber, lastDate } = order
	const [numberPayment, setNumberPayment] = useState(payment.length)
	const [numberProducts, setNumberProducts] = useState(products.length)
	const token = localStorage.getItem("token")
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm()
	const onSubmit = async (formData) => {
		console.log(formData)
		// const newData = { ...formData, state: "/api/states/1" }
		try {
			// let { data } = await updateOrder(newData, token, id)
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<Flex gridGap="2rem" paddingY="2rem">
				<Button onClick={() => setNumberPayment((prev) => prev + 1)}>Add a payment</Button>
				<Button onClick={() => setNumberProducts((prev) => prev + 1)}>Add a product</Button>
			</Flex>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing="24px">
					<Box>
						<FormLabel htmlFor="firstname">Firstname</FormLabel>
						<Input type="text" id="firstname" placeholder={firstname} {...register("firstname", { required: true })} />
						<FormErrorMessage>{errors.firstname && errors.firstname.message}</FormErrorMessage>
					</Box>
					<Box>
						<FormLabel htmlFor="lastname">Lastname</FormLabel>
						<Input type="text" id="lastname" placeholder={lastname} {...register("lastname", { required: true })} />
						<FormErrorMessage>{errors.lastname && errors.lastname.message}</FormErrorMessage>
					</Box>
					<Box>
						<FormLabel htmlFor="phone">Phone Number</FormLabel>
						<Input type="text" id="phone" placeholder={phoneNumber} {...register("phoneNumber", { required: true })} />
						<FormErrorMessage>{errors.phoneNumber && errors.phoneNumber.message}</FormErrorMessage>
					</Box>
					<Box>
						<FormLabel htmlFor="address">Address</FormLabel>
						<Input type="text" id="address" placeholder={address} {...register("address", { required: true })} />
						<FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
					</Box>
					<Box>
						<FormLabel htmlFor="date">Due Date</FormLabel>
						<Input type="date" id="date" value={lastDate} {...register("lastDate", { required: true, valueAsDate: true })} />
						<FormErrorMessage>{errors.lastDate && errors.lastDate.message}</FormErrorMessage>
					</Box>
				</Stack>
				<Box>
					<Heading size="lg" paddingY="1rem">
						Payment
					</Heading>
					<Box>
						{payment.map((pay, index) => {
							return (
								<Box key={index}>
									<Box>
										<FormLabel htmlFor="type">Type</FormLabel>
										<Input type="text" id="type" placeholder={pay.type} {...register(`payment.${index}.type`, { required: true })} />
										<FormErrorMessage>{errors[`payment.${index}.type`] && errors[`payment.${index}.type`].message}</FormErrorMessage>
									</Box>
									<Box>
										<FormLabel htmlFor="amountPayment">Amount</FormLabel>
										<Input
											type="number"
											id="amountPayment"
											placeholder={`${pay.amount} €`}
											{...register(`payment.${index}.amount`, { required: true, valueAsNumber: true })}
										/>
										<FormErrorMessage>{errors[`payment.${index}.amount`] && errors[`payment.${index}.amount`].message}</FormErrorMessage>
									</Box>
								</Box>
							)
						})}
					</Box>
				</Box>
				<Box>
					<Heading size="lg" paddingY="1rem">
						Products
					</Heading>
					{products.map((pro, index) => {
						return (
							<Box key={index}>
								<Box>
									<FormLabel htmlFor="nameProduct">Name</FormLabel>
									<Input type="text" id="nameProduct" placeholder={pro.name} {...register(`products.${index}.name`, { required: true })} />
									<FormErrorMessage>{errors[`products.${index}.name`] && errors[`products.${index}.name`].message}</FormErrorMessage>
								</Box>
								<Box>
									<FormLabel htmlFor="amountProduct">Amount</FormLabel>
									<Input
										type="number"
										id="amountProduct"
										placeholder={`${pro.amount} €`}
										{...register(`products.${index}.amount`, { required: true, valueAsNumber: true })}
									/>
									<FormErrorMessage>{errors[`products.${index}.amount`] && errors[`products.${index}.amount`].message}</FormErrorMessage>
								</Box>
							</Box>
						)
					})}
				</Box>
				<Button mt={4} colorScheme="blue" isLoading={isSubmitting} type="submit">
					Update
				</Button>
			</form>
		</>
	)
}

export default EditForm
