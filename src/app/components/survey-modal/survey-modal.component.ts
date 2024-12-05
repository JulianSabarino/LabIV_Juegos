import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Survey } from '../../core/models/survey';
import { SurveyService } from '../../core/services/survey.service';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-survey-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgxSpinnerModule,FormsModule],
  templateUrl: './survey-modal.component.html',
  styleUrl: './survey-modal.component.scss'
})
export class SurveyModalComponent {

  spinner = inject(NgxSpinnerService);
  toastSvc = inject(ToastrService);
  surveySvc = inject(SurveyService)
  authSvc = inject(AuthService);


  game?:string;
  valueChecked: boolean = false;

  constructor(private dialogRef: MatDialogRef<SurveyModalComponent> , @Inject(MAT_DIALOG_DATA) public data: { game: string})
  {
    this.game = data.game;
  }

  form = new FormGroup({
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    age: new FormControl('',[Validators.required,Validators.min(18),Validators.max(99)]),
    phone: new FormControl('',[Validators.required,Validators.maxLength(10)]),
    commentary: new FormControl('',[Validators.required]),
    valueRange: new FormControl('',[Validators.required,Validators.min(1),Validators.max(100)]),
  })

  async sendSurvay()
  {
    this.spinner.show();

    if(this.form.valid)
    {
      let user = "unloged"
      if(this.authSvc.user)
        user = this.authSvc.user.email;

      let survey: Survey = 
      {
        user: user,
        game: this.game,
        name : this.form.value.name,
        surname: this.form.value.surname,
        age: Number(this.form.value.age),
        phone: Number(this.form.value.phone),
        commentary: this.form.value.commentary,
        valueRange: Number(this.form.value.valueRange),
        recommendCheck: this.valueChecked
      }
      
      console.log(survey);
      try
      {
        await this.surveySvc.setSurveyInfo(survey);
        this.toastSvc.success("Se cargo con exito","Exito");
      }
      catch
      {
        this.toastSvc.error("Error al cargar","Error");
        console.log("error");
      }

    }
    else
    {
      console.log("error en el form")
    }

    this.dialogRef.close();
    this.spinner.hide();
  }



  noCancelar(): void {
    this.dialogRef.close();  // Close without doing anything
  }

  // Handle "Cancelar" button click
  comment() {
    this.dialogRef.close();  // Return the cancellation comment
  }


  showRange()
  {
    console.log(this.form.value.valueRange);
  }

  showChecked()
  {
    if(this.valueChecked)
      this.valueChecked = false
    else
      this.valueChecked = true;

    console.log(this.valueChecked);
  }


}
