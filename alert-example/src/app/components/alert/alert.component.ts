import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, NO_ERRORS_SCHEMA, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { distinctUntilChanged, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  providers: [
    AlertService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AlertComponent implements OnInit {
  // -----------------------------FORMA 1-----------------------------
  //   @Input() isShowAlert: boolean = false;
  //   @Input() message: string = '';
  //   @Input() type!: 'success' | 'error' | 'warning' | 'info';
  //   @Input() showCloseButton: boolean = true;
  //   @Input() duration: number = 4000;


  //   public title: string = '';

  //   @Output() alertClosed = new EventEmitter<void>(); // Emite cuando la alerta es cerrada

  //   constructor() { }

  //   ngOnChanges(changes: SimpleChanges): void {
  //     if (changes['showAlert'] && this.isShowAlert) {
  //       setTimeout(() => {
  //         this.closeAlert();
  //       }, this.duration);
  //     }
  //   }

  //   ngOnInit() {
  //     this.getTitle();
  //   }

  //   closeAlert() {
  //     this.isShowAlert = false;

  //     this.alertClosed.emit();
  //   }
  //   getTitle(): void {
  //     switch (this.type) {
  //       case 'success':
  //         this.title = 'Correcto'
  //         break;
  //       case 'error':
  //         this.title = "Error"
  //         break;
  //       case 'info':
  //         this.title = "Atencion"
  //         break;
  //       case 'warning':
  //         this.title = "Alerta"
  //     }
  //   }
  // ---------------------------FORMA 2 =------------------------------
  public title: string = '';
  private subscriptions: Subscription[];
  private alertService = inject(AlertService);
  isShowAlert = false;
  message = '';
  type: 'success' | 'error' | 'warning' | 'info' = 'info';

  constructor() {
    this.subscriptions = [];

  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.alertService.message$.subscribe((data) => {
        console.log(data)
        this.message = data

      }),
      this.alertService.isVisible$.subscribe((show) => {
        console.log(show)
        this.isShowAlert = show

      })
      ,
      this.alertService.type$.subscribe((type) => {
        console.log(type)
        this.type = type
        this.getTitle()
      })
    )
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());

  }
  getTitle(): void {
    switch (this.type) {
      case 'success':
        this.title = 'Correcto'
        break;
      case 'error':
        this.title = "Error"
        break;
      case 'info':
        this.title = "Atencion"
        break;
      case 'warning':
        this.title = "Alerta"
    }
  }
  // ------------------------ FORMA 3 CON SIGNALS ---------------------------------
  // message$: any
  // type$: any
  // isVisible$: any
  // title$ = signal('');

  // constructor(private alertService: AlertService) {
  //   this.isVisible$ = this.alertService.isVisible$;
  //   this.message$ = this.alertService.message$;
  //   this.type$ = this.alertService.type$;
  // }

  // ngOnInit(): void {
  //   this.type$.subscribe((type: any) => {
  //     switch (type) {
  //       case 'success':
  //         this.title$.set('Correcto');
  //         break;
  //       case 'error':
  //         this.title$.set('Error');
  //         break;
  //       case 'info':
  //         this.title$.set('Atención');
  //         break;
  //       case 'warning':
  //         this.title$.set('Alerta');
  //     }
  //   });
  // }
  // constructor(private alertService: AlertService, private cdr: ChangeDetectorRef) {
  //   console.log("renderiza el alert component");
  //   // Inicialización en el constructor
  //   this.isShowAlert$ = this.alertService.isVisible$;
  //   this.message$ = this.alertService.message$;
  //   this.type$ = this.alertService.type$;

  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log("detecta cambios")
  //   console.log(changes);
  //   this.isShowAlert$ = this.alertService.isVisible$;
  //   this.message$ = this.alertService.message$;
  // }


  // Detecta manualmente los cambios cuando los observables cambian
  // this.isShowAlert$.subscribe(() => this.cdr.detectChanges());
  // this.message$.subscribe(() => this.cdr.detectChanges());
  // this.alertService.registerChangeDetector(this.cdr);

  closeAlert(): void {
    this.alertService.closeAlert();
  }
  // ngAfterViewInit() {
  //   this.alertService.message$.pipe(
  //     distinctUntilChanged(), // Filtra valores repetidos
  //     tap(value => {
  //       this.message = value;
  //       this.cdr.detectChanges();
  //     })
  //   ).subscribe();
  //   this.alertService.message$.pipe(
  //     distinctUntilChanged(), // Evitar actualizaciones innecesarias si el valor no cambia
  //     tap(value => {
  //       console.log('Nuevo valor recibido:', value); // Debugging
  //       this.message = value;
  //       this.cdr.markForCheck(); // Marca el componente para revisión de cambios
  //     })
  //   ).subscribe();

  // }
  // ngOnInit(): void {
  //   this.alertService.message$.pipe(
  //     distinctUntilChanged(), // Evitar actualizaciones innecesarias si el valor no cambia
  //     tap(value => {
  //       console.log('Nuevo valor recibido:', value); // Debugging
  //       this.message = value;
  //       this.cdr.markForCheck(); // Marca el componente para revisión de cambios
  //     })
  //   ).subscribe();
  //   this.alertService.isVisible$.pipe(
  //     distinctUntilChanged(), // Evitar actualizaciones innecesarias si el valor no cambia
  //     tap(value => {
  //       console.log('Nuevo valor recibido:', value); // Debugging
  //       this.isShowAlert = value;
  //       this.cdr.markForCheck(); // Marca el componente para revisión de cambios
  //     })
  //   ).subscribe();

  //   this.alertService.message$.pipe(
  //     tap(value => {
  //       // Aquí puedes realizar acciones cuando el valor cambia
  //       console.log('Nuevo valor:', value);
  //       this.cdr.markForCheck();
  //       // Actualizar variables locales o llamar a otros métodos
  //     })
  //   ).subscribe();

  //   this.alertService.message$.subscribe((msg) => {
  //     this.message = msg;
  //     this.cdr.detectChanges(); // Forzar la detección de cambios si es necesario
  //   });

  //   this.alertService.type$.subscribe((type) => {
  //     this.type = type;
  //     this.getTitle();
  //     this.cdr.detectChanges();
  //   });

  //   this.alertaSubscription = this.alertService.isVisible$.subscribe((visible) => {
  //     this.isShowAlert = visible;
  //     this.cdr.detectChanges(); // Forzar la detección de cambios
  //   });
  // }

  // getTitle(): void {
  //   switch (this.type) {
  //     case 'success':
  //       this.title = 'Correcto';
  //       break;
  //     case 'error':
  //       this.title = 'Error';
  //       break;
  //     case 'info':
  //       this.title = 'Atención';
  //       break;
  //     case 'warning':
  //       this.title = 'Alerta';
  //       break;
  //   }
  // }

  // closeAlert(): void {
  //   this.alertService.closeAlert();
  // }
  // ngOnDestroy(): void {
  //   // Importante para evitar fugas de memoria
  //   if (this.alertaSubscription) {
  //     this.alertaSubscription.unsubscribe();
  //   }
  // }
  // private toastService = inject(AlertService);

  // visible = false;
  // title?: string;
  // message = '';
  // type!: 'success' | 'error' | 'warning' | 'info'
  // ngOnInit() {
  //   console.log("renderiza")
  //   this.toastService.toastVisibility$.subscribe(
  //     (state) => (this.visible = state),
  //   );
  //   this.toastService.toast$.subscribe((toast) => {
  //     console.log(toast)
  //     this.type = toast.type;
  //     this.message = toast.message;
  //     this.title = toast.title;
  //   });
  // }

  // alerts = computed(() => this.alertService.alerts);

  // constructor(private alertService: AlertService,
  //   private cdr: ChangeDetectorRef
  // ) { }
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log("cuando hay cambios")
  // }
  // ngOnInit(): void {
  //   console.log("renderiza")
  //   console.log(this.alerts());

  // }

  // forceCheck() {
  //   this.cdr.detectChanges();
  // }
  // // Cerrar alerta
  // closeAlert(alert: Alert) {
  //   this.alertService.removeAlert(alert);
  // }
  // getTitle(type: 'success' | 'error' | 'warning' | 'info'): string {
  //   switch (type) {
  //     case 'success':
  //       return 'Éxito';
  //     case 'error':
  //       return 'Error';
  //     case 'warning':
  //       return 'Advertencia';
  //     case 'info':
  //       return 'Información';
  //     default:
  //       return 'Alerta';
  //   }
  // }
}
