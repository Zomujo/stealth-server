import { Module } from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { DrugsController } from './drugs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Drug } from './models/drug.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Drug])
  ],
  controllers: [DrugsController],
  providers: [DrugsService],
})
export class DrugsModule {}
