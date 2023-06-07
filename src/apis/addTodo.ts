import moment from "jalali-moment";
import { HttpService } from "services";

export const AddTodoAPI = async (title: string, description: string) => {
  const response = await HttpService.post(`/api-todo`, {
    title: title,
    description: description,
    status: "todo",
    create_time: moment().unix(),
    wip_time: null,
    done_time: null
  });
  return response;
}