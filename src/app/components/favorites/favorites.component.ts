import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['RecipeName', 'Ingredients', 'Instructions', 'Favorites'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;
  isDataReady = false;

  constructor(private auth: AuthService, private fireauth: AngularFireAuth){}

 async ngOnInit() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    let user = await this.fireauth.currentUser;
  
    if (user && favorites[user.uid]) {
      this.dataSource.data = favorites[user.uid];
    }
  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.isLoading = false;
    this.isDataReady = true;
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async removeFromFavorites(element: any) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    let user = await this.fireauth.currentUser;
      
    if (user && favorites[user.uid]) {
      favorites[user.uid] = favorites[user.uid].filter((recipe: any) => recipe.recipeName !== element.recipeName);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.dataSource.data = favorites[user.uid];
    }
  }
  
  logout() {
    this.auth.logout();
  }

}
