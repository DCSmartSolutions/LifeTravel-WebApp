import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {environment} from "../../../../environments/environment";
import {MapService} from "../../services/map.service";
import {Location} from "../../models/tour-package.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  @Input() longitude: number | null = null;
  @Input() latitude: number | null = null;
  @Output() displayNameChangedEvent = new EventEmitter<string>();
  @Output() locationChangedEvent = new EventEmitter<Location>();
  marker: mapboxgl.Marker | undefined;

  constructor(private mapService: MapService) {

  }

  ngOnInit() {


    (mapboxgl as any).accessToken = environment.mapBoxKey;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [0, 0],
      zoom: 16
    });
    console.log(this.latitude, this.longitude)

    this.marker = new mapboxgl.Marker({
      draggable: true,
      color: "#d02922"
    })
    if (!this.longitude && !this.latitude) this.getLocation();
    else {
      console.log("showPosition2")
      this.showPosition2();
    }
    // const geocoder = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   marker: this.marker,
    //   mapboxgl: mapboxgl
    // });
    this.map.addControl(new mapboxgl.NavigationControl());

  }

  getLocation() {
    console.log("getLocation")
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
    //this.getDisplayName(this.longitude, this.latitude);
  }

  showPosition2() {
    this.map?.setCenter([this.longitude!, this.latitude!]);
    this.setMarker();
    console.log("Latitude: " + this.latitude + "<br>Longitude: " + this.longitude);
    //this.getDisplayName(this.longitude!, this.latitude!)
  }

  setMarker() {
    let timeoutId: any;
    this.marker!.setLngLat([this.longitude!, this.latitude!])
      .addTo(this.map!);

    this.marker!.on('drag', () => {
      this.longitude = this.marker!.getLngLat().lng;
      this.latitude = this.marker!.getLngLat().lat;
      console.log(this.marker!.getLngLat());
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        this.getDisplayName(this.longitude!, this.latitude!);
      }, 1000);
    });
  }

  getDisplayName(longitude: number, latitude: number) {
    let displayName = "";

    this.mapService.getDisplayName(longitude, latitude).then((response) => {
      console.log("display", response['display_name']);
      displayName = response['display_name'];
      this.displayNameChangedEvent.emit(displayName);
      this.locationChangedEvent.emit(new Location(longitude, latitude));
    });
  }

}
