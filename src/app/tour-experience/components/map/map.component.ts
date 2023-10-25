import {Component, Input, OnInit} from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: Mapboxgl.Map | undefined;
  longitude: number = 16.005;
  latitude: number = -20.05;

  constructor() {
    this.getLocation();
  }

  ngOnInit() {
    (Mapboxgl as any).accessToken = environment.mapBoxKey;
    this.map = new Mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [this.longitude, this.longitude],
        zoom: 16
      }
    );
    this.map.addControl(new Mapboxgl.NavigationControl());

  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.showPosition(position));
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position: GeolocationPosition) {
    this.longitude = position.coords.longitude;
    this.latitude = position.coords.latitude;
    this.map?.setCenter([this.longitude, this.latitude]);
    this.setMarker();
    console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
  }

  setMarker() {
    const marker = new Mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([this.longitude, this.latitude])
      .addTo(this.map!);
    marker.on('drag', () => {
      console.log(marker.getLngLat());
    });
  }

}
