import { IProductInCart } from "../store/modules"

export const setLSToken = (token: string) => {
	localStorage.setItem('token', token)
}

export const getLSToken = () => {
	return localStorage.getItem('token')
}

export const removeLSToken = () => {
	localStorage.removeItem('token')
}

export const setLS = (key: string, value: IProductInCart[]) => {
	localStorage.setItem(key, JSON.stringify(value))
}

export const getLS = (key: string) => {
	const data = localStorage.getItem(key)
	if (data) return JSON.parse(data)
}

export const removeLS = (key: string) => {
	localStorage.removeItem(key)
}