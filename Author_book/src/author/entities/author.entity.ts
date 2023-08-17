import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Book } from 'src/book/entities/book.entity';

export type UserDocument = HydratedDocument<Author>;
@Schema()
export class Author {
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop()
  age: number;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] })
  books: Book[];
}
export const AuthorSchema = SchemaFactory.createForClass(Author);
