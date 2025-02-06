import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreateTransactionMutation } from "../store/reducer/paymentSlicer";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/store";
import { selectCurrentuser } from "../store/reducer/authSlicer";
import { useGetUserProjectsQuery } from "../store/reducer/projectApiSlicer";

const Payment = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [paymentStatus, setPaymentStatus] = React.useState("");
  const [paymentLink, setPaymentLink] = React.useState("");

  const buyerId = useAppSelector(selectCurrentuser)?._id;

  // Fetch project details using RTK Query
  const {
    data: project,
    isLoading: isLoadingProject,
    isError: isErrorProject,
  } = useGetUserProjectsQuery(projectId || "");
  console.log(project);

  // Memoizing the amount for the project
  const amount = React.useMemo(
    () => project?.data.project.price || 0,
    [project]
  );

  // Commission is assumed to be 20% for now
  const commissionRate = 0.2;
  const totalPayment = React.useMemo(
    () => amount + amount * commissionRate,
    [amount]
  );

  // Memoizing the payment link after the transaction is created
  const memoPaymentLink = React.useMemo(() => paymentLink, [paymentLink]);

  // Mutation hook to create a transaction
  const [
    createTransaction,
    { isLoading: isCreatingTransaction, isError: isErrorTransaction },
  ] = useCreateTransactionMutation();

  const onSubmit = async (data) => {
    if (!buyerId) {
      toast.error("You must be logged in to make a payment");
      return;
    }

    const transactionData = {
      projectId,
      buyerId,
      amount: totalPayment, // Use memoized amount
      commission: amount * commissionRate,
      status: "successful",
    };

    try {
      const response = await createTransaction(transactionData).unwrap();
      setPaymentStatus("Payment Successful");
      setPaymentLink(response.zipDownloadLink); // Store the payment link returned by the API

      toast.success("Payment successful! You can now download the project");
      navigate("/");
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error(error.data.message);
    }
  };

  if (isLoadingProject) {
    return (
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    );
  }

  if (isErrorProject || !project) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5">Project not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Complete Payment
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">{project.title}</Typography>
        <Typography variant="body1">Price: ${amount}</Typography>
        {/* Display memoized amount */}
        <Typography variant="body1">
          Commission (20%): ${amount * commissionRate}
        </Typography>
        <Typography variant="body1">
          Total Payment: ${totalPayment.toFixed(2)}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Commission (%)"
          variant="outlined"
          margin="normal"
          value={commissionRate * 100} // Assuming 20% commission is fixed
          disabled
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={isCreatingTransaction} // Disable button while transaction is being created
        >
          {isCreatingTransaction ? "Processing Payment..." : "Make Payment"}
        </Button>
      </form>

      {paymentStatus && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">{paymentStatus}</Typography>
          {memoPaymentLink && (
            <Button
              variant="contained"
              color="secondary"
              href={memoPaymentLink}
              target="_blank"
              sx={{ mt: 2 }}
            >
              Download Project (ZIP)
            </Button>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Payment;
