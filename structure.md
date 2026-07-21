                    ┌────────────────────────┐
                    │        Users           │
                    │------------------------│
                    │ Admin                  │
                    │ Teacher 
                      Student               │
                    └───────────┬────────────┘
                                │
                           HTTPS Requests
                                │
                                ▼
          ┌────────────────────────────────────┐
          │ Frontend (HTML + Tailwind + JS)    │
          │------------------------------------│
          │ Login                              │
          │ Dashboard                          │
          │ Student Management                 │
          │ Faculty Management                 │
          │ Attendance Management              │
          │ Reports                            │
          └─────────────────┬──────────────────┘
                            │
                        Fetch API
                            │
                            ▼
        ┌──────────────────────────────────────┐
        │ Backend (Python FastAPI)             │
        │--------------------------------------│
        │ Authentication                       │
        │ Student APIs                         │
        │ Faculty APIs                         │
        │ Course APIs                          │
        │ Attendance APIs                      │
        │ Reports APIs                         │
        └─────────────────┬────────────────────┘
                          │
                    Supabase SDK
                          │
                          ▼
        ┌──────────────────────────────────────┐
        │ Supabase PostgreSQL Database         │
        └──────────────────────────────────────┘

        frontend/
│
├── index.html
├── login.html
├── dashboard.html
├── students.html
├── faculty.html
├── attendance.html
├── reports.html
│
├── css/
│   ├── style.css
│   └── output.css
│
├── js/
│   ├── auth.js
│   ├── students.js
│   ├── faculty.js
│   ├── attendance.js
│   ├── reports.js
│   └── api.js
│
├── assets/
│
└── images/
<!-- Backend -->

backend/
│
├── app/
│   │
│   ├── config/
│   │     database.py
│   │     settings.py
│   │
│   ├── routes/
│   │     auth.py
│   │     students.py
│   │     faculty.py
│   │     attendance.py
│   │     reports.py
│   │
│   ├── controllers/
│   │
│   ├── services/
│   │
│   ├── repositories/
│   │
│   ├── models/
│   │
│   ├── schemas/
│   │
│   ├── middleware/
│   │
│   ├── utils/
│   │
│   └── main.py
│
├── requirements.txt
└── .env

<!-- Modules -->
Authentication
│
├── Login
├── Logout
└── JWT Authentication

↓

Student Management
│
├── Add Student
├── Edit Student
├── Delete Student
├── Search Student
└── View Student

↓

Faculty Management
│
├── Add Faculty
├── Edit Faculty
├── Delete Faculty
└── Assign Subjects

↓

Course & Subject Management
│
├── Course CRUD
├── Subject CRUD
└── Division Management

↓

Attendance Management
│
├── Mark Attendance
├── Edit Attendance
├── Attendance History
└── Attendance Percentage

↓

Reports
│
├── Daily Report
├── Monthly Report
└── Export PDF/Excel

<!-- Database flow -->
Frontend

↓

FastAPI

↓

Business Logic

↓

Supabase SDK

↓

PostgreSQL Database

↓

Response

↓

Frontend


<!-- Authentication Flow -->
User

↓

Login Page

↓

POST /login

↓

FastAPI

↓

Verify Credentials

↓

Generate JWT

↓

Return Token

↓

Protected Dashboard

<!-- Attendance Flow -->

Teacher

↓

Select Course

↓

Select Division

↓

Select Subject

↓

Mark Attendance

↓

Validation

↓

Save in Supabase

↓

Attendance Report

<!-- Database Architecture -->

Users
│
├── Admin
└── Teacher
    Student

Students
│
├── Department
├── Course
├── Division
└── Attendance

Faculty
│
└── Subjects

Courses
│
└── Subjects

Attendance
│
├── Student
├── Subject
├── Date
└── Status

<!-- API Structure -->
/api

/auth
    POST /login
    POST /logout

/students
    GET
    POST
    PUT
    DELETE

/faculty
    GET
    POST
    PUT
    DELETE

/courses
    GET
    POST
    PUT
    DELETE

/subjects
    GET
    POST
    PUT
    DELETE

/attendance
    POST /mark
    PUT /update
    GET /history

/reports
    GET /daily
    GET /monthly
    GET /student

       
 <!-- Security -->
JWT Authentication
Password Hashing (bcrypt)
Role-Based Access Control (Admin, Teacher)
Input Validation (Pydantic)
Parameterized SQL Queries
Environment Variables for Secrets
CORS Configuration