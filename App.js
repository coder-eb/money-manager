import React, { createContext } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TransactionScreen from "./src/Screens/TransactionScreen";
import { SyncedRealmContext } from "./src/RealmConfig";
import AddTransaction from "./src/Screens/AddTransaction";
import Home from "./src/Screens/Home";

export const GlobalStyleContext = createContext(null);

export default function App () {
    const { RealmProvider } = SyncedRealmContext; 
    const globalStyle = {
        containerBgColor: "#1b1b1f",
        primaryBgColor: "#3b4c81",
        secondaryBgColor: "#45464f",
        activeButtonBgColor: "#b4c4ff",
        inactiveButtonBgColor: "#45464f",
        activeButtonTextColor: "#1b2d61",
        inactiveButtonTextColor: "#c4c4ce",
        offwhite: "#eeeeee",
        green: "#66bb6a",
        red: "#ef5350",
    };

    return (
        <SafeAreaProvider>
            <RealmProvider>
                <GlobalStyleContext.Provider value={globalStyle}>
                    {/* <TransactionScreen/> */}
                    {/* <AddTransaction/> */}
                    <Home/>
                </GlobalStyleContext.Provider>
            </RealmProvider>
        </SafeAreaProvider>
    )
}