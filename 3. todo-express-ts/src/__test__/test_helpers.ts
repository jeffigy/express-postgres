import { query } from "../utils/db";

export const initialTodos = [
  [
    "Buy groceries",
    "Purchase milk, eggs, and bread from the store",
    false,
    "2024-11-21T10:00:00",
  ],
  [
    "Complete project report",
    "Prepare and submit the final report for the client",
    true,
    "2024-11-21T10:15:00",
  ],
  [
    "Schedule dentist appointment",
    "Call the clinic and set an appointment for next week",
    false,
    "2024-11-21T10:30:00",
  ],
  [
    "Plan weekend trip",
    "Research locations and finalize plans for a weekend getaway",
    false,
    "2024-11-21T10:45:00",
  ],
  [
    "Organize files",
    "Clean up and organize work-related files on the computer",
    true,
    "2024-11-21T11:00:00",
  ],
];

export const todosInDb = async () => {
  const todos = await query("SELECT * FROM todos");
  console.log(typeof todos);
  return todos;
};
