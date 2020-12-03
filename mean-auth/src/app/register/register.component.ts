import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // name: string;
  // username: string;
  // email: string;
  // password: string;
  form: FormGroup;

  register: boolean;
  @ViewChild('remove') private removeIntruction: ElementRef;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.register = this.form.invalid ? false : true;

  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(2), Validators.maxLength(25)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    // window.alert(`Hello ${this.form.value.name}. Thank you, you have registered`);
    console.log(this.register);
    console.log(this.form.value);
    this.removeIntruction.nativeElement.add();

    this.register = true;
    this.form.reset({
      name: '',
      usernam: '',
      email: '',
      password: ''
    });
  }

  onRemove() {
    this.removeIntruction.nativeElement.remove();
  }
}
