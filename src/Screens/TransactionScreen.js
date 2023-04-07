import React, { useState } from "react";
import { View, Button, TextInput } from "react-native"
import { Transaction } from "../Models/Transaction";
import { SyncedRealmContext } from "../RealmConfig";
import { format } from 'date-fns'

export default function Home () {
    
    const { useRealm, useQuery } = SyncedRealmContext;
    const realm = useRealm();

    const [transactionName, setTransactionName] = useState('KFC');

    const handleAddTransaction = () => {
        realm.write(() => {
            realm.create('Transaction', { _id: new Realm.BSON.UUID(), name: transactionName, amount: 100, time: new Date(), type: 'credit'})
        });
    };
    
    let results = useQuery(Transaction);

    results = results.filtered('amount > 10')
    // results = results.filtered('time = $0', date)
    const startDate = new Date('2022-04-13');
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    console.log(startDate)
    console.log(endDate)
    // results = results.filtered('time >= $0 AND time < $1', startDate, endDate);

    console.log("result");
    console.log(results);
    
    return (
        <View>
            <TextInput onChangeText={setTransactionName} value={transactionName} />
            <Button
                onPress={() => handleAddTransaction()}
                title='Add Transaction'
            />
        </View>
    )
}