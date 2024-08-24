import React, { useEffect } from 'react'
import "./HrDashboard.css"
import { useNavigate } from 'react-router-dom'

const HrDashboard = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/profile')
    })
  return (
    <div>
        useContext
    </div>
  )
}

export default HrDashboard