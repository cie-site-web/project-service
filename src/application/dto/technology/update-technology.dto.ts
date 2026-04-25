import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTechnologyDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  architectureId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  frameworkId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  utilsGestionId?: string;
}
