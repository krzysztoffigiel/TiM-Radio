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
  // ngb pagination
  page: number = 1;
  pageSize: number = 10;

  fileUploadForm: FormGroup;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  fileUploads: any[];

  isGreetingsVisible: boolean = true;
  isUploadFileVisible: boolean = false;

  constructor(public auth: AuthService, private router: Router, public greetingsService: GreetingsService, private modalService: NgbModal,
    private uploadService: FileUploadService) {
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
  }

  changeUploadFileVisibility() {
    this.isGreetingsVisible = false;
    this.isUploadFileVisible = true;
  }



}
