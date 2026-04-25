import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  githubUrl?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  addressUrl?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  technologiesId?: string;
}
