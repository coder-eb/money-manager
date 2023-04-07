import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

const AddTransaction = () => {
    const [type, setType] = useState("Expense");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [focusedInput, setFocusedInput] = useState('');

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
        setType("Expense");
    };

    const handleIncomeButton = () => {
        setType("Income");
    };

    const handleAddTransaction = () => {
        // Add transaction logic here
    };

    const handleInputFocus = (inputId) => {
        setFocusedInput(inputId);
    };

    const handleInputBlur = () => {
        setFocusedInput('');
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#1b1b1f",
            padding: 20,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
        },
        headerTitle: {
            fontSize: 24,
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
            borderRadius: 5,
            marginRight: 10,
            alignItems: "center",
        },
        activeButton: {
            backgroundColor: "#b4c4ff",
            borderRadius: 25,
        },
        inactiveButton: {
            backgroundColor: "#45464f",
            borderRadius: 10,
        },
        activeButtonText: {
            color: "#1b2d61",
        },
        inactiveButtonText: {
            color: "#c4c4ce",
        },
        buttonText: {
            fontSize: 18,
            fontWeight: "bold",
        },
        inputs: {
            flex: 1,
        },
        input: {
            backgroundColor: "#45464f",
            paddingVertical: 12,
            paddingHorizontal: 20,
            marginBottom: 15,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#acacb6',
            fontSize: 16,
        },
        focusedInput: {
            borderWidth: 2,
            borderColor: '#b4c4ff',
        },
        dateTimeButton: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
        },
        dateTimeText: {
            fontSize: 16,
            marginLeft: 10,
            color: '#eeeeee'
        },
        dateTimeIcon: {
            color: '#656467'
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Icon name="arrow-back" size={24} color="#e4e2e6" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{`Add ${type}`}</Text>
                <View/>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.button, type === "Expense" ? styles.activeButton : styles.inactiveButton]} onPress={handleExpenseButton}>
                    <Text style={[styles.buttonText, type === "Expense" ? styles.activeButtonText : styles.inactiveButtonText]}>Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, type === "Income" ? styles.activeButton : styles.inactiveButton]} onPress={handleIncomeButton}>
                    <Text style={[styles.buttonText, type === "Income" ? styles.activeButtonText : styles.inactiveButtonText]}>Income</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputs}>
                <TextInput style={[styles.input, focusedInput == 'name' && styles.focusedInput ]} onFocus={() => handleInputFocus('name')} onBlur={handleInputBlur} onChangeText={(text) => setName(text)} value={name} placeholderTextColor={'#b5b5b9'} placeholder={`${type} Name`} />
                <TextInput style={[styles.input, focusedInput == 'descr' && styles.focusedInput ]} onFocus={() => handleInputFocus('descr')} onBlur={handleInputBlur} onChangeText={(text) => setDescription(text)} value={description} placeholderTextColor={'#b5b5b9'} placeholder="Description" />
                <TextInput style={[styles.input, focusedInput == 'amount' && styles.focusedInput ]} onFocus={() => handleInputFocus('amount')} onBlur={handleInputBlur} onChangeText={(text) => setAmount(text)} value={amount} placeholderTextColor={'#b5b5b9'} placeholder="Amount" />
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
            {show && <DateTimePicker value={date} mode={mode}  is24Hour={true} display="default" onChange={handleDateChange} maximumDate={new Date()} />}
            <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddTransaction;
