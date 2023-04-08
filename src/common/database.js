export const findAll = ( dbCon, Model ) => {
    let results = dbCon(Model);
    return results;
}