const express = require("express");
const { routeProtector } = require("./../controllers/authController");
const {
  getAllTransactions,
  createTransaction,
  getTransactionByid,
  updateTransaction,
  deleteTransaction,
  getSummaryOfTransaction,
} = require("./../controllers/transactionController");
const router = express.Router();

router.route("/summary").get(routeProtector, getSummaryOfTransaction);

router
  .route("/")
  .get(routeProtector, getAllTransactions)
  .post(routeProtector, createTransaction);

router
  .route("/:id")
  .get(routeProtector, getTransactionByid)
  .post(routeProtector, updateTransaction)
  .delete(routeProtector, deleteTransaction);

module.exports = router;
