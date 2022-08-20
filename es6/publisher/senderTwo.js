import amqp from 'amqplib';

let queue = 'es6-senderTwo';
let msg = process.argv.slice(2).join(' ') || "Hello World!";;

const connect = async () => {
   try {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      await channel.assertQueue(queue, {
         durable: true
      });

      channel.sendToQueue(queue, Buffer.from(msg), {
         persistent: true
      });
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