import { Module } from '@nestjs/common';
import { DbErrorHandlerService } from './services/db-error-handler/db-error-handler.service';

@Module({
    providers: [DbErrorHandlerService],
    exports: [DbErrorHandlerService],
})
export class SharedModule { }
