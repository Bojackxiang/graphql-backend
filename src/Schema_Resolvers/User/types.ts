import { ObjectId } from "mongodb";

enum Role {
  KID,
  PARENT,
}

export type Type_Create_User = {
  createUserInput: { name: string; role: Role, password: string};
};
export type Type_Get_All_Users = { parentId?: ObjectId };

export type Type_Kids_Resolver = { _id: ObjectId; name: string; role: string };

export type Type_User_Sign_In = {
  username: string;
  email: string;
  password: string;
};