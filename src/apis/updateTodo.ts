import { HttpService } from "services";
import moment from 'jalali-moment';

export const UpdateTodoAPI = async (todoId: number, wip_time: string, status: string) => {
  const response = await HttpService.put(`/api-todo/${todoId}`, {
    status: status,
    wip_time: wip_time ?? moment().unix(),
    done_time: status === "done" ? moment().unix() : null
  });
  return response;
}