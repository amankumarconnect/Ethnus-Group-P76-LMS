# MERN Stack Learning Management System (LMS)

This is a full-featured Learning Management System (LMS) built from the ground up using the MERN stack (MongoDB, Express.js, React, Node.js). The platform allows instructors to create, manage, and sell courses, and students to enroll and consume course content.

## Table of Contents

- [Live Demo](#live-demo)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Contributors](#contributors)
- [License](#license)

## Live Demo

[[Link to your deployed application]](https://ethnus-group-p76-lms.onrender.com/)

## Key Features

- *Role-Based Access Control:* Separate interfaces and permissions for *Students* and *Instructors*.
- *User Authentication:* Secure user registration and login system with JWT (JSON Web Tokens) and password hashing.
- *Course Management:* Instructors can create courses, set a price, upload a thumbnail image, and add/edit lessons.
- *Lesson Management:* Lessons include a title, content description, and an embedded YouTube video player.
- *Stripe Payment Gateway:* Secure payment processing using Stripe Checkout for course enrollments.
- *Student Dashboard:* A "My Courses" page for students to easily access all their enrolled courses.
- *Instructor Dashboard:* A dashboard for instructors to view their created courses, total earnings, and a list of enrolled students.

## Tech Stack

### Backend
- *Node.js:* JavaScript runtime environment.
- *Express.js:* Web framework for Node.js.
- *MongoDB:* NoSQL database for storing user and course data.
- *Mongoose:* Object Data Modeling (ODM) library for MongoDB.
- *JSON Web Token (JWT):* For secure user authentication.
- *Bcrypt.js:* For hashing user passwords.
- *Stripe:* For handling payments.
- *Multer:* Middleware for handling multipart/form-data (file uploads).
- *Dotenv:* For managing environment variables.

### Frontend
- *React:* JavaScript library for building user interfaces.
- *React Router:* For client-side routing and navigation.
- *React Context API:* For global state management (user authentication).
- *Axios:* For making HTTP requests to the backend API.
- *Vite:* Next-generation frontend tooling for a fast development experience.
- *Stripe.js / React Stripe.js:* For integrating with the Stripe payment gateway.

## Project Structure

The project is organized into two main directories: client for the frontend React application and server for the backend Express.js application.


Ethnus-Group-P76-LMS/
├── .gitignore
├── client/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   └── favicon.svg
│   ├── README.md
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets/
│   │   │   └── .gitkeep
│   │   ├── components/
│   │   │   ├── .gitkeep
│   │   │   ├── CourseCard.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── VideoModal.jsx
│   │   ├── context/
│   │   │   ├── .gitkeep
│   │   │   ├── AuthContext.jsx
│   │   │   └── CourseContext.jsx
│   │   ├── hooks/
│   │   │   ├── .gitkeep
│   │   │   └── useAuth.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── .gitkeep
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── CoursePage.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── CreateCourse.jsx
│   │   │   ├── CreateCoursePage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── InstructorDashboardPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── MyCoursesPage.jsx
│   │   │   ├── PaymentSuccessPage.jsx
│   │   │   ├── Register.jsx
│   │   │   └── RegisterPage.jsx
│   │   └── utils/
│   │       ├── .gitkeep
│   │       └── api.js
│   └── vite.config.js
├── README.md
└── server/
    ├── .env.example
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── courseController.js
    │   ├── paymentController.js
    │   └── userController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   ├── errorMiddleware.js
    │   └── uploadMiddleware.js
    ├── models/
    │   ├── courseModel.js
    │   └── userModel.js
    ├── package-lock.json
    ├── package.json
    ├── routes/
    │   ├── authRoutes.js
    │   ├── courseRoutes.js
    │   ├── paymentRoutes.js
    │   └── userRoutes.js
    ├── server.js
    ├── uploads/
    │   ├── .gitkeep
    │   ├── image-1751798234467.jpg
    │   ├── image-1751803429479.jpeg
    │   ├── image-1751804914339.jpg
    │   ├── image-1751807139103.jpg
    │   └── image-1751808436844.jpg
    └── utils/
        ├── .gitkeep
        └── generateToken.js



## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)
- A [Stripe](https://stripe.com/) account for API keys.
