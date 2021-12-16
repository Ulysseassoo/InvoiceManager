import { Box } from "@chakra-ui/react"
import React from "react"
import CompanyForm from "../Components/CompanyForm"

const Company = () => {
	return (
		<Box padding={2}>
			<h1>Company Form</h1>
			<CompanyForm />
		</Box>
	)
}

export default Company
