import TwilioSDK from 'twilio';
import { loggers } from "../../loggers/loggers.js";
import * as dotenv from 'dotenv';
dotenv.config()

const client = TwilioSDK(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)

export async function ordenMess(message) {
    try {
        message = await client.messages.create(message)
     } catch (error) {
      loggers.error(error)
     }

}
