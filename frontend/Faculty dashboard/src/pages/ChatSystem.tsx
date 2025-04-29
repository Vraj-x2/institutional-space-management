import React, { useState } from 'react';
import { MessageCircleIcon, SearchIcon, PaperclipIcon, SendIcon } from 'lucide-react';
interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  timestamp: Date;
  isRequest?: boolean;
  requestType?: string;
  status?: 'pending' | 'approved' | 'rejected';
}
interface Contact {
  id: number;
  name: string;
  role: string;
  lastMessage: string;
  unread: number;
}
const ChatSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'requests'>('chats');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [requestType, setRequestType] = useState('');
  const contacts: Contact[] = [{
    id: 1,
    name: 'Dr. Smith',
    role: 'Faculty',
    lastMessage: 'See you tomorrow!',
    unread: 2
  }, {
    id: 2,
    name: 'John Student',
    role: 'Student',
    lastMessage: 'Thank you professor',
    unread: 0
  }, {
    id: 3,
    name: 'IT Support',
    role: 'Staff',
    lastMessage: 'Your ticket has been resolved',
    unread: 1
  }];
  const [messages] = useState<ChatMessage[]>([{
    id: 1,
    sender: 'Dr. Smith',
    message: 'Hello, are you available for a quick meeting?',
    timestamp: new Date(Date.now() - 3600000)
  }, {
    id: 2,
    sender: 'You',
    message: 'Yes, I can meet at 2 PM',
    timestamp: new Date(Date.now() - 1800000)
  }]);
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // Add message handling logic here
    setMessageInput('');
  };
  const handleFileAttachment = () => {
    // File attachment logic here
  };
  return <div className="h-[calc(100vh-12rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Chat & Request System
        </h1>
        <p className="text-gray-600">
          Communicate with students and colleagues
        </p>
      </div>
      <div className="grid grid-cols-12 gap-6 h-full">
        <div className="col-span-3 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <div className="flex space-x-2 mb-4">
              <button onClick={() => setActiveTab('chats')} className={`flex-1 py-2 px-4 rounded-md ${activeTab === 'chats' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                Chats
              </button>
              <button onClick={() => setActiveTab('requests')} className={`flex-1 py-2 px-4 rounded-md ${activeTab === 'requests' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                Requests
              </button>
            </div>
            <div className="relative mb-4">
              <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              {contacts.map(contact => <button key={contact.id} onClick={() => setSelectedContact(contact)} className={`w-full p-3 text-left rounded-md hover:bg-gray-50 ${selectedContact?.id === contact.id ? 'bg-gray-50' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.role}</p>
                    </div>
                    {contact.unread > 0 && <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {contact.unread}
                      </span>}
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">
                    {contact.lastMessage}
                  </p>
                </button>)}
            </div>
          </div>
        </div>
        <div className="col-span-9 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
          {selectedContact ? <>
              <div className="p-4 border-b">
                <h2 className="font-semibold">{selectedContact.name}</h2>
                <p className="text-sm text-gray-600">{selectedContact.role}</p>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map(message => <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                      <p>{message.message}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'You' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>)}
              </div>
              <div className="p-4 border-t">
                {activeTab === 'requests' && <select value={requestType} onChange={e => setRequestType(e.target.value)} className="w-full p-2 mb-4 border rounded-md">
                    <option value="">Select Request Type</option>
                    <option value="administrative">
                      Administrative Support
                    </option>
                    <option value="it">IT Support</option>
                    <option value="maintenance">Maintenance</option>
                  </select>}
                <div className="flex items-center space-x-2">
                  <button onClick={handleFileAttachment} className="p-2 text-gray-500 hover:text-gray-700">
                    <PaperclipIcon size={20} />
                  </button>
                  <input type="text" value={messageInput} onChange={e => setMessageInput(e.target.value)} placeholder={activeTab === 'requests' ? 'Describe your request...' : 'Type a message...'} className="flex-1 p-2 border rounded-md" />
                  <button onClick={handleSendMessage} className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    <SendIcon size={20} />
                  </button>
                </div>
              </div>
            </> : <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircleIcon size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">
                  Select a conversation to start chatting
                </p>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default ChatSystem;