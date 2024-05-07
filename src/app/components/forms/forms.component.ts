import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-forms',
  standalone: true,
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
  imports: [ReactiveFormsModule]
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
      console.log(this.formGroup.value)
    }

    onClean(): void{
      this.formGroup.reset();
    }


}
