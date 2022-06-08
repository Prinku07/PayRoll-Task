import { NgModule } from '@angular/core';

import { NumberOnlyDirective } from './directives/number-only.directive';
import{MytaskService} from './services/mytask.service'

@NgModule({
  declarations: [
    NumberOnlyDirective
  ],
  exports: [
    NumberOnlyDirective
  ],
  providers:[
    MytaskService
  ]

})
export class CoreModule { }
