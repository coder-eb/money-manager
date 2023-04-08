import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import AddTransaction from "../Screens/AddTransaction";

export default function HomeStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AddTransaction"
                component={AddTransaction}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
