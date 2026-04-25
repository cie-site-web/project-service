import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class ListTechnologyDto {
  @IsInt()
  @Min(1)
  page!: number;

  @IsInt()
  @Min(1)
  limit!: number;

  @IsOptional()
  @IsString()
  architectureId?: string;

  @IsOptional()
  @IsString()
  frameworkId?: string;

  @IsOptional()
  @IsString()
  utilsGestionId?: string;
}
