import React,{ useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const AddBooking = () => {
    const [unit, setUnit] = useState('')
    const [roomNumber, setRoomNumber] = useState('')
    const [roomCapacity, setRoomCapacity] = useState('')
    const [meetingDate, setMeetingDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [participantCount, setParticipantCount] = useState('')
    const [consumptionType, setConsumptionType] = useState('')
    const [consumptionAmount, setConsumptionAmount] = useState('')
    const navigate = useNavigate()

    const units = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales', 'Legal', 'Engineering', 'Training', 'Admin', 'Security']
    const rooms = [
        { number: 'R001', name: 'Ruang Prambanan', capacity: 10 },
        { number: 'R002', name: 'Ruang Borobudur', capacity: 15 },
        { number: 'R003', name: 'Ruang Merapi', capacity: 8 },
        { number: 'R004', name: 'Ruang Merbabu', capacity: 20 },
        { number: 'R005', name: 'Ruang Lawu', capacity: 12 }
    ]
    const timeSlots = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30', '18:00'
    ]
    const consumptionTypes = [
        { value: 'snack_siang', label: 'Snack Siang' },
        { value: 'makan_siang', label: 'Makan Siang' },
        { value: 'snack_sore', label: 'Snack Sore' }
    ]

    const handleRoomChange = (selectedRoom) => {
        const room = rooms.find(r => r.number === selectedRoom)
        if (room) {
            setRoomNumber(selectedRoom)
            setRoomCapacity(room.capacity.toString())
        }
    }

    const saveBooking = async (e) => {
        e.preventDefault()
        
        if (!unit || !roomNumber || !meetingDate || !startTime || !endTime || !participantCount || !consumptionType || !consumptionAmount) {
            alert('Semua field wajib diisi!')
            return
        }

        // Validation
        if (parseInt(participantCount) > parseInt(roomCapacity)) {
            alert('Jumlah peserta tidak boleh melebihi kapasitas ruangan!')
            return
        }

        if (startTime >= endTime) {
            alert('Waktu selesai harus setelah waktu mulai!')
            return
        }

        try{
            await axios.post('/api/meeting-bookings', {
                unit,
                roomNumber,
                roomCapacity: parseInt(roomCapacity),
                meetingDate,
                startTime: startTime + ':00',
                endTime: endTime + ':00',
                participantCount: parseInt(participantCount),
                consumptionType,
                consumptionAmount: parseInt(consumptionAmount)
            });
            navigate('/')
        }catch(error){
            console.error('Error Message: ', error.message)
            alert('Booking gagal dibuat!')
        }
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
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            {/* Breadcrumb */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginBottom: '24px',
                fontSize: '14px',
                color: '#6b7280'
            }}>
                <span>Ruang Meeting</span>
                <span>›</span>
                <span style={{ color: '#374151', fontWeight: '500' }}>Pesan Ruangan</span>
            </div>

            {/* Header */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                marginBottom: '32px'
            }}>
                <button style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#4A8394',
                    border: 'none',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}>
                    <i className="fas fa-arrow-left" style={{ color: 'white' }}></i>
                </button>
                <h1 style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    margin: 0,
                    color: '#1f2937'
                }}>
                    Ruang Meeting
                </h1>
            </div>

            <form onSubmit={saveBooking}>
                {/* Section 1: Informasi Ruang Meeting */}
                <div style={{ marginBottom: '32px' }}>
                    <h2 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        margin: '0 0 20px 0',
                        color: '#374151'
                    }}>
                        Informasi Ruang Meeting
                    </h2>
                    
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {/* Unit */}
                        <div>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151'
                            }}>
                                Unit
                            </label>
                            <select 
                                value={unit} 
                                onChange={(e) => setUnit(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    backgroundColor: 'white'
                                }}
                                required
                            >
                                <option value="">Pilih Unit</option>
                                {units.map(unitOption => (
                                    <option key={unitOption} value={unitOption}>{unitOption}</option>
                                ))}
                            </select>
                        </div>

                        {/* Room Selection */}
                        <div>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151'
                            }}>
                                Pilihan Ruangan Meeting
                            </label>
                            <select 
                                value={roomNumber} 
                                onChange={(e) => handleRoomChange(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    backgroundColor: 'white'
                                }}
                                required
                            >
                                <option value="">Pilih Ruangan Meeting</option>
                                {rooms.map(room => (
                                    <option key={room.number} value={room.number}>
                                        {room.name} ({room.number})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Room Capacity */}
                        <div>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151'
                            }}>
                                Kapasitas Ruangan
                            </label>
                            <input 
                                type="text" 
                                value={roomCapacity ? `${roomCapacity} Orang` : ''}
                                readOnly
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    backgroundColor: '#f9fafb',
                                    color: '#6b7280'
                                }}
                                placeholder="Kapasitas Ruangan"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 2: Informasi Rapat */}
                <div style={{ marginBottom: '32px' }}>
                    <h2 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        margin: '0 0 20px 0',
                        color: '#374151'
                    }}>
                        Informasi Rapat
                    </h2>
                    
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {/* Meeting Date */}
                        <div>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151'
                            }}>
                                Tanggal Rapat <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type="date" 
                                    value={meetingDate}
                                    onChange={(e) => setMeetingDate(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        paddingLeft: '40px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        backgroundColor: 'white'
                                    }}
                                    required
                                />
                                <i className="fas fa-calendar" style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#6b7280'
                                }}></i>
                            </div>
                        </div>

                        {/* Time Selection */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#374151'
                                }}>
                                    Pilihan Waktu Mulai
                                </label>
                                <select 
                                    value={startTime} 
                                    onChange={(e) => setStartTime(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        backgroundColor: 'white'
                                    }}
                                    required
                                >
                                    <option value="">Pilih Waktu Mulai</option>
                                    {timeSlots.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#374151'
                                }}>
                                    Waktu Selesai
                                </label>
                                <select 
                                    value={endTime} 
                                    onChange={(e) => setEndTime(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        backgroundColor: 'white'
                                    }}
                                    required
                                >
                                    <option value="">Pilih Waktu Selesai</option>
                                    {timeSlots.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Participant Count */}
                        <div>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151'
                            }}>
                                Jumlah Peserta
                            </label>
                            <input 
                                type="number" 
                                value={participantCount}
                                onChange={(e) => setParticipantCount(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    backgroundColor: 'white'
                                }}
                                placeholder="Masukan Jumlah Peserta"
                                min="1"
                                max={roomCapacity}
                                required
                            />
                        </div>

                        {/* Consumption Type */}
                        <div>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151'
                            }}>
                                Jenis Konsumsi
                            </label>
                            <select 
                                value={consumptionType} 
                                onChange={(e) => setConsumptionType(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    backgroundColor: 'white'
                                }}
                                required
                            >
                                <option value="">Pilih Jenis Konsumsi</option>
                                {consumptionTypes.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Consumption Amount */}
                        <div>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151'
                            }}>
                                Nominal Konsumsi
                            </label>
                            <div style={{ position: 'relative' }}>
                                <button 
                                    type="button"
                                    style={{
                                        position: 'absolute',
                                        left: '1px',
                                        top: '1px',
                                        bottom: '1px',
                                        width: '40px',
                                        backgroundColor: '#6b7280',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px 0 0 8px',
                                        fontSize: '12px',
                                        fontWeight: '500'
                                    }}
                                >
                                    Rp
                                </button>
                                <input 
                                    type="number" 
                                    value={consumptionAmount}
                                    onChange={(e) => setConsumptionAmount(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        paddingLeft: '50px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        backgroundColor: 'white'
                                    }}
                                    placeholder="Masukan nominal konsumsi"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: '12px',
                    paddingTop: '20px',
                    borderTop: '1px solid #e5e7eb'
                }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <button 
                            type="button"
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#fef2f2',
                                color: '#dc2626',
                                border: '1px solid #fecaca',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            Batal
                        </button>
                    </Link>
                    <button 
                        type="submit"
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#4A8394',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddBooking