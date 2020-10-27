import { SchemaTypes, ResolverType } from "src/types/types";
import { RESPONSE_SCHEMA } from "./General/Response";
import {
  FILE_UPLOADING_SCHEMA,
  FILE_UPLOADING_RESOLVER,
} from "./Uploading/Uploading_Resolver";
import { USER_SCHEMAS, USER_RESOLVER } from "./User/User_Resolver";

export const schemas: SchemaTypes = [
  RESPONSE_SCHEMA,
  USER_SCHEMAS,
  FILE_UPLOADING_SCHEMA,
];

export const resolvers: ResolverType = [USER_RESOLVER, FILE_UPLOADING_RESOLVER];
