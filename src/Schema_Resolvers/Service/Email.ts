import { gql, IResolvers } from "apollo-server";
import { contextType } from "src/types/userResolverTypes";
import { queue_sending_email } from "../../Utils/Queue/Sender";
import Response from "../../Utils/Response/Response";

type EmailSendingArgs = {
  address: string;
  title: string;
  message: string;
};

export const EMAIL_SCHEMA = gql`
  input SendingEmailInput {
    address: String
    title: String
    message: String
  }

  extend type Query {
    sendingEmail(emailParams: SendingEmailInput): Response
  }
`;

export const EMAIL_RESOLVER: IResolvers<any, any> = {
  Query: {
    sendingEmail: async (_, args: EmailSendingArgs, {}: contextType) => {
      console.log(args);
      const result = await queue_sending_email();
      console.log(result);
      return Response.serverResponse({ success: true, message: "test" });
    },
  },
};
