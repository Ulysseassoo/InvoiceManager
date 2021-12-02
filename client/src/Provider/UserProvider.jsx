import React, { createContext, useEffect } from "react"
import { useNavigate } from "react-router"

export const UserContext = createContext()

export const UserProvider = (props) => {
	// const [userInformations, setUserInformations] = useState([])
	let navigate = useNavigate()

	// const getData = async (token) => {
	// 	try {
	// 		let { data } = await getUserInformations(token)
	// 		setUserInformations(data)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }
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
