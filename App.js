import React, { useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TransactionScreen from "./src/Screens/TransactionScreen";
import { SyncedRealmContext } from "./src/RealmConfig";
import AddTransaction from "./src/Screens/AddTransaction";

export default function App () {
    const { RealmProvider, useRealm, useQuery } = SyncedRealmContext; 

    return (
        <SafeAreaProvider>
            <RealmProvider>
                {/* <TransactionScreen/> */}
                <AddTransaction/>
            </RealmProvider>
        </SafeAreaProvider>
    )
}