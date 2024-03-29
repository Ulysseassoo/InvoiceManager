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

export const currentUser = async (token) => {
	try {
		const response = await axios.get(`${baseUrl}/user/me`, {
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

export const updateOrder = async (data, token, order_id) => {
	let response = await axios.put(`${baseUrl}/orders/${order_id}`, data, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	return response
}

export const getCompanyInformations = async (token) => {
	let response = await axios.get(`${baseUrl}/companies/1`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	return response.data
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

export const sendConfirmation = async (order_id, token) => {
	let response = await axios.get(`${baseUrl}/orders/${order_id}/confirmation`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	return response
}

export const getOrderStates = async (token) => {
	let response = await axios.get(`${baseUrl}/states`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	return response
}
