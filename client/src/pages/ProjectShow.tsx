import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/system";
import { Search as SearchIcon } from "@mui/icons-material";
import { useGetAllProjectsQuery } from "../store/reducer/projectApiSlicer";
import { motion } from "framer-motion";

const StyledCard = styled(motion(Card))({
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  borderRadius: "8px",
  boxShadow: 3,
  "&:active": {
    transform: "scale(0.98)",
  },
});

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const ProjectShowcase = () => {
  const { data: datta, isLoading, isError } = useGetAllProjectsQuery("");
  const projects = datta?.data.projects || [];

  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortBy, setSortBy] = React.useState("date");

  const filteredProjects = useMemo(() => {
    return projects
      .filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "date") return new Date(b.date) - new Date(a.date);
        if (sortBy === "name") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [projects, searchTerm, sortBy]);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Project Showcase
      </Typography>

      <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {isError ? (
          <Box sx={{ width: "100%", textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="error">
              Failed to load projects. Please try again later.
            </Typography>
          </Box>
        ) : filteredProjects.length === 0 ? (
          <Box sx={{ width: "100%", textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No projects found. Upload some projects to get started.
            </Typography>
          </Box>
        ) : (
          filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
              <Link
                to={`/project/${project._id}`}
                style={{ textDecoration: "none" }}
              >
                <StyledCard
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:5000${project.screenshots[0]}`}
                    alt={project.title}
                    loading="lazy"
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {truncateText(project.description, 100)}
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {project.technologies?.map((tech) => (
                        <Chip key={tech} label={tech} size="small" />
                      ))}
                    </Box>
                  </CardContent>
                </StyledCard>
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ProjectShowcase;
