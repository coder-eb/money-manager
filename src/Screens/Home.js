import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import TransactionCard from "../Components/TransactionCard";
import { formatAmount, titleCase } from "../common/helpers";
import { globalStyle } from "../common/theme";
import { SyncedRealmContext } from "../RealmConfig";
import { findAll } from "../common/database";
import { Transaction } from "../Models/Transaction";
import { getFilteredTransactions, getTotCreditNDebit, getTotalBalance } from "../Repositories/TransactionRepository";

const Home = ({ navigation }) => {
    const [filterType, setFilterType] = useState("this_month");

    const { useQuery } = SyncedRealmContext;

    const allTransactions = findAll(useQuery, Transaction);
    let filteredTransactions = getFilteredTransactions(filterType, allTransactions);
    filteredTransactions = filteredTransactions.sorted("date", true);
    
    const totBalance = getTotalBalance(allTransactions);
    const [totCredit, totDebit] = getTotCreditNDebit(filteredTransactions);    

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainScrollView}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Icon name="account-balance-wallet" size={24} style={styles.appIcon} />
                        <Text style={styles.title}>Money Manager</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.userIconBg}>
                            <Icon name="account-circle" size={24} style={styles.userIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.greeting}>
                    <Text style={styles.name}>Bright</Text>
                    <Text style={styles.welcome}>Welcome back!</Text>
                </View>
                <View style={styles.balanceCard}>
                    <View style={styles.balance}>
                        <Text style={styles.balanceText}>Total Balance</Text>
                        <Text style={styles.balanceAmount}>{formatAmount(totBalance, "balance", false)}</Text>
                    </View>
                    <View style={{justifyContent: "center"}}>
                        <Text>{titleCase(filterType)}</Text>
                    </View>
                    <View style={styles.incomeExpenseSection}>
                        <View style={styles.incomeExpenseContainer}>
                            <View style={styles.incomeExpenseTitle}>
                                <Icon name="arrow-drop-down" size={24} style={styles.incomeIcon} />
                                <Text style={styles.incomeExpenseText}>Income</Text>
                            </View>
                            <Text style={[styles.incomeExpenseAmount, styles.incomeAmount]}>{formatAmount(totCredit, "credit")}</Text>
                        </View>
                        <View style={styles.incomeExpenseContainer}>
                            <View style={styles.incomeExpenseTitle}>
                                <Icon name="arrow-drop-up" size={24} style={styles.expenseIcon} />
                                <Text style={styles.incomeExpenseText}>Expense</Text>
                            </View>
                            <Text style={[styles.incomeExpenseAmount, styles.expenseAmount]}>{formatAmount(totDebit, "debit")}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterButtons}>
                        <TouchableOpacity
                            style={[styles.filterButton, filterType === "today" ? styles.activeFilterButton : styles.inactiveFilterButton]}
                            onPress={() => setFilterType("today")}
                        >
                            <Text style={[styles.filterText, filterType === "today" ? styles.activeFilterText : styles.inactiveFilterText]}>
                                {titleCase("today")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, filterType === "this_week" ? styles.activeFilterButton : styles.inactiveFilterButton]}
                            onPress={() => setFilterType("this_week")}
                        >
                            <Text style={[styles.filterText, filterType === "this_week" ? styles.activeFilterText : styles.inactiveFilterText]}>
                                {titleCase("this_week")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, filterType === "this_month" ? styles.activeFilterButton : styles.inactiveFilterButton]}
                            onPress={() => setFilterType("this_month")}
                        >
                            <Text style={[styles.filterText, filterType === "this_month" ? styles.activeFilterText : styles.inactiveFilterText]}>
                                {titleCase("this_month")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, filterType === "this_year" ? styles.activeFilterButton : styles.inactiveFilterButton]}
                            onPress={() => setFilterType("this_year")}
                        >
                            <Text style={[styles.filterText, filterType === "this_year" ? styles.activeFilterText : styles.inactiveFilterText]}>
                                {titleCase("this_year")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, filterType === "all_time" ? styles.activeFilterButton : styles.inactiveFilterButton]}
                            onPress={() => setFilterType("all_time")}
                        >
                            <Text style={[styles.filterText, filterType === "all_time" ? styles.activeFilterText : styles.inactiveFilterText]}>
                                {titleCase("all_time")}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={styles.transactions}>
                    {filteredTransactions.map((transaction) => (
                        <TouchableOpacity key={transaction._id} onPress={() => navigation.navigate("AddTransaction", { _id: transaction._id.toString() })}>
                            <TransactionCard
                                record={{
                                    name: transaction.name,
                                    date: transaction.date,
                                    amount: transaction.amount,
                                    type: transaction.type,
                                }}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate("AddTransaction", { _id: null })} style={styles.addButton}>
                <Icon name="add" size={32} color="#dbe1ff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainScrollView: {
        flexGrow: 1,
        backgroundColor: globalStyle.containerBgColor,
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerRight: {},
    title: {
        fontSize: 17,
        fontWeight: "bold",
        marginLeft: 10,
        color: globalStyle.offwhite,
    },
    appIcon: {
        color: globalStyle.activeButtonBgColor,
    },
    userIconBg: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: "#414659",
    },
    userIcon: {
        color: "#dde1f9",
    },
    greeting: {
        marginBottom: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: globalStyle.offwhite,
    },
    welcome: {
        fontSize: 12,
        color: "#b7b7b8",
    },
    balanceCard: {
        backgroundColor: globalStyle.primaryBgColor,
        borderRadius: 15,
        // elevation: 5,
        // shadowColor: 'white',
        padding: 15,
        marginBottom: 20,
    },
    balance: {
        marginBottom: 20,
    },
    balanceText: {
        fontSize: 14,
        color: "#bec5e8",
    },
    balanceAmount: {
        fontSize: 35,
        fontWeight: "bold",
        marginTop: 5,
        color: "#dbe1ff",
    },
    incomeExpenseSection: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    incomeExpenseContainer: {
        // backgroundColor: "black",
    },
    incomeExpenseTitle: {
        flexDirection: "row",
        alignItems: "center",
    },
    incomeExpenseText: {
        fontSize: 12,
        color: "#bec5e8",
    },
    incomeIcon: {
        color: globalStyle.green,
    },
    expenseIcon: {
        color: globalStyle.red,
    },
    incomeExpenseAmount: {
        fontSize: 20,
        paddingHorizontal: 10,
        color: "#dbe1ff",
        justifyContent: "center",
    },
    incomeAmount: {
        // color: globalStyle.green
    },
    expenseAmount: {
        // color: globalStyle.red
    },
    filterButtons: {
        marginBottom: 20,
    },
    filterButton: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        margin: 5,
    },
    activeFilterButton: {
        backgroundColor: globalStyle.activeButtonBgColor,
        borderRadius: 25,
    },
    inactiveFilterButton: {
        backgroundColor: globalStyle.inactiveButtonBgColor,
        borderRadius: 10,
    },
    filterText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    activeFilterText: {
        color: globalStyle.activeButtonTextColor,
    },
    inactiveFilterText: {
        color: globalStyle.inactiveButtonTextColor,
    },
    transactions: {
        marginBottom: 100,
    },
    addButton: {
        backgroundColor: "#334478",
        position: "absolute",
        bottom: 20,
        right: 20,
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
    },
});
export default Home;
