import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TwilioSession, useTwilioSession } from './hooks';
import { Conversation } from '@twilio/conversations'
import axios from 'axios';


const ConversationListing: React.FC<{conversations: Conversation[]}> = ({conversations}) => {
  return (
    <ul>
      {conversations.map((conversation: Conversation, index: number) => (<li key={index}><>{conversation.friendlyName}</></li>))}
    </ul>
  )
}

const subscribedConversations = async (
  twilioSession: TwilioSession
): Promise<Conversation[]> => {
  
  const client = twilioSession.client;
  let subscribedConversations = await client.getSubscribedConversations();
  let conversations = subscribedConversations.items;

  while (subscribedConversations.hasNextPage) {
    subscribedConversations = await subscribedConversations.nextPage();
    conversations = [...conversations, ...subscribedConversations.items];
  }
  
  return conversations;
}

export const App: React.FC = () => {
  const twilioSession = useTwilioSession();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    (async () => {
      const conversations = await subscribedConversations(twilioSession)
      setConversations(conversations);
    })();
  },[]);

  return (
    <div className="App">
      <ConversationListing conversations={conversations} />
    </div>
  );
}

export default App;
