import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';

const OPENING_HOUR={
    morning:{
      first: '06',
      last: '12'
    },
    afternoon:{
      first: '12',
      last: '18'
    },
    night:{
      first: '18',
      last: '23'
    }

}

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night'



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
      showClosed: true
    })
    this.unitService.getAllUnits().subscribe(data => {
      //results recebe data
      this.results = data.locations;
      this.filtredResults = data.locations;
    });
  }

    filterUnits(units:Location, opened: boolean, open_hour: string, close_hour:string){
      let open_hour_filter = parseInt(open_hour, 10)
      let close_hour_filter = parseInt(close_hour, 10)

      //pega o dia atual da semana
      let today_weekday = new Date().getDay();

      //loop entre os dias da unidade para retornar os dias em numeros
      for(let i = 0; i < units.schedules.length; i ++){
        let schedule_hour = units.schedules[i].hour
        let schedule_weekday = units.schedules[i].weekdays
      }
    }
    onSubmit(): void{
      const OPEN_HOUR = OPENING_HOUR[this.formGroup.value.hour as HOUR_INDEXES].first
      const CLOSE_HOUR = OPENING_HOUR[this.formGroup.value.hour as HOUR_INDEXES].last
      if(!this.formGroup.value.showClosed){
        this.filtredResults = this.results.filter(location => location.opened === true)
      }else{
        this.filtredResults = this.results
      }
    }

    onClean(): void{
      this.formGroup.reset();
    }


}
