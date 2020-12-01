import { SchemaTypes, ResolverType } from "src/types/types";
import { FAKE_DATA_RESOLVER, FAKE_DATA_SCHEMA } from "./FakeDate/Fake_Data_resolver";
import { GENERAL_RESOLVER, GENERAL_SCHEMA } from "./General/General";
import { POST_RESOLVER, POST_SCHEMA } from "./Posts/Posts";
import { SEARCH_RESOLVER, SEARCH_SCHEMA } from "./Search/Search_Resilver";
import { EMAIL_RESOLVER, EMAIL_SCHEMA } from "./Service/Email";
import { TESTING_RESOLVER, TESTING_SCHEMA } from "./Testing/Testing";

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
  EMAIL_SCHEMA,
  SEARCH_SCHEMA, 
  FAKE_DATA_SCHEMA,
  TESTING_SCHEMA
];

export const resolvers: ResolverType = [
  GENERAL_RESOLVER,
  USER_RESOLVER,
  FILE_UPLOADING_RESOLVER,
  POST_RESOLVER,
  EMAIL_RESOLVER,
  SEARCH_RESOLVER,
  FAKE_DATA_RESOLVER, 
  TESTING_RESOLVER
];
