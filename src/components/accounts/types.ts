export interface AccountInputState {
  is_login: boolean,
  user_info :UserInfo,
}

export interface LoginInput{
  email: string,
  password: string,
}

export interface UserCreateInput{
  name : string,
  email: string,
  password: string,
}

export interface UserInfo{
  id : string,
  name : string
  email: string,
}