import mongoose, { Document, Schema } from "mongoose";

interface Todo {
  title: string;
  description: string;
  status: "todo" | "in progress" | "done";
}

const TodoSchema = new Schema<Todo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in progress", "done"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;
