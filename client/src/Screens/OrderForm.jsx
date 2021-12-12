import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/modal"
import { DrawerCloseButton } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"
import Form from "../Components/Form"

const OrderForm = ({ onClose, isOpen }) => {
	return (
		<>
			{/* <Link to="/orders">List of orders</Link> */}
			<Drawer onClose={onClose} isOpen={isOpen} size="md">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px">Create a new order</DrawerHeader>
					<DrawerBody>
						<Form />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default OrderForm
