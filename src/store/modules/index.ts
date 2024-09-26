export type IObjectKeys = {
	[key: string]: string | null | undefined
}

export type UserLogin = {
	email: string
	password: string
}

export type GetToken = {
	access: string
	refresh: string
}

export type ISellerUser = {
	[key: string]: string | number | File | undefined | null | boolean
	id?: number
	user: number | string
	tin: string
	container_name: string
	whatsapp_number: string
	instagram_link: string | null
	telegram_link: string | null
	avatar?: string | File | null
	description: string
}

export type TokenNodules = {
	email: string
	first_name: string
	id: number
	last_name: string
	seller_user: null | ISellerUser
}

export type DetailProfile = {
	id: number
	insta_image: string
	main_image: null
	mini_description: string
	shop_name: string
	user: number
	followers: number
	product_count: number
	instagram_link: string
	background_image: string
}
export type ImagesMas = {
	image: string
}
export type ProfileCardModules = {
	id: number
	name: string
	description: string
	seller: number
	price: string
	image: string
	images: ImagesMas[]
	sub_category: number
	sub_category_name: string
	category_name: string
	instagram_link: string
}

export type ImagesCard = {
	id: number
	image: string
}

export type IProductCard = {
	id: number
	name: string
	description: string
	price: string
	image: string
	images: ImagesCard[]
	sub_category: number
	sub_category_name: string
	category_name: string
	seller: number
	container_name: string
	instagram_link: string
	telegram_link: string
	whatsapp_number: string
}

export type IProductInCart = {
	id: number
	name: string
	price: string
	image: string
	sub_category_name: string
	seller: number
	container_name: string
}

export type IStoreInfo = {
	id: number
	user: number
	tin: string
	container_number: string
	container_row: string
	container_name: string
	description: string
	paid_status: boolean
	paid_date: string
	lat: number
	long: number
	whatsapp_number: string
	avatar: string
	product_count: number
	instagram_link: string | null
	telegram_link: string | null
}
export type IFeatures = {
	type: string
	properties: {
		id: number
		title: string
		description: string
		tin: string
		container_number: string
		paid_status: boolean
		paid_date: string
		whatsapp_number: string
		avatar: string
		product_count: number
	}
	geometry: {
		type: string
		coordinates: [number, number]
	}
}

export type IStores = {
	type: string
	features: IFeatures[]
}

export type ISubCategory = {
	id: number
	name: string
}

export type ICategory = {
	id: number
	name: string
	sub_categories: ISubCategory[]
}

export type IProductsCat = {
	id: string
	cat_id: string
	sub_id: string
}

export type IAddProductsCard = {
	name: string
	description: string
	price: string
	sub_category: string
	image: File | string
	images: File[]
}

export type IForAddProduct = {
	productCard: FormData
	token: string
}

export type IForChangeProduct = {
	productCard: FormData
	token: string
	id: number
}

export type IIdToken = {
	id: number
	token: string
}

export type IShopSellerUser = {
	user: number | string
	tin: string
	container_name: string
	whatsapp_number: string
	instagram_link: string
	telegram_link: string
	avatar: string | File | null
}

export type IIdTokenShopUser = {
	id: number
	token: string
	seller_user: ISellerUser
}

export type ISellerProductsByName = {
	id: string
	q: string
}

// list product
export type IListProduct = {
	id: number
	name: string
	description: string
	price: number
	image: string
	images: []
	sub_category: number
	sub_category_name: string
	category_name: string
	instagram_link: string
	seller: number
	container_name: string
}

export type IInfo = {
	company_name: string
	about_info: string
	privacy_policy_info: string
	payment_info: string
	whatsapp_info: string
	telegram_info: string
	instagram_info: string
}
