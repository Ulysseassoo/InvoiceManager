import React, { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getCompanyInformations } from "../Services/APIs"

export const UserContext = createContext()

export const UserProvider = (props) => {
	const [company, setCompany] = useState([])
	const [isLoading, setIsLoading] = useState(true)

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
		getCompanyData(token)
	}, [navigate])

	return <UserContext.Provider value={{ company, isLoading, setCompany }}>{props.children}</UserContext.Provider>
}
