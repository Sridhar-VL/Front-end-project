class Bank{
    constructor(bankName,totalAmount,balance,withdrawAmount,depositAmount){
        this.name = bankName;
        this.amount= totalAmount;
        this.balance= balance;
        this.deposit= depositAmount;
        this.withdraw= withdrawAmount;
        
    }

    mainBal(){
        console.log(`Total Amount is ${this.balance}`);
    }
   /* withdraw(){
       console.log(`after withdraw ${this.amount}`);
    }
    deposit(){
        console.log(`After deposite ${this.amount}`);
    }*/
};

const account=new Bank("Sibhu-Bank",9999000,9999000,200000,1111000);
account.mainBal();
console.log(account);