import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { makeStyles } from "@mui/styles"; // Import makeStyles from @mui/styles
import { Phone, Message, LocationOn, Mail } from "@mui/icons-material"; // MUI Icons

// Define styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    paddingTop: "8rem",
    paddingBottom: "8rem",
  },
  container: {
    maxWidth: "lg",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  iconButton: {
    backgroundColor: "#e3f2fd",
    marginBottom: "1rem",
  },
  formBox: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  textField: {
    marginBottom: "1rem",
  },
  button: {
    padding: "1rem",
    backgroundColor: "#1976d2",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  cardActions: {
    marginTop: "auto",
    padding: "1rem",
  },
}));

const ContactForm = () => {
  const classes = useStyles(); // Use the styles defined in makeStyles

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSnackbar({
        open: true,
        message: "Message sent successfully!",
        severity: "success",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to send message. Please try again.",
        severity: "error",
      });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactCards = [
    {
      icon: <Phone />,
      title: "Sales",
      description: "Contact our sales team",
      action: "Call Sales",
    },
    {
      icon: <Message />,
      title: "Support",
      description: "Get help from our support",
      action: "Contact Support",
    },
    {
      icon: <LocationOn />,
      title: "Visit Us",
      description: "Find our office location",
      action: "Get Directions",
    },
    {
      icon: <Mail />,
      title: "Email",
      description: "Send us an email",
      action: "Email Us",
    },
  ];

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          style={{ fontWeight: "bold", marginBottom: "2rem" }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          style={{ marginBottom: "4rem" }}
        >
          We'd love to hear from you. Please fill out this form or reach out
          using one of the methods below.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              className={classes.formBox}
            >
              <Typography variant="h5" style={{ marginBottom: "1.5rem" }}>
                Send us a message
              </Typography>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
                className={classes.textField}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                className={classes.textField}
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                className={classes.textField}
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                margin="normal"
                required
                className={classes.textField}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                className={classes.button}
              >
                {loading ? <CircularProgress size={24} /> : "Send Message"}
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {contactCards.map((card, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card className={classes.card}>
                    <CardContent>
                      <IconButton className={classes.iconButton}>
                        {card.icon}
                      </IconButton>
                      <Typography variant="h6" gutterBottom>
                        {card.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {card.description}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      <Button variant="outlined" fullWidth>
                        {card.action}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          style={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;
