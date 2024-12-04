import { ApplicationRef, ChangeDetectorRef, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // isVisible$ = signal(false);
  // message$ = signal('');
  // type$ = signal<'success' | 'error' | 'warning' | 'info'>('info');

  // showAlert(message: string, type: 'success' | 'error' | 'warning' | 'info') {
  //   this.isVisible$.set(true);
  //   this.message$.set(message);
  //   this.type$.set(type);
  // }

  // hide() {
  //   this.isVisible$.set(false);
  // }
  private isShowAlert = new BehaviorSubject<boolean>(false);
  private alertMessage = new BehaviorSubject<string>('');
  private typeSource = new BehaviorSubject<'success' | 'error' | 'warning' | 'info'>('info');
  public message$ = this.alertMessage.asObservable();
  public type$ = this.typeSource.asObservable();
  public isVisible$ = this.isShowAlert.asObservable();

  constructor(
  ) { }

  showAlert(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    console.log("1.-Entra el servicio")
    this.alertMessage.next(message);
    this.typeSource.next(type);
    this.isShowAlert.next(true);
    setTimeout(() => {
      this.hideAlert();
    }, 5000);
  }

  hideAlert(): void {
    this.isShowAlert.next(false);
  }

  closeAlert(): void {
    this.hideAlert();
  }

  // private alertsSignal = signal<Alert[]>([]); // Signal para almacenar las alertas
  // private nextId = 1; // ID incremental para cada alerta

  // // Getter para acceder al signal
  // get alerts() {
  //   return this.alertsSignal();
  // }

  // // Mostrar una nueva alerta
  // showAlert(type: 'success' | 'error' | 'warning' | 'info', message: string) {
  //   const alert: Alert = {
  //     id: this.nextId++, // Asignar un ID único
  //     type,
  //     message,
  //   };
  //   this.alertsSignal.set([...this.alertsSignal(), alert]); // Actualizar el signal

  // }

  // // Remover una alerta específica
  // removeAlert(alert: Alert) {
  //   this.alertsSignal.set(this.alertsSignal().filter(a => a.id !== alert.id));
  // }
  // private toastSubject = new BehaviorSubject<Alert>({ message: '', type: 'info' });
  // toast$ = this.toastSubject.asObservable();

  // private toastVisibility = new BehaviorSubject<boolean>(false);
  // toastVisibility$ = this.toastVisibility.asObservable();

  // open(toast: Alert) {
  //   this.toastSubject.next({ ...toast });
  //   this.toastVisibility.next(true);
  //   console.log("activa")
  //   setTimeout(() => {
  //     this.toastVisibility.next(false);
  //   }, 2000);
  // }
}
