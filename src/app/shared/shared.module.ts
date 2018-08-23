import { NgModule } from '@angular/core';
import { FsTimestampPipe } from './fs-timestamp.pipe';
import { RelativeDatePipe } from './relative-date.pipe';
import { ShowdownPipe } from './showdown.pipe';
import { IdenticalToValidatorDirective } from './identical-to-validator.directive';
import { SnakecasePipe } from './snakecase.pipe';

@NgModule({
  declarations: [
    FsTimestampPipe,
    RelativeDatePipe,
    ShowdownPipe,
    IdenticalToValidatorDirective,
    SnakecasePipe
  ],
  exports: [
    FsTimestampPipe,
    RelativeDatePipe,
    ShowdownPipe,
    IdenticalToValidatorDirective,
    SnakecasePipe
  ]
})
export class SharedModule {}
