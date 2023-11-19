import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {environment} from "../../../../environments/environment";
import {MapService} from "../../services/map.service";
import {Observable, Subscription} from "rxjs";
import {Location, LocationName} from "../../models/map.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  map: mapboxgl.Map | undefined;
  @Input() longitude: number = -76.9879548;
  @Input() latitude: number = -12.0777865;
  @Input() isOnlyOneMarker: boolean = true;
  @Input() destinationsLocations: LocationName[] = [];
  @Input() events: Observable<void> = new Observable<void>();
  @Input() mapClickEnabled: boolean = true;
  @Output() displayNameChangedEvent = new EventEmitter<string>();
  @Output() locationChangedEvent = new EventEmitter<LocationName>();
  @Output() destinationsLocationsChangedEvent = new EventEmitter<LocationName[]>();
  marker: mapboxgl.Marker | undefined;
  private eventsSubscription: Subscription = new Subscription();


  constructor(private mapService: MapService) {

  }

  ngOnInit() {

    (mapboxgl as any).accessToken = environment.mapBoxKey;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-76.9879548, -12.0777865],
      zoom: 12
    });
    //console.log(this.latitude, this.longitude)

    this.marker = new mapboxgl.Marker({
      draggable: true,
    })
    if (this.isOnlyOneMarker) {
      if (!this.longitude && !this.latitude) this.getLocation();
      else {
        //console.log("showPosition2")
        this.showPosition2();
      }
    } else {

      setTimeout(() => {
        this.createMarker()
      }, 3000);
    }
    this.map.addControl(new mapboxgl.NavigationControl());
    this.mapClick();
    this.eventsSubscription = this.events!.subscribe(() => {
      this.createMarker()
    });
  }

  ngOnDestroy() {
    this.eventsSubscription!.unsubscribe();
  }

  getLocation() {
    //console.log("getLocation")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.showPosition(position));
    } else {
      //console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position: GeolocationPosition) {
    this.longitude = position.coords.longitude;
    this.latitude = position.coords.latitude;
    this.map?.setCenter([this.longitude, this.latitude]);
    this.setDefaultMarker();
    //console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
    this.getDisplayName(this.longitude, this.latitude);
  }

  showPosition2() {
    this.map?.setCenter([this.longitude!, this.latitude!]);
    this.setDefaultMarker();
    //console.log("Latitude: " + this.latitude + "<br>Longitude: " + this.longitude);
    this.getDisplayName(this.longitude!, this.latitude!)
  }

  setDefaultMarker() {
    let timeoutId: any;
    this.marker = new mapboxgl.Marker({
      draggable: true,
      color: "#d02922"
    }).setLngLat([this.longitude!, this.latitude!])
      .addTo(this.map!)
      .on('drag', () => {
        this.longitude = this.marker!.getLngLat().lng;
        this.latitude = this.marker!.getLngLat().lat;
        //console.log(this.marker!.getLngLat());
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
      //console.log("display", response['display_name']);
      displayName = response['display_name'];
      this.displayNameChangedEvent.emit(displayName);
      this.locationChangedEvent.emit(new LocationName(latitude,longitude));
    });
  }

  mapClick() {
    if (this.isOnlyOneMarker) {
      this.map!.on('click', (e) => {
        if (this.mapClickEnabled) {
          this.longitude = e.lngLat.lng;
          this.latitude = e.lngLat.lat;
          this.setNewMarker(this.longitude, this.latitude);
          this.getDisplayName(this.longitude, this.latitude);
        }
      });
    } else {
      this.map!.on('click', (e) => {
        if (this.mapClickEnabled) {
          this.addMarker(e);
        }
      });
    }
  }


  private setNewMarker(longitude: number, latitude: number) {
    this.marker!.setLngLat([longitude, latitude])
      .addTo(this.map!);
    this.marker!.on('drag', () => {
      this.longitude = this.marker!.getLngLat().lng;
      this.latitude = this.marker!.getLngLat().lat;
      //console.log(this.marker!.getLngLat());
      this.getDisplayName(this.longitude!, this.latitude!);
    });
  }

  private addMarker($event: any) {
    const coordinates = $event.lngLat;
    //console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
    const location = new LocationName(coordinates.lat, coordinates.lng);
    this.destinationsLocations.push(location);
    this.createMarker();
  }

  getMarkerObjectHtml(index: number) {
    return '<span><i class="fas fa-map-marker fs-2 p-2" style="color: #d02922"></i><b style="position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); font-size: small; color: white">' + (index + 1) + '</b></span>'
  }

  setMarkerObjectHtml(location: Location, i: number) {
    let el = document.createElement('div');
    el.innerHTML = this.getMarkerObjectHtml(i);
    let mark = new mapboxgl.Marker({
      draggable: true,
      color: "#d02922",
      element: el
    })
      .setLngLat([location.longitude, location.latitude])
      .addTo(this.map!)
      .on('drag', () => {
        location.longitude = mark.getLngLat().lng;
        location.latitude = mark.getLngLat().lat;
        this.destinationsLocationsChangedEvent.emit(this.destinationsLocations);
      })
  }

  createMarker() {
    this.destinationsLocationsChangedEvent.emit(this.destinationsLocations);
    this.clearMapFromMarkers();
    this.centerMapToFitMarkers();
    for (let i = 0; i < this.destinationsLocations?.length; i++) {
      const location = this.destinationsLocations[i];
      this.setMarkerObjectHtml(location, i);
    }
  }
  centerMapToFitMarkers() {
    if (this.destinationsLocations?.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      this.destinationsLocations.forEach((location) => {
        bounds.extend([location.longitude, location.latitude]);
      });
      this.map!.fitBounds(bounds, {
        padding: 40
      });
    }
  }
  reDrawMarker(destinations: Location[]) {
    this.clearMapFromMarkers();
    for (let i = 0; i < destinations.length; i++) {
      const location = destinations[i];
      this.setMarkerObjectHtml(location, i);
    }
  }

  clearMapFromMarkers() {
    const allMarkers = document.querySelectorAll('.mapboxgl-marker');
    if (allMarkers.length > 0) {
      allMarkers.forEach((marker, index) => {
        if (index > 0) {
          marker.remove();
        }
      });
    }
  }

}
