import { SERVER_DOMAIN, API_KEY, config, connector } from "./constants";
import { TelerClient } from "/Users/RupakBoral/code/teler-sdk-node/dist/client";
import express, {Request, Response} from 'express';
import { WebSocketServer } from 'ws';
import http from "http";

const app = express();
app.use(express.json());

const server = http.createServer(app);

app.get('/', (req: Request, resp: Response) => {
    resp.send("Hello from server");
});

// initiate call
app.post("/initiate-call", async (req: Request, resp: Response) => {
    const client = new TelerClient(API_KEY);
    const response = await client.calls.create(
        config
    );
    resp.json(response);
})

// return Call Flow
app.post('/flow', (req: Request, resp: Response) => {
    resp.json({
        action: "stream",
        ws_url: `wss://${SERVER_DOMAIN}/media-stream`,
        sample_rate: "8k",
        chunk_size: 500,
        record: true,
    })
});

// webhook messages
app.post('/webhook', (req: Request, resp: Response) => {
    const data = req.body;
    const headers = req.headers;
    console.log("--------Webhook Payload--------");
    console.log(JSON.stringify(data, null, 2));

    console.log("--------Webhook Headers--------");
    console.log(JSON.stringify(headers, null, 2));
    
    resp.json({"message": "Webhook received.."});
});

const wss = new WebSocketServer({ noServer: true });

// Handle WebSocket connections
wss.on("connection", async (callWs: WebSocket) => {
    console.log("✅ Teler connected to WebSocket");
    await connector.bridgeStream(callWs); 
});

// Upgrade HTTP → WebSocket
server.on("upgrade", (request, socket, head) => {
    if (request.url === "/media-stream") {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws, request);
        });
    } else {
        socket.destroy();
    }
});

server.listen(1000, '0.0.0.0', ()=>{
    console.log("Server is listening at port 1000");
});