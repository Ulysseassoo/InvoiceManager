import React, { useContext, useRef } from "react"
import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Img,
	DrawerOverlay
} from "@chakra-ui/react"
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu, FiBell, FiChevronDown } from "react-icons/fi"
import { UserContext } from "../Provider/UserProvider"
import { useNavigate } from "react-router"

const LinkItems = [
	{ name: "Home", icon: FiHome, link: "/orders" },
	{ name: "Company", icon: FiSettings, link: "/company" }
]

export default function SidebarWithHeader({ children }) {
	const context = useContext(UserContext)
	let { company, isLoading } = context
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
			<SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
			<Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{children}
			</Box>
		</Box>
	)
}

const SidebarContent = ({ onClose, ...rest }) => {
	const context = useContext(UserContext)
	let { company, isLoading } = context
	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}>
			<Flex h="20" alignItems="center" mx="8" justifyContent="center" margin="0.3rem">
				<Box height="100%">{isLoading ? <Img src={company.logo} height="100%" alt={`${company.name} Logo`} /> : "Logo"}</Box>
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon} link={link.link}>
					{link.name}
				</NavItem>
			))}
		</Box>
	)
}

const NavItem = ({ icon, link, children, ...rest }) => {
	return (
		<Link href={link} style={{ textDecoration: "none" }}>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: "cyan.400",
					color: "white"
				}}
				{...rest}>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: "white"
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	)
}

const MobileNav = ({ onOpen, ...rest }) => {
	const context = useContext(UserContext)
	let { company, isLoading, setCompany, state } = context
	let navigate = useNavigate()
	console.log(state)

	const logout = () => {
		localStorage.removeItem("token")
		navigate("/login")
		setCompany(null)
	}
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}>
			<IconButton display={{ base: "flex", md: "none" }} onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} />

			<Box height="100%" display={{ base: "flex", md: "none" }}>
				{isLoading ? <Img height="100%" padding="0.5rem" src={company.logo} alt={`${company.name} Logo`} /> : "Logo"}
			</Box>

			<HStack spacing={{ base: "0", md: "6" }}>
				<IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
							<HStack>
								<VStack display={{ base: "none", md: "flex" }} alignItems="flex-start" spacing="1px" ml="2">
									<Text fontSize="sm">{state.userLoading === false && state.user.email}</Text>
									<Text fontSize="xs" color="gray.600">
										Employee
									</Text>
								</VStack>
								<Box display={{ base: "none", md: "flex" }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList bg={useColorModeValue("white", "gray.900")} borderColor={useColorModeValue("gray.200", "gray.700")}>
							<MenuDivider />
							<MenuItem onClick={() => logout()}>Sign out</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	)
}
