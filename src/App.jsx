import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import MeetingBookingList from "./components/MeetingBookingList"
import AddBooking from "./components/AddBooking"
import EditBooking from "./components/EditBooking"

function App() {


  return (
    <Router>
      <div>
        <Navigation />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/bookings' element={<MeetingBookingList/>}/>
          <Route path='/add' element={<AddBooking/>}/>
          <Route path='/edit/:id' element={<EditBooking/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
