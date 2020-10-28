import { IResolvers } from "apollo-server";
import { DocumentNode } from "graphql";
import { ObjectId } from "mongodb";

export type QueryResolverFunc = (parent: any, args: any, ctx: any) => any;
export type SchemaTypes =  string | DocumentNode | DocumentNode[] | string[] | undefined
export type ResolverType = IResolvers<any, any> | IResolvers<any, any>[] | undefined

export type ServerResponseInput = {
    message?: string;
    success: boolean;
    mongo_id?: ObjectId;
    token?: string
  };