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

    // method valueChanges dc 1 cái là phải tác động giá trị trong input
    // thì nó mới hiện lỗi hay ko
    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    // window.alert(`Hello ${this.form.value.name}. Thank you, you have registered`);
    console.log(this.register);
    console.log(this.form.value);

    this.register = true;
    this.form.reset({
      name: '',
      usernam: '',
      email: '',
      password: ''
    });
  }

  formErrors = {
    'name': '',
    'username': '',
    'email': '',
    'password': ''
  };

  validationMessages = {
    'name': {
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'username': {
      'required':      'Username is required.',
      'minlength':       'Username must be at least 3 characters long.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
    'password': {
      'required':      'Password is required.'
    }
  };

  // copy
  onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onRemove() {
    this.removeIntruction.nativeElement.remove();
  }
}
