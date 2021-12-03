import React, { createContext, useEffect, useState } from "react"
import { getAllOrders } from "../Services/APIs"

export const OrderContext = createContext()

export const OrderProvider = (props) => {
	const [orders, setOrders] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const getOrders = async (token) => {
		try {
			let response = await getAllOrders(token)
			setOrders(response["hydra:member"])
			setIsLoading(true)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		const token = localStorage.getItem("token")
		getOrders(token)
	}, [])

	return <OrderContext.Provider value={{ orders, isLoading }}>{props.children}</OrderContext.Provider>
}
