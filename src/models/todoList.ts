import { z } from "zod";

export const BasicTodoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be 2 or more characters long" }),
  content: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "Username must be 4 or more characters long" }),
  status: z.boolean(),
  deadline: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  tags: z.array(z.object({ title: z.string() })),
});

const HasID = z.object({ id: z.number().int().positive() });
export const TodoSchema = BasicTodoSchema.merge(HasID);
export type Todo = z.infer<typeof TodoSchema>;
