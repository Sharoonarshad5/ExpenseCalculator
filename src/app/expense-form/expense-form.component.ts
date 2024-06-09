import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ExpenseService} from './../expense.service';


export interface IExpenseTransaction {
  name:string,
  transaction:{name:string, amount:number}[];
}

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent  implements OnInit {
  expenseForm!:FormGroup;
  @Output() expenseResult = new EventEmitter<IExpenseTransaction[]>();

  // to hide table
  @ Output() hideTable = new EventEmitter<boolean>();
  // tocheack if the data is same
  @Output() sameAmount = new EventEmitter<boolean>();




  constructor(private fb: FormBuilder , private expenseService:ExpenseService){}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void{
    this.initExpenseForm();

  }
 

  initExpenseForm(){
      this.expenseForm = this.fb.group(
        {transaction:this.fb.array([]),
    });
    this.onAdd();
  }

  get transaction(){
    return this.expenseForm.controls['transaction']as FormArray;
  }
  onSubmit(){
    console.log(this.expenseForm.value);
    this.sameAmount.emit(false);
    const {transaction} = this.expenseForm.value;
    const calcResult = this.expenseService.calcExpense(transaction)
    console.log(calcResult);
    const calcResultArr = Array.from(calcResult,(
      [name,
      transaction,]
    )=>({name,transaction}));
    console.log(calcResultArr);
    this.expenseResult.emit(calcResultArr);
    this.hideTable.emit(false);

    if(this.transaction.length > 1 && !calcResultArr.length){
      this.sameAmount.emit(true);
    }
  }

  onAdd(){
    const  transForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(3)]],
      item:['',Validators.required],
      amount:['',Validators.required],
    });
    this.transaction.push(transForm);
    this.hideTable.emit(true);

  }
  onRemove(index : number){
    this.transaction.removeAt(index);
    this.hideTable.emit(true);
  }



}



