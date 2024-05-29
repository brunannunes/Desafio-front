import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';
import { FilterUnitsService } from '../../services/filter-units.service';







@Component({
  selector: 'app-forms',
  standalone: true,
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
  imports: [ReactiveFormsModule]
})
export class FormsComponent implements OnInit{
  @Output() submitEvent = new EventEmitter();
  //tipando o results para ser do tipo location array
  results: Location[] = [];  
  filtredResults: Location[] = [];
  //  ao colocarmos o "!" estamos 
  // dizendo que já vamos fazer a declaração desse atributo
  formGroup!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder, 
    private unitService: GetUnitsService, 
    private filterUnitsService: FilterUnitsService) {}
  
  
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })
    this.unitService.getAllUnits().subscribe(data => {
      //results recebe data
      this.results = data;
      this.filtredResults = data;
    });
  }

    // fazendo um switch case para ele retornar os dias da semana de acordo com o numero
  
    onSubmit(): void{
      let {showClosed, hour} = this.formGroup.value
      this.filtredResults = this.filterUnitsService.filter(this.results, showClosed,hour);
      this.unitService.setFilteredUnits(this.filtredResults);

      this.submitEvent.emit();
        
    }

    onClean(): void{
      this.formGroup.reset();
    }


}
