import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  CreditCard as CreditCardIcon,
  Apple as AppleIcon,
  Google as GoogleIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CreditCard as PayPalIcon,
} from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: "2rem auto",
  padding: "2rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
}));

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardType: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "email":
        newErrors.email = !/^\S+@\S+\.\S+$/.test(value)
          ? "Invalid email format"
          : "";
        break;
      case "cardNumber":
        newErrors.cardNumber = !/^\d{16}$/.test(value.replace(/\s/g, ""))
          ? "Invalid card number"
          : "";
        break;
      case "cvv":
        newErrors.cvv = !/^\d{3,4}$/.test(value) ? "Invalid CVV" : "";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowSuccess(true);
    } catch {
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      sx={{
        py: 4,
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        minHeight: "100vh",
      }}
    >
      <FormControlLabel
        control={
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        }
        label="Dark Mode"
        sx={{ float: "right" }}
      />
      <StyledCard>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Secure Payment
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Payment Details
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Card Type</InputLabel>
                <Select
                  value={formData.cardType}
                  name="cardType"
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="visa">
                    <CreditCardIcon sx={{ mr: 1 }} /> Visa
                  </MenuItem>
                  <MenuItem value="mastercard">
                    <CreditCardIcon sx={{ mr: 1 }} /> Mastercard
                  </MenuItem>
                  <MenuItem value="amex">
                    <CreditCardIcon sx={{ mr: 1 }} /> American Express
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                type="month"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                type={showCVV ? "text" : "password"}
                value={formData.cvv}
                onChange={handleInputChange}
                error={!!errors.cvv}
                helperText={errors.cvv}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowCVV(!showCVV)}>
                        {showCVV ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  fullWidth
                >
                  {loading ? <CircularProgress size={24} /> : "Pay Now"}
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                <PayPalIcon sx={{ fontSize: 32 }} />
                <AppleIcon sx={{ fontSize: 32 }} />
                <GoogleIcon sx={{ fontSize: 32 }} />
              </Box>
            </Grid>
          </Grid>
        </form>
      </StyledCard>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Payment processed successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error" onClose={() => setShowError(false)}>
          Payment failed. Please try again.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PaymentPage;
