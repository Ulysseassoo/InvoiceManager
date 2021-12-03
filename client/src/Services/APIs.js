import axios from "axios"
import { useNavigate } from "react-router-dom"

const baseUrl = "http://localhost:8000/api"

export const login = async (data) => {
	try {
		const response = await axios.post(`${baseUrl}/login`, data)
		return response.data
	} catch (error) {
		console.log(error)
	}
}

export const getAllOrders = async (token) => {
	try {
		const response = await axios.get(`${baseUrl}/orders`, {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})

		return response.data
	} catch (error) {
		console.log(error)
	}
}

export const createOrder = async (data, token) => {
	let response = await axios.post(`${baseUrl}/orders`, data, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	return response
}

export const updateCompanyInformations = async (data, token) => {
	let response = await axios.post(`${baseUrl}/companies/1`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-type": "multipart/form-data"
		}
	})

	return response
}

export const getOrder = async (order_id, token) => {
	let response = await axios.get(`${baseUrl}/orders/${order_id}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	let json = await response.data

	return json
}
