import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './EmployeeDashboard.css'

const EmployeeDashboard = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/profile')
    })
  return (
    <div>EmployeeDashboard</div>
  )
}

export default EmployeeDashboard