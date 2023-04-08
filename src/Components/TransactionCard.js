import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { format } from "date-fns";
import { formatAmount } from "../common/helpers";
import { globalStyle } from "../common/theme";

const TransactionCard = ({ record }) => {
    const { name, amount, descr, type, date } = record;

    return (
        <View style={styles.transactionContainer}>
            <View style={styles.transactionIconContainer}>
                <Icon name="home" size={24} style={styles.transactionIcon} />
            </View>
            <View style={styles.transactionDetailsContainer}>
                <Text style={styles.transactionName}>{name}</Text>
                <View style={styles.transactionInfoContainer}>
                    <Text style={styles.transactionInfo}>{format(date, "dd E")}</Text>
                    <Text style={styles.transactionInfo}> • </Text>
                    <Text style={styles.transactionInfo}>{format(date, "hh:mm a")}</Text>
                </View>
            </View>
            <View style={styles.transactionAmountContainer}>
                <Text style={[styles.transactionAmount, type == "credit" ? styles.credit : styles.debit]}>{formatAmount(amount, type)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    transactionContainer: {
        backgroundColor: globalStyle.secondaryBgColor,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-around",
        marginBottom: 10,
        // height: "16%"
    },
    transactionIconContainer: {
        // backgroundColor: "white",
        width: "10%",
    },
    transactionIcon: {
        color: "#e4e2e6",
    },
    transactionDetailsContainer: {
        // backgroundColor: "red",
        paddingHorizontal: 10,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "68%",
    },
    transactionName: {
        fontSize: 16,
        marginBottom: 5,
        color: "#ffffff",
    },
    transactionInfoContainer: {
        // backgroundColor: "blue",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    transactionInfo: {
        fontSize: 14,
        color: "#c4c5c8",
    },
    transactionAmountContainer: {
        width: "26%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        // backgroundColor: "black",
    },
    transactionAmount: {
        // backgroundColor:"brown",

        fontSize: 18,
    },
    credit: {
        color: globalStyle.green,
    },
    debit: {
        color: globalStyle.red,
    },
});

export default TransactionCard;
