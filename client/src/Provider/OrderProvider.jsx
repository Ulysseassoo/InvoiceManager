import React, { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getAllOrders } from "../Services/APIs"

export const OrderContext = createContext({
	orders: []
})

export const OrderProvider = (props) => {
	const [orders, setOrders] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	let navigate = useNavigate()

	const getOrders = async (token) => {
		try {
			let response = await getAllOrders(token)
			isLoading === false && setOrders(null)
			isLoading && setOrders(response)
		} catch (error) {
			setIsLoading(true)
			console.log(error)
		}
	}

	useEffect(() => {
		setIsLoading(true)
		const token = localStorage.getItem("token")
		if (!token) {
			return
		}
		setIsLoading(false)
		getOrders(token)
		return () => setIsLoading(true)
	}, [navigate])

	return <OrderContext.Provider value={{ orders, isLoading, setOrders, setIsLoading }}>{props.children}</OrderContext.Provider>
}
