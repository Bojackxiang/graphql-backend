const receiver_amqp = require("amqplib/callback_api");

export const subscriber = () => {
  console.log(`subscriber is running ...`);
  receiver_amqp.connect("amqp://localhost", async (
    error0: any,
    connection: any
  ) => {
    console.log(`subscriber is running ... 1`);
    if (error0) {
      throw error0;
    }

    connection.createChannel(function (error1: any, channel: any) {
      console.log(`subscriber is running ... 2`);
      const queueName = "my_test_queue_name";

      channel.assertQueue(queueName, {
        durable: false,
      });

      console.log(`subscriber is running ... 3`);

      channel.consume(
        queueName,
        async(msg: any) => {
          console.log(`subscriber is running ... 4`);
          console.log(" [x] Received %s", msg.content.toString());
        },
        {
          noAck: true,
        }
      );

      console.log(`subscriber is running ... 5`);

    });
  });
};
