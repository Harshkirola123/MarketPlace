import { apiSlice } from "../../service/apiSlicer";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST /transactions - Create a new transaction
    createTransaction: builder.mutation({
      query: (transactionData) => ({
        url: "/payment",
        method: "POST",
        body: transactionData,
      }),
    }),

    // GET /transactions - Get all transactions
    getAllTransactions: builder.query({
      query: () => ({
        url: "/transactions",
        method: "GET",
      }),
    }),

    // GET /transactions/:id - Get a transaction by ID
    getTransactionById: builder.query({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "GET",
      }),
    }),

    // PATCH /transactions/:id - Update transaction status
    updateTransactionStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/transactions/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),

    // DELETE /transactions/:id - Delete a transaction
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useGetAllTransactionsQuery,
  useGetTransactionByIdQuery,
  useUpdateTransactionStatusMutation,
  useDeleteTransactionMutation,
} = paymentApiSlice;
