import { Author } from "src/author/entities/author.entity";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from "mongoose";


export type BookDocument = HydratedDocument<Book>
@Schema()
export class Book {
    @Prop()
    title:string;
    @Prop()
    body:string;
    @Prop()
    page:number;
    @Prop()
    price:number;
    @Prop()
    count:number;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'Author'})
    author:Author;
}
export const BookSchema = SchemaFactory.createForClass(Book)
