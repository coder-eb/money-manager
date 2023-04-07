import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'

const AddTransaction = () => {
    const [type, setType] = useState("Expense");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatePicker = () => {
      showMode('date');
    };
  
    const showTimePicker = () => {
      showMode('time');
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
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
            color: "#333",
        },
        buttons: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
        },
        button: {
            backgroundColor: "#eee",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            flex: 1,
            marginRight: 10,
            alignItems: "center",
        },
        activeButton: {
            backgroundColor: "#007AFF",
            color: "#fff",
        },
        buttonText: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#333",
        },
        inputs: {
            flex: 1,
        },
        input: {
            backgroundColor: "#eee",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginBottom: 10,
            fontSize: 16,
        },
        dateTimeButton: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
        },
        dateTimeText: {
            fontSize: 16,
            marginLeft: 10,
        },
        addButton: {
            backgroundColor: "#007AFF",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignItems: "center",
        },
        addButtonText: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#fff",
        },
        datePickerSection: {
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'space-around'
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {}}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{`Add ${type}`}</Text>
                <View style={styles.headerRight} />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.button, type === "Expense" && styles.activeButton]} onPress={handleExpenseButton}>
                    <Text style={styles.buttonText}>Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, type === "Income" && styles.activeButton]} onPress={handleIncomeButton}>
                    <Text style={styles.buttonText}>Income</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputs}>
                <TextInput style={styles.input} onChangeText={(text) => setName(text)} value={name} placeholder={`${type} Name`} />
                <TextInput style={styles.input} onChangeText={(text) => setDescription(text)} value={description} placeholder="Description" />
                <TextInput style={styles.input} onChangeText={(text) => setAmount(text)} value={amount} placeholder="Amount" />
                <View style={styles.datePickerSection}>
                    <TouchableOpacity style={styles.dateTimeButton} onPress={showDatePicker}>
                        <Icon name="date-range" size={24} color="black" />
                        <Text style={styles.dateTimeText}>{format(date, 'yyyy-MM-dd')}</Text>                    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeButton} onPress={showTimePicker}>
                        <Icon name="access-time" size={24} color="black" />
                        <Text style={styles.dateTimeText}>{format(date, 'hh:mm a')}</Text>
                    </TouchableOpacity>    
                </View>
            </View>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
            <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddTransaction;