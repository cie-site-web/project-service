import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class ListProjectTagDto {
  @IsInt()
  @Min(1)
  page!: number;

  @IsInt()
  @Min(1)
  limit!: number;

  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsString()
  tagsId?: string;
}
