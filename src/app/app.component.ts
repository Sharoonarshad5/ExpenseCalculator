import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ExpenseCalculator';

  
  calcResult:any[] =[];
  istableHidden = false;
 SameAmount=false;
}
