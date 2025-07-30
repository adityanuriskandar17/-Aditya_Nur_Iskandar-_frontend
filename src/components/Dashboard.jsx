import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const [bookings, setBookings] = useState([])
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalAmount: 0,
        todayBookings: 0,
        unitStats: {}
    })

    useEffect(() => {
        getBookings()
    }, [])

    const getBookings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/meeting-bookings')
            const allBookings = response.data
            setBookings(allBookings)
            calculateStats(allBookings)
        } catch (error) {
            console.error('Error fetching bookings:', error.message)
        }
    }

    const calculateStats = (bookings) => {
        const today = new Date().toISOString().split('T')[0]
        const todayBookings = bookings.filter(booking => booking.meetingDate === today)
        
        // Fix: Ensure consumptionAmount is a valid number
        const totalAmount = bookings.reduce((sum, booking) => {
            const amount = parseInt(booking.consumptionAmount) || 0
            return sum + amount
        }, 0)
        
        const unitStats = bookings.reduce((acc, booking) => {
            if (!acc[booking.unit]) {
                acc[booking.unit] = { count: 0, amount: 0 }
            }
            acc[booking.unit].count++
            const amount = parseInt(booking.consumptionAmount) || 0
            acc[booking.unit].amount += amount
            return acc
        }, {})

        setStats({
            totalBookings: bookings.length,
            totalAmount,
            todayBookings: todayBookings.length,
            unitStats
        })
    }

    const formatCurrency = (amount) => {
        // Fix: Handle NaN and invalid amounts
        if (!amount || isNaN(amount)) {
            return 'Rp 0'
        }
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount)
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID')
    }

    const getUpcomingBookings = () => {
        const today = new Date().toISOString().split('T')[0]
        return bookings
            .filter(booking => booking.meetingDate >= today)
            .sort((a, b) => new Date(a.meetingDate) - new Date(b.meetingDate))
            .slice(0, 5)
    }

    return (
        <div style={{ 
            marginLeft: '60px', 
            padding: '20px',
            backgroundColor: '#f9fafb',
            minHeight: 'calc(100vh - 64px)'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '32px'
                }}>
                    <h1 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        margin: 0,
                        color: '#1f2937'
                    }}>
                        Dashboard
                    </h1>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link to="/bookings" style={{ textDecoration: 'none' }}>
                            <button style={{
                                backgroundColor: '#4A8394',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '10px 16px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}>
                                Lihat Semua Booking
                            </button>
                        </Link>
                        <Link to="/add" style={{ textDecoration: 'none' }}>
                            <button style={{
                                backgroundColor: '#4A8394',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '10px 16px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}>
                                Booking Baru
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '32px'
                }}>
                    <div style={{
                        backgroundColor: '#eff6ff',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #dbeafe'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                backgroundColor: '#3b82f6',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                            <div>
                                <h3 style={{ 
                                    fontSize: '28px', 
                                    fontWeight: 'bold', 
                                    margin: 0,
                                    color: '#1e40af'
                                }}>
                                    {stats.totalBookings}
                                </h3>
                                <p style={{ 
                                    fontSize: '14px', 
                                    color: '#6b7280', 
                                    margin: 0 
                                }}>
                                    Total Booking
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: '#f0fdf4',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #bbf7d0'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                backgroundColor: '#10b981',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <i className="fas fa-money-bill-wave"></i>
                            </div>
                            <div>
                                <h3 style={{ 
                                    fontSize: '20px', 
                                    fontWeight: 'bold', 
                                    margin: 0,
                                    color: '#059669'
                                }}>
                                    {formatCurrency(stats.totalAmount)}
                                </h3>
                                <p style={{ 
                                    fontSize: '14px', 
                                    color: '#6b7280', 
                                    margin: 0 
                                }}>
                                    Total Konsumsi
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: '#fef3c7',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #fde68a'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                backgroundColor: '#f59e0b',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <i className="fas fa-clock"></i>
                            </div>
                            <div>
                                <h3 style={{ 
                                    fontSize: '28px', 
                                    fontWeight: 'bold', 
                                    margin: 0,
                                    color: '#d97706'
                                }}>
                                    {stats.todayBookings}
                                </h3>
                                <p style={{ 
                                    fontSize: '14px', 
                                    color: '#6b7280', 
                                    margin: 0 
                                }}>
                                    Booking Hari Ini
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: '#fef2f2',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #fecaca'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                backgroundColor: '#ef4444',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <i className="fas fa-users"></i>
                            </div>
                            <div>
                                <h3 style={{ 
                                    fontSize: '28px', 
                                    fontWeight: 'bold', 
                                    margin: 0,
                                    color: '#dc2626'
                                }}>
                                    {Object.keys(stats.unitStats).length}
                                </h3>
                                <p style={{ 
                                    fontSize: '14px', 
                                    color: '#6b7280', 
                                    margin: 0 
                                }}>
                                    Unit Aktif
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px'
                }}>
                    {/* Unit Statistics */}
                    <div style={{
                        backgroundColor: '#f9fafb',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <h3 style={{ 
                            fontSize: '18px', 
                            fontWeight: '600', 
                            margin: '0 0 16px 0',
                            color: '#374151'
                        }}>
                            Statistik Unit
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {Object.entries(stats.unitStats).map(([unit, data]) => (
                                <div key={unit} style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    padding: '12px',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <span style={{
                                        backgroundColor: '#dbeafe',
                                        color: '#1e40af',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '500'
                                    }}>
                                        {unit}
                                    </span>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <span style={{
                                            backgroundColor: '#f3f4f6',
                                            color: '#374151',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '12px'
                                        }}>
                                            {data.count} booking
                                        </span>
                                        <span style={{
                                            backgroundColor: '#f0fdf4',
                                            color: '#059669',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '12px'
                                        }}>
                                            {formatCurrency(data.amount)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Bookings */}
                    <div style={{
                        backgroundColor: '#f9fafb',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <h3 style={{ 
                            fontSize: '18px', 
                            fontWeight: '600', 
                            margin: '0 0 16px 0',
                            color: '#374151'
                        }}>
                            Booking Mendatang
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {getUpcomingBookings().map((booking) => (
                                <div key={booking.id} style={{
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <div style={{ 
                                                fontWeight: '600', 
                                                color: '#374151',
                                                marginBottom: '4px'
                                            }}>
                                                {booking.unit} - {booking.roomNumber}
                                            </div>
                                            <div style={{ 
                                                fontSize: '12px', 
                                                color: '#6b7280' 
                                            }}>
                                                {formatDate(booking.meetingDate)} | {booking.startTime.substring(0, 5)} - {booking.endTime.substring(0, 5)}
                                            </div>
                                        </div>
                                        <Link to={`/edit/${booking.id}`} style={{ textDecoration: 'none' }}>
                                            <button style={{
                                                backgroundColor: '#4A8394',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '4px 8px',
                                                fontSize: '12px',
                                                cursor: 'pointer'
                                            }}>
                                                Edit
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            {getUpcomingBookings().length === 0 && (
                                <div style={{ 
                                    textAlign: 'center', 
                                    color: '#9ca3af',
                                    padding: '20px'
                                }}>
                                    Tidak ada booking mendatang
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard 