import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {
  data: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['name', 'ingredients', 'instructions'];

  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit(): void {
    const recipeData = [
      {
        title: "Scrambled Eggs",
        ingredients: [
          "4 eggs",
          "2 tablespoons butter",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Beat the eggs in a bowl until blended.",
          "Melt the butter in a skillet over medium heat.",
          "Add the eggs to the skillet and cook until firm, stirring occasionally.",
          "Season with salt and pepper and serve."
        ]
      }
    ];
    this.route.paramMap.subscribe(params => {
      this.data = history.state.data;
      // this.dataSource.data = this.data;
      this.dataSource.data = recipeData;
      console.table('Data in recipes:', this.data);
    });
  }

  logout() {
    this.auth.logout();
  }

}
