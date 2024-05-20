import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourPackage } from '../../models/tour-package.model';
import { TourPackageService } from '../../services/tour-package.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AzureBlobStorageService } from '../../services/azure-blob-storage.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { Subject } from 'rxjs';
import { HourRange, Schedule, Time } from '../../models/time-picker.model';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { AlertMessageComponent } from '../../../shared/components/alert-message/alert-message.component';
import { Activity } from '../../models/activity.model';
import { ActivityService } from '../../services/activity.service';
// import {TourExperienceService} from "../../services/tour-experience.service";
import { LocationName } from '../../models/map.model';
import { ConfirmationMessageComponent } from '../../../shared/components/confirmation-message/confirmation-message.component';
import { BookingService } from '../../../booking/services/booking.service';
import { Booking } from '../../../booking/models/booking.model';
import { UserService } from '../../../iam/services/user.service';
import { Vehicle } from '../../../transportation/models/vehicle.model';
import { AddVehicleModalComponent } from '../../../transportation/components/add-vehicle-modal/add-vehicle-modal.component';
import { TransportService } from '../../../transportation/services/transport.service';

@Component({
  selector: 'app-package-info',
  templateUrl: './package-info.component.html',
  styleUrls: ['./package-info.component.scss'],
})
export class PackageInfoComponent implements OnInit {
  title: string = 'Add New Tour Package';
  tourPackage: TourPackage = new TourPackage();
  booking: Booking | null = null;
  tourForm: FormGroup = new FormGroup({});
  vehicleList: Vehicle[] = [];
  isEdit: boolean = false;
  private dialog: MatDialogRef<SpinnerComponent> | undefined;
  activities: Activity[] = [];
  dayList: Schedule[] = [
    { id: 0, day: 'Monday', selected: false, hourRange: new HourRange() },
    { id: 0, day: 'Tuesday', selected: false, hourRange: new HourRange() },
    { id: 0, day: 'Wednesday', selected: false, hourRange: new HourRange() },
    { id: 0, day: 'Thursday', selected: false, hourRange: new HourRange() },
    { id: 0, day: 'Friday', selected: false, hourRange: new HourRange() },
    { id: 0, day: 'Saturday', selected: false, hourRange: new HourRange() },
    { id: 0, day: 'Sunday', selected: false, hourRange: new HourRange() },
  ];
  destinations: LocationName[] = [];
  isOnlyViewInfo: boolean = false;
  departments: string[] = [];
  filteredOptions: string[] = [];
  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourPackageService: TourPackageService,
    private activityService: ActivityService,
    // private tourExperienceService: TourExperienceService,
    private bookingService: BookingService,
    private transportService: TransportService,
    private userService: UserService,
    private azureBlobStorageService: AzureBlobStorageService,
    private matDialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) {
    this.tourForm = this.formBuilder.group({
      id: [{ value: null }],
      imgUrl: [{ value: null }, Validators.required],
      destiny: [{ value: null }, Validators.required],
      title: [{ value: '' }, Validators.required],
      description: [{ value: '' }, Validators.required],
      agencyId: [{ value: null }],
      price: [{ value: null }, Validators.required],
      visible: [{ value: false }],
      meetingPointLatitude: [{ value: null }, Validators.required],
      meetingPointLongitude: [{ value: null }, Validators.required],
      destinations: [{ value: null }],
      activities: [{ value: null }],
      schedule: [{ value: null }],
    });
    this.tourForm.patchValue(this.tourPackage);
  }

  eventsSubject: Subject<void> = new Subject<void>();
  disableMapClick: Subject<boolean> = new Subject<boolean>();
  selectedDate: any;

  emitEventToChild() {
    this.eventsSubject.next();
  }

  getActivities() {
    this.activityService.getActivities().subscribe((activities) => {
      activities.forEach((item: Activity) => {
        item.selected = false;
      });
      this.activities = activities;
      //console.log(this.activities)
    });
  }

  emitDisableMapClickToChild() {
    this.disableMapClick.next(this.isOnlyViewInfo);
  }

  ngOnInit() {
    this.showSpinnerDialog();
    this.getActivities();
    this.getDepartmentsName();
    this.route.params.subscribe((params) => {
      const packageId = params['packageId'];
      this.isOnlyViewInfo = params['detail-type'] === 'detail-info';
      if (packageId != null) {
        this.title = this.isOnlyViewInfo
          ? 'Tour Package Detail'
          : 'Edit Tour Package';
        this.isEdit = true;
        this.getPackageById(packageId);
      } else {
        this.getUserLocation();
      }
      this.emitDisableMapClickToChild();
    });
  }

  getDepartmentsName() {
    this.tourPackageService.getDepartments().subscribe((departments) => {
      this.departments = departments.map((item) => item.name);
    });
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        this.setUserLocation(position),
      );
    } else {
      //console.log("Geolocation is not supported by this browser.");
    }
    this.hideSpinnerDialog();
  }

  setUserLocation(position: GeolocationPosition) {
    this.tourForm.patchValue({
      meetingPointLatitude: position.coords.latitude,
    });
    this.tourForm.patchValue({
      meetingPointLongitude: position.coords.longitude,
    });
  }

  getPackageById(packageId: number) {
    this.tourForm.reset();
    this.tourForm.patchValue({ id: packageId });

    this.tourPackageService
      .getPackageById(packageId)
      .subscribe((packageData) => {
        this.destinations = packageData.destinations;
        this.tourPackageService
          .getScheduleByPackageId(packageId)
          .subscribe((schedule: Schedule[]) => {
            packageData.schedule = schedule;
            //console.log(this.destinations)
            packageData.schedule?.forEach((schedule: Schedule) => {
              this.dayList.forEach((day: Schedule) => {
                if (day.day === schedule.day) {
                  day.hourRange = schedule.hourRange;
                  day.selected = true;
                }
              });
            });

            this.cdr.detectChanges();
            packageData.activities?.forEach((item: Activity) => {
              this.activities.forEach((activity: Activity) => {
                if (activity.id == item.id) {
                  activity.selected = true;
                }
              });
            });
            this.hideSpinnerDialog();
            this.tourPackage = packageData;
            this.tourForm.patchValue(this.tourPackage);
            if (this.isOnlyViewInfo)
              this.getBookingByTourPackageIdAndTouristId();
            this.getVehiclesByTourPackageId();
          });
      });
  }

  back() {
    if (this.isOnlyViewInfo) this.router.navigate(['peru/']);
    else this.router.navigate(['peru/tour-packages/my-packages']);
  }

  onFileSelected($event: any) {
    this.showSpinnerDialog();
    const file = $event.target.files[0];
    this.azureBlobStorageService.uploadImage(file).then((url) => {
      this.tourPackage.imgUrl = url;
      //console.log(url)
      this.tourForm.patchValue({ imgUrl: url });
      if (this.tourPackage.id) {
        this.tourPackageService
          .modifyImage(this.tourPackage.id, url)
          .subscribe();
      }
      this.hideSpinnerDialog();
    });
  }

  get hasImg() {
    return this.tourForm.get('imgUrl')?.value != null;
  }

  get isVisible() {
    return this.tourForm.get('visible')?.value;
  }

  showSpinnerDialog() {
    this.dialog = this.matDialog.open(SpinnerComponent, {
      panelClass: 'custom-dialog',
      disableClose: true,
    });
  }

  hideSpinnerDialog() {
    this.dialog?.close();
  }

  getNewLocation($event: LocationName) {
    this.tourForm.patchValue({ meetingPointLatitude: $event.latitude });
    this.tourForm.patchValue({ meetingPointLongitude: $event.longitude });
  }

  getDestinationList($event: any[]) {
    //console.log($event)
    this.destinations = $event;
  }

  removeDestination(index: number) {
    this.tourForm.get('destinations')?.value.splice(index, 1);
    if (this.tourForm.get('destinations')?.value.length === 0) {
      this.tourForm.get('visible')?.setValue(false);
    }
    this.emitEventToChild();
  }

  savePackage() {
    this.showSpinnerDialog();
    this.tourForm.patchValue({
      destinations: this.destinations,
      agencyId: this.userService.getUserIdFromCookies(),
    });
    this.tourForm.patchValue({
      activities: this.activities.filter((item) => item.selected),
    });
    this.tourPackage = Object.assign(
      {},
      this.tourForm.getRawValue(),
    ) as TourPackage;
    //console.log(this.tourPackage)
    if (this.isEdit) {
      this.tourPackageService
        .modifyPackage(this.tourPackage.id, this.tourPackage)
        .subscribe(() => {
          this.hideSpinnerDialog();
        });
    } else {
      this.tourPackageService.createPackage(this.tourPackage).subscribe(() => {
        this.hideSpinnerDialog();
        this.back();
      });
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
    });
  }

  get selectedDayList() {
    return this.dayList.filter((item) => item.selected);
  }

  saveSchedule() {
    if (this.isEdit) {
      this.showSpinnerDialog();
      this.tourPackageService
        .saveSchedule(this.tourPackage.id, this.selectedDayList)
        .subscribe(() => {
          this.hideSpinnerDialog();
          this.savePackage();
        });
      this.getPackageById(this.tourPackage.id);
    }
  }

  get cannotBeScheduleSaved() {
    return this.selectedDayList.some((item: Schedule) => {
      return (
        item.hourRange.start.hour === '' ||
        item.hourRange.start.minute === '' ||
        item.hourRange.start.dayTime === '' ||
        item.hourRange.end.hour === '' ||
        item.hourRange.end.minute === '' ||
        item.hourRange.end.dayTime === ''
      );
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
    const dayName = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(date);
    return !this.selectedDayList.some(
      (item) => item.day.toLowerCase() === dayName.toLowerCase(),
    );
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      return this.isDayDisabled(cellDate) || this.isBooked ? 'pe-none' : '';
    }
    return '';
  };

  showVisibleConfirmationMessage() {
    if (
      this.tourForm.get('visible')?.value &&
      this.selectedDayList.length === 0
    ) {
      this.dialog = this.matDialog.open(AlertMessageComponent, {
        data: {
          title: "Can't be visible",
          content:
            'This package must have at least assigned a day in the schedule to be visible.',
        },
      });
      this.dialog.afterClosed().subscribe(() => {
        this.tourForm.patchValue({ visible: false });
      });
    } else if (this.tourForm.get('destinations')?.value.length === 0) {
      this.dialog = this.matDialog.open(AlertMessageComponent, {
        data: {
          title: "Can't be visible",
          content:
            'This package must have at least one destination to be visible.',
        },
      });
      this.dialog.afterClosed().subscribe(() => {
        this.tourForm.patchValue({ visible: false });
      });
    } else if (this.vehicleList.length === 0) {
      this.dialog = this.matDialog.open(AlertMessageComponent, {
        data: {
          title: "Can't be visible",
          content: 'This package must have at least one vehicle to be visible.',
        },
      });
      this.dialog.afterClosed().subscribe(() => {
        this.tourForm.patchValue({ visible: false });
      });
    }
  }

  createBooking() {
    this.dialog = this.matDialog.open(ConfirmationMessageComponent, {
      data: {
        title: 'Are you sure to create a booking?',
        content: 'This action will create a booking for this package.',
      },
    });
    this.dialog.afterClosed().subscribe((response) => {
      if (response) {
        this.showSpinnerDialog();
        const booking: Booking = new Booking();
        booking.tourPackageId = this.tourPackage.id;
        booking.touristUserId = this.userService.getUserIdFromCookies();
        booking.selectedDate = this.selectedDate;
        booking.hourRange = this.getHourRangeByDayInSchedule(this.selectedDate);
        this.bookingService.createBooking(booking).subscribe((response) => {
          //console.log(response);
          this.getBookingByTourPackageIdAndTouristId();
          this.hideSpinnerDialog();
          // this.router.navigate(['peru/tour-packages/my-packages']);
        });
      }
    });
  }

  getBookingByTourPackageIdAndTouristId() {
    this.bookingService
      .getBookingByTourPackageIdAndTouristId(
        this.tourPackage.id,
        this.userService.getUserIdFromCookies(),
      )
      .subscribe((response) => {
        this.booking = response;
        //console.log(this.booking)
        if (response) {
          this.selectedDate = new Date(response.tourDate);
          this.booking.selectedDate = new Date(response.tourDate);
        }
        //console.log(this.selectedDate)
      });
  }

  get isBooked() {
    return this.booking != null;
  }

  getHourRangeByDayInSchedule(date: Date) {
    const dayName = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(date);
    return this.tourPackage.schedule.find((item) => item.day === dayName)
      ?.hourRange;
  }

  get getDateStringOfBooking() {
    //format: 2021-08-01
    const date = new Date(this.booking!.selectedDate);
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  }

  openAddVehicleDialog() {
    const previousVehicle =
      this.vehicleList.length > 0 ? this.vehicleList[0] : null;
    this.dialog = this.matDialog.open(AddVehicleModalComponent, {
      data: {
        vehicle: previousVehicle,
      },
    });
    this.dialog.afterClosed().subscribe((vehicle: Vehicle) => {
      if (vehicle) {
        this.transportService
          .assignVehicle(vehicle.id, this.tourPackage.id)
          .subscribe(() => {
            this.getVehiclesByTourPackageId();
          });
      }
    });
  }

  private getVehiclesByTourPackageId() {
    this.showSpinnerDialog();
    this.transportService
      .getAssignedVehiclesByTourPackageId(this.tourPackage.id)
      .subscribe((vehicles: Vehicle[]) => {
        this.vehicleList = vehicles;
        this.validateEmptyVehicleList();
        this.hideSpinnerDialog();
      });
  }

  removeVehicle(item: Vehicle) {
    this.dialog = this.matDialog.open(ConfirmationMessageComponent, {
      data: {
        title: 'Are you sure to remove this vehicle?',
        content:
          'This action will remove the vehicle with plate ' +
          item.plate +
          ' from this tour package.',
        confirmationButtonText: 'Remove',
        confirmationIcon: 'delete',
        className: 'bg-danger',
      },
    });
    this.dialog.afterClosed().subscribe((response) => {
      if (response) {
        this.showSpinnerDialog();
        this.transportService
          .removeAssignedVehicle(item.id, this.tourPackage.id)
          .subscribe(() => {
            this.hideSpinnerDialog();
            this.getVehiclesByTourPackageId();
          });
      }
    });
  }

  validateEmptyVehicleList() {
    if (this.vehicleList.length === 0) {
      this.tourForm.patchValue({ visible: false });
    }
  }

  filter(): void {
    const filterValue = this.input!.nativeElement.value.toLowerCase();
    this.filteredOptions = this.departments.filter((o) =>
      o.toLowerCase().includes(filterValue),
    );
  }
}
