export default class ExpenseModel {
    constructor(id, deposit, withdrawal, place, times, balance) {
      this.id = id;
      this.deposit = deposit;
      this.withdrawal = withdrawal;
      this.place = place;
      this.times = times;
      this.balance = balance;
    }
  }