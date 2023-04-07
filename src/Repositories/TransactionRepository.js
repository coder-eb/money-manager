const Model = 'Transaction';

export const createTransaction = ({ realm, name, amount, descr, date, type }) => {
    realm.write(() => {
        realm.create(Model, { _id: new Realm.BSON.UUID(), name, amount, descr, date, type })
    });
};