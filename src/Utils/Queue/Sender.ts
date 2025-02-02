const sender_amqp = require("amqplib/callback_api");

type Type_close_connection = () => void;

export const queue_sending_email = () => {
  return new Promise((resolve, reject) => {
    sender_amqp.connect("amqp://localhost", function (
      connectError: any,
      connection: any
    ) {
      if (connectError) {
        reject({ success: false, connectError });
      }
      connection.createChannel(async (channelError: any, channel: any) => {
        if (channelError) reject(channelError);
        const queueName = "my_test_queue_name";
        const message = "message";
        let i = 1;

        channel.assertQueue(queueName, {
          durable: false,
        });

        while (i < 10) {
          channel.sendToQueue(queueName, Buffer.from(`${message} ${i}`));
          i += 1;
        }

        // 下面的这个 settimeout 是必须的
        setTimeout(() => {
          connection.close();
        }, 500);

        resolve({
          success: true,
          message: "queue sending is finished",
        });
      });
    });
  });
};
