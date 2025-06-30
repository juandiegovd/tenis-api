import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class MailService {
    @SqsMessageHandler('tenis-queue', false)
    async handleMessage(message: any) {
        console.log('Received SQS message:', message);
    }
}
