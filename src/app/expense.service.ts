import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor() { }
  calcExpense(arr:any[]) {
    let result =new Map();
    let sortedArr = [...arr];
    sortedArr=sortedArr.sort((a,b)=>a.amount-b.amount);

    for(let i= sortedArr.length - 1; i >= 0; i--){
      const amount = sortedArr[i].amount/sortedArr.length;
      for(let j=0; j < i; j++){
        const amount1=sortedArr[j].amount/sortedArr.length;
        if(amount - amount1> 0){
          let transaction =null;
          if(result.has(sortedArr[j].name)){
            transaction = result.get(sortedArr[j].name);
          }
          else{
            transaction = [];
          }
          transaction.push({
            name:sortedArr[i].name, 
            amount:amount - amount1
          });
          result.set(sortedArr[j].name,transaction);
        }
    }
    }

    return result;
  }
}

