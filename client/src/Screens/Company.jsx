import { Box, Heading, Stack } from "@chakra-ui/react"
import React from "react"
import CompanyForm from "../Components/CompanyForm"
import SidebarWithHeader from "../Components/Sidebar"

const Company = () => {
	return (
		<SidebarWithHeader>
			<Box padding={2}>
				<Heading>Company Form</Heading>
				<Stack marginY={5}>
					<CompanyForm />
				</Stack>
			</Box>
		</SidebarWithHeader>
	)
}

export default Company
