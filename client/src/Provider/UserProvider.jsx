import React, { createContext, useEffect } from "react"
import { useNavigate } from "react-router"

export const UserContext = createContext()

export const UserProvider = (props) => {
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
	}, [navigate])

	return <UserContext.Provider value="">{props.children}</UserContext.Provider>
}
