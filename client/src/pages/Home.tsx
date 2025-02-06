import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroSection = styled(Box)({
  background:
    "linear-gradient(135deg,rgb(133, 166, 227) 10%,rgb(64, 95, 149) 90%)",
  padding: "100px 0",
  color: "#ffffff",
  textAlign: "center",
  animation: `${fadeIn} 1s ease-in-out`,
});

const MotionButton = styled(motion.button)({
  border: "none",
  padding: "10px 20px",
  fontSize: "18px",
  cursor: "pointer",
  borderRadius: "8px",
  transition: "all 0.3s ease",
});

const CodeMarketplace = () => {
  const navigate = useNavigate();

  const featuredCode = [
    {
      title: "React E-commerce Template",
      category: "Web Development",
      price: "$49.99",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    },
    {
      title: "Flutter Social App",
      category: "Mobile Development",
      price: "$39.99",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    },
    {
      title: "Python ML Algorithm",
      category: "Machine Learning",
      price: "$79.99",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    },
  ];

  return (
    <Box>
      <HeroSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h1" gutterBottom>
              Discover Quality Code
            </Typography>
            <Typography variant="h5" gutterBottom>
              The marketplace for developers, by developers
            </Typography>
          </motion.div>
          <Box mt={4}>
            <MotionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: "#2196F3",
                color: "white",
                marginRight: "10px",
              }}
              onClick={() => navigate("/show")}
            >
              Browse Code
            </MotionButton>
            <MotionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: "#ffffff",
                color: "#2196F3",
                border: "2px solid #2196F3",
              }}
              onClick={() => navigate("/upload")}
            >
              Upload Your Code
            </MotionButton>
          </Box>
        </Container>
      </HeroSection>

      <Container sx={{ mt: 8 }}>
        <TextField
          fullWidth
          placeholder="Search for code..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 4 }}
        />

        <Typography variant="h4" gutterBottom>
          Featured Code
        </Typography>
        <Grid container spacing={4}>
          {featuredCode.map((code, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={code.image}
                    alt={code.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{code.title}</Typography>
                    <Typography color="textSecondary">
                      {code.category}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {code.price}
                    </Typography>
                    <Typography>Rating: {code.rating}/5.0</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CodeMarketplace;
