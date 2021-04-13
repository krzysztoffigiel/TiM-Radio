import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/file-upload.service';
import { FileUpload } from 'src/app/models/files.model';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.less']
})
export class UploadDetailsComponent implements OnInit {
  @Input() fileUpload: FileUpload;
  
  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  deleteFileUpload(fileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

}
