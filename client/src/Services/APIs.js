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

export const getAllArticleCategories = async (token) => {
	let response = await fetch("http://edu.project.etherial.fr/articles/categories", {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	let json = await response.json()

	return json
}

export const getArticleById = async (token, article_id) => {
	let response = await fetch("http://edu.project.etherial.fr/articles/:id", {
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ article_id: article_id })
	})

	let json = await response.json()

	return json
}
