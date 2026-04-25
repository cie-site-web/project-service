import { IsNotEmpty, IsString } from "class-validator";

export class CreateTechnologyDto {
  @IsString()
  @IsNotEmpty()
  architectureId!: string;

  @IsString()
  @IsNotEmpty()
  frameworkId!: string;

  @IsString()
  @IsNotEmpty()
  utilsGestionId!: string;
}
