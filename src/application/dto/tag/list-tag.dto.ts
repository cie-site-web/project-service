import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class ListTagDto {
  @IsInt()
  @Min(1)
  page!: number;

  @IsInt()
  @Min(1)
  limit!: number;

  @IsOptional()
  @IsString()
  name?: string;
}
