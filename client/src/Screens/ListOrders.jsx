import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { OrderContext } from "../Provider/OrderProvider"
import { getOrderStates, sendConfirmation } from "../Services/APIs"
import { Select } from "@chakra-ui/react"
import SidebarWithHeader from "../Components/Sidebar"
import OrderForm from "./OrderForm"
import { useDisclosure } from "@chakra-ui/hooks"
import { Button } from "@chakra-ui/button"
import { AddIcon } from "@chakra-ui/icons"
import { Box, Text, Heading, Spacer, Stack, Badge, Flex } from "@chakra-ui/layout"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner"

const ListOrders = () => {
	const context = useContext(OrderContext)
	let { state, dispatch } = context
	const { orders, loading, error } = state
	const [orderStates, setOrderStates] = useState([])
	const [currentState, setCurrentState] = useState(1)
	const { isOpen, onOpen, onClose } = useDisclosure()
	let navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (!token) {
			navigate("/login")
			return
		}
		const getStates = async () => {
			try {
				let { data } = await getOrderStates(token)
				setOrderStates(data)
			} catch (error) {
				console.log(error)
			}
		}
		getStates()
		console.log(orders)
		return () => {
			setOrderStates([])
		}
	}, [])

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

	if (loading || orders === null || orders === undefined || orderStates.length === 0) {
		return (
			<Flex alignItems="center" justifyContent="center" height="100vh">
				<Loader
					type="Puff"
					color="#00BFFF"
					height={100}
					width={100}
					timeout={3000} //3 secs
				/>
			</Flex>
		)
	}

	const handleClick = () => {
		onOpen()
	}

	return (
		<SidebarWithHeader>
			<div>
				<h1>List of Orders</h1>
				<Button onClick={() => handleClick()} m={4} leftIcon={<AddIcon />}>
					Create new Order
				</Button>
				<div>
					<Select onChange={(e) => setCurrentState(e.target.selectedIndex + 1)}>
						{orderStates.map((state) => {
							return (
								<option key={state.id} value={state.name}>
									{state.name}
								</option>
							)
						})}
					</Select>
				</div>
				<Flex gridGap="2rem" flexWrap="wrap" paddingY="2rem">
					{orders
						.filter((order) => order.state.id === currentState)
						.map((order) => {
							return (
								<Box p={5} border="1px solid gray" key={order.id} borderRadius="0.25rem" flex="25%">
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
							)
						})}
				</Flex>
			</div>
			<OrderForm isOpen={isOpen} onClose={onClose} />
		</SidebarWithHeader>
	)
}

export default ListOrders
