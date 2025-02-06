import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  LinearProgress,
} from "@mui/material";
import {
  Upload as UploadIcon,
  Close as CloseIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddNewProjectMutation } from "../store/reducer/projectApiSlicer";
import { useNavigate } from "react-router-dom";

// Yup schema for validation
const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title exceeds 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(5000, "Description exceeds 500 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price cannot be negative")
    .typeError("Price must be a number"),
  shortDescription: yup
    .string()
    .max(1500, "Short description exceeds 150 characters"),
});

const ContentUploadPage = () => {
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // RTK Query mutation hook
  const [addNewProject, { isLoading, isError, error }] =
    useAddNewProjectMutation();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("shortDescription", data.shortDescription);

    if (zipFile) {
      formData.append("sourceCode", zipFile);
    }

    if (imageFiles) {
      imageFiles.forEach((file) => {
        formData.append("screenshots", file);
      });
    }

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    try {
      // Use RTK Query to send the FormData
      const response = await addNewProject(formData).unwrap();
      toast.success("Content uploaded successfully!");
      navigate("/");
      setZipFile(null);
      setImageFiles(null);
      clearErrors();
    } catch (err) {
      toast.error("Failed to upload content");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Upload Your Project
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <Box mb={2}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Project Title"
                    variant="outlined"
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                    fullWidth
                    required
                  />
                )}
              />
            </Box>

            {/* Description */}
            <Box mb={2}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Project Description"
                    variant="outlined"
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                    fullWidth
                    multiline
                    rows={4}
                    required
                  />
                )}
              />
            </Box>

            {/* Price */}
            <Box mb={2}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    variant="outlined"
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                    required
                  />
                )}
              />
            </Box>

            {/* Short Description */}
            <Box mb={3}>
              <Controller
                name="shortDescription"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Short Description"
                    variant="outlined"
                    error={Boolean(errors.shortDescription)}
                    helperText={errors.shortDescription?.message}
                    fullWidth
                  />
                )}
              />
            </Box>

            {/* Upload ZIP */}
            <Box mb={3}>
              <Button
                variant="contained"
                color="primary"
                component="label"
                fullWidth
                startIcon={<UploadIcon />}
              >
                Upload ZIP
                <input
                  type="file"
                  hidden
                  accept=".zip"
                  onChange={(e) => setZipFile(e.target.files?.[0] || null)}
                />
              </Button>
            </Box>

            {/* Upload Images */}
            <Box mb={3}>
              <Button
                variant="contained"
                color="secondary"
                component="label"
                fullWidth
                startIcon={<UploadIcon />}
              >
                Upload Screenshots
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setImageFiles(Array.from(e.target.files || []))
                  }
                />
              </Button>
            </Box>

            {/* Submit Button */}
            <Box mt={2}>
              {isLoading && <LinearProgress />}
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? "Uploading..." : "Submit Project"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <ToastContainer />
    </Box>
  );
};

export default ContentUploadPage;
