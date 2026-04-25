import { IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator";

export class ListProjectDto {
  @IsInt()
  @Min(1)
  page!: number;

  @IsInt()
  @Min(1)
  limit!: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  technologiesId?: string;
}
