liveChat = {
    init(clientAppId) {
        let self = this;
        const endpoint = 'https://chatbot-manager.herokuapp.com';
        // const endpoint = 'localhost:3000';
        // const endpoint = 'https://live-chat-singulogic-host.herokuapp.com';
        // const endpoint = 'http://054276c2.ngrok.io/';
        // const endpoint = 'https://sing4host.herokuapp.com';
        this.userSessionId = Random.id();
        this.clientAppId = clientAppId;
        this.ddp = DDP.connect(endpoint);
        this.chatCollection = new Mongo.Collection('chat', {connection: this.ddp});
        this.ddp.subscribe('Chat.messagesList', this.clientAppId, this.userSessionId);
        this.messages = this.chatCollection.find({userSessionId: this.userSessionId}, {sort: {date: 1}});
        this.connection = {};
    }
};