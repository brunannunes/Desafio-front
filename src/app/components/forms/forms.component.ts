import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit{
  
  results = [];  
  //  ao colocarmos o "!" estamos 
  // dizendo que já vamos fazer a declaração desse atributo
  formGroup!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {}
  
  
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false
    })
  }

    onSubmit(): void{
      console.log("Submit")
    }

    onClean(): void{
      console.log("clean")
    }


}
