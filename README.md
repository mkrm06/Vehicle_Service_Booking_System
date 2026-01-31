Perfect 👍 — here is a **professional GitHub README.md** for your project.
You can copy this and paste into a file named **README.md** in your project root.

---

# 🚗 Vehicle Service Booking System (MERN Stack)

A full-stack **Vehicle Service Booking System** built using the MERN stack that allows customers to book vehicle service appointments online and enables administrators to manage, approve, and track bookings efficiently.

---

## 📌 Features

### 👤 Customer

* Book vehicle service appointments
* Select service type, date, and time
* Receive booking confirmation
* View booking status (Pending / Approved / Completed / Rejected)

### 🛠 Admin

* Secure admin login (JWT Authentication)
* View all bookings
* Filter bookings by date and status
* Update booking status
* Delete bookings
* Manage service categories (add services)

---

## 🧰 Tech Stack

### Frontend

* React (Vite)
* CSS Modules
* Axios
* React Router DOM
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* BcryptJS

---

## 📂 Project Structure

```
vehicle-service-booking-system/
 ├── backend/
 │   ├── controllers/
 │   ├── routes/
 │   ├── models/
 │   ├── middleware/
 │   ├── config/
 │   ├── server.js
 │   └── .env
 │
 └── frontend/
     ├── src/
     │   ├── pages/
     │   ├── components/
     │   ├── context/
     │   ├── api/
     │   └── styles/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/vehicle-service-booking-system.git
cd vehicle-service-booking-system
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file inside backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend server:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔐 Create Admin Account (One Time)

Use Postman or Thunder Client:

```
POST http://localhost:5000/api/auth/seed-admin
```

Body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

---

## 🔑 Admin Login API

```
POST /api/auth/login
```

---

## 📡 API Endpoints

### Auth

* POST `/api/auth/login`
* POST `/api/auth/seed-admin`

### Bookings

* POST `/api/bookings`
* GET `/api/bookings`
* PUT `/api/bookings/:id/status`
* DELETE `/api/bookings/:id`

### Services

* GET `/api/services`
* POST `/api/services`

---

## 🧪 Testing

* Use Postman to test APIs
* Test customer booking flow
* Test admin login and dashboard

---

## 🚀 Future Enhancements

* Email / SMS notifications
* Payment gateway integration
* User registration & login
* Booking history for customers
* Reports & analytics charts

---

## 📸 Screenshots

(Add screenshots of Home, Booking Page, Admin Login, Dashboard)

---

## 👨‍💻 Author

Mohamed Mukarram
Software Engineering Student

---

## 📄 License

This project is developed for academic purposes.


