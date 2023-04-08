import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { GlobalStyleContext } from "../../App";
import Icon from "react-native-vector-icons/MaterialIcons";

const Home = () => {
    const globalStyle = useContext(GlobalStyleContext);

    const [filterType, setFilterType] = useState('today');

    useEffect(() => {
        console.log(filterType)
    }, [filterType])

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#fff",
            backgroundColor: globalStyle.containerBgColor,
            paddingHorizontal: 10,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            marginBottom: 10,
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
            color: globalStyle.activeButtonBgColor
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
            marginBottom: 10,
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
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 15,
            marginBottom: 20,
        },
        balance: {
            alignItems: "center",
            marginBottom: 20,
        },
        balanceText: {
            fontSize: 16,
            color: "#bec5e8",
        },
        balanceAmount: {
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 5,
            color: "#dbe1ff"
        },
        incomeExpense: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        income: {
            alignItems: "center",
        },
        expense: {
            alignItems: "center",
        },
        incomeExpenseText: {
            fontSize: 16,
            color: "#bec5e8",
        },
        incomeExpenseAmount: {
            fontSize: 18,
            marginTop: 5,
        },
        incomeAmount: {
            color: globalStyle.green
        },
        expenseAmount: {
            color: globalStyle.red
        },
        filterButtons: {
            flexDirection: "row",
            justifyContent: "flex-start",
            marginBottom: 20,
        },
        filterButton: {
            paddingVertical: 12,
            paddingHorizontal: 15,
            margin: 5
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
            fontSize: 16,
            fontWeight: "bold",
        },
        activeFilterText: {
            color: globalStyle.activeButtonTextColor,
        },
        inactiveFilterText: {
            color: globalStyle.inactiveButtonTextColor,
        },
        transactions: {
        },
        transaction: {
            backgroundColor: globalStyle.secondaryBgColor,
            paddingVertical: 15,
            paddingHorizontal: 25,
            borderRadius: 25,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // height: "16%"
        },
        transactionIcon: {
            width: 30,
            height: 30,
            marginRight: 10,
        },
        transactionDetails: {
            paddingHorizontal: 10,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "60%",
        },
        transactionName: {
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 5,
        },
        transactionInfo: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start"
        },
        transactionTime: {
            fontSize: 14,
            color: "#777",
        },
        transactionAmount: {
            fontSize: 18,
        },
        credit: {
            color: globalStyle.green,
        },
        debit: {
            color: globalStyle.red,
        },
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Icon name="account-balance-wallet" size={24} style={styles.appIcon}/>
                    <Text style={styles.title}>Money Manager</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.userIconBg}>
                        <Icon name="account-circle" size={24} style={styles.userIcon}/>
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
                    <Text style={styles.balanceAmount}>$10,000</Text>
                </View>
                <View style={styles.incomeExpense}>
                    <View style={styles.income}>
                        <Text style={styles.incomeExpenseText}>Income</Text>
                        <Text style={[styles.incomeExpenseAmount, styles.incomeAmount]}>+$5,000</Text>
                    </View>
                    <View style={styles.expense}>
                        <Text style={styles.incomeExpenseText}>Expense</Text>
                        <Text style={[styles.incomeExpenseAmount, styles.expenseAmount]}>-$2,000</Text>
                    </View>
                </View>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterButtons}>
                <TouchableOpacity style={[styles.filterButton, filterType === "today" ? styles.activeFilterButton : styles.inactiveFilterButton]} onPress={() => setFilterType('today')}>
                    <Text style={[styles.filterText, filterType === "today" ? styles.activeFilterText : styles.inactiveFilterText]}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, filterType === "this_week" ? styles.activeFilterButton : styles.inactiveFilterButton]} onPress={() => setFilterType('this_week')}>
                    <Text style={[styles.filterText, filterType === "this_week" ? styles.activeFilterText : styles.inactiveFilterText]}>This Week</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, filterType === "this_month" ? styles.activeFilterButton : styles.inactiveFilterButton]} onPress={() => setFilterType('this_month')}>
                    <Text style={[styles.filterText, filterType === "this_month" ? styles.activeFilterText : styles.inactiveFilterText]}>This Month</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, filterType === "this_year" ? styles.activeFilterButton : styles.inactiveFilterButton]} onPress={() => setFilterType('this_year')}>
                    <Text style={[styles.filterText, filterType === "this_year" ? styles.activeFilterText : styles.inactiveFilterText]}>This Year</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.transactions}>
                <View style={styles.transaction}>
                    <View>
                        <Icon name="home" size={24} />
                    </View>
                    <View style={styles.transactionDetails}>
                        <Text style={styles.transactionName}>Salary</Text>
                        <View style={styles.transactionInfo}>
                            <Text style={styles.transactionTime}>VISA Debit Card</Text>
                            <Text style={styles.transactionTime}>02 Sun</Text>
                            <Text style={styles.transactionTime}>10:30 AM</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.transactionAmount, styles.credit]}>+$35,000</Text>
                    </View>
                </View>
                <View style={styles.transaction}>
                    <View>
                        <Icon name="home" size={24} />
                    </View>
                    <View style={styles.transactionDetails}>
                        <Text style={styles.transactionName}>Keyboard</Text>
                        <View style={styles.transactionInfo}>
                            <Text style={styles.transactionTime}>02 Sun</Text>
                            <Text style={styles.transactionTime}>10:30 PM</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.transactionAmount, styles.debit]}>-$12,000</Text>
                    </View>
                </View>
                <View style={styles.transaction}>
                    <View>
                        <Icon name="home" size={24} />
                    </View>
                    <View style={styles.transactionDetails}>
                        <Text style={styles.transactionName}>Bottle</Text>
                        <View style={styles.transactionInfo}>
                            <Text style={styles.transactionTime}>Cash</Text>
                            <Text style={styles.transactionTime}>02 Sun</Text>
                            <Text style={styles.transactionTime}>10:30 AM</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.transactionAmount, styles.debit]}>-$100</Text>
                    </View>
                </View>
                <View style={styles.transaction}>
                    <View>
                        <Icon name="home" size={24} />
                    </View>
                    <View style={styles.transactionDetails}>
                        <Text style={styles.transactionName}>Bottle</Text>
                        <View style={styles.transactionInfo}>
                            <Text style={styles.transactionTime}>Cash</Text>
                            <Text style={styles.transactionTime}>02 Sun</Text>
                            <Text style={styles.transactionTime}>10:30 AM</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.transactionAmount, styles.debit]}>-$100</Text>
                    </View>
                </View>
                <View style={styles.transaction}>
                    <View>
                        <Icon name="home" size={24} />
                    </View>
                    <View style={styles.transactionDetails}>
                        <Text style={styles.transactionName}>Bottle</Text>
                        <View style={styles.transactionInfo}>
                            <Text style={styles.transactionTime}>Cash</Text>
                            <Text style={styles.transactionTime}>02 Sun</Text>
                            <Text style={styles.transactionTime}>10:30 AM</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.transactionAmount, styles.debit]}>-$100</Text>
                    </View>
                </View>
                <View style={styles.transaction}>
                    <View>
                        <Icon name="home" size={24} />
                    </View>
                    <View style={styles.transactionDetails}>
                        <Text style={styles.transactionName}>Bottle</Text>
                        <View style={styles.transactionInfo}>
                            <Text style={styles.transactionTime}>Cash</Text>
                            <Text style={styles.transactionTime}>02 Sun</Text>
                            <Text style={styles.transactionTime}>10:30 AM</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.transactionAmount, styles.debit]}>-$100</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Home;
