import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';

const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12'
  },
  afternoon: {
    first: '12',
    last: '18'
  },
  night: {
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

    // fazendo um switch case para ele retornar os dias da semana de acordo com o numero
    transformWeekday(weekday: number){
      switch (weekday) {
        case 0:
          return 'Dom.'
        case 6:
          return 'Sáb.'
        default:
          return 'Seg. à Sex.'
      }
    }
    filterUnits(unit: Location, open_hour: string, close_hour: string) {
      if(!unit.schedules) return true;
  
      let open_hour_filter = parseInt(open_hour, 10)
      let close_hour_filter = parseInt(close_hour, 10)
  
      let todays_weekday = this.transformWeekday(new Date().getDay());
  
      for(let i = 0; i < unit.schedules.length; i++){
        let schedule_hour = unit.schedules[i].hour
        let schedule_weekday = unit.schedules[i].weekdays
        if(todays_weekday === schedule_weekday){
          if(schedule_hour !== 'Fechada'){
            let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ')
            let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10)
            let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10)
  
            if(unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) return true
            else return false
          }
        }
      }
  
      return false;
    }
    onSubmit(): void{
      let intermidiateResults = this.results;
      
      if(!this.formGroup.value.showClosed){
        intermidiateResults = this.results.filter(location => location.opened === true)
      }
      
      if(this.formGroup.value.hour){
        const OPEN_HOUR = OPENING_HOURS[this.formGroup.value.hour as HOUR_INDEXES].first
        const CLOSE_HOUR = OPENING_HOURS[this.formGroup.value.hour as HOUR_INDEXES].last
        this.filtredResults = intermidiateResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR));
      }else{
        this.filtredResults = intermidiateResults;
      }
        console.log(this.filtredResults)
    }

    onClean(): void{
      this.formGroup.reset();
    }


}
