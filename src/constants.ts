import { StreamConnector } from "/Users/RupakBoral/code/teler-sdk-node/dist/lib/stream";
import { StreamType } from "/Users/RupakBoral/code/teler-sdk-node/dist/types";
import { callStreamHandler, remoteStreamHandler } from "../src/streamHandlers"

export const TELER_BASE_URL: string = 'https://sandbox.frejun.ai/api/v1';

export const API_KEY: string = '3910cc212cc122af9ff0eceea06e30d8bdaabd3f8a513af6e734cee5203038ce';

export const SERVER_DOMAIN: string = 'unadjourned-keva-toilsomely.ngrok-free.dev';

export const config = 
{
    'flow_url': `https://${SERVER_DOMAIN}/flow`,
    'status_callback_url': `https://${SERVER_DOMAIN}/webhook`,
    'from_number': "+918065193777",
    'to_number': "+919954174459",
    'record': true,
};


export const elevenlabsWebSocketUrl: string = 'wss://api.elevenlabs.io/v1/convai/conversation?agent_id=agent_0801k8taze5jfpjrasf8edxngt7b';

export const connector = new StreamConnector(
    elevenlabsWebSocketUrl,
    StreamType.BIDIRECTIONAL,
    callStreamHandler,
    remoteStreamHandler()
);