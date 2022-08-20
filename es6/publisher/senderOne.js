import amqp from 'amqplib';

let connection;
let queue = 'es6';
let msg = 'Hello World!';

const connect = async () => {
   try {
      connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      await channel.assertQueue(queue, {
         durable: false
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
      
      setTimeout(()=> {
         connection.close();
         process.exit(0);
      }, 500);

   } catch (error) {
      console.log(error);
   }
};

connect()