import { openDatabase } from "react-native-sqlite-storage";

const db_con = openDatabase({ name: "storage.db" });

export const ExecuteQuery = (sql, params = []) =>
    new Promise((resolve, reject) => {
        db_con.transaction((trans) => {
            trans.executeSql(
                sql,
                params,
                (trans, results) => {
                    resolve(results);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    });
