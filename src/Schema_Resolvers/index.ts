import { SchemaTypes, ResolverType } from "src/types/types";
import { GENERAL_RESOLVER, GENERAL_SCHEMA } from "./General/General";
import { POST_RESOLVER, POST_SCHEMA } from "./Posts/Posts";

import {
  FILE_UPLOADING_SCHEMA,
  FILE_UPLOADING_RESOLVER,
} from "./Uploading/Uploading_Resolver";
import { USER_SCHEMAS, USER_RESOLVER } from "./User/User_Resolver";

export const schemas: SchemaTypes = [
  GENERAL_SCHEMA,
  USER_SCHEMAS,
  FILE_UPLOADING_SCHEMA, 
  POST_SCHEMA, 
];

export const resolvers: ResolverType = [
  GENERAL_RESOLVER,
  USER_RESOLVER,
  FILE_UPLOADING_RESOLVER,
  POST_RESOLVER
];
