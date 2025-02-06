import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Box,
  Chip,
  Switch,
  FormControlLabel,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  Wallet,
  Code,
  Download,
  Edit,
  Delete,
  Search,
  FilterList,
} from "@mui/icons-material";
import { useGetUserQuery } from "../store/reducer/userApiSlicer"; // assuming you're using RTK Query
import {
  useGetAllUserProjectsQuery,
  useGetUserPurchaseProjectsQuery,
} from "../store/reducer/projectApiSlicer";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
}));

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: uploadedProjects, isLoading: uploadedProjectsLoading } =
    useGetAllUserProjectsQuery("");
  const { data: purchasedProjects, isLoading: purchasedProjectsLoading } =
    useGetUserPurchaseProjectsQuery("");

  // Fetch user info, uploaded projects, and purchased projects using RTK Query (or another method).
  const {
    data: userData,
    isLoading: userInfoLoading,
    isError,
  } = useGetUserQuery("");
  if (userInfoLoading) {
    return <LinearProgress />;
  }

  if (isError || !userData?.data) {
    return <Typography color="error">Error fetching user data</Typography>;
  }
  if (userInfoLoading || uploadedProjectsLoading || purchasedProjectsLoading) {
    return <LinearProgress />;
  }
  const { user } = userData.data;
  const { projects } = uploadedProjects.data;
  const { project } = purchasedProjects.data;
  // console.log(project[0].projectId.sourceCode);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };
  const handleDownload = (fileUrl: string) => {
    // Create an anchor element to trigger the download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop() || ""; // Use the file name from the URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4, backgroundColor: darkMode ? "#121212" : "#f5f5f5" }}
    >
      <Box sx={{ mb: 4, display: "flex", justifyContent: "flex-end" }}>
        <FormControlLabel
          control={
            <Switch checked={darkMode} onChange={handleDarkModeToggle} />
          }
          label="Dark Mode"
        />
      </Box>

      {/* Wallet Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Wallet sx={{ mr: 1 }} />
                <Typography variant="h5">Wallet Balance</Typography>
              </Box>
              <Typography variant="h3" sx={{ mb: 2 }}>
                ${user?.walletBalance?.toLocaleString() || 0}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Button variant="contained" color="primary" fullWidth>
                    Deposit
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" color="primary" fullWidth>
                    Withdraw
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" color="secondary" fullWidth>
                    History
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Uploaded Code Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography
                variant="h5"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Code sx={{ mr: 1 }} /> Uploaded Code
              </Typography>
              <TextField
                size="small"
                placeholder="Search projects..."
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1 }} />,
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Upload Date</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects
                    .filter((project) =>
                      project.title.includes(searchTerm.toLowerCase())
                    )
                    .map((code) => (
                      <TableRow key={code.id}>
                        <TableCell>{code.title}</TableCell>
                        {/* <TableCell>{format(code.createdAt, "PP")}</TableCell> */}
                        <TableCell>{code.description}</TableCell>
                        <TableCell>{code.size}</TableCell>
                        <TableCell>
                          <Chip
                            label={code.status}
                            color={
                              code.status === "Public" ? "success" : "warning"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton size="small">
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="error">
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Purchased Projects Section */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ mb: 3, display: "flex", alignItems: "center" }}
          >
            <Download sx={{ mr: 1 }} /> Purchased Projects
          </Typography>
          <Grid container spacing={3}>
            {project.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <StyledCard>
                  {/* Box with background image */}
                  <Box
                    sx={{
                      height: 180,
                      backgroundImage: `url(http://localhost:5000${project.projectId.screenshots[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {/* Purchased: {format(project.purchaseDate, "PP")} */}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${project.amount}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Download />}
                      fullWidth
                      onClick={() =>
                        handleDownload(project.projectId.sourceCode)
                      }
                    >
                      Download
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
