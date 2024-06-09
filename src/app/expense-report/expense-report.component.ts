import { Component, Input, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrl: './expense-report.component.scss'
})
export class ExpenseReportComponent implements OnInit {
  @Input() calcReportResult :any = [];
  constructor(){}
  ngOnInit(): void {}
  }

