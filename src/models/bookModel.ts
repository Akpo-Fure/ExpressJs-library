import joi from "joi";
import mongoose, { Schema, Document } from "mongoose";
import Author from "./authorModel";

interface BookModel extends Document {
  Title: string;
  DatePublished: Date;
  Description: string;
  PageCount: number;
  Genre: string;
  BookId: mongoose.Types.ObjectId;
  BookImage: string;
  BookLandscapeImages: Array<{ type: string }>
  Summary: string;
  Publisher: string;
  AuthorId: mongoose.Types.ObjectId;
}

const bookValidationSchema = joi.object({
  Title: joi.string().required(),
  DatePublished: joi.date().required(),
  Description: joi.string().required(),
  PageCount: joi.number().required(),
  Genre: joi.string().required(),
  BookImage: joi.string().required(),
  BookLandscapeImages: joi.any().required(),
  Summary: joi.string().required(),
  BookId: joi.any(),
  Publisher: joi.string().required(),
});

const bookSchema: Schema<BookModel> = new Schema(
  {
    Title: { type: String, required: true },
    DatePublished: { type: Date, required: true },
    Description: { type: String, required: true },
    PageCount: { type: Number, required: true },
    Genre: { type: String, required: true },
    BookId: { type: mongoose.Schema.Types.ObjectId },
    BookImage: { type: String, required: true },
    BookLandscapeImages: [{ type: String, required: true }],
    Summary: { type: String, required: true },
    Publisher: { type: String, required: true },
    AuthorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
  },
  { timestamps: true }
);

//Change  BookId to equal default mongoose Id
bookSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }
  if (!this.BookId) {
    this.BookId = this._id;
  }
  next();
});

bookSchema.pre("validate", async function (next) {
  try {
    const {
      Title,
      DatePublished,
      Description,
      PageCount,
      Genre,
      BookImage,
      BookLandscapeImages,
      Summary,
      BookId,
      Publisher,
    } = this;
    const validatedBook = await bookValidationSchema.validateAsync(
      {
        Title,
        DatePublished,
        Description,
        PageCount,
        Genre,
        BookImage,
        BookLandscapeImages,
        Summary,
        BookId,
        Publisher,
      },
      {
        abortEarly: false,
      }
    );
    this.set(validatedBook);
    next();
  } catch (error: any) {
    next(error);
  }
});

const Book = mongoose.model<BookModel>("Book", bookSchema);

export default Book;
