const AppError = require("../utils/appError");
const Transaction = require("./../models/transaction");
const catchAsync = require("./../utils/catchAsync");

exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const { id } = req;
  const transactions = await Transaction.find({ user: id }).populate("user");
  res.status(200).send({
    status: "Seccess",
    result: transactions.length,
    transactions,
  });
});

exports.createTransaction = catchAsync(async (req, res, next) => {
  const { id } = req;
  const transactionDetails = {
    ...req.body,
    user: id,
  };
  const transaction = await Transaction.create(transactionDetails);
  res.status(200).send({
    status: "Seccess",
    message: "transaction created",
    transaction,
  });
});

exports.getTransactionByid = catchAsync(async (req, res, next) => {
  const { id } = req;
  const transaction = await Transaction.findById({
    _id: req.params.id,
    user: id,
  });
  if (!transaction) {
    return next(new AppError("no transaction found whith that ID", 404));
  }
  res.status(200).send({
    status: "Seccess",
    transaction,
  });
});

exports.updateTransaction = catchAsync(async (req, res, next) => {
  const { id } = req;
  await Transaction.findByIdAndUpdate(
    { _id: req.params.id, user: id },
    req.body,
    {
      new: true,
      runValidators: false,
    }
  );
  res.status(200).send({
    status: "success",
    message: "Transaction Updated successfully",
  });
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
  const { id } = req;
  await Transaction.findByIdAndDelete({ _id: req.params.id, user: id });
  res.status(200).send({
    status: "success",
    message: "Transaction deleted successfully",
  });
});

exports.getSummaryOfTransaction = catchAsync(async (req, res, next) => {
  const { id } = req;
  const transactions = await Transaction.find({ user: id }).populate("user");
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.totalIncome += transaction.amount;
      } else if (transaction.type === "expense") {
        acc.totalExpenses += transaction.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0 }
  );

  summary.balance = summary.totalIncome - summary.totalExpenses;
  res.status(200).send({
    status: "success",
    summary,
  });
});
