import amqp from 'amqplib';

let connection;
let queue = 'testQueue';

const connect = async () => {
    try {
        connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    } catch (error) {
        console.log(error);
    }
};

connect();
