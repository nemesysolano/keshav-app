import {Client} from '@twilio/conversations';
export interface TwilioSession {
    user: string;
    token: string;
    client: Client;
}