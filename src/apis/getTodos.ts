import { HttpService } from "services";

export const GetTodosAPI = async () => {
  const response = await HttpService.get(`/api-todo`);
  return response;
}