import { api } from "@shared/api/api";
import { type UpdateUserRequest } from "./types/requests/UpdateUser";
import { type IUser } from "./types/User";

class UserService {
  async get(): Promise<IUser> {
    const { data } = await api.get("/auth/user/");
    return data;
  }

  async update(data: UpdateUserRequest): Promise<IUser> {
    const { data: updatedUser } = await api.patch("/auth/user/", data);
    return updatedUser;
  }
}

const userService = new UserService();
export default userService;
