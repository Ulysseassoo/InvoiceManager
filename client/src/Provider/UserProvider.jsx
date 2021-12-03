import React, { createContext, useEffect } from "react"
import { useNavigate } from "react-router"

export const UserContext = createContext()

export const UserProvider = (props) => {
	let navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (!token) {
			navigate("/login")
			return
		}
		// getData(token)
	}, [navigate])

	return <UserContext.Provider value="">{props.children}</UserContext.Provider>
}
