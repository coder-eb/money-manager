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
