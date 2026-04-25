import { IsNotEmpty, IsString } from "class-validator";

export class GetProjectTagDto {
  @IsString()
  @IsNotEmpty()
  publicId!: string;
}
