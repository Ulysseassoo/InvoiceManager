import React from "react"
import { useForm } from "react-hook-form"

const CompanyForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()
	const onSubmit = (data) => {
		const formattedData = { ...data, logo: data.logo[0] }
		console.log(formattedData)
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
