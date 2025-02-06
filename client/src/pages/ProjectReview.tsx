import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Rating,
} from "@mui/material";
import { useGetFeedbackByProjectQuery } from "../store/reducer/feedbackSlicer";

const ProjectReviews = () => {
  const { projectId } = useParams();
  const id = projectId || "";
  const {
    data: reviewsData,
    isLoading,
    isError,
  } = useGetFeedbackByProjectQuery(id);
  console.log(reviewsData);
  if (isLoading)
    return (
      <Typography variant="h6" align="center">
        Loading reviews...
      </Typography>
    );
  if (isError)
    return (
      <Typography variant="h6" color="error" align="center">
        Error loading reviews
      </Typography>
    );

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Ratings & Reviews for Project
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {reviewsData?.data?.length > 0 ? (
        reviewsData.data.map((review) => (
          <Paper key={review._id} sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              <strong>User: </strong>
              {review.userId.name || "Anonymous"}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating
                value={review.rating}
                readOnly
                precision={0.5}
                size="large"
                sx={{ mr: 2 }}
              />
              <Typography variant="body1" color="text.secondary">
                {review.rating} / 5
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              <strong>Review:</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              {review.feedback}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant="h6" align="center" color="text.secondary">
          No reviews yet. Be the first to leave a review!
        </Typography>
      )}
    </Container>
  );
};

export default ProjectReviews;
