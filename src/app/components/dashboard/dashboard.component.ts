import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { OpenAiService } from 'src/app/shared/open-ai.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ingredients: string = '';
  value: string = '';
  constructor(private auth: AuthService, private gpt: OpenAiService, private router:Router) { }

  ngOnInit(): void {
  }

  getRecipes() {
    this.value = 'Give me just the recipes using ' + this.ingredients + ' in a JSON array format with field names as RecipeName, Ingredients, and Instructions';
    this.gpt.getDataFromOpenAPI(this.value).then((data) => {
      this.router.navigate(['../recipes'], {state: {data: data}})
    }, (error) => {
      alert(error.message);
    });
  }

  logout() {
    this.auth.logout();
  }

}
