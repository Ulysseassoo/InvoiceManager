import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { OrderContext } from "../Provider/OrderProvider"
import { getOrderStates } from "../Services/APIs"
import { Select } from "@chakra-ui/react"

const ListOrders = () => {
	const context = React.useContext(OrderContext)
	let { orders, isLoading } = context
	const [orderStates, setOrderStates] = useState([])
	const [currentState, setCurrentState] = useState(0)
	useEffect(() => {
		console.log(orders)
	}, [orders])
	useEffect(() => {
		const token = localStorage.getItem("token")
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
	return (
		<div>
			<h1>List of Orders</h1>
			<Link to="/orders/new">Create a new order</Link>
			{isLoading ? (
				<>
					<div>
						<Select onChange={(e) => setCurrentState(e.target.selectedIndex)}>
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
									</div>
								)
							})}
					</div>
				</>
			) : (
				"Loading..."
			)}
		</div>
	)
}

export default ListOrders
