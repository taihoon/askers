import { NgModule } from '@angular/core';
import { DistanceToNowPipe } from '@app/shared/distance-to-now.pipe';

@NgModule({
  declarations: [
    DistanceToNowPipe
  ],
  exports: [
    DistanceToNowPipe
  ]
})
export class SharedModule { }
