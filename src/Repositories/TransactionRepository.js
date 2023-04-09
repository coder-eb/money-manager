import { Realm } from "@realm/react";
import { Transaction } from "../Models/Transaction";
import { findOne, insertRecord, updateRecord } from "../common/database";
import { performValidation } from "../common/helpers";

export const getTransaction = (dbCon, _id) => {
    if (!_id) return {};
    return findOne(dbCon, new Realm.BSON.ObjectID(_id), Transaction);
};

export const upsertTransaction = (dbCon, record, action) => {
    const errorMsg = performValidation(record, Transaction);
    if (errorMsg) return errorMsg;
    record["_id"] = action == "update" ? new Realm.BSON.ObjectID(record["_id"]) : record["_id"];
    const operation = action == "update" ? updateRecord : insertRecord;
    operation(dbCon, record, "Transaction");
};
