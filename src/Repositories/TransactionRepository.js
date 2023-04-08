const Model = "Transaction";

export const createTransaction = ( realm, record) => {
    const { name, amount, descr, date, type } = record;
    realm.write(() => {
        realm.create(Model, { _id: new Realm.BSON.UUID(), name, amount, descr, date, type });
    });
};