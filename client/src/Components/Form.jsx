import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { createOrder } from "../Services/APIs"

const Form = () => {
	const [numberPayment, setNumberPayment] = useState(1)
	const [numberProducts, setNumberProducts] = useState(1)
	const token = localStorage.getItem("token")
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()
	const onSubmit = async (formData) => {
		const newData = { ...formData, state: "/api/states/1" }
		try {
			let { data } = await createOrder(newData, token)
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<button onClick={() => setNumberPayment((prev) => prev + 1)}>Add a payment</button>
			<button onClick={() => setNumberProducts((prev) => prev + 1)}>Add a product</button>

			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="firstname" {...register("firstname", { required: true })} />
				<input type="text" placeholder="lastname" {...register("lastname", { required: true })} />
				<input type="text" placeholder="phoneNumber" {...register("phoneNumber", { required: true })} />
				<input type="text" placeholder="address" {...register("address", { required: true })} />
				<input type="datetime" placeholder="lastDate" {...register("lastDate", { required: true, valueAsDate: true })} />
				<div>
					{Array.from(Array(numberPayment).keys()).map((_, index) => {
						return (
							<div key={index}>
								<input type="text" placeholder="type" {...register(`payment.${index}.type`, { required: true })} />
								<input type="number" placeholder="amount" {...register(`payment.${index}.amount`, { required: true, valueAsNumber: true })} />
							</div>
						)
					})}
				</div>
				<div>
					{Array.from(Array(numberProducts).keys()).map((_, index) => {
						return (
							<div key={index}>
								<input type="text" placeholder="name" {...register(`products.${index}.name`, { required: true })} />
								<input type="number" placeholder="amount" {...register(`products.${index}.amount`, { required: true, valueAsNumber: true })} />
							</div>
						)
					})}
				</div>
				<input type="submit" />
			</form>
		</>
	)
}

export default Form
