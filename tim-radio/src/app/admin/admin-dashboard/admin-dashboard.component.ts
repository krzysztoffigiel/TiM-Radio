import { RadioProgram } from './../../radio-program.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { User } from './../../user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from "../../shared/services/user";
import { GreetingsService } from 'src/app/greetings.service';
import { Greetings } from 'src/app/models/greetings.model';
import * as moment from 'moment';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { GreetingDeleteModalComponent } from '../greeting-delete-modal/greeting-delete-modal.component';
import { FileUploadService } from 'src/app/file-upload.service';
import { FileUpload } from 'src/app/models/files.model';
import { map } from 'rxjs/operators';
import { RadioProgramService } from 'src/app/radio-program.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.less']
})
export class AdminDashboardComponent implements OnInit {

  userInfo: User;
  greetingsList: Array<Greetings> = [];
  title = 'Uwaga!';
  closeResult: string;
  modalOptions: NgbModalOptions;

  // forms
  fileUploadForm: FormGroup;
  radioProgramForm: FormGroup;

  // ngb pagination
  page: number = 1;
  pageSize: number = 10;

  // file management
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  fileUploads: any[];

  radioProgram: RadioProgram;

  // tabs visibility
  isGreetingsVisible: boolean = true;
  isUploadFileVisible: boolean = false;
  isRadioProgramVisible: boolean = false;

  constructor(public auth: AuthService, private router: Router, public greetingsService: GreetingsService, private modalService: NgbModal,
    private uploadService: FileUploadService, private radioProgramService: RadioProgramService) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit(): void {

    this.fileUploadForm = new FormGroup({
      file: new FormControl(null, Validators.required),
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
    });

    this.radioProgramForm = new FormGroup({
      monday: new FormControl("", Validators.required),
      tuesday: new FormControl("", Validators.required),
      wednesday: new FormControl("", Validators.required),
      thursday: new FormControl("", Validators.required),
      friday: new FormControl("", Validators.required),
      saturday: new FormControl("", Validators.required),
      sunday: new FormControl("", Validators.required),
    });

    this.getUserInfo();
    this.getGreetings();
    moment.locale('pl');
    this.getFileList();
  }

  getGreetings() {
    this.greetingsService.getGreetings().subscribe((data: any) => {
      this.greetingsList = (data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Greetings
      })).sort((a, b) => {
        return b?.date?.seconds - a?.date?.seconds;
      });
      console.log('Greetings from admin dashboard: ', this.greetingsList)
    })
  }

  changeGreetingStatus(greeting) {
    this.greetingsService.updateGreetingStatus(greeting);
  }

  deleteGreeting(greeting, modalContent?) {
    this.modalService.open(modalContent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log('Greeting delete confirmation modal accept: ', result);
      this.greetingsService.deleteGreeting(greeting).then(result => {
        console.log('Delete greeting result: ', result);
      }).catch(err => {
        console.error('Delete greeting error: ', err);
      });
    }, (reason) => {
      console.log('Greeting delete confirmation modal dismissed: ', reason);
    })

  }

  sortGreetingsByDate(greetingsArray) {
    return greetingsArray.sort((a, b) => {
      return b?.date?.seconds - a?.date?.seconds;
    });
  }

  checkLastGreetings(date) {
    var currentDate = moment();
    var diff = currentDate.diff(moment.unix(date), 'h')

    if (diff <= 5) return true;
    else return false;
  }

  parseDate(date) {
    return moment.unix(date).format('dddd, MMMM Do, YYYY h:mm:ss A');
  }

  parseDateFromNow(date) {
    return moment.unix(date).fromNow();
  }

  getUserInfo() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  }

  navigateTo(url: any) {
    this.router.navigate(url);
  }

  openGreetingDeleteConfirmationModal() {
    this.modalService.open(GreetingDeleteModalComponent);
  }

  // operations with files 

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.fileUploadForm.get('title').value, this.fileUploadForm.get('description').value).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        this.getFileList();
      },
      error => {
        console.log(error);
      }
    );
  }

  getFileList() {
    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      console.log('FileUploads: ', this.fileUploads);
    });
  }

  changeGreetingsVisibility() {
    this.isGreetingsVisible = true;
    this.isUploadFileVisible = false;
    this.isRadioProgramVisible = false;
  }

  changeUploadFileVisibility() {
    this.isGreetingsVisible = false;
    this.isUploadFileVisible = true;
    this.isRadioProgramVisible = false;
  }

  changeRadioProgramVisibility() {
    this.isGreetingsVisible = false;
    this.isUploadFileVisible = false;
    this.isRadioProgramVisible = true;
    this.setRadioProgramForm();
  }

  updateRadioProgram() {
    this.radioProgramService.updateRadioProgram(
      this.radioProgramForm.get('monday').value,
      this.radioProgramForm.get('tuesday').value,
      this.radioProgramForm.get('wednesday').value,
      this.radioProgramForm.get('thursday').value,
      this.radioProgramForm.get('friday').value,
      this.radioProgramForm.get('saturday').value,
      this.radioProgramForm.get('sunday').value
    );
  }

  setRadioProgramForm() {
    this.radioProgramService.getRadioProgram().subscribe((data: any) => {
      this.radioProgram = (data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as RadioProgram
      }))
      this.radioProgramForm.patchValue({
        monday: this.radioProgram[0].monday,
        tuesday: this.radioProgram[0].tuesday,
        wednesday: this.radioProgram[0].wednesday,
        thursday: this.radioProgram[0].thursday,
        friday: this.radioProgram[0].friday,
        saturday: this.radioProgram[0].saturday,
        sunday: this.radioProgram[0].sunday,
      });
      console.log('Radio Program: ', this.radioProgram)
    })
  }
}
