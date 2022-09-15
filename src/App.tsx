import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Client, Conversation, Message, Participant } from '@twilio/conversations'
import axios from 'axios';

const TWILIO_URL='https://api.9PackSoftware.com'
const SAMPLE_USER_NAME = "124"; 

interface ConversationListingData {
  conversation: Conversation;
  participants: Participant[];
  messages: Message[];
}

const ConversationListing: React.FC<{conversationListingData: ConversationListingData[]}> = ({conversationListingData}) => {
  /* 
  friendlyName -> Card title ("Dispatcher Chat")
  participants.length -> Small avatars, draw as many as this value indicates
  lastMessage -> last message in chat, it may be '' if no message has been sent.
  */

  return (
    <ul>
      {conversationListingData.map((conversationListingData: ConversationListingData, index: number) => 
        {
          const {conversation, participants, messages} = conversationListingData;
          const lastMessage = messages.length === 0 ? "" : messages[0].body;
          const dateCreated = conversation.dateCreated || new Date();
          return (
            <li key={index}>
              <>
                {conversation.friendlyName} contains {participants.length} participants and last message is '{lastMessage}'. Created on {dateCreated.toLocaleString()}                
              </>
            </li>            
          )
        })
      }
    </ul>
  )
}


const getTwilioToken = async (user: string): Promise<string> => {
  const url = `${TWILIO_URL}/communication/auth`;

  const response = await axios.post(
    url, 
    {
      serviceSid: 'ISc3df9f655e83415e9bf7ef48599575bd',
      identity: user,
    }
  );
  
  return response.data.content.token; 
};

const subscribedConversations = async (
  client: Client,
): Promise<Conversation[]> => {
  
  let subscribedConversations = await client.getSubscribedConversations();
  let conversations = subscribedConversations.items;

  while (subscribedConversations.hasNextPage) {
    subscribedConversations = await subscribedConversations.nextPage();
    conversations = [...conversations, ...subscribedConversations.items];
  }
  
  return conversations;
}

export const App: React.FC = () => {  
  const [conversationListingData, setConversationListingData] = useState<ConversationListingData[]>([]);
  
  useEffect(() => {
    (async () => {      
      /* 
      * Fetch the token after user logs in and keep it in the global state.
      */
      const twilioToken = await getTwilioToken(SAMPLE_USER_NAME); 

      /**
       * Create the twilio after user logs and keep it in the global state.
       */
      const client = new Client(twilioToken);
      const conversations = await subscribedConversations(client)      
      const conversationListingData: ConversationListingData[] = [];

      for(let index = 0; index < conversations.length; index++){
          const conversation = conversations[index];

          /* Fetch participants */
          const participants = await conversation.getParticipants();
          
          /* Fetch messages */
          const messageCount = await conversation.getMessagesCount();
          let messages: Message[] = [];

          if(messageCount > 1) {
            const messageReader = await conversation.getMessages(1, 0);            
            const page = await messageReader.nextPage(); 
            messages = [...page.items];
          }
          conversationListingData.push({
            conversation,
            participants,
            messages
          })

      }
      
      setConversationListingData(conversationListingData);      
    })();
  },[]);

  return (
    <div className="App">
      <ConversationListing conversationListingData={conversationListingData} />
    </div>
  );
}

export default App;
