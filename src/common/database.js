import { Realm } from "@realm/react";

export const findAll = ( dbCon, Model ) => {
    let results = dbCon(Model);
    return results;
}

export const insertRecord = ( dbCon, record, Model) => {
    dbCon.write(() => {
        record['_id'] = new Realm.BSON.ObjectID();
        dbCon.create(Model, record);
    });
};