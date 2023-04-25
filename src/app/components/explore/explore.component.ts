import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth.service';
import { OpenAiService } from 'src/app/shared/open-ai.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['RecipeName', 'Ingredients', 'Instructions'];
  value: any;
  ingredients: any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: AuthService, private gpt: OpenAiService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getRecipes() {
    this.value = 'Give me a list of recipes under 5 minutes in a JSON array format with field names as RecipeName, Ingredients, and Instructions';
    this.gpt.getDataFromOpenAPI(this.value).then((data) => {
      this.ingredients = data?.trim();
      this.dataSource.data = JSON.parse(this.ingredients); 
      console.log(this.dataSource.data);
    }, (error) => {
      alert(error.message);
    });
  }
  
  logout() {
    this.auth.logout();
  }
}
