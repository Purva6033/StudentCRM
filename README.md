# 🎓 Student Admission CRM System

A full-stack **Student Admission CRM (Customer Relationship Management) System** developed using **Spring Boot**, **React**, **MySQL**, and **JWT Authentication**. The application streamlines the student admission process by managing inquiries, leads, admissions, counselors, follow-ups, reports, and user authentication through a secure role-based system.

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT Authentication
- Secure Login & Registration
- Role-Based Access Control (Admin, Counselor, Student)
- Password Change & Reset
- Protected Routes

### 👨‍🎓 Student Management
- Add Student
- Update Student
- Delete Student
- View Student Details
- Student Dashboard
- Student Profile Management

### 📋 Lead Management
- Add New Leads
- Update Lead Information
- Delete Leads
- Lead Status Tracking
- Import Leads using CSV

### 🎯 Admission Management
- Student Admission Processing
- Admission Status Tracking
- Admission Reports

### 📚 Course Management
- Add Courses
- Update Course Details
- Delete Courses
- View Available Courses

### 📞 Follow-Up Management
- Schedule Follow-Ups
- Update Follow-Up Status
- Track Pending Follow-Ups

### ☎️ Call Record Management
- Record Student Calls
- Maintain Call History
- Call Status Tracking

### 📊 Dashboard & Analytics
- Admin Dashboard
- Counselor Dashboard
- Student Dashboard
- Monthly Admission Statistics
- Lead Status Reports
- Course-wise Reports
- Counselor Performance Analysis

### 📝 Activity Logs
- Track User Activities
- System Activity History
- Audit Logs

### 📈 Reports
- Monthly Admission Report
- Lead Status Report
- Course Performance Report
- Counselor Performance Report

---

# 🛠️ Technology Stack

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- Maven
- JWT Authentication
- REST APIs

## Frontend

- React
- Vite
- Axios
- React Router
- CSS3
- JavaScript (ES6)

## Database

- MySQL

## Tools & Technologies

- Git
- GitHub
- Eclipse IDE
- VS Code
- Postman
- Maven

---

# 📂 Project Structure

```
StudentCRM
│
├── student-crm-backend
│   ├── src
│   ├── pom.xml
│   └── ...
│
├── student-crm-frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🗄️ Database Modules

- Users
- Students
- Leads
- Admissions
- Courses
- Follow-Ups
- Call Records
- Activity Logs

---

# 👥 User Roles

## 👨‍💼 Admin

- Manage Users
- Manage Students
- Manage Courses
- Manage Leads
- View Reports
- Dashboard Analytics
- Monitor Activity Logs

---

## 👩‍🏫 Counselor

- Manage Assigned Leads
- Schedule Follow-Ups
- Record Calls
- View Dashboard
- Manage Admissions

---

## 👨‍🎓 Student

- Login
- View Dashboard
- Edit Profile
- Change Password
- View Admission Details

---

# 🔑 Authentication

The application uses **JWT (JSON Web Token)** for secure authentication and authorization.

Features include:

- Secure Login
- Token-based Authentication
- Protected APIs
- Role-based Authorization

---

# 📊 Dashboard Features

### Admin Dashboard

- Total Students
- Total Leads
- Total Admissions
- Total Courses
- Monthly Admission Chart
- Lead Status Chart
- Counselor Performance

### Counselor Dashboard

- Assigned Leads
- Today's Follow-Ups
- Pending Calls
- Admissions Completed
- Performance Statistics

### Student Dashboard

- Profile Information
- Admission Status
- Course Details

---

# 🔗 REST APIs

Some major API modules:

- Authentication APIs
- User APIs
- Student APIs
- Lead APIs
- Course APIs
- Admission APIs
- Follow-Up APIs
- Call Record APIs
- Dashboard APIs
- Report APIs

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Purva6033/StudentCRM.git
```

---

## Backend Setup

```bash
cd student-crm-backend
```

Update the database configuration in:

```
src/main/resources/application.properties
```

Run the project:

```bash
mvn spring-boot:run
```

---

## Frontend Setup

```bash
cd student-crm-frontend
```

Install dependencies:

```bash
npm install
```

Run React application:

```bash
npm run dev
```

---

# 💾 Database Configuration

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_crm
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
```

---

# 📸 Screenshots

> Add screenshots of:

- Login Page
- Dashboard
- Student Management
- Lead Management
- Admission Module
- Reports
- Counselor Dashboard

---

# 🌟 Future Enhancements

- Email Notifications
- SMS Notifications
- Document Upload
- Payment Integration
- Attendance Module
- Mobile Application
- AI-based Lead Prediction
- Export Reports (PDF/Excel)
- Multi-language Support

---

# 📚 Learning Outcomes

This project helped in understanding:

- Spring Boot Development
- REST API Design
- JWT Authentication
- React Frontend Development
- Axios Integration
- MySQL Database Design
- CRUD Operations
- Role-Based Authorization
- Dashboard Development
- Git & GitHub Workflow

---

# 🤝 Contributing

Contributions are welcome!

Feel free to fork the repository, raise issues, or submit pull requests.

---

# 👩‍💻 Developer

**Purva Pawar**

B.Tech Computer Science Engineering

GitHub: https://github.com/Purva6033

LinkedIn: *(Add your LinkedIn profile here)*

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It motivates and encourages further development.
