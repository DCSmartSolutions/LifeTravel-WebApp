import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-packages',
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.css']
})
export class ListPackagesComponent implements OnInit {
  packages: any[] = []; // Declara la variable 'packages' como un arreglo vacío

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.packages = [
      {
        "img": "assets/images/packages/machu_pichu.jpg",
        "destiny": "Machu Pichu",
        "description": "Cusco, Aguas Calientes",
        "agency": "Inca Trek",
        "price": "345",
        "stars": 4.8
      },
      {
        "img": "assets/images/packages/machu_pichu.jpg",
        "destiny": "Machu Pichu",
        "description": "Cusco, Aguas Calientes",
        "agency": "Inca Trek",
        "price": "345",
        "stars": 4.8
      },
      {
        "img": "assets/images/packages/machu_pichu.jpg",
        "destiny": "Machu Pichu",
        "description": "Cusco, Aguas Calientes",
        "agency": "Inca Trek",
        "price": "345",
        "stars": 4.8
      },
      {
        "img": "assets/images/packages/machu_pichu.jpg",
        "destiny": "Machu Pichu",
        "description": "Cusco, Aguas Calientes",
        "agency": "Inca Trek",
        "price": "345",
        "stars": 4.8
      },
      {
        "img": "assets/images/packages/machu_pichu.jpg",
        "destiny": "Machu Pichu",
        "description": "Cusco, Aguas Calientes",
        "agency": "Inca Trek",
        "price": "345",
        "stars": 4.8
      }
       ];

  }
}