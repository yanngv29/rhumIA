import { Component  } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user = {
    username: '',
    email: '',
    // Add any other user profile fields
  };

    constructor(private formBuilder: FormBuilder) { }

  profileForm = this.formBuilder.group({
    username: [''],
    email: [''],
    // Add any other user profile fields
  });

  saveProfile(): void {
    // Handle form submission and save the user profile
    console.log('Save profile:', this.profileForm.value);
  }
}

