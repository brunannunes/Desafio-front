import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';



@Component({
  selector: 'app-forms',
  standalone: true,
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
  imports: [ReactiveFormsModule]
})
export class FormsComponent implements OnInit{
  
  //tipando o results para ser do tipo location array
  results: Location[] = [];  
  filtredResults: Location[] = [];
  //  ao colocarmos o "!" estamos 
  // dizendo que já vamos fazer a declaração desse atributo
  formGroup!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private unitService: GetUnitsService) {}
  
  
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false
    })
    this.unitService.getAllUnits().subscribe(data => {
      //results recebe data
      this.results = data.locations;
      this.filtredResults = data.locations;
    });
  }

    onSubmit(): void{
      console.log(this.formGroup.value)
      if(!this.formGroup.value.showClosed){
        console.log("entreou")
        this.filtredResults = this.results.filter(location => location.opened === true)
      }else{
        this.filtredResults = this.results
      }
    }

    onClean(): void{
      this.formGroup.reset();
    }


}
