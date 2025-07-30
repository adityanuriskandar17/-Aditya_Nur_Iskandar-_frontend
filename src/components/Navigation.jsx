import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav style={{ 
            background: 'linear-gradient(90deg, rgb(20,48,58) 0%, rgb(30,73,88) 50%, rgb(40,97,116) 100%)',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)'
        }}>
            {/* Left Side - Branding */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                        src="/logo-ftl.png" 
                        alt="FTL iMeeting Logo" 
                        style={{ 
                            height: '36px', 
                            width: 'auto'
                        }}
                    />
                    <span style={{ 
                        fontWeight: '600', 
                        fontSize: '20px',
                        color: 'white',
                        letterSpacing: '0.5px',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                    }}>
                        iMeeting
                    </span>
                </div>
            </Link>

            {/* Right Side - User Controls */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '20px'
            }}>
                {/* Bell Icon */}
                <button style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    border: 'none',
                    color: 'white',
                    fontSize: '18px',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)'
                }}>
                    <i className="fas fa-bell"></i>
                </button>

                {/* User Profile Section */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <img 
                        src="/profile.png" 
                        alt="User Profile" 
                        style={{ 
                            width: '36px', 
                            height: '36px', 
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    <span style={{ 
                        color: 'white',
                        fontWeight: '500',
                        fontSize: '14px',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                    }}>
                        John Doe
                    </span>
                    <i className="fas fa-chevron-down" style={{ 
                        color: 'white',
                        fontSize: '12px',
                        marginLeft: '4px'
                    }}></i>
                </div>
            </div>
        </nav>
    )
}

export default Navigation 