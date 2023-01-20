import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {    
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsDefined({ message: 'Username cannot be empty.' })
    username: string;
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name: string;
    @ApiProperty()
    @IsEmail({}, { message: 'Email must be a valid email.' })
    @IsDefined()
    email: string;
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsDefined({ message: 'Password cannot be empty.' })
    password: string;
}