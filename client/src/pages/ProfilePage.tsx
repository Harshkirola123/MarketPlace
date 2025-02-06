import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  Button,
  TextField,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout, selectCurrentuser, update } from "../store/reducer/authSlicer";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../store/reducer/userApiSlicer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@mui/styles";

// Define styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
  },
  paper: {
    width: "100%",
    maxWidth: 500,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    background: "white",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: theme.palette.primary.main,
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  avatarIcon: {
    fontSize: 60,
    color: "white",
  },
  title: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
  },
  cancelButton: {
    color: theme.palette.secondary.main,
  },
}));

const Profile: React.FC = () => {
  const classes = useStyles(); // Use the styles defined in makeStyles

  const user = useAppSelector(selectCurrentuser);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserMutation();
  const { name = "", email = "" } = user || {}; // Fallback if user is undefined

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name, email },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await updateUser(data).unwrap();
      dispatch(update(result.data));
      toast.success(result.data.message, { autoClose: 3000 });
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser("").unwrap();
      toast.success("Profile Deleted", { autoClose: 3000 });
      setOpenDeleteDialog(false); // Close the dialog after successful deletion
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete profile");
    }
  };

  return (
    <Box className={classes.root}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper className={classes.paper}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Avatar className={classes.avatar}>
                <PersonIcon className={classes.avatarIcon} />
              </Avatar>
            </motion.div>
            <Typography variant="h4" className={classes.title}>
              My Profile
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  defaultValue={name}
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={!isEditing}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  defaultValue={email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={!isEditing}
                  className={classes.textField}
                />
              </Grid>
            </Grid>

            <Box className={classes.actionButtons}>
              {isEditing ? (
                <>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    startIcon={
                      loading ? <CircularProgress size={24} /> : <SaveIcon />
                    }
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    className={classes.cancelButton}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <IconButton color="primary" onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
              )}
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
                className={classes.deleteButton}
              >
                Delete Profile
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete your profile? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
