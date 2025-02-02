import { ObjectId } from "mongodb";

enum Role {
  LANDLORD,
  AGENT,
  TENANT,
}

export type Type_Create_User = {
  createUserInput: {
    username: string;
    role: Role;
    password: string;
    email: string;
    preferContact: {
      contactByPhone: boolean;
      contactByEmail: boolean;
      contactByMsg: boolean;
    };
  };
};
export type Type_Get_All_Users = { parentId?: ObjectId };

export type Type_Kids_Resolver = { _id: ObjectId; name: string; role: string };

export type Type_User_Sign_In = {
  userSignInInput: { username: string; email: string; password: string };
};
