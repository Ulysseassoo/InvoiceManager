import React, { useContext } from "react"
import { AiFillEdit } from "react-icons/ai"
import { Box, Text, Spacer, Stack, Badge, Flex } from "@chakra-ui/layout"
import { List, ListItem } from "@chakra-ui/react"
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import Form from "./Form"
import { OrderContext } from "../Provider/OrderProvider"
import { sendConfirmation } from "../Services/APIs"

const Card = ({ order }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { isOpen: isOpenItem, onOpen: onOpenItem, onClose: onCloseItem } = useDisclosure()
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
			<Flex
				p={5}
				border="1px solid gray"
				borderRadius="0.25rem"
				flex="100%"
				alignItems={"center"}
				justifyContent={"space-between"}
				cursor={"pointer"}
				onClick={onOpenItem}>
				<Flex alignItems="center" gridGap={4}>
					<Badge variant="solid" colorScheme="green" rounded="full" px={2}>
						#{order.id}
					</Badge>
					<Box align="center">
						<Text as="h2" fontWeight="normal" my={2}>
							{order.firstname} {order.lastname}
						</Text>
					</Box>
				</Flex>
				<Flex my={2} alignItems={"center"} gridGap={3}>
					<AiFillEdit
						onClick={(e) => {
							e.stopPropagation()
							onOpen()
						}}
					/>
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
			</Flex>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader borderBottom={"1px solid gray"}>Order #{order.id}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Form order={order} />
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal isOpen={isOpenItem} onClose={onCloseItem}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader borderBottom={"1px solid gray"}>Order #{order.id}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex direction={"column"}>
							<Text>
								Client :{order.firstname} {order.lastname}
							</Text>
							<Text>Client Address :{order.address}</Text>
							<Text>Phone Number :{order.phoneNumber}</Text>
							<Box>
								Products :
								{order.products.map((product) => {
									return (
										<List>
											<ListItem paddingLeft={4}>Name: {product.name}</ListItem>
											<ListItem paddingLeft={4}>Price: {product.amount}</ListItem>
										</List>
									)
								})}
							</Box>
							<Box>
								Payment :
								{order.payment.map((payment) => {
									return (
										<List>
											<ListItem paddingLeft={4}>Name: {payment.type}</ListItem>
											<ListItem paddingLeft={4}>Price: {payment.amount}</ListItem>
										</List>
									)
								})}
							</Box>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Card
