import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useResetPasswordMutation } from "../store/reducer/authApiSlicer";

interface ResetPasswordInputs {
  newPassword: string;
  confirmPassword: string;
}

const MotionPaper = motion(Paper);
const MotionButton = motion(Button);

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>();
  const location = useLocation();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [error, setError] = useState<string | null>(null);

  // Extract token from URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token");
    }
  }, [token]);

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    if (!token) {
      setError("Token is missing");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError(null);
      console.log(data.newPassword);
      await resetPassword({ token, password: data.newPassword }).unwrap();
      toast.success("Password reset successfully!", { autoClose: 3000 });

      // Redirect to login after a short delay
      setTimeout(() => navigate("/signin"), 3000);
    } catch (err: any) {
      setError(err?.data?.message || "Failed to reset password");
      toast.error(err?.data?.message || "Failed to reset password", {
        autoClose: 4000,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <MotionPaper
          elevation={10}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 4,
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            color="primary"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Reset Password
          </Typography>

          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <TextField
              fullWidth
              type="password"
              label="New Password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              sx={{ mb: 2 }}
            />

            <MotionButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              sx={{
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 2,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                mt: 2,
              }}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </MotionButton>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Remember your password?{" "}
              <Button
                color="primary"
                onClick={() => navigate("/signin")}
                sx={{ textTransform: "none", fontWeight: "bold" }}
              >
                Sign In
              </Button>
            </Typography>
          </form>
        </MotionPaper>
        <ToastContainer />
      </Box>
    </Container>
  );
};

export default ResetPassword;
