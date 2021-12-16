import React, { createContext, useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router"
import { currentUser, getCompanyInformations } from "../Services/APIs"

export const UserContext = createContext()

export const UserProvider = (props) => {
	const [company, setCompany] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const userReducer = (state, action) => {
		switch (action.type) {
			case "call-api": {
				return {
					...state,
					userLoading: true
				}
			}
			case "success": {
				return {
					...state,
					userLoading: false,
					user: action.data
				}
			}
			case "error": {
				return {
					...state,
					userLoading: false,
					error: action.error
				}
			}
		}
	}

	const initialState = {
		user: {},
		userLoading: false,
		error: null
	}

	let navigate = useNavigate()
	const parseJwt = (token) => {
		try {
			return JSON.parse(atob(token.split(".")[1]))
		} catch (e) {
			return null
		}
	}
	const logout = () => {
		localStorage.removeItem("token")
		navigate("/login")
	}
	const getCompanyData = async (token) => {
		try {
			let response = await getCompanyInformations(token)
			isLoading === false && setCompany(null)
			isLoading && setCompany(response)
		} catch (error) {
			setIsLoading(true)
			console.log(error)
		}
	}

	const [state, dispatch] = useReducer(userReducer, initialState)

	const getUser = async (token) => {
		dispatch({ type: "call-api" })
		try {
			let response = await currentUser(token)
			dispatch({ type: "success", data: response })
		} catch (error) {
			dispatch({ type: "error", error: error })
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (!token) {
			navigate("/login")
			return
		}
		// Check if token has expired
		const decodedJwt = parseJwt(token)
		if (decodedJwt.exp * 1000 < Date.now()) {
			logout()
			return
		}
		getUser(token)
		getCompanyData(token)
		console.log(state)
	}, [navigate])

	return <UserContext.Provider value={{ company, isLoading, setCompany, state }}>{props.children}</UserContext.Provider>
}
