import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import Login from "./Screens/Login"
import Company from "./Screens/Company"
import OrderForm from "./Screens/OrderForm"
import ListOrders from "./Screens/ListOrders"
import Order from "./Screens/Order"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" />
				<Route path="/login" element={<Login />} />
				<Route path="/company" element={<Company />} />
				<Route path="/orders/new" element={<OrderForm />} />
				<Route path="/orders" element={<ListOrders />} />
				<Route path="/orders/:id" element={<Order />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
