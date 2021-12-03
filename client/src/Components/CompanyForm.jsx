import React from "react"
import { useForm } from "react-hook-form"
import { updateCompanyInformations } from "../Services/APIs"

const CompanyForm = () => {
	const token = localStorage.getItem("token")
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()
	const onSubmit = async (companyData) => {
		const formData = new FormData()
		formData.append("name", companyData.name)
		formData.append("address", companyData.address)
		formData.append("logo", companyData.logo[0])
		try {
			let { data } = await updateCompanyInformations(formData, token)
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}
	// console.log(errors)

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="name" {...register("name", {})} />
			<input type="text" placeholder="address" {...register("address", {})} />
			<input type="file" placeholder="logo" {...register("logo", {})} />

			<input type="submit" />
		</form>
	)
}

export default CompanyForm
