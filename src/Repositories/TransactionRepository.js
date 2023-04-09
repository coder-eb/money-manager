import { endOfDay, endOfMonth, endOfWeek, endOfYear, startOfDay, startOfMonth, startOfWeek, startOfYear } from "date-fns";
import { Transaction } from "../Models/Transaction";
import { findOne, insertRecord, updateRecord } from "../common/database";
import { performValidation } from "../common/helpers";

export const getTransaction = (dbCon, _id) => {
    if (!_id) return {};
    return findOne(dbCon, _id, Transaction);
};

export const upsertTransaction = (dbCon, record, action) => {
    const errorMsg = performValidation(record, Transaction);
    if (errorMsg) return errorMsg;
    const operation = action == "update" ? updateRecord : insertRecord;
    operation(dbCon, record, "Transaction");
};

export const getTotalBalance = (transactions) => {
    let balance = 0;
    for (const transaction of transactions) {
        const amount = transaction.amount;
        const type = transaction.type;
        balance = type == "credit" ? balance + amount : balance - amount;
    }
    return balance;
};

export const getTotCreditNDebit = (transactions) => {
    let totCredit = 0;
    let totDebit = 0;
    for (const transaction of transactions) {
        const amount = transaction.amount;
        const type = transaction.type;
        totCredit = type == "credit" ? totCredit + amount : totCredit + 0;
        totDebit = type == "debit" ? totDebit + amount : totDebit + 0;
    }
    return [totCredit, totDebit];
};

export const getFilteredTransactions = (filterType, transactions) => {
    if (filterType == "all_time") return transactions;

    const now = new Date();
    switch (filterType) {
        case "today":
            fromDate = startOfDay(now);
            toDate = endOfDay(now);
            break;
        case "this_week":
            fromDate = startOfWeek(now);
            toDate = endOfWeek(now);
            break;
        case "this_month":
            fromDate = startOfMonth(now);
            toDate = endOfMonth(now);
            break;
        case "this_year":
            fromDate = startOfYear(now);
            toDate = endOfYear(now);
            break;
    }

    return transactions.filtered("date >= $0 AND date <= $1", fromDate, toDate);
};
