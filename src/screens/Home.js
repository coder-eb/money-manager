import React, { useContext, useState } from "react";
import { View, Text, Button } from "react-native"
import { ExecuteQuery } from "../common/database";

export default function Home () {
    
    const useDb = async() => {
        const result = await ExecuteQuery(`INSERT INTO sms (msg)
                                values ('Hi Ebran Here')`);
        console.log("result")
        console.log(result)
    }


    const createDb = async() => {
        const result = await ExecuteQuery(`CREATE TABLE sms ( msg TEXT NOT NULL);`);
        console.log("result")
        console.log(result)
    }


    return (
        <View>
            <Text>Hi</Text>
            <Button title="Click me" onPress={useDb}/>
            <Button title="Create DB" onPress={createDb}/>
        </View>
    )
}