# 🖥️ User Activity Monitor (UAM)

A **full-stack MERN application** that tracks and manages user activities (login, logout, and session details) in real-time.  
Built with **MongoDB, Express, React, and Node.js**, the project focuses on authentication, activity logging, and secure session management.

---

## 🚀 Features

- 🔑 **Authentication System**
  - User **Register/Login** with JWT authentication
  - Secure password hashing with bcrypt
  - Role-based access control (future scope)

- 🧾 **Activity Logging**
  - Logs every **Login** and **Logout** action
  - Captures **UserID, Username, Action, IP Address, and Timestamp**
  - Stored in MongoDB for auditing

- ⏳ **Session Management**
  - Token expiry handling
  - Stay-logged-in feature (persistent sessions)
  - Auto-logout on token expiration

- 📊 **Activity Dashboard** (Upcoming)
  - View logs in a paginated table
  - Search and filter by user/action/date
  - Export activity reports

---

## 🛠️ Tech Stack

**Frontend**: React.js, Axios, Context API  
**Backend**: Node.js, Express.js  
**Database**: MongoDB (Mongoose ODM)  
**Authentication**: JSON Web Token (JWT), bcrypt  
**Other Tools**: Postman, Git, VS Code  

---

## 📂 Project Structure

uam/
│── backend/
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes (auth, logs, etc.)
│ ├── middleware/ # JWT verification
│ ├── server.js # Main backend entry
│
│── frontend/
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── pages/ # Login, Dashboard, etc.
│ │ ├── context/ # Auth & Activity context
│ │ └── App.js
│
│── .env # Environment variables
│── package.json # Dependencies
│── README.md


---

## ⚡ Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/uam.git
   cd uam
2. Backend Setup

cd backend
npm install
npm run dev


Runs on http://localhost:5000

3. Frontend Setup

cd frontend
npm install
npm start


Runs on http://localhost:3000

4. Environment Variables (create .env in backend/)

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
