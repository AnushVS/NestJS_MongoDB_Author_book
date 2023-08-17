import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
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
