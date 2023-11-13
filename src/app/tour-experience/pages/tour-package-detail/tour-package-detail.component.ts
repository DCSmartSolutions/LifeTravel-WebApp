import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TourPackage} from "../../models/tour-package.model";
import {TourPackageService} from "../../services/tour-package.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AzureBlobStorageService} from "../../services/azure-blob-storage.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SpinnerComponent} from "../../../shared/components/spinner/spinner.component";
import {Subject} from "rxjs";
import {HourRange, Schedule, Time} from "../../models/time-picker.model";
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {
  AlertMessageComponent
} from "../../../shared/components/alert-message/alert-message.component";
import {Activity} from "../../models/activity.model";
import {ActivityService} from "../../services/activity.service";
import {TourExperienceService} from "../../services/tour-experience.service";
import {Location, LocationName} from "../../models/map.model";
import {
  ConfirmationMessageComponent
} from "../../../shared/components/confirmation-message/confirmation-message.component";
import {BookingService} from "../../../booking/services/booking.service";
import {Booking} from "../../../booking/models/booking.model";
import {TourExperience} from "../../models/tour-experience.model";
import {UserService} from "../../../identity-access-management/services/user.service";

@Component({
  selector: 'app-tour-package-detail',
  templateUrl: './tour-package-detail.component.html',
  styleUrls: ['./tour-package-detail.component.scss']
})
export class TourPackageDetailComponent implements OnInit {
  title: string = "Add New Tour Package";
  tourPackage: TourPackage = new TourPackage();
  tourExperience: TourExperience = new TourExperience();
  booking: Booking |null = null;
  tourForm: FormGroup = new FormGroup({});
  isEdit: boolean = false;
  private dialog: MatDialogRef<SpinnerComponent> | undefined;
  activities: Activity[] = [];
  dayList: Schedule[] = [
    {day: 'Monday', selected: false, hourRange: new HourRange()},
    {day: 'Tuesday', selected: false, hourRange: new HourRange()},
    {day: 'Wednesday', selected: false, hourRange: new HourRange()},
    {day: 'Thursday', selected: false, hourRange: new HourRange()},
    {day: 'Friday', selected: false, hourRange: new HourRange()},
    {day: 'Saturday', selected: false, hourRange: new HourRange()},
    {day: 'Sunday', selected: false, hourRange: new HourRange()},
  ];
  destinations: LocationName[] = []
  isOnlyViewInfo: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private tourPackageService: TourPackageService,
              private activityService: ActivityService,
              private tourExperienceService: TourExperienceService,
              private bookingService: BookingService,
              private userService: UserService,
              private azureBlobStorageService: AzureBlobStorageService,
              private matDialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private formBuilder: FormBuilder) {
    this.tourForm = this.formBuilder.group({
      id: [{value: null}],
      img: [{value: null}, Validators.required],
      destiny: [{value: null}, Validators.required],
      title: [{value: ''}, Validators.required],
      description: [{value: ""}, Validators.required],
      agency: [{value: null}],
      price: [{value: null}, Validators.required],
      regionId: [{value: null}],
      visible: [{value: false}],
      meetingPoint: [{value: null}],
      meetingPointLatitude: [{value: null}, Validators.required],
      meetingPointLongitude: [{value: null}, Validators.required],
      destinations: [{value: null}],
      activities: [{value: null}],
      stars: [{value: null}],
    });
    this.tourForm.patchValue(this.tourPackage)

  }

  eventsSubject: Subject<void> = new Subject<void>();
  disableMapClick: Subject<boolean> = new Subject<boolean>();
  selectedDate: any;

  emitEventToChild() {
    this.eventsSubject.next();
  }

  getActivities() {
    this.activityService.getActivities().subscribe(activities => {
        activities.forEach((item: Activity) => {
          item.selected = false;
        })
        this.activities = activities;
      }
    )
  }

  emitDisableMapClickToChild() {
    this.disableMapClick.next(this.isOnlyViewInfo);
  }

  ngOnInit() {
    this.showSpinnerDialog()
    this.getActivities();
    this.route.params.subscribe(params => {
        const packageId = params['packageId'];
        this.isOnlyViewInfo = params['detail-type'] === 'detail-info';
        if (packageId != null) {
          this.title = this.isOnlyViewInfo ? "Tour Package Detail" : "Edit Tour Package";
          this.isEdit = true;
          setTimeout(() => {
            this.getPackageById(packageId);
          }, 500);
        } else {
          this.getUserLocation();
        }
        this.emitDisableMapClickToChild();
      }
    );
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.setUserLocation(position));
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    this.hideSpinnerDialog()
  }

  setUserLocation(position: GeolocationPosition) {
    this.tourForm.patchValue({meetingPointLatitude: position.coords.latitude});
    this.tourForm.patchValue({meetingPointLongitude: position.coords.longitude});
    this.tourForm.patchValue({meetingPoint: new Location(position.coords.latitude, position.coords.longitude)});
  }

  getPackageById(packageId: number) {
    this.tourForm.reset()
    this.tourForm.patchValue({id: packageId});
    this.tourPackageService.getPackageById(packageId).subscribe(packageData => {
      this.tourPackage = packageData;
      this.tourForm.patchValue(this.tourPackage);
      this.tourForm.patchValue({meetingPointLatitude: packageData.meetingPoint?.latitude});
      this.tourForm.patchValue({meetingPointLongitude: packageData.meetingPoint?.longitude});
      this.destinations = packageData.destinations;

      this.tourExperienceService.getSchedule(packageId).subscribe(tourExperience => {
        this.tourExperience = tourExperience;
        tourExperience.schedule.forEach((item: Schedule) => {
            this.dayList.forEach((day: Schedule) => {
              if (day.day === item.day) {
                day.hourRange = item.hourRange;
                day.selected = true;
              }
            })
          }
        )
        this.getBookingByTourExperienceIdAndTouristId();
      });
      this.cdr.detectChanges();
      packageData.activities?.forEach((item: Activity) => {
          this.activities.forEach((activity: Activity) => {
            if (activity.id == item.id) {
              activity.selected = true;
            }
          })
        }
      )
    });
    this.hideSpinnerDialog();
  }

  back() {
    if (this.isOnlyViewInfo) this.router.navigate(['peru/']);
    else this.router.navigate(['peru/tour-packages/my-packages']);
  }

  onFileSelected($event: any) {
    this.showSpinnerDialog();
    const file = $event.target.files[0];
    this.azureBlobStorageService.uploadImage(file).then(url => {
        this.tourPackage.img = url;
        this.tourForm.patchValue({img: url});
        if (this.tourPackage.id) {
          this.tourPackageService.modifyImage(this.tourPackage.id, url).subscribe();
        }
        this.hideSpinnerDialog();
      }
    );
  }

  get hasImg() {
    return this.tourForm.get('img')?.value != null;
  }

  get isVisible() {
    return this.tourForm.get('visible')?.value;
  }

  showSpinnerDialog() {
    this.dialog = this.matDialog.open(SpinnerComponent, {
      panelClass: 'custom-dialog',
      disableClose: true
    });
  }

  hideSpinnerDialog() {
    this.dialog?.close();
  }

  getNewLocation($event: Location) {
    this.tourForm.patchValue({meetingPoint: $event});
  }

  getDestinationList($event: any[]) {
    this.destinations = $event;
  }

  removeDestination(index: number) {
    this.tourForm.get('destinations')?.value.splice(index, 1);
    if (this.tourForm.get('destinations')?.value.length === 0) {
      this.tourForm.get('visible')?.setValue(false);
    }
    this.emitEventToChild()
  }

  savePackage() {
    this.showSpinnerDialog();
    this.tourForm.patchValue({destinations: this.destinations});
    this.tourForm.get('meetingPoint')?.setValue(new Location(this.tourForm.get('meetingPointLatitude')?.value, this.tourForm.get('meetingPointLongitude')?.value));
    this.tourForm.patchValue({activities: this.activities.filter(item => item.selected)});
    this.tourPackage = Object.assign({}, this.tourForm.getRawValue()) as TourPackage;
    if (this.isEdit) {
      this.tourPackageService.modifyPackage(this.tourPackage.id, this.tourPackage).subscribe(() => {
        this.hideSpinnerDialog()
      });
    } else {
      this.tourPackageService.createPackage(this.tourPackage).subscribe(() => {
        this.hideSpinnerDialog()
        this.back()
      })
    }
  }

  selectDay(item: any) {
    if (this.isOnlyViewInfo) return;
    item.selected = !item.selected;
    if (this.selectedDayList.length === 0) {
      this.tourForm.get('visible')?.setValue(false);
    }
  }

  assignValueInDayList(event: any, item: any, range: string) {
    this.dayList.forEach((day: any) => {
      if (day.day === item.day) {
        day.hourRange[range] = event;
      }
    })
  }

  get selectedDayList() {
    return this.dayList.filter(item => item.selected);
  }

  saveSchedule() {
    this.showSpinnerDialog();
    if (this.isEdit) {
      this.tourExperienceService.saveSchedule(this.tourPackage.id, this.selectedDayList, this.tourForm.get('visible')?.value).subscribe(() => {
        this.hideSpinnerDialog();
      });
      this.getPackageById(this.tourPackage.id);
    }
  }

  get cannotBeScheduleSaved() {
    return this.selectedDayList.some((item: Schedule) => {
      return item.hourRange.start.hour === '' || item.hourRange.start.minute === '' || item.hourRange.start.dayTime === '' ||
        item.hourRange.end.hour === '' || item.hourRange.end.minute === '' || item.hourRange.end.dayTime === '';
    });
  }

  getDateStringFromTime(time: Time) {
    return time.hour + ':' + time.minute + ' ' + time.dayTime;
  }

  isDayDisabled(date: Date): boolean {
    if (this.selectedDayList.length === 0) {
      return true;
    }
    if (date < new Date()) {
      return true;
    }
    const dayName = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date);
    return !this.selectedDayList.some(item => item.day.toLowerCase() === dayName.toLowerCase());
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      return this.isDayDisabled(cellDate) || this.isBooked ? 'pe-none' : '';
    }
    return '';
  };

  showVisibleConfirmationMessage() {
    if (this.tourForm.get('visible')?.value && this.selectedDayList.length === 0) {
      this.dialog = this.matDialog.open(AlertMessageComponent, {
          data: {
            title: "Can't be visible",
            content: 'This package must have at least assigned a day in the schedule to be visible.'
          }
        }
      )
      this.dialog.afterClosed().subscribe(() => {
          this.tourForm.patchValue({visible: false})
        }
      )
    } else if (this.tourForm.get('destinations')?.value.length === 0) {
      this.dialog = this.matDialog.open(AlertMessageComponent, {
          data: {
            title: "Can't be visible",
            content: 'This package must have at least one destination to be visible.'
          }
        }
      )
      this.dialog.afterClosed().subscribe(() => {
          this.tourForm.patchValue({visible: false})
        }
      )
    }
  }

  createBooking() {
    this.dialog = this.matDialog.open(ConfirmationMessageComponent, {
        data: {
          title: "Are you sure to create a booking?",
          content: 'This action will create a booking for this package.'
        }
      }
    )
    this.dialog.afterClosed().subscribe((response) => {
        if (response) {
          this.showSpinnerDialog()
          const booking: Booking = new Booking();
          booking.tourExperienceId = this.tourExperience.id;
          booking.touristId = this.userService.getUserIdFromCookies();
          booking.date = this.selectedDate;
          booking.hourRange = this.getHourRangeByDayInSchedule(this.selectedDate);
          this.bookingService.createBooking(booking).subscribe((response) => {
              console.log(response);
              this.getBookingByTourExperienceIdAndTouristId();
              this.hideSpinnerDialog()
              // this.router.navigate(['peru/tour-packages/my-packages']);
            }
          )
        }
      }
    )
  }
  getBookingByTourExperienceIdAndTouristId(){
    this.bookingService.getBookingByTourExperienceIdAndTouristId(this.tourExperience.id, this.userService.getUserIdFromCookies()).subscribe((response) => {
      this.booking = response;
      console.log(this.booking)
      if(response) this.selectedDate = new Date(response.date);
      console.log(this.selectedDate)
    })
  }
  get isBooked(){
    return this.booking != null;
  }
  getHourRangeByDayInSchedule(date: Date){
    const dayName = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date);
    return this.tourExperience.schedule.find(item => item.day === dayName)?.hourRange;
  }
  get getDateStringOfBooking(){ //format: 2021-08-01
    const date = new Date(this.booking!.date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
}
