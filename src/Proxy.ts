import { MessageDto, InboxDto, IncomingPacket, OutgoingPacket } from "./chat";
import { EventProducer } from "./EventProducer";

interface ProxyEventMap {
    "login": () => void;
    "message": (channelId: string, message: MessageDto) => void;
    "conversation": (channelId: string) => void;
}

class Proxy extends EventProducer<ProxyEventMap>
{
    private ws: WebSocket;
    inbox: InboxDto | null = null;

    constructor() {
        super()
        this.ws = new WebSocket("wss://raja.aut.bme.hu/chat/");  
        this.ws.addEventListener( "open", () =>         
        {    
            //this.ws.send( "Hello" );     
            this.sendPacket({type: "register", email: "edina@gmaill.com", password: "asd", displayName:"edina", staySignedIn: true})        
        } );  
        this.ws.addEventListener("message", e => {
            let p = JSON.parse(e.data) as IncomingPacket;
            switch (p.type) {
                case "error":
                    alert(p.message);
                    break;
                case "login":
                    this.inbox = p.inbox;
                    this.dispatch("login");
                    console.log("Bejelentkezve")
                    break;
                case "message":
                    let cid = p.channelId;
                    this.inbox!.conversations.find(x => x.channelId === cid)?.lastMessages.push(p.message);
                    this.dispatch("message", cid, p.message);
                    break;
                case "conversationAdded":
                    this.inbox!.conversations.push(p.conversation);
                    this.dispatch("conversation", p.conversation.channelId);
                    break;
            }
        });
    }

    public sendPacket(packet: OutgoingPacket) {
        this.ws.send(JSON.stringify(packet));
    }
}

export var proxy = new Proxy(); 