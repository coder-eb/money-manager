import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SyncedRealmContext } from "./src/RealmConfig";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./src/Stacks/HomeStack";

export default function App() {
    const { RealmProvider } = SyncedRealmContext;

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <RealmProvider>
                    <HomeStack />
                </RealmProvider>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
