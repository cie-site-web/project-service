import { IsNotEmpty, IsString } from "class-validator";

export class GetTechnologyDto {
  @IsString()
  @IsNotEmpty()
  publicId!: string;
}
