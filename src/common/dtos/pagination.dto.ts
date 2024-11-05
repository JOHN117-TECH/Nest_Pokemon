import { IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(0)
    offset?: number;


    @IsOptional()
    @IsString()
    @MinLength(2)
    search?: string;
}