import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { OrderContext } from "../Provider/OrderProvider"
import { getOrderStates, sendConfirmation } from "../Services/APIs"
import { Select } from "@chakra-ui/react"

const ListOrders = () => {
	const context = useContext(OrderContext)
	let { orders, isLoading, setOrders } = context
	const [orderStates, setOrderStates] = useState([])
	const [currentState, setCurrentState] = useState(1)

	useEffect(() => {
		console.log(orders)
	}, [orders])

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (!token) {
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
	}, [])

	const sendMail = async (order_id) => {
		const token = localStorage.getItem("token")
		try {
			let { data } = await sendConfirmation(order_id, token)
			const newOrders = [...orders]
			newOrders.forEach((order, index) => {
				if (order.id === order_id) {
					const newOrder = { ...order, ...data }
					newOrders[index] = newOrder
				}
			})
			setOrders(newOrders)
		} catch (error) {
			console.log(error)
		}
	}

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	return (
		<div>
			<h1>List of Orders</h1>
			<Link to="/orders/new">Create a new order</Link>
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
			<div>
				{orders
					.filter((order) => order.state.id === currentState)
					.map((order) => {
						return (
							<div key={order.id}>
								<div>{order.firstname}</div>
								<div>{order.lastname}</div>
								{order.state.id === 1 && <button onClick={() => sendMail(order.id)}>Send confirmation</button>}
								{order.state.id === 3 && <button>Send reminder</button>}
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default ListOrders
