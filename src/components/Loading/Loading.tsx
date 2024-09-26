import React, { FC } from 'react'
import './Loading.scss'

const Loading: FC = () => {
	return (
		<div className='loader_wrapper'>
			<div>
				<div className="loader"></div>
			</div>
		</div>
	)
}

export default Loading
