import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { OpenAiService } from 'src/app/shared/open-ai.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ingredients: string = '';
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  value: string = '';
  constructor(private auth: AuthService, private gpt: OpenAiService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      data: { name: 'cooking.gif' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getRecipes() {
    this.isLoading = true;
    this.isSubmitting = true;
    this.value = 'Give me just the recipes using ' + this.ingredients + ' in a JSON array format with field names as RecipeName, Ingredients, and Instructions and in this format of JSON array [{},{},{}] without any space in the start of JSON array and end of JSON array.';
    this.openDialog();
    this.gpt.getDataFromOpenAPI(this.value).then((data) => {
      this.isLoading = false;
      console.log(data);
      this.router.navigate(['../recipes'], { state: { data: data } })
      this.dialog.closeAll();
    }, (error) => {
      this.isLoading = false;
      alert(error.message);
    });
  }

  logout() {
    this.auth.logout();
  }

}
