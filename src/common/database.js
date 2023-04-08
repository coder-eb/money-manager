export const findAll = ( dbCon, Model ) => {
    let results = dbCon(Model);
    return results;
}

export const insertRecord = ( dbCon, record, Model) => {
    dbCon.write(() => {
        dbCon.create(Model, record);
    });
};