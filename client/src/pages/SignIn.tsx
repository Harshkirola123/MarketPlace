import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as PasswordIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserLoginMutation } from "../store/reducer/authApiSlicer";
import { useAppDispatch } from "../store/store";
import { loginSuccess } from "../store/reducer/authSlicer";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface SignInFormInputs {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const MotionPaper = motion(Paper);
const MotionButton = motion(Button);

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(schema),
  });
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    try {
      const response = await userLogin(data).unwrap();
      const { user, accessToken, refreshToken } = response.data;
      dispatch(loginSuccess({ user, accessToken, refreshToken }));
      toast.success(t("signIn.loginSuccess"), { autoClose: 3000 });

      setTimeout(() => navigate("/"), 1000);
    } catch (err: any) {
      const errorMessage =
        err?.message || err?.data?.message || t("signIn.loginFailed");
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
          {t("signIn.title")}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label={t("signIn.email")}
            {...register("email", {
              required: t("signIn.emailRequired"),
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: t("signIn.invalidEmail"),
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

          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label={t("signIn.password")}
            {...register("password", {
              required: t("signIn.passwordRequired"),
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

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
            {isLoading ? t("signIn.signingIn") : t("signIn.signInButton")}
          </MotionButton>

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            {t("signIn.noAccount")}{" "}
            <Button color="primary" onClick={() => navigate("/signup")}>
              {t("signIn.signUp")}
            </Button>
          </Typography>

          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Button
              color="primary"
              onClick={() => navigate("/forgot-password")}
            >
              {t("signIn.forgotPassword")}
            </Button>
          </Box>
        </form>
      </MotionPaper>
    </Box>
  );
};

export default SignIn;
