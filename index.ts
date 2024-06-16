#! /usr/bin/env node
import inquirer from "inquirer";

interface IBankAccount {
    debit(amount: number): string;
    credit(amount: number): string;
}

class BankAccount implements IBankAccount {
    public accountBalance: number;

    constructor() {
        this.accountBalance = 100;
    }

    public debit(amount: number): string {
        if (amount <= 0) {
            return "The amount you entered is wrong";
        }
        if (this.accountBalance < amount) {
            return "You don't have enough money to do this transaction";
        }
        this.accountBalance -= amount;
        return "Transaction successful! New Account Balance is " + this.accountBalance;
    }

    public credit(amount: number): string {
        if (amount <= 0) {
            return "Transaction failed";
        }
        this.accountBalance += amount;
        if (amount > 100) {
            this.accountBalance -= 1;
        }
        return "Your account has been credited successfully. New Account Balance is " + this.accountBalance;
    }
}

class Customer {
    public firstName: string;
    public lastName: string;
    public gender: string;
    public age: number;
    public mobileNumber: string;
    public bankAccount: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: string, bankAccount: BankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.bankAccount = bankAccount;
    }

    public customerInfo(): string {
        return `Name: ${this.firstName} ${this.lastName}\nAge: ${this.age}\nGender: ${this.gender}\nMobile: ${this.mobileNumber}\nAccount Balance: ${this.bankAccount.accountBalance}`;
    }
}

const BANK = async () => {
    const bankAccount = new BankAccount();

    const customerInfo = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'First Name:' },
        { type: 'input', name: 'lastName', message: 'Last Name:' },
        { type: 'input', name: 'gender', message: 'Gender:' },
        { type: 'number', name: 'age', message: 'Age:' },
        { type: 'input', name: 'mobileNumber', message: 'Mobile Number:' }
    ]);

    const customer = new Customer(
        customerInfo.firstName,
        customerInfo.lastName,
        customerInfo.gender,
        customerInfo.age,
        customerInfo.mobileNumber,
        bankAccount
    );

    console.log("\nCustomer Information:");
    console.log(customer.customerInfo());

    const type = await inquirer.prompt([
        { type: 'list', name: 'type', message: 'Select Transaction Type:', choices: ['Debit', 'Credit'] }
    ]);

    const amount = await inquirer.prompt([
        { type: 'number', name: 'amount', message: 'Enter Amount:' }
    ]);

    const transactionMessage = type === 'Debit'
        ? bankAccount.debit(amount)
        : bankAccount.credit(amount);

    console.log(`\n${transactionMessage}`);
};

BANK();
