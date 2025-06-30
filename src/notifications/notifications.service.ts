import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    private sqsClient: SQSClient;
    private queueUrl = process.env.AWS_SQS_QUEUE_URL;

    constructor(){
        this.sqsClient = new SQSClient({
            region: process.env.AWS_REGION,
            endpoint: 'http://localhost:4566',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
    }

    async sendNotification(message: string) {
        const params = {
            QueueUrl: this.queueUrl,
            MessageBody: JSON.stringify(message),
        }
        await this.sqsClient.send(new SendMessageCommand(params));
        console.log('Notification sent:', message);
    }
}
