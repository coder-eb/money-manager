import 'react-native-get-random-values'
import Realm from "realm";

export class Transaction extends Realm.Object {
    static schema = {
        name: "Transaction",
        properties: {
            _id: "objectId",
            name: "string",
            descr: "string?",
            amount: "float",
            type: "string",
            date: "date",
        },
        primaryKey: "_id",
    };
}
