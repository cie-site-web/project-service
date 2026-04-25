import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  githubUrl!: string;

  @IsString()
  @IsNotEmpty()
  addressUrl!: string;

  @IsBoolean()
  isPublic!: boolean;

  @IsString()
  @IsNotEmpty()
  technologiesId!: string;
}
