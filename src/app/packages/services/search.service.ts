import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor() { }
  private packages = [
    {
      "id": 1,
      "img": "assets/images/packages/machu_pichu.jpg",
      "destiny": "1",
      "description": "Cusco, Aguas Calientes",
      "agency": "Inca Trek",
      "price": "345",
      "stars": 4.8,
      "region_id": 1,
    },
    {
      "id": 2,
      "img": "assets/images/packages/machu_pichu.jpg",
      "destiny": "Trekking",
      "description": "Cusco, Aguas Calientes",
      "agency": "Inca Trek",
      "price": "345",
      "stars": 4.8,
      "region_id": 2,
    },
    {
      "id": 3,
      "img": "assets/images/packages/machu_pichu.jpg",
      "destiny": "3",
      "description": "Cusco, Aguas Calientes",
      "agency": "Inca Trek",
      "price": "345",
      "stars": 4.8,
      "region_id": 3,
    },
    {
      "id": 4,
      "img": "assets/images/packages/machu_pichu.jpg",
      "destiny": "1",
      "description": "Cusco, Aguas Calientes",
      "agency": "Inca Trek",
      "price": "345",
      "stars": 4.8,
      "region_id": 1,
    },
    {
      "id": 5,
      "img": "assets/images/packages/machu_pichu.jpg",
      "destiny": "Inca Trail",
      "description": "Cusco, Aguas Calientes",
      "agency": "Inca Trek",
      "price": "345",
      "stars": 4.8,
      "region_id": 2,
    },
    {
      "id": 6,
      "img": "assets/images/packages/machu_pichu.jpg",
      "destiny": "Salkantay Trek",
      "description": "Cusco, Aguas Calientes",
      "agency": "Inca Trek",
      "price": "345",
      "stars": 4.8,
      "region_id": 2,
    },
    {
      "id": 7,
      "img": "assets/images/packages/machu_pichu.jpg",
      "destiny": "Puno",
      "description": "Cusco, Aguas Calientes",
      "agency": "Inca Trek",
      "price": "345",
      "stars": 4.8,
      "region_id": 2,
    }
  ];
  private regions = [
    {
      "id": 1,
      "name": "Costa",
      "description": "The Coast of Peru, a country located in western South America, covers a narrow but long territory (2,250 kilometers) facing the Pacific Ocean. It begins in Boca de Capones in the town of Tumbes and reaches the border with La Concordia (Chile).",
      "img": "https://th.bing.com/th/id/OIP.4ZZNY7-rvbW6YH-0CUO6jAHaEK?pid=ImgDet&rs=1"
    },
    {
      "id": 2,
      "name": "Sierra",
      "description": "It is mainly characterized by a mountainous and very rugged geography, combined with plateaus and inter-Andean valleys. The Sierra occupies an area of 364,716 km2 (28% of the national territory).",
      "img": "https://viajerosocultos.com/wp-content/uploads/2023/01/pallay-punchu-of-apu-takllo-new-rainbow-mountain-near-cusco-in-peru.jpg"
    },
    {
      "id": 3,
      "name": "Selva",
      "description": "The origin of the Amazon rainforest began 20 million years ago, when tectonic movements in the region produced the gradual uplift of the Andes Mountains, causing the Amazon basin to become a system of lakes.",
      "img": "https://th.bing.com/th/id/R.eab77adc3a6a438df519527e3452347f?rik=rid8rpX%2bhgym0Q&pid=ImgRaw&r=0"
    }
  ];

  getPackagesByRegionId(region_id: number) {
    return this.packages.filter(p => p.region_id == region_id)
  }
  getAllPackages() {
    return this.packages;
  }
  getRegions() {
    return this.regions;
  }
  getRegionById(region_id: number) {
    return this.regions.find(r => r.id == region_id)
  }
}
