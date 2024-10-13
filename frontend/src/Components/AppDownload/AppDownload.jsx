import React from 'react'
import "./AppDownload.css"
import { assets } from '../Assets/assets'
import { Link } from 'react-router-dom'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br/> Tomato App</p>
        <div className="app-dowmload-platform">
        <Link to={'https://play.google.com/store'} target='_blank'>
  <img className='image1' src={assets.play_store} alt="" />
</Link>
            <img className='image2' src={assets.app_store} alt="" />

        </div>
      
    </div>
  )
}

export default AppDownload
