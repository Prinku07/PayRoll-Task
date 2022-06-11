import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { MytaskService } from 'src/app/core/my-task/mytask.service';
import { AddMembersComponent } from '../add-members/add-members.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @ViewChild('imageFileInput', { static: false }) imageFileInput: ElementRef;

  addTaskForm : FormGroup
  isLoading : boolean = false;
  //Image
  displayFileName: string = '';
  imageName : string = '';
  imageExt : string = '';
  MultimediaLink: any = '';
  //date
  current = new Date();
  //userId 
  userIds: any = [];
  memberList: any = [];
//lead data 
leadFilter: any;
pageData = {
  From: 1,
  To: -1,
  Text: '',
}
customerList : any;
userDetails: any;
  //taskowners
  taskOwners: any = [];
  //counts 
  assignedToCount: number = 0;
  taskOwnerCount : number = 0;
  memberLength: number = 0;
  userLength: number = 0;

  //edit
  taskDetails : any

  constructor(private fb : FormBuilder,
    private toastrService : ToastrService,
    private chRef : ChangeDetectorRef ,
    private dialog : MatDialog,
    private taskservice : MytaskService,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      this.dialogRef.disableClose = true;
      this.dialogRef.backdropClick().subscribe(_ => {
        let cn = confirm('Do you want to leave without finishing?')
        if (cn) {
          this.dialogRef.close();
        }
      })
    }

  ngOnInit(): void {
   this.createform();
   this.getCustomerList();
  }

  createform(){
    this.addTaskForm = this.fb.group({
      Title: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Description: ['', Validators.required],
      Image : ['', Validators.required],
      MultimediaData: [''],
      MultimediaExtension: [''],
      MultimediaFileName: [''],
      MultimediaType: [''],
      LeadId : ['', Validators.required],
      TaskEndDateDisplay : ['', Validators.required],
      Priority : ['',Validators.required],
      UserDisplayIds : ['', Validators.required],
      UserIds: [''],
      TaskDisplayOwners  : ['', Validators.required],
      TaskOwners : ['']
    });
  }

  getCustomerList() {
    this.taskservice.getCustomerList(this.pageData)
      .pipe(map(res => {
        this.customerList = res.data.Leads;
        this.leadFilter = this.customerList;
      }
      ))
      .subscribe()
  }

  getvalidity(){
    if(this.addTaskForm.controls['Image'].invalid &&
     this.addTaskForm.controls['Image'].touched && 
     this.addTaskForm.controls['Image'].pristine){
     return true;
    }else{
      return false;
    }
  }
 
  openFile() {
    this.imageFileInput.nativeElement.click();
  }

  Save(){ 
    if(this.addTaskForm.invalid){
    this.addTaskForm.markAllAsTouched();
      return;
    }
      const controls = this.addTaskForm.controls;
      controls['UserIds'].setValue(this.userIds);
      controls['TaskOwners'].setValue(this.taskOwners);
      let imageData = controls['Image'].value;
      controls['MultimediaData'].setValue(imageData);
      controls['MultimediaExtension'].setValue(this.imageExt);
      controls['MultimediaFileName'].setValue(this.imageName);

      if (this.imageExt == 'jpeg' || this.imageExt == 'JPEG' || this.imageExt == 'jpg' ||
        this.imageExt == 'JPG' || this.imageExt == 'png' || this.imageExt == 'PNG' || this.imageExt == 'svg'
        || this.imageExt == 'SVG') {
        controls['MultimediaType'].setValue('I');
      }
      else {
        if (this.imageExt) {
          controls['MultimediaType'].setValue('D');
        } else {
          controls['MultimediaType'].setValue('');
        }
      }
     this.isLoading = true;
    console.log(this.addTaskForm.value)
      // this.taskservice.addTask(this.addTaskForm.value)
      //   .pipe(map(res => {
      //     if (res.Status == 200) {
      //       this.dialogRef.close({ res, isEdit: false });
      //     this.isLoading = false;
      //     }
          
      //   })).subscribe();
  }

  handleFileSelect(inputValue: any): void {
    if (inputValue.files[0] && inputValue.files[0].size < 5000000) {
      var file = inputValue.files[0];
      this.displayFileName = file.name;
      this.imageName = this.displayFileName.replace(/\\/g, "/");
      this.imageName = this.imageName.substring(0, this.imageName.lastIndexOf('.'));
      var reader = new FileReader();
      reader.onload = (e: any) => {
        var binaryData = e.target.result;
        var base64String = btoa(binaryData);
        var imagePath = base64String;
        this.addTaskForm.patchValue({
          Image: imagePath
        });
      }
      reader.readAsBinaryString(file);
    } else if (inputValue.files[0] && inputValue.files[0].size > 5000000) {
      this.toastrService.error('File size is greater than 5MB');
      this.chRef.detectChanges();
    }
  }

  openMembers(controlname : any){
    const controls = this.addTaskForm.controls;
    let params;
    if (controlname == 'UserIds') {
    
      controlname = controls['UserDisplayIds'];
      params = { usersIds: this.userIds, controlname: 'UserIds' };
    }
    else {
      controlname = controls['TaskDisplayOwners'];
      params = { usersIds: this.taskOwners, controlname: 'TaskOwner' };
    }
    const dialogRef = this.dialog.open(AddMembersComponent, { data: params, width: '400px' });
    dialogRef.afterClosed().subscribe(res => {
      if (!res)
        return
      if (controlname == controls['UserDisplayIds']) {
        this.userIds = [];
        this.assignedToCount = 0
        res.members.forEach((result : any)=> {
          if (!this.userIds.includes(result.UserId)){
            this.userIds.push(result.UserId);
            this.assignedToCount+=1;
          }
        })
      }
      else {
        this.taskOwners = [];
        this.taskOwnerCount = 0
        res.members.forEach((result : any) => {
          if (!this.taskOwners.includes(result)){
            this.taskOwnerCount+=1; 
              this.taskOwners.push(result);
          }     
        })
      }
      this.memberLength = this.taskOwners.length;
      if (this.taskOwners.length <= 1 && controlname == controls['TaskDisplayOwners']) {
        controlname.setValue(this.taskOwners.length + ' User');
      }
      if (this.taskOwners.length > 1 && controlname == controls['TaskDisplayOwners']) {
        controlname.setValue(this.taskOwners.length + ' Users');
      }
      this.userLength = this.userIds.length;
      if (this.userIds.length <= 1 && controlname == controls['UserDisplayIds']) {
        controlname.setValue(this.userIds.length + ' User');
      }
      if (this.userIds.length > 1 && controlname == controls['UserDisplayIds']) {
        controlname.setValue(this.userIds.length + ' Users');
      }
    });
  }
   //Search Customer 
   searchManager(searchText: string, type: string) {
    if (type == 'lead') {
      if (searchText != '') {
        this.leadFilter = this.customerList.filter((item : any)=> {
          if (item.LeadName.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
            return true;
          }
          return false;
        }
        );
      }
      else {
        this.leadFilter = this.customerList;
      }
    } 
  }
  //End

  }



