import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import Login from "./Screens/Login"
import Company from "./Screens/Company"
import OrderForm from "./Screens/OrderForm"
import ListOrders from "./Screens/ListOrders"
import Order from "./Screens/Order"
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { UserProvider } from "./Provider/UserProvider"
import { OrderProvider } from "./Provider/OrderProvider"

const breakpoints = createBreakpoints({
	sm: "30em",
	md: "48em",
	lg: "62em",
	xl: "80em",
	"2xl": "96em"
})

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<OrderProvider>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/company" element={<Company />} />
						<Route path="/orders/new" element={<OrderForm />} />
						<Route path="/orders" element={<ListOrders />} />
						<Route path="/orders/:id" element={<Order />} />
					</Routes>
				</OrderProvider>
			</UserProvider>
		</BrowserRouter>
	)
}

export default App
