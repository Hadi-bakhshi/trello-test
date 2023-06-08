import { HttpService } from "services";

export const DeleteTodoAPI = async (todoId: number) => {
  const response = await HttpService.delete(`/api-todo/${todoId}`);
  return response;
}