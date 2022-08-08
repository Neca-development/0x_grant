import { getRequest } from '@api/axiosClient'
import type { IUser } from '@store/users/user.model'
import type { AxiosResponse } from 'axios'

interface IUserService {
  getUsers: (path: string) => Promise<AxiosResponse<IUser[], any>>
}

class UsersService implements IUserService {
  async getUsers(path: string) {
    return getRequest<IUser[]>(path)
  }
}

export default new UsersService()
