import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => this.toastr.error(err.error)
    })
  }

}
