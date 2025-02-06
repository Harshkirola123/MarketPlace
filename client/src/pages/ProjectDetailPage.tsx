import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Rating,
  CardMedia,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { useGetAllProjectsQuery } from "../store/reducer/projectApiSlicer";
import { useAddNewFeedbackMutation } from "../store/reducer/feedbackSlicer"; // Import the hook for feedback
import { useForm, Controller } from "react-hook-form"; // Import react-hook-form
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; // Import yup for validation
import { toast } from "react-toastify"; // Import toast for notifications
import { useAppSelector } from "../store/store";
import { selectCurrentuser } from "../store/reducer/authSlicer";

// Validation schema with yup
const feedbackSchema = yup.object().shape({
  rating: yup.number().min(1).max(5).required("Rating is required"),
  feedback: yup
    .string()
    .required("Feedback is required")
    .min(10, "Feedback should be at least 10 characters long."),
});

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // React Router navigate hook
  const { data: datta, isLoading, isError } = useGetAllProjectsQuery("");
  const projects = datta?.data.projects || [];

  const project = projects.find((proj) => proj._id === id);

  const [addNewFeedback, { isLoading: isSubmitting }] =
    useAddNewFeedbackMutation(); // Hook to add feedback

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(feedbackSchema), // Hook to integrate yup validation
  });

  const [openDrawer, setOpenDrawer] = useState(false);

  // Assuming you have a function to check if the user is logged in
  const user = useAppSelector(selectCurrentuser);

  const onSubmit = async (data) => {
    if (!user) {
      // If the user is not logged in, show a toast and prevent submission
      toast.error("Please log in to submit feedback.");
      return;
    }

    const { rating, feedback } = data;

    // Prepare the feedback data
    const newFeedback = {
      projectId: project._id,
      rating,
      feedback: feedback,
    };

    try {
      await addNewFeedback(newFeedback); // Submit the feedback
      setValue("feedback", ""); // Reset feedback field
      setValue("rating", 0); // Reset rating
      toast.success("Feedback is saved!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleViewAllReviews = () => {
    navigate(`/project-reviews/${project._id}`); // Navigate to the reviews page for this project
  };

  const handleSaveProject = () => {
    toast.success("Project saved to your collection!");
  };

  const handleBuyProject = () => {
    navigate(`/payment/${project._id}`);
  };

  useEffect(() => {
    if (project) {
      setValue("rating", project?.rating || 0);
    }
  }, [project, setValue]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError || !project)
    return <Typography>Error or Project Not Found</Typography>;

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 600, color: "#333" }}>
          {project.title}
        </Typography>

        {/* Project Details Card */}
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="400"
            image={`http://localhost:5000${project.screenshots[0]}`}
            alt={project.title}
          />
          <CardContent>
            <Typography variant="body1" paragraph>
              {project.description}
            </Typography>
          </CardContent>
        </Card>

        {/* Rating & Feedback Form */}
        <Box sx={{ mt: 4, borderTop: "1px solid #ddd", pt: 3 }}>
          <Typography variant="h6">Rating: </Typography>
          <Controller
            name="rating"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Rating
                name="project-rating"
                value={field.value}
                onChange={(_, newValue) => field.onChange(newValue)}
              />
            )}
          />
          {errors.rating && (
            <Typography color="error" sx={{ mt: 1 }}>
              {errors.rating.message}
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Feedback: </Typography>
          <Controller
            name="feedback"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                error={!!errors.feedback}
                helperText={errors.feedback ? errors.feedback.message : ""}
                sx={{ borderRadius: 1 }}
              />
            )}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, borderRadius: 2 }}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>

        {/* Drawer with actions */}
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 250,
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            },
          }}
        >
          <List>
            <ListItem button onClick={handleSaveProject}>
              <ListItemText primary="Save Project" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleBuyProject}>
              <ListItemText primary="Buy Project" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleViewAllReviews}>
              <ListItemText primary="View Reviews" />
            </ListItem>
          </List>
        </Drawer>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, borderRadius: 2 }}
          onClick={() => setOpenDrawer(true)} // Open the drawer with actions
        >
          More Actions
        </Button>
      </Box>
    </Container>
  );
};

export default ProjectDetail;
