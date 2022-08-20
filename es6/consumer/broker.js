import amqp from 'amqplib';

let connection;
let queue = 'es6-senderTwo';

const connect = async () => {
   try {
      connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      await channel.assertQueue(queue, {
         durable: true
      });

      channel.prefetch(1);
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

      channel.consume(queue, function (msg) {
         const secs = msg.content.toString().split('.').length - 1;

         console.log(" [x] Received %s", msg.content.toString());
         setTimeout(function () {
            console.log(" [x] Done");
            channel.ack(msg);
         }, secs * 10000);
      }, {
         noAck: false
      });
   } catch (error) {
      console.log(error);
   }
};

connect();