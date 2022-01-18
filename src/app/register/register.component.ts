import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,NgForm,NgModel, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomvalidatorService } from '../services/customvalidator.service';
import { SharedService } from '../services/shared.service';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegistration:FormGroup;

  submitted = false;



  constructor(private sharedService: SharedService,private fb:FormBuilder,
    private router:Router, private customValidator: CustomvalidatorService,
    private toast:ToastrService,private http: HttpClient) { }


ngOnInit(): void {
  this.createRegisterform()
}
fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;




  fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('files', this.fileData);

    this.fileUploadProgress = '0%';

    this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        console.log(events.body);
        alert('SUCCESS !!');
      }

    })
}

register(){
  var body = {
    userName: this.userRegistration.value.userName,
    email: this.userRegistration.value.email,
    password: this.userRegistration.value.password,
  };

  return this.sharedService.sendPostRequest(body).subscribe(data=>{console.log(data);   this.toast.success('Successful');this.router.navigateByUrl('/login')});

}
createRegisterform(){
  this.userRegistration = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    });
  }
  get registerFormControl() {
    return this.userRegistration.controls;
  }

}
