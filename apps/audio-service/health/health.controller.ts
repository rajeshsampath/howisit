/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, DNSHealthIndicator, HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    
    constructor(
        private health: HealthCheckService,
        private dns: DNSHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    check () {
       return this.health.check([
         () =>  this.dns.pingCheck('audio-service', 'http://localhost:3001')
       ]) 
    }
}
