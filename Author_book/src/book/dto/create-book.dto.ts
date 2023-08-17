import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
    @ApiProperty()
    title:string;
    @ApiProperty()
    body:string;
    @ApiProperty()
    page:number;
    @ApiProperty()
    price:number;
    @ApiProperty()
    count:number;
    @ApiProperty()
    author:string;
}
