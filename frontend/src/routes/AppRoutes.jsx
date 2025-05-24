import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { setUser, deleteState, setMode } from "../redux/appSlice"
import { readUser, logout } from "../services/authService"
import UserRoutes from "./UserRoutes"
import IntroRoutes from "./IntroRoutes"
import AdminRoutes from "./AdminRoutes"

function AppRoutes() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			await logout()
		} catch (err) {
			console.err(err.message)
		} finally {
			localStorage.removeItem("at")
			localStorage.removeItem('mode')
			localStorage.removeItem('role')
			dispatch(deleteState())
			navigate("/")
		}
	}

	useEffect(() => {
		const initializeApp = async () => {
			const accessToken = localStorage.getItem("at")
			const savedMode = localStorage.getItem("mode") || "dark"
			dispatch(setMode(savedMode))

			if (accessToken) {
				try {
					const userData = await readUser(accessToken)
					dispatch(setUser(userData))
				} catch (err) {
					await handleLogout()
				}
			}
		}

		initializeApp()
	}, [])

	if (localStorage.getItem('role')) {
		return localStorage.getItem('role') === "admin" ? <AdminRoutes /> : <UserRoutes />
	}
	
	return <IntroRoutes />
}

export default AppRoutes