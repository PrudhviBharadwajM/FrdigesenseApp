import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  constructor(private route: ActivatedRoute, private auth: AuthService){ }

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

  addToFavorites(recipe: any) {
    const user = this.auth.getCurrentUser();
    console.log(recipe);
    console.log(user);
  }

  logout() {
    this.auth.logout();
  }
}
