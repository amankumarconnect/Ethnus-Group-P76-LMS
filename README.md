# ETHNUS MERN Learning Management System (LMS)
BY AMAN KUMAR [23BCE10302], ISHAN PARDHI [23BCE10597], SAKSHAM KUMAR SINGH [23BCE10374], PRIYAN BHATIA [23BCE11682]

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
* [.gitignore](./.gitignore)
* [README.md](./README.md)
* [client/](./client/)
  * [README.md](./client/README.md)
  * [eslint.config.js](./client/eslint.config.js)
  * [index.html](./client/index.html)
  * [package-lock.json](./client/package-lock.json)
  * [package.json](./client/package.json)
  * [vite.config.js](./client/vite.config.js)
  * [public/](./client/public/)
    * [favicon.svg](./client/public/favicon.svg)
  * [src/](./client/src/)
    * [App.css](./client/src/App.css)
    * [App.jsx](./client/src/App.jsx)
    * [index.css](./client/src/index.css)
    * [main.jsx](./client/src/main.jsx)
    * [assets/](./client/src/assets/)
      * [.gitkeep](./client/src/assets/.gitkeep)
    * [components/](./client/src/components/)
      * [.gitkeep](./client/src/components/.gitkeep)
      * [CourseCard.jsx](./client/src/components/CourseCard.jsx)
      * [Header.jsx](./client/src/components/Header.jsx)
      * [Navbar.jsx](./client/src/components/Navbar.jsx)
      * [ProtectedRoute.jsx](./client/src/components/ProtectedRoute.jsx)
      * [VideoModal.jsx](./client/src/components/VideoModal.jsx)
    * [context/](./client/src/context/)
      * [.gitkeep](./client/src/context/.gitkeep)
      * [AuthContext.jsx](./client/src/context/AuthContext.jsx)
      * [CourseContext.jsx](./client/src/context/CourseContext.jsx)
    * [hooks/](./client/src/hooks/)
      * [.gitkeep](./client/src/hooks/.gitkeep)
      * [useAuth.js](./client/src/hooks/useAuth.js)
    * [pages/](./client/src/pages/)
      * [.gitkeep](./client/src/pages/.gitkeep)
      * [CourseDetail.jsx](./client/src/pages/CourseDetail.jsx)
      * [CoursePage.jsx](./client/src/pages/CoursePage.jsx)
      * [Courses.jsx](./client/src/pages/Courses.jsx)
      * [CreateCourse.jsx](./client/src/pages/CreateCourse.jsx)
      * [CreateCoursePage.jsx](./client/src/pages/CreateCoursePage.jsx)
      * [Dashboard.jsx](./client/src/pages/Dashboard.jsx)
      * [Home.jsx](./client/src/pages/Home.jsx)
      * [HomePage.jsx](./client/src/pages/HomePage.jsx)
      * [InstructorDashboardPage.jsx](./client/src/pages/InstructorDashboardPage.jsx)
      * [Login.jsx](./client/src/pages/Login.jsx)
      * [LoginPage.jsx](./client/src/pages/LoginPage.jsx)
      * [MyCoursesPage.jsx](./client/src/pages/MyCoursesPage.jsx)
      * [PaymentSuccessPage.jsx](./client/src/pages/PaymentSuccessPage.jsx)
      * [Register.jsx](./client/src/pages/Register.jsx)
      * [RegisterPage.jsx](./client/src/pages/RegisterPage.jsx)
    * [utils/](./client/src/utils/)
      * [.gitkeep](./client/src/utils/.gitkeep)
      * [api.js](./client/src/utils/api.js)
* [server/](./server/)
  * [.env.example](./server/.env.example)
  * [package-lock.json](./server/package-lock.json)
  * [package.json](./server/package.json)
  * [server.js](./server/server.js)
  * [config/](./server/config/)
    * [db.js](./server/config/db.js)
  * [controllers/](./server/controllers/)
    * [authController.js](./server/controllers/authController.js)
    * [courseController.js](./server/controllers/courseController.js)
    * [paymentController.js](./server/controllers/paymentController.js)
    * [userController.js](./server/controllers/userController.js)
  * [middleware/](./server/middleware/)
    * [authMiddleware.js](./server/middleware/authMiddleware.js)
    * [errorMiddleware.js](./server/middleware/errorMiddleware.js)
    * [uploadMiddleware.js](./server/middleware/uploadMiddleware.js)
  * [models/](./server/models/)
    * [courseModel.js](./server/models/courseModel.js)
    * [userModel.js](./server/models/userModel.js)
  * [routes/](./server/routes/)
    * [authRoutes.js](./server/routes/authRoutes.js)
    * [courseRoutes.js](./server/routes/courseRoutes.js)
    * [paymentRoutes.js](./server/routes/paymentRoutes.js)
    * [userRoutes.js](./server/routes/userRoutes.js)
  * [uploads/](./server/uploads/)
    * [.gitkeep](./server/uploads/.gitkeep)
    * [image-1751798234467.jpg](./server/uploads/image-1751798234467.jpg)
    * [image-1751803429479.jpeg](./server/uploads/image-1751803429479.jpeg)
    * [image-1751804914339.jpg](./server/uploads/image-1751804914339.jpg)
    * [image-1751807139103.jpg](./server/uploads/image-1751807139103.jpg)
    * [image-1751808436844.jpg](./server/uploads/image-1751808436844.jpg)
  * [utils/](./server/utils/)
    * [.gitkeep](./server/utils/.gitkeep)
    * [generateToken.js](./server/utils/generateToken.js)



## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)
- A [Stripe](https://stripe.com/) account for API keys.
