import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['RecipeName', 'Ingredients', 'Instructions', 'Favorites'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private auth: AuthService, private fireauth: AngularFireAuth, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const data = history.state.data.trim();
      this.dataSource.data = JSON.parse(data); 
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async addToFavorites(recipe: any) {
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
