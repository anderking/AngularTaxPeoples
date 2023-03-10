import { LoginResponse, RegisterResponse } from "../models/response/login";

export const mockTestLoginResponse: LoginResponse = {
  message: "string",
  user: [
    {
      create_at: "string",
      _id: "string",
      email: "string",
      password: "string",
      tipo: "admin",
      image: "string",
      description: "string",
    },
  ],
  token: "string",
};

export const mockTestRegisterResponse: RegisterResponse = {
  user: {
    create_at: "string",
    _id: "string",
    email: "string",
    password: "string",
    tipo: "admin",
    image: "string",
    description: "string",
  },

  token: "string",
};
