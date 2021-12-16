import React, { useContext } from "react"
import { AiFillEdit } from "react-icons/ai"
import { Box, Text, Spacer, Stack, Badge, Flex } from "@chakra-ui/layout"
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import Form from "./Form"
import { OrderContext } from "../Provider/OrderProvider"
import { sendConfirmation } from "../Services/APIs"

const Card = ({ order }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const context = useContext(OrderContext)
	let { dispatch } = context

	const sendMail = async (order_id) => {
		const token = localStorage.getItem("token")
		dispatch({ type: "call-api" })
		try {
			let { data } = await sendConfirmation(order_id, token)
			dispatch({ type: "new-data", data: data })
		} catch (error) {
			dispatch({ type: "error", error: error })
		}
	}
	return (
		<>
			<Box p={5} border="1px solid gray" borderRadius="0.25rem" flex="25%">
				<Stack align="center">
					<Badge variant="solid" colorScheme="green" rounded="full" px={2}>
						#{order.id}
					</Badge>
				</Stack>
				<Stack align="center">
					<Text as="h2" fontWeight="normal" my={2}>
						{order.firstname} {order.lastname}
					</Text>
					<Text fontWeight="light">{order.address}</Text>
				</Stack>
				<AiFillEdit onClick={onOpen} />
				<Flex my={2}>
					<Spacer />
					{order.state.id === 1 && (
						<Button variant="solid" colorScheme="blue" size="sm" onClick={() => sendMail(order.id)}>
							Send confirmation
						</Button>
					)}
					{order.state.id === 3 && (
						<Button variant="solid" colorScheme="blue" size="sm" onClick={() => sendMail(order.id)}>
							Send reminder
						</Button>
					)}
				</Flex>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Order #{order.id}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Form order={order} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Card
