import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CounselorDashboard from "./pages/CounselorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Counselors from "./pages/Counselors";
import Students from "./pages/Students";
import Admissions from "./pages/Admissions";
import Leads from "./pages/Leads";
import Courses from "./pages/Courses";
import StudentEditProfile from "./pages/StudentEditProfile";
import FollowUps from "./pages/FollowUps";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Reports from "./pages/Reports";
import ActivityLogs from "./pages/ActivityLogs";
import Register from "./pages/Register";
import PendingRegistrations from "./pages/PendingRegistrations";
import CallRecords from "./pages/CallRecords";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Counselor Dashboard */}
        <Route
          path="/counselor-dashboard"
          element={
            <ProtectedRoute>
              <CounselorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Modules */}

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          }
        />


        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admissions"
          element={
            <ProtectedRoute>
              <Admissions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/followups"
          element={
            <ProtectedRoute>
              <FollowUps />
            </ProtectedRoute>
          }
        />

        <Route
          path="/counselors"
          element={
            <ProtectedRoute>
              <Counselors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/edit-profile"
          element={
            <ProtectedRoute>
              <StudentEditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <ActivityLogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pending-registrations"
          element={
            <ProtectedRoute>
              <PendingRegistrations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calls"
          element={
            <ProtectedRoute>
              <CallRecords />
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>

  );

}

export default App;