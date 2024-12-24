import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from './Button';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Mock AI response - Replace with actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            content: "Here's a suggestion for your project: Consider adding unit tests and documentation to make it more maintainable. Also, you might want to look into using TypeScript for better type safety.",
          });
        }, 1000);
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: (response as any).content,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <p className="text-sm text-gray-500">Get project suggestions and coding help</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for project suggestions..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}