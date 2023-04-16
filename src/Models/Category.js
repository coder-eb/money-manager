import "react-native-get-random-values";
import Realm from "realm";

export class Category extends Realm.Object {
    static schema = {
        name: "Category",
        properties: {
            _id: "objectId",
            icon: "string",
            name: "string",
            descr: "string?",
        },
        primaryKey: "_id",
    };

    static validation = {
        name: {
            required: true,
            type: "string",
            errorMsg: "Enter valid name",
        },
    };
}
