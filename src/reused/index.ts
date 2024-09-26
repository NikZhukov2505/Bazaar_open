import { IProductInCart } from "../store/modules"

export const pathLink = process.env.REACT_APP_BACK_URL!

export const validateEmail = (email: string) => {
	const validRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

	if (email.match(validRegex)) {
		return false
	} else {
		return true
	}
}

export const reduceCount = (arr: IProductInCart[]) => {
	return arr?.reduce((count, el) => {
		// count += el.count
		return count
	}, 0)
}

export const totalSumInCart = (arr: IProductInCart[]) => {
	const result = arr?.reduce((sum, el) => {
		sum += +el.price
		return sum
	}, 0)
	return result
}