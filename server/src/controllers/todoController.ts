import express, { Request, Response } from "express";
import Todo from "../model/todo";
// import { validateTodo } from "../middleware/ValidateTodo";

// export const searchTodo = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   console.log("search");
//   try {
//     const { query, sort, filter } = req.query;
//     console.log(query, "query")
//     console.log(sort, "sort")
//     console.log(filter, "filter")
//     const searchQuery = query
//       ? {
//           $or: [
//             { title: { $regex: query, $options: "i" } },
//             { description: { $regex: query, $options: "i" } },
//           ],
//         }
//       : {};
    
//     const filterQuery = filter ? { status: filter } : {}
//     const combineQuery = { ...searchQuery, ...filterQuery }
//     const sortOrder:any = sort === "latest" ? -1 : 1;
//     const sortQuery:any = { createAt: sortOrder };
//     const todos = await Todo.find(combineQuery).sort(sortQuery)
//     res.status(200).json({
//       data: todos,
//       message: "Todos fetched successfully",
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: "Error searching todos",
//       error,
//     });
//   }
// };

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  const { title, description, status } = req.body;
  try {
    // await validateTodo({ title, description, status });
    const newTodo = new Todo({
      title: title,
      description: description,
      status: status,
    });

    const savedTodo = await newTodo.save();
    res.status(200).json({
      data: savedTodo,
      message: "Todo saved successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(id, "id");
    const todo = await Todo.findById(id);
    if (todo) {
      res.status(200).json({
        data: todo,
        message: "Todo fetched successfully",
      });
    } else {
      res.status(404).json({
        message: "Todo not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch todo",
    });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
      },
      {
        new: true,
      }
    );
    if (updateTodo) {
      res.status(200).json({
        data: updateTodo,
        message: "Todo updated successfully.",
      });
    } else {
      res.status(404).json({
        message: "Todo not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "failed to update todo.",
    });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.findByIdAndDelete(id);
    if (deleteTodo) {
      res.status(200).json({
        data: deleteTodo,
        message: "Todo deleted successfully.",
      });
    } else {
      res.status(404).json({
        message: "Todo not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete todo.",
    });
  }
};

export const getSearchTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("search");
  try {
    const { query, sort, filter } = req.query;
    console.log(query, "query")
    console.log(sort, "sort")
    console.log(filter, "filter")
    const searchQuery = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        }
      : {};
    
    const filterQuery = filter ? { status: filter } : {}
    const combineQuery = { ...searchQuery, ...filterQuery }
    const sortOrder: any = sort === "latest" ? -1 : sort === "oldest" ? 1 : 1;
    const sortQuery:any = { createdAt: sortOrder };
    const todos = await Todo.find(combineQuery).sort(sortQuery)
    res.status(200).json({
      data: todos,
      message: "Todos fetched successfully",
    })
  } catch (error) {
    res.status(500).json({
      message: "Error searching todos",
      error,
    });
  }
};
// export const fetchAllTodos = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   console.log("search");
//   try {
//     // const { query, sort, filter } = req.query;
//     // console.log(query, "query")
//     // console.log(sort, "sort")
//     // console.log(filter, "filter")
//     // const searchQuery = query
//     //   ? {
//     //       $or: [
//     //         { title: { $regex: query, $options: "i" } },
//     //         { description: { $regex: query, $options: "i" } },
//     //       ],
//     //     }
//     //   : {};
    
//     // const filterQuery = filter ? { status: filter } : {}
//     // const combineQuery = { ...searchQuery, ...filterQuery }
//     // const sortOrder:any = sort === "latest" ? -1 : 1;
//     // const sortQuery:any = { createAt: sortOrder };
//     const todos = await Todo.find()
//     res.status(200).json({
//       data: todos,
//       message: "Todos fetched successfully",
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: "Error searching todos",
//       error,
//     });
//   }
// };
