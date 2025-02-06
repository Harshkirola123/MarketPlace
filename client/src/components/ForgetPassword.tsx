import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForgotPasswordMutation } from "../store/reducer/authApiSlicer";

interface ForgotPasswordInputs {
  email: string;
}

const MotionPaper = motion(Paper);
const MotionButton = motion(Button);

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    try {
      await forgotPassword(data).unwrap();
      toast.success("Password reset link sent to your email!", {
        autoClose: 3000,
      });

      // Delay navigation to allow the user to see the toast message
      setTimeout(() => navigate("/signin"), 3000);
    } catch (err: any) {
      const errorMessage =
        err?.message || err?.data?.message || "Failed to send reset email";
      setError(errorMessage);
      toast.error(errorMessage, { autoClose: 4000 });
    }
  };

  return (
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
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
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
        }}
      >
        <Typography
          variant="h4"
          color="primary"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 3 }}
        >
          Forgot Password?
        </Typography>

        <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
          Enter your email address and we'll send you a link to reset your
          password.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography
              variant="body2"
              color="error"
              textAlign="center"
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          )}

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
            }}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </MotionButton>

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Remembered your password?{" "}
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
  );
};

export default ForgotPassword;
