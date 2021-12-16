import React, { createContext, useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router"
import { getAllOrders } from "../Services/APIs"

export const OrderContext = createContext({
	state: {},
	dispath: () => {}
})

export const OrderProvider = (props) => {
	const ordersReducer = (state, action) => {
		switch (action.type) {
			case "call-api": {
				return {
					...state,
					loading: true
				}
			}
			case "success": {
				return {
					...state,
					loading: false,
					orders: action.data
				}
			}
			case "new-data": {
				const newOrders = [...state.orders]
				newOrders.forEach((order, index) => {
					if (order.id === action.data.id) {
						const newOrder = { ...state.orders, ...action.data }
						newOrders[index] = newOrder
					}
				})
				return {
					...state,
					loading: false,
					orders: newOrders
				}
			}
			case "error": {
				return {
					...state,
					loading: false,
					error: action.error
				}
			}
		}
	}
	const initialState = {
		orders: [],
		loading: false,
		error: null
	}

	const [state, dispatch] = useReducer(ordersReducer, initialState)
	let navigate = useNavigate()

	const getOrders = async (token) => {
		dispatch({ type: "call-api" })
		try {
			let response = await getAllOrders(token)
			dispatch({ type: "success", data: response })
		} catch (error) {
			dispatch({ type: "error", error: error })
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (!token) {
			return
		}
		getOrders(token)
		return () => setIsLoading(true)
	}, [navigate])

	return <OrderContext.Provider value={{ state, dispatch }}>{props.children}</OrderContext.Provider>
}
