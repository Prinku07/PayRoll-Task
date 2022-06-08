import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @ViewChild('imageFileInput', { static: false }) imageFileInput: ElementRef;

  addTaskForm : FormGroup
  displayFileName: string = '';
  isLoading : boolean = false;

  constructor(private fb : FormBuilder) { }


  ngOnInit(): void {
   this.createform();
  }

  createform(){
    this.addTaskForm = this.fb.group({
      Title: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Description: ['', Validators.required],
      Image : ['', Validators.required],
      LeadId : ['', Validators.required],
      TaskEndDateDisplay : ['', Validators.required],
      Priority : ['',Validators.required],
      UserDisplayIds : ['', Validators.required],
      TaskDisplayOwners  : ['', Validators.required]
    });
  }

 

  openFile() {
    this.imageFileInput.nativeElement.click();
  }

  Save(){ 
    if(this.addTaskForm.invalid) {
      this.addTaskForm.markAllAsTouched();
      return;
    }
  }

  handleFileSelect(inputValue: any): void {
    // if (inputValue.files[0] && inputValue.files[0].size < 5000000) {
    //   var file = inputValue.files[0];
    //   this.displayFileName = file.name;
    //   this.imageName = this.displayFileName.replace(/\\/g, "/");
    //   this.imageName = (/[^/]*$/.exec(this.imageName)[0]);
    //   this.imageExt = (/[^.]*$/.exec(this.imageName)[0]);
    //   this.imageName = this.imageName.substring(0, this.imageName.lastIndexOf('.'));
    //   var reader = new FileReader();
    //   reader.onload = (e: any) => {
    //     var binaryData = e.target.result;
    //     var base64String = btoa(binaryData);
    //     var imagePath = base64String;
    //     this.addTaskForm.patchValue({
    //       Image: imagePath
    //     });
    //   }
    //   reader.readAsBinaryString(file);
    // } else if (inputValue.files[0] && inputValue.files[0].size > 5000000) {
    //   this.toastrService.error('File size is greater than 5MB');
    //   this.chRef.detectChanges();
    // }
  }

  removeFile() {
    // this.imageFileInput.nativeElement.value = '';
    // this.displayFileName = '';
    // this.addTaskForm.patchValue({
    //   Image: '',
    //   MultimediaData: '',
    //   MultimediaExtension: '',
    //   MultimediaFileName: '',
    //   MultimediaType: ''
    // });
  }

  openMembers(){

  }


  }


