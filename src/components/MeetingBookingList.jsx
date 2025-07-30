import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const MeetingBookingList = () => {
    const [bookings, setBookings] = useState([])
    const [filterDate, setFilterDate] = useState('')
    const [filterUnit, setFilterUnit] = useState('')
    const [units] = useState(['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales', 'Legal', 'Engineering', 'Training', 'Admin', 'Security'])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(()=>{
        getBookings()
    },[])

    const getBookings = async () => {
        try{
            const response = await axios.get('http://localhost:5000/meeting-bookings');
            setBookings(response.data)
            setTotalPages(Math.ceil(response.data.length / 10))
        }catch(error){
            console.error('Error Message: ',error.message);
            alert('Error fetching data')
        }
    }

    const getBookingsByDate = async (date) => {
        try{
            const response = await axios.get(`http://localhost:5000/meeting-bookings/date/${date}`);
            setBookings(response.data)
        }catch(error){
            console.error('Error Message: ',error.message);
            alert('Error fetching data by date')
        }
    }

    const getBookingsByUnit = async (unit) => {
        try{
            const response = await axios.get(`http://localhost:5000/meeting-bookings/unit/${unit}`);
            setBookings(response.data)
        }catch(error){
            console.error('Error Message: ',error.message);
            alert('Error fetching data by unit')
        }
    }

    const deleteBooking = async (id) => {
        try{
            await axios.delete(`http://localhost:5000/meeting-bookings/${id}`);
            getBookings()
        }catch(error){
            console.error('Error Message: ', error.message);
            alert('Error Delete Data')
        }
    }

    const handleDateFilter = (e) => {
        const date = e.target.value
        setFilterDate(date)
        if(date) {
            getBookingsByDate(date)
        } else {
            getBookings()
        }
    }

    const handleUnitFilter = (e) => {
        const unit = e.target.value
        setFilterUnit(unit)
        if(unit) {
            getBookingsByUnit(unit)
        } else {
            getBookings()
        }
    }

    const clearFilters = () => {
        setFilterDate('')
        setFilterUnit('')
        getBookings()
    }

    const formatTime = (time) => {
        return time.substring(0, 5)
    }

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' }
        return new Date(date).toLocaleDateString('id-ID', options)
    }

    const getConsumptionTypeText = (type) => {
        const types = {
            'snack_siang': 'Snack Siang',
            'snack_sore': 'Snack Sore',
            'makan_siang': 'Makan Siang'
        }
        return types[type] || type
    }

    const getRoomName = (roomNumber) => {
        const roomNames = {
            'R001': 'Ruang Prambanan',
            'R002': 'Ruang Borobudur',
            'R003': 'Ruang Merapi',
            'R004': 'Ruang Merbabu',
            'R005': 'Ruang Lawu'
        }
        return roomNames[roomNumber] || roomNumber
    }

    const getUnitName = (unit) => {
        const unitNames = {
            'IT': 'UNIT IT',
            'HR': 'UNIT SDM',
            'Finance': 'UNIT KEUANGAN',
            'Marketing': 'UNIT MARKETING',
            'Operations': 'UNIT OPERASIONAL',
            'Sales': 'UNIT PENJUALAN',
            'Legal': 'UNIT HUKUM',
            'Engineering': 'UNIT TEKNIK',
            'Training': 'UNIT PELATIHAN',
            'Admin': 'UNIT ADMIN',
            'Security': 'UNIT KEAMANAN'
        }
        return unitNames[unit] || unit
    }

    const paginatedBookings = bookings.slice((currentPage - 1) * 10, currentPage * 10)

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
            {/* Header Section */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#e0f2fe',
                        border: 'none',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}>
                        <i className="fas fa-arrow-left" style={{ color: '#0284c7' }}></i>
                    </button>
                    <div>
                        <h1 style={{ 
                            fontSize: '24px', 
                            fontWeight: 'bold', 
                            margin: 0,
                            color: '#1f2937'
                        }}>
                            Ruang Meeting
                        </h1>
                        <p style={{ 
                            fontSize: '14px', 
                            color: '#6b7280', 
                            margin: 0 
                        }}>
                            Ruang Meeting
                        </p>
                    </div>
                </div>
                
                <Link to="/add" style={{ textDecoration: 'none' }}>
                    <button style={{
                        backgroundColor: '#4A8394',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '14px'
                    }}>
                        <i className="fas fa-plus"></i>
                        Pesan Ruangan
                    </button>
                </Link>
            </div>

            {/* Filters */}
            <div style={{ 
                display: 'flex', 
                gap: '12px', 
                marginBottom: '24px',
                flexWrap: 'wrap'
            }}>
                <input 
                    type="date" 
                    style={{
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                    }}
                    value={filterDate}
                    onChange={handleDateFilter}
                    placeholder="Filter by date"
                />
                <select 
                    style={{
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                    }}
                    value={filterUnit} 
                    onChange={handleUnitFilter}
                >
                    <option value="">Semua Unit</option>
                    {units.map(unit => (
                        <option key={unit} value={unit}>{getUnitName(unit)}</option>
                    ))}
                </select>
                <button 
                    onClick={clearFilters}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    Clear Filters
                </button>
            </div>
            
            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '14px'
                }}>
                    <thead>
                        <tr style={{ 
                            backgroundColor: '#f9fafb',
                            borderBottom: '1px solid #e5e7eb'
                        }}>
                        <th style={{ 
                            padding: '12px', 
                            textAlign: 'left', 
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            fontSize: '12px'
                        }}>UNIT</th>
                        <th style={{ 
                            padding: '12px', 
                            textAlign: 'left', 
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            fontSize: '12px'
                        }}>RUANG MEETING</th>
                        <th style={{ 
                            padding: '12px', 
                            textAlign: 'left', 
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            fontSize: '12px'
                        }}>KAPASITAS</th>
                        <th style={{ 
                            padding: '12px', 
                            textAlign: 'left', 
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            fontSize: '12px'
                        }}>TANGGAL RAPAT</th>
                        <th style={{ 
                            padding: '12px', 
                            textAlign: 'left', 
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            fontSize: '12px'
                        }}>WAKTU</th>
                        <th style={{ 
                            padding: '12px', 
                            textAlign: 'left', 
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            fontSize: '12px'
                        }}>JUMLAH PESERTA</th>
                        <th style={{ 
                            padding: '12px', 
                            textAlign: 'left', 
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            fontSize: '12px'
                        }}>JENIS KONSUMSI</th>
                        <th style={{ 
                            padding: '12px', 
                            textAlign: 'left', 
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            fontSize: '12px'
                        }}>AKSI</th>
                    </tr>
                    </thead>
                    <tbody>
                        {paginatedBookings.map((booking, index)=>(
                            <tr key={booking.id} style={{ 
                                borderBottom: '1px solid #f3f4f6',
                                backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb'
                            }}>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        backgroundColor: '#dbeafe',
                                        color: '#1e40af',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '500'
                                    }}>
                                        {getUnitName(booking.unit)}
                                    </span>
                                </td>
                                <td style={{ padding: '12px', fontWeight: '500' }}>
                                    {getRoomName(booking.roomNumber)}
                                </td>
                                <td style={{ padding: '12px', color: '#6b7280' }}>
                                    {booking.roomCapacity} Orang
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {formatDate(booking.meetingDate)}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {formatTime(booking.startTime)} s/d {formatTime(booking.endTime)}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        backgroundColor: booking.participantCount > booking.roomCapacity ? '#fef2f2' : '#f0fdf4',
                                        color: booking.participantCount > booking.roomCapacity ? '#dc2626' : '#16a34a',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '500'
                                    }}>
                                        {booking.participantCount} Orang
                                    </span>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        backgroundColor: '#fef3c7',
                                        color: '#d97706',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '500'
                                    }}>
                                        {getConsumptionTypeText(booking.consumptionType)}
                                    </span>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Link to={`/edit/${booking.id}`} style={{ textDecoration: 'none' }}>
                                            <button style={{
                                                backgroundColor: '#4A8394',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '6px 12px',
                                                fontSize: '12px',
                                                cursor: 'pointer'
                                            }}>
                                                Edit
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={()=>deleteBooking(booking.id)}
                                            style={{
                                                backgroundColor: '#ef4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '6px 12px',
                                                fontSize: '12px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid #e5e7eb'
            }}>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>
                    Showing {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, bookings.length)} of {bookings.length}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            color: currentPage === 1 ? '#9ca3af' : '#374151'
                        }}
                    >
                        Back
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1
                        return (
                            <button 
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #d1d5db',
                                    backgroundColor: currentPage === pageNum ? '#4A8394' : 'white',
                                    color: currentPage === pageNum ? 'white' : '#374151',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                {pageNum}
                            </button>
                        )
                    })}
                    <button 
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            color: currentPage === totalPages ? '#9ca3af' : '#374151'
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MeetingBookingList