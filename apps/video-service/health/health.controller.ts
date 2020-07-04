/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HealthCheckService, DNSHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private dns: DNSHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.dns.pingCheck('video-service','http://localhost:3006'),
        ]);
    }
}
