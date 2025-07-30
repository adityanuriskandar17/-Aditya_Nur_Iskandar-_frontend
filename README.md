# Meeting Booking System Frontend

A comprehensive React-based frontend for managing meeting room bookings with consumption tracking.

## Features

### 🏢 **Meeting Booking Management**
- Create, edit, and delete meeting bookings
- Track room capacity and participant count
- Manage different consumption types (snack siang, snack sore, makan siang)
- Monitor consumption amounts in IDR

### 📊 **Dashboard & Analytics**
- Real-time statistics dashboard
- Total bookings and consumption tracking
- Unit-wise booking statistics
- Today's bookings overview
- Upcoming bookings preview

### 🔍 **Advanced Filtering**
- Filter bookings by date
- Filter bookings by unit/department
- Clear filters functionality
- Real-time search results

### 🎨 **Modern UI/UX**
- Responsive design with Bulma CSS framework
- Clean and intuitive interface
- Color-coded status indicators
- Professional navigation system

## API Endpoints Used

The frontend integrates with the following backend API endpoints:

### Core CRUD Operations
- `GET /meeting-bookings` - Get all bookings
- `GET /meeting-bookings/:id` - Get booking by ID
- `POST /meeting-bookings` - Create new booking
- `PUT /meeting-bookings/:id` - Update booking
- `DELETE /meeting-bookings/:id` - Delete booking

### Filtering & Queries
- `GET /meeting-bookings/date/:date` - Get bookings by date
- `GET /meeting-bookings/unit/:unit` - Get bookings by unit

## Data Structure

Each booking contains the following fields:

```javascript
{
  id: number,
  unit: string,              // Department/Unit name
  roomNumber: string,        // Room identifier (e.g., "R001")
  roomCapacity: number,      // Maximum room capacity
  meetingDate: string,       // Date in YYYY-MM-DD format
  startTime: string,         // Time in HH:MM:SS format
  endTime: string,           // Time in HH:MM:SS format
  participantCount: number,  // Number of participants
  consumptionType: string,   // "snack_siang" | "snack_sore" | "makan_siang"
  consumptionAmount: number  // Amount in IDR
}
```

## Supported Units

- IT
- HR
- Finance
- Marketing
- Operations
- Sales
- Legal
- Engineering
- Training
- Admin
- Security

## Consumption Types

- **Snack Siang** - Morning snacks
- **Snack Sore** - Afternoon snacks  
- **Makan Siang** - Lunch meals

## Components

### 📋 **MeetingBookingList**
- Displays all bookings in a table format
- Filtering by date and unit
- Edit and delete actions
- Real-time data updates

### ➕ **AddBooking**
- Form for creating new bookings
- Input validation
- Room capacity checking
- Time validation

### ✏️ **EditBooking**
- Form for updating existing bookings
- Pre-populated with current data
- Same validation as AddBooking

### 📊 **Dashboard**
- Statistics overview
- Unit-wise breakdown
- Upcoming bookings
- Quick navigation

### 🧭 **Navigation**
- Consistent navigation bar
- Active page highlighting
- Quick access to key features

## Validation Rules

- Participant count cannot exceed room capacity
- End time must be after start time
- All required fields must be filled
- Date must be in valid format
- Amount must be a positive number

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Dependencies

- **React** - UI framework
- **React Router** - Navigation and routing
- **Axios** - HTTP client for API calls
- **Bulma** - CSS framework for styling

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

The application is built with modern React practices:

- Functional components with hooks
- Async/await for API calls
- Responsive design principles
- Error handling and user feedback
- Form validation and data sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
