import axios from 'axios'
import { pathLink } from '../reused'
import {
	IForAddProduct,
	IForChangeProduct,
	IIdTokenShopUser,
	IProductsCat,
	ISellerProductsByName,
	UserLogin,
} from '../store/modules'

const instanse = axios.create({
	baseURL: pathLink,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: false,
})

export const storesApi = {
	getCategory() {
		return instanse.get(`/api/categories/categories/`)
	},
	getStoresByCategory(cat_id: string, sub_id: string = '') {
		return instanse.get(
			`/api/categories/categories/${cat_id}/sellers/?subcategory_id=${sub_id}`
		)
	},
	getStoresBySearch(query: string) {
		return instanse.get(`/api/products/search/products/?query=${query}`)
	},
	getBySellersIds(data: number[]) {
		return instanse.post(`/api/users/unique-sellers/`, { seller_ids: data })
	},
	getProfileDetail(id: number) {
		return instanse.get(`/api/users/seller-users/${id}/`)
	},
	getProfileCard(id: number) {
		return instanse.get(`/api/products/seller/${id}/products/`)
	},
	getDetailView(id: number) {
		return instanse.get(`/api/products/products/${id}/`)
	},
	getStoreCategories(id: number) {
		return instanse.get(`/api/categories/seller/${id}/categories/`)
	},

	getTokenUser(token: string) {
		const headers = { Authorization: `Bearer ${token}` }
		return instanse.get('/api/users/api/sellers/info-token', { headers })
	},

	AddNewProduct({ productCard, token }: IForAddProduct) {
		const headers = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data',
		}
		return instanse.post('/api/products/products/', productCard, { headers })
	},
	changeProduct({ productCard, token, id }: IForChangeProduct) {
		const headers = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data',
		}
		return instanse.put(`/api/products/products/${id}/`, productCard, {
			headers,
		})
	},
	getInfoStore(id: number) {
		return instanse.get(`/api/users/seller-users/${id}/`)
	},
	getProduct(id: number) {
		return instanse.get(`/api/products/seller/${id}/products/`)
	},
	getProductsByCategory({ id, cat_id, sub_id }: IProductsCat) {
		return instanse.get(
			`/api/products/seller/${id}/products/products-by-category/?category_id=${cat_id}&subcategory_id=${sub_id}`
		)
	},
	getSellerProductsByName({ id, q }: ISellerProductsByName) {
		return instanse.get(
			`/api/products/seller/${id}/search-products/?query=${q}`
		)
	},
	addNewUser(getUser: UserLogin) {
		return instanse.post(`/api/users/token/`, getUser)
	},
	changeTokenUser({ id, seller_user, token }: IIdTokenShopUser) {
		const headers = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data',
		}
		return instanse.put(`/api/users/seller-users/${id}/`, seller_user, {
			headers,
		})
	},
	getListProduct(id: number) {
		return instanse.get(`/api/products/seller/${id}/search-products/`)
	},
	deleteProduct({ id, token }: { id: number, token: string }) {
		const headers = { "Authorization": `Bearer ${token}` }
		return instanse.delete(`/api/products/products/${id}/`, { headers })
	},
	getCompanyInfo() {
		return instanse.get(`/api/info/info/`)
	}
}
