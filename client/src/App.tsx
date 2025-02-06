import React from "react";
import { Routes, Route } from "react-router-dom";
import Basic from "./layout/Basic";
import ErrorBoundary from "./components/ErrorBoundary";
import ContentUploadPage from "./pages/CodeDetail";
import ProjectShowcase from "./pages/ProjectShow";
import Dashboard from "./components/DashBoard";
import PaymentPage from "./components/Payment";
import ProjectDetail from "./pages/ProjectDetailPage";
import ProjectReviews from "./pages/ProjectReview";
import Payment from "./pages/Payment";

const SignUp = React.lazy(() => import("./pages/signUp"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const ForgotPassword = React.lazy(() => import("./components/ForgetPassword"));
const ResetPassword = React.lazy(() => import("./components/ResetPassword"));
const Profile = React.lazy(() => import("./pages/ProfilePage"));
const Home = React.lazy(() => import("./pages/Home"));
const ContactForm = React.lazy(() => import("./pages/Contact"));
const PrivateRoute = React.lazy(() => import("./routes/PrivateRoute"));
const PublicRoute = React.lazy(() => import("./routes/PublicRoute"));

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Basic />}>
          <Route element={<PublicRoute restricted={false} />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/show" element={<ProjectShowcase />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route
              path="/project-reviews/:projectId"
              element={<ProjectReviews />}
            />
          </Route>
          <Route element={<PublicRoute restricted={true} />}>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<ContentUploadPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment/:id" element={<Payment />} />
          </Route>
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
