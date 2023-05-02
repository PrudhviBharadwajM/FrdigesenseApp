import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth.service';
import { OpenAiService } from 'src/app/shared/open-ai.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['RecipeName', 'Ingredients', 'Instructions', 'Favorites'];
  value: any;
  ingredients: any;
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: AuthService, private gpt: OpenAiService, private fireauth: AngularFireAuth,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRecipes();
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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getRecipes() {
    this.isLoading = true;
    this.value = 'Give me a list of recipes under 5 minutes in a JSON array format with field names as RecipeName, Ingredients, and Instructions and in this format of JSON array [{},{},{}] without any space in the start of JSON array and end of JSON array.';
    this.openDialog();
    this.gpt.getDataFromOpenAPI(this.value).then((data) => {
      this.ingredients = data?.trim();
      this.dataSource.data = JSON.parse(this.ingredients);
      this.isLoading = false;
      this.dialog.closeAll();
    }, (error) => {
      
      alert(error.message);
    });
  }
  
  async addToFavorites(recipe: any) {
    debugger;
    let user = await this.fireauth.currentUser;
    let favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    if (user && !favorites[user.uid]) {
      favorites[user.uid] = [];
    }
    if(user) {
      favorites[user.uid].push({
        recipeName: recipe.RecipeName,
        ingredients: recipe.Ingredients,
        instructions: recipe.Instructions,
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Recipe added successfully!');
    }
  }
  
  logout() {
    this.auth.logout();
  }
}
