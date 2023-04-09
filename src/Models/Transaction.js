import "react-native-get-random-values";
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

    static validation = {
        name: {
            required: true,
            type: "string",
            errorMsg: "Enter valid name",
        },
        descr: {
            required: false,
            type: "string",
            errorMsg: "Enter valid description",
        },
        amount: {
            required: true,
            type: "float",
            errorMsg: "Enter valid amount",
        },
        type: {
            required: true,
            type: "string",
            errorMsg: "Select valid transaction type",
        },
        date: {
            required: true,
            type: "date",
            errorMsg: "Select valid date",
        },
    };
}
