import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "src/enums/role.enum";

export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsOptional()
    @IsDefined({ message: 'Username cannot be empty.' })
    username: string;
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name: string;
    @ApiProperty()
    @IsOptional()
    @IsEmail({}, { message: 'Email must be a valid email.' })
    @IsDefined()
    email: string;
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsDefined({ message: 'Password cannot be empty.' })
    @IsOptional()
    password: string;
    @ApiProperty({
        description: 'List of enums',
        isArray: true,
        enum: Role
    })
    @IsEnum(Role, { each: true })
    @IsOptional()
    roles: string[];
}
