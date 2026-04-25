import { Module } from '@nestjs/common';
import { ProjectModule } from './adapter/in/project/project.module';
import { TechnologyModule } from './adapter/in/technology/technology.module';
import { TagModule } from './adapter/in/tag/tag.module';
import { ProjectTagModule } from './adapter/in/project-tag/project-tag.module';

@Module({
  imports: [ProjectModule, TechnologyModule, TagModule, ProjectTagModule],
})
export class AppModule { }
