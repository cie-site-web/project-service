import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectTagDto {
  @IsString()
  @IsNotEmpty()
  projectId!: string;

  @IsString()
  @IsNotEmpty()
  tagsId!: string;
}
