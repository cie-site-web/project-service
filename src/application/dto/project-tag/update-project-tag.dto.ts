import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProjectTagDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  projectId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  tagsId?: string;
}
