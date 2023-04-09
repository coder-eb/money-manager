import { Transaction } from "../Models/Transaction"
import { findOne } from "../common/database"

export const getTransaction = ( dbCon, _id ) => {
    if (!_id) return {}
    return findOne( dbCon, new Realm.BSON.ObjectID(_id), Transaction);
}