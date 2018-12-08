import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validator, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta'
import { Student } from './app.student.modle';
import { StudentService } from './student.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ng7Crud';
  insertForm: FormGroup;
  updateForm: FormGroup;

  globalResponse: any;
  inputStudentForm: Student[];
  allStudents: Student[];
  selectedStudents: Student[];
  idValue=0;

  toastOptions: ToastOptions = {
    title: "Success",
    msg: "test",
    showClose: true,
    timeout: 7000
  };

  constructor(private toastaService: ToastaService, private toastaConfig: ToastaConfig, private fb: FormBuilder, private stuService: StudentService) {
    this.toastaConfig.theme = "default";
  }

  ngOnInit() {
    this.insertForm = this.fb.group(
      {
        Name: ['', [Validators.required]],
        Phone: ['', [Validators.required]],
        Email: ['', [Validators.required]],
      }
    );
    this.updateForm = this.fb.group(
      {
        Name: ['', [Validators.required]],
        Phone: ['', [Validators.required]],
        Email: ['', [Validators.required]],
      }
    );
  }
  Save() {
    this.inputStudentForm = this.insertForm.value;
    this.stuService.insertStudent(this.inputStudentForm)
      .subscribe((result) => {
        this.globalResponse = result;
      },
        error => {
          console.log(error.message)
          this.toastOptions.msg = error.message;
          this.toastOptions.title = "Error";
          this.toastaService.error(this.toastOptions);
        },
        () => {
          this.toastOptions.msg = "Record inserted successfully.";
          this.toastOptions.title = "Success";
          this.toastaService.success(this.toastOptions);
          this.insertForm.reset();
        });
  }
  Update() {
    this.inputStudentForm = this.insertForm.value;
    this.stuService.updateStudent(this.idValue, this.selectedStudents)
      .subscribe((result) => {
        this.globalResponse = result;
      },
        error => {
          console.log(error.message)
          this.toastOptions.msg = error.message;
          this.toastOptions.title = "Error";
          this.toastaService.error(this.toastOptions);
        },
        () => {
          this.toastOptions.msg = "Record Updated successfully.";
          this.toastOptions.title = "Success";
          this.toastaService.success(this.toastOptions);
          this.updateForm.reset();
        });
  }
  Delete() {
    this.stuService.deleteStudent(this.idValue)
      .subscribe((result) => {
        this.globalResponse = result;
      },
        error => {
          console.log(error.message)
          this.toastOptions.msg = error.message;
          this.toastOptions.title = "Error";
          this.toastaService.error(this.toastOptions);
        },
        () => {
          this.toastOptions.msg = "Record Delete successfully.";
          this.toastOptions.title = "Success";
          this.toastaService.success(this.toastOptions);
        });
  }
  GelAllStudents() {
    this.inputStudentForm = this.insertForm.value;
    this.stuService.getAllStudents()
      .subscribe((result) => {
        this.globalResponse = result;
      },
        error => {
          console.log(error.message)
          this.toastOptions.msg = error.message;
          this.toastOptions.title = "Error";
          this.toastaService.error(this.toastOptions);
        },
        () => {
          this.allStudents=this.globalResponse;
          this.toastOptions.msg = "Record retrieved successfully.";
          this.toastOptions.title = "Success";
          this.toastaService.success(this.toastOptions);

        });
  }
  GetSelectedStudents(stu:any)
  {
    this.selectedStudents=stu;

    //Assign selected student to update form
    this.updateForm.controls["Name"].setValue(this.selectedStudents["Name"]);
    this.updateForm.controls["Phone"].setValue(this.selectedStudents["Phone"]);
    this.updateForm.controls["Email"].setValue(this.selectedStudents["Email"]);

    this.idValue=this.selectedStudents["Id"]
  }


  Messagetest() {
    this.toastaService.success(this.toastOptions);
  }

}
