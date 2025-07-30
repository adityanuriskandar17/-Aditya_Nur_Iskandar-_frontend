import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation()

    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <div style={{
            width: '60px',
            height: '100vh',
            backgroundColor: '#f3f4f6',
            position: 'fixed',
            left: 0,
            top: '64px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '20px',
            gap: '20px',
            borderRight: '1px solid #e5e7eb'
        }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: isActive('/') ? '#4A8394' : '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive('/') ? 'white' : '#6b7280',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}>
                    <i className="fas fa-home"></i>
                </div>
            </Link>
            
            <Link to="/bookings" style={{ textDecoration: 'none' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: isActive('/bookings') ? '#4A8394' : '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive('/bookings') ? 'white' : '#6b7280',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}>
                    <i className="fas fa-calendar-alt"></i>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar 