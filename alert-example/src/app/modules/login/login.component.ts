import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  providers: [AlertService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  constructor(private alertService: AlertService) {

  }
  open() {
    this.alertService.showAlert("Prueba de alerta", 'success')
  }
}
