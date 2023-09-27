import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-packages',
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.scss']
})
export class ListPackagesComponent implements OnInit {
  packages: any[] = []; // Declara la variable 'packages' como un arreglo vacío
  @Input() filteredPackages: any = null; // Declara la variable 'region' como un objeto vacío
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
}
