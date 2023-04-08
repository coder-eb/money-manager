import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { SyncedRealmContext } from "../RealmConfig";
import { createTransaction } from "../Repositories/TransactionRepository";
import { globalStyle } from "../common/theme";

const AddTransaction = ({ navigation }) => {
    const [type, setType] = useState("debit");
    const [name, setName] = useState("");
    const [descr, setDescr] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [focusedInput, setFocusedInput] = useState("");

    const { useRealm } = SyncedRealmContext;
    const realm = useRealm();

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatePicker = () => {
        showMode("date");
    };

    const showTimePicker = () => {
        showMode("time");
    };

    const handleExpenseButton = () => {
        setType("debit");
    };

    const handleIncomeButton = () => {
        setType("credit");
    };

    const handleAddTransaction = () => {
        // Add transaction logic here
        const amt = parseInt(amount);
        const record = { name, amount: amt, descr, type, date };
        createTransaction(realm, record);
        navigation.goBack();
    };

    const handleInputFocus = (inputId) => {
        setFocusedInput(inputId);
    };

    const handleInputBlur = () => {
        setFocusedInput("");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Icon name="arrow-back" size={24} color="#e4e2e6" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{type == "debit" ? "Add Expense" : "Add Income"}</Text>
                <View />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.button, type === "debit" ? styles.activeButton : styles.inactiveButton]} onPress={handleExpenseButton}>
                    <Text style={[styles.buttonText, type === "debit" ? styles.activeButtonText : styles.inactiveButtonText]}>Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, type === "credit" ? styles.activeButton : styles.inactiveButton]} onPress={handleIncomeButton}>
                    <Text style={[styles.buttonText, type === "credit" ? styles.activeButtonText : styles.inactiveButtonText]}>Income</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputs}>
                <TextInput style={[styles.input, focusedInput == "name" && styles.focusedInput]} onFocus={() => handleInputFocus("name")} onBlur={handleInputBlur} onChangeText={(text) => setName(text)} value={name} placeholderTextColor={"#b5b5b9"} placeholder={type == "debit" ? "Expense Name" : "Income Name"} />
                <TextInput style={[styles.input, focusedInput == "descr" && styles.focusedInput]} onFocus={() => handleInputFocus("descr")} onBlur={handleInputBlur} onChangeText={(text) => setDescr(text)} value={descr} placeholderTextColor={"#b5b5b9"} placeholder="Description" />
                <TextInput keyboardType={"numeric"} style={[styles.input, focusedInput == "amount" && styles.focusedInput]} onFocus={() => handleInputFocus("amount")} onBlur={handleInputBlur} onChangeText={(text) => setAmount(text)} value={amount} placeholderTextColor={"#b5b5b9"} placeholder="Amount" />
                <View style={styles.datePickerSection}>
                    <TouchableOpacity style={styles.dateTimeButton} onPress={showDatePicker}>
                        <Icon name="event" size={24} style={styles.dateTimeIcon} />
                        <Text style={styles.dateTimeText}>{format(date, "dd/MM/yyyy")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeButton} onPress={showTimePicker}>
                        <Icon name="access-time" size={24} style={styles.dateTimeIcon} />
                        <Text style={styles.dateTimeText}>{format(date, "hh:mm a")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {show && <DateTimePicker value={date} mode={mode} is24Hour={true} display="default" onChange={handleDateChange} maximumDate={new Date()} />}
            <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalStyle.containerBgColor,
        padding: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 20,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginRight: 10,
        alignItems: "center",
    },
    activeButton: {
        backgroundColor: globalStyle.activeButtonBgColor,
        borderRadius: 25,
    },
    inactiveButton: {
        backgroundColor: globalStyle.inactiveButtonBgColor,
        borderRadius: 10,
    },
    activeButtonText: {
        color: globalStyle.activeButtonTextColor,
    },
    inactiveButtonText: {
        color: globalStyle.inactiveButtonTextColor,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    inputs: {
        flex: 1,
    },
    input: {
        backgroundColor: globalStyle.secondaryBgColor,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#acacb6",
        fontSize: 16,
    },
    focusedInput: {
        borderWidth: 2,
        borderColor: "#b4c4ff",
    },
    dateTimeButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    dateTimeText: {
        fontSize: 16,
        marginLeft: 10,
        color: "#eeeeee",
    },
    dateTimeIcon: {
        color: "#656467",
    },
    addButton: {
        backgroundColor: "#22232a",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: "center",
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#aebdf6",
    },
    datePickerSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30,
    },
});

export default AddTransaction;
