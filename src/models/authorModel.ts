import mongoose, { Schema, Document, Model } from "mongoose";
import joi from "joi";
import bcrypt from "bcrypt";
import Book from "./bookModel";

interface AuthorModel extends Document {
  AuthorName: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  Books: Array<{ type: mongoose.Schema.Types.ObjectId; ref: "Book" }>;
}

//Used JOI to validate the user details
const userValidationSchema = joi.object({
  AuthorName: joi.string().required(),
  Email: joi.string().email().required(),
  Password: joi.string().required(),
  PhoneNumber: joi
    .string()
    .required()
    .pattern(/^\d{11}$/),
});

//Defined what the mongoose userSchema would look like
const authorSchema: Schema<AuthorModel> = new Schema(
  {
    AuthorName: { type: String, required: true },
    Email: { type: String, required: true, unique: true, trim: true },
    Password: { type: String, required: true, minlength: 4 },
    PhoneNumber: { type: String, required: true },
    Books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);

authorSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

authorSchema.pre<AuthorModel>("save", async function (next) {
  if (!this.isModified("Password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS!));
    this.Password = await bcrypt.hash(this.Password, salt);
  } catch (error: any) {
    next(error);
  }
});

authorSchema.pre("validate", async function (next) {
  try {
    const { AuthorName, Email, Password, PhoneNumber } = this;
    const validatedUser = await userValidationSchema.validateAsync(
      {
        AuthorName,
        Email,
        Password,
        PhoneNumber,
      },
      {
        abortEarly: false,
      }
    );
    this.set(validatedUser);
    next();
  } catch (error: any) {
    next(error);
  }
});

const Author = mongoose.model<AuthorModel>("Author", authorSchema);

export default Author;
