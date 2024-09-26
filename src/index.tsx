import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { HelmetProvider } from 'react-helmet-async'
import "mapbox-gl/dist/mapbox-gl.css";
import 'animate.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<HelmetProvider>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</HelmetProvider>
)
