import { isValid } from "date-fns";

export const INR = "₹";

export const FIELD_TYPES = {
    NUMBER: ["int", "float", "double"],
    BOOLEAN: ["bool"],
    STRING: ["string"],
    DATE: ["date"],
};

export const formatAmount = (amount, type, includeSign = true) => {
    const sign = type == "credit" ? "+" : "-";
    const amountWCurrency = `${INR}${amount.toLocaleString("en-IN")}`;
    return includeSign ? `${sign} ${amountWCurrency}` : `${amountWCurrency}`;
};

export const isValidValue = (fieldType, fieldValue) => {
    if (fieldValue == null || fieldValue == undefined) return false;

    if (FIELD_TYPES["BOOLEAN"].includes(fieldType)) {
        return typeof fieldValue == "boolean";
    } else if (FIELD_TYPES["NUMBER"].includes(fieldType)) {
        return typeof fieldValue == "number" && !isNaN(fieldValue) && fieldValue != false;
    } else if (FIELD_TYPES["STRING"].includes(fieldType)) {
        return typeof fieldValue == "string" && fieldValue !== "";
    } else if (FIELD_TYPES["DATE"].includes(fieldType)) {
        return typeof fieldValue != "number" && isValid(fieldValue);
    }
    return true;
};

export const performValidation = (record, Model) => {
    const validateConfig = Model.validation;
    for (const field in record) {
        const configExists = validateConfig.hasOwnProperty(field);
        if (!configExists) continue;

        const value = record[field];
        // console.log(field, value);
        const isRequired = validateConfig[field].required;
        const type = validateConfig[field].type;
        const errorMsg = validateConfig[field].errorMsg;
        if (isRequired && !isValidValue(type, value)) return errorMsg;
    }
};
