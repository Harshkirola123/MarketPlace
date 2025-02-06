import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignUpMutation } from "../store/reducer/authApiSlicer";
import { useAppDispatch } from "../store/store";
import { loginSuccess } from "../store/reducer/authSlicer";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

interface SignUpFormInputs {
  name: string;
  email: string;
  role: string;
  password: string;
}
const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});
const MotionPaper = motion(Paper);
const MotionTextField = motion(TextField);
const MotionButton = motion(Button);

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: async (data) => {
      return await schema
        .validate(data, { abortEarly: false })
        .then(() => ({ values: data, errors: {} }))
        .catch((err) => ({
          values: {},
          errors: err.inner.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.path]: curr.message,
            }),
            {}
          ),
        }));
    },
  });
  const [signUp, { isLoading }] = useSignUpMutation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  // const roles = [
  //   { value: "CUSTOMER", label: "Customer" },
  //   { value: "ADMIN", label: "Admin" },
  // ];

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const response = await signUp(data).unwrap();
      console.log(response);
      dispatch(
        loginSuccess({
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );

      toast.success("Successfully registered!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err: any) {
      const errorMessage = err.data?.message || "Failed to register";
      setError(err.data?.message);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            color="primary"
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 3 }}
          >
            {t("signUp.title")}
          </Typography>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MotionTextField
                variants={itemVariants}
                fullWidth
                label={t("signUp.fullName")}
                {...register("name", { required: t("signUp.nameRequired") })}
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <MotionTextField
                variants={itemVariants}
                fullWidth
                label={t("signUp.email")}
                {...register("email", {
                  required: t("signUp.emailRequired"),
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: t("signUp.invalidEmail"),
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <MotionTextField
                variants={itemVariants}
                fullWidth
                type={showPassword ? "text" : "password"}
                label={t("signUp.password")}
                {...register("password", {
                  required: t("signUp.passwordRequired"),
                  minLength: {
                    value: 6,
                    message: t("signUp.passwordMinLength"),
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                disabled={isLoading}
              />
            </Grid>

            <AnimatePresence>
              {error && (
                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert severity="error">{error}</Alert>
                  </motion.div>
                </Grid>
              )}
            </AnimatePresence>

            <Grid item xs={12}>
              <MotionButton
                variants={itemVariants}
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
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                }}
              >
                {isLoading ? t("signUp.signingUp") : t("signUp.signUpButton")}
              </MotionButton>
            </Grid>
          </Grid>
        </form>

        <motion.div
          variants={itemVariants}
          style={{ marginTop: 16, textAlign: "center" }}
        >
          <Typography variant="body2">
            {t("signUp.loginLink")}
            <Button
              color="primary"
              onClick={() => navigate("/signin")}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              {t("signUp.login")}
            </Button>
          </Typography>
        </motion.div>
      </MotionPaper>
    </Box>
  );
};

export default SignUp;
