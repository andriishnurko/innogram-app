import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(@InjectDataSource() private readonly ds: DataSource) {}

  @Get('/health')
  health() {
    return { prazue: true, service: 'auth', ts: new Date().toISOString() };
  }

  @Get('/db')
  async db() {
    const r = await this.ds.query('select 1 as ok');
    return { bdshka: r[0].ok === 1 };
  }
}