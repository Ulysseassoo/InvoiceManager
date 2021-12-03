import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { OrderContext } from "../Provider/OrderProvider"

const ListOrders = () => {
	const context = React.useContext(OrderContext)
	let { orders, isLoading } = context
	useEffect(() => {
		console.log(orders)
	}, [orders])
	return (
		<div>
			<h1>List of Orders</h1>
			<Link to="/orders/new">Create a new order</Link>
			{isLoading ? (
				<div>
					{orders.map((order) => {
						return (
							<div key={order.id}>
								<div>{order.firstname}</div>
								<div>{order.lastname}</div>
							</div>
						)
					})}
				</div>
			) : (
				"Loading..."
			)}
		</div>
	)
}

export default ListOrders
