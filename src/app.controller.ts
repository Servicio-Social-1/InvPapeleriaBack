import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    healthCheck() {
        return { status: 'ok', date: new Date() };
    }
}