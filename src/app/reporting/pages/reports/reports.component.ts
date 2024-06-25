import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Report } from '../../models/report.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TourPackage } from 'src/app/tour-experience/models/tour-package.model';
import { TourPackageService } from 'src/app/tour-experience/services/tour-package.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from '../../../shared/services/settings.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { Agency } from 'src/app/iam/models/agency.model';
import { AgencyService } from 'src/app/iam/services/agency.service';
import { ReportService } from '../../services/reports.service';
import { CookieService } from 'ngx-cookie-service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {

  reports: Report[] = []
  agencyId: string = "BNqsE6gkjlZoEVIxf9qt92lXyJB3";
  agency: Agency = new Agency();
  averageRatingLineChart: Chart = new Chart();
  tourPackages: TourPackage[] = [];
  showVisiblePackage: boolean = true;
  showHiddenPackage: boolean = true;
  packagesSelected: TourPackage[] = [];
  selectedTourPackage: TourPackage = new TourPackage();
  token: string = '';
  reportsFromSelectedPackage: Report[] = [];

  private dialogRef: MatDialogRef<SpinnerComponent> | undefined;
  constructor(
    private searchService: TourPackageService,
    private agencyService: AgencyService,
    private settingsService: SettingsService,
    private reportService: ReportService,
    private matDialog: MatDialog,
    private cookieService: CookieService,
    public dialog: MatDialog,
  ) {
    this.token = this.cookieService.get('JSESSIONID') || '';
  }

  getReports() {
    this.reportService.getReportByAgencyId(this.agency.id).subscribe((reports) => {
      this.reports = reports;
    });
  }

  updateChart() {
    this.reportsFromSelectedPackage = [];
    for (const report of this.reports) {
      if (report.tourPackageIds.includes(this.selectedTourPackage.id)) {
        this.reportsFromSelectedPackage.push(report);
      }
    }

    console.log(this.reportsFromSelectedPackage);

    this.averageRatingLineChart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: `Average Rating of the tour package ${this.selectedTourPackage.title}`
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.reportsFromSelectedPackage.map(report => formatDate(report.generatedDate, 'dd/MM/yyyy', 'en'))
      },
      series: [
        {
          type: 'line',
          name: 'Average Rating',
          data: this.reportsFromSelectedPackage.map(report => report.averageRating)
        }
      ]
    });
  }

  ngOnInit() {
    this.showSpinnerDialog();
    this.agencyService.getAgencyByUserId(this.agencyId).subscribe((agency) => {
      this.agency = agency;
      this.getReports();
    })
    this.searchService.getAllVisiblePackagesByAgencyByAgencyId(this.agencyId).subscribe((packages) => {
      this.tourPackages = packages;
      if (this.tourPackages.length > 0) {
        this.selectedTourPackage = this.tourPackages[0];
        this.updateChart();
      }
      this.hideSpinnerDialog();
    });
    this.settingsService.setDefaultLayout();
  }

  showSpinnerDialog() {
    this.dialogRef = this.matDialog.open(SpinnerComponent, {
      panelClass: 'custom-dialog',
      disableClose: true,
    });
  }

  hideSpinnerDialog() {
    this.dialogRef?.close();
  }

  onCheckboxChange(e: any, tourPackage: TourPackage) {
    if (e.target.checked) {
      this.packagesSelected.push(tourPackage);
    } else {
      this.packagesSelected = this.packagesSelected.filter(p => p !== tourPackage);
    }
  }

  onDropdownChange(e: any) {
    const selectedPackageId = e.target.value;
    this.selectedTourPackage = this.tourPackages.find(pkg => pkg.id === parseInt(selectedPackageId)) || new TourPackage();
    this.updateChart();
  }

  generateReport() {
    console.log("Generating report")
    const tourPackageIds = this.packagesSelected.map(p => p.id);
    console.log(tourPackageIds)
    this.reportService.createReport(this.agency.id, tourPackageIds, this.token).subscribe((report) => {
      this.reports.push(report);
      this.updateChart();
      console.log(report);
    });
  }

  formatDate(date: string, format: string) {
    return formatDate(date, 'dd/MM/yyyy', 'en');
  }
}
