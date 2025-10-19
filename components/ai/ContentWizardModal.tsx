import React, { useState, useCallback } from 'react';
import { generateContent } from '../../services/geminiService';
import { SparklesIcon, XIcon } from '../icons/Icons';
import { Task, TaskStatus, TaskPriority } from '../../types';

interface ContentWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

type ContentType = 'blog' | 'social' | 'email';

const ContentWizardModal: React.FC<ContentWizardModalProps> = ({ isOpen, onClose, onAddTask }) => {
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [contentType, setContentType] = useState<ContentType>('blog');
  
  // Form states
  const [blogTopic, setBlogTopic] = useState('');
  const [blogKeywords, setBlogKeywords] = useState('');
  const [blogTone, setBlogTone] = useState('Professional');

  const [socialPlatform, setSocialPlatform] = useState('LinkedIn');
  const [socialTopic, setSocialTopic] = useState('');
  const [socialCTA, setSocialCTA] = useState('');

  const [emailGoal, setEmailGoal] = useState('Promotion');
  const [emailProduct, setEmailProduct] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const constructPrompt = () => {
    switch (contentType) {
      case 'blog':
        return `Act as an expert content creator. Write a ${blogTone.toLowerCase()} blog post about "${blogTopic}". ${blogKeywords ? `Include the following keywords: ${blogKeywords}.` : ''} The output should be well-structured and ready to publish.`;
      case 'social':
        return `Generate a compelling social media post for ${socialPlatform}. The topic is "${socialTopic}". ${socialCTA ? `Include a clear call-to-action: "${socialCTA}".` : ''} Make it engaging and appropriate for the platform.`;
      case 'email':
        return `Compose a marketing email with the goal of ${emailGoal.toLowerCase()}. The email is about "${emailProduct}". Key message to convey: "${emailMessage}". The tone should be persuasive and professional.`;
      default:
        return '';
    }
  };

  const handleGenerate = useCallback(async () => {
    const prompt = constructPrompt();
    if (!prompt) {
      setError('Please fill out the form to generate content.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent('');
    try {
      const content = await generateContent(prompt);
      setGeneratedContent(content);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [contentType, blogTopic, blogKeywords, blogTone, socialPlatform, socialTopic, socialCTA, emailGoal, emailProduct, emailMessage]);

  const handleCreateTask = () => {
      if (!generatedContent) return;
      const title = generatedContent.split('\n')[0] || 'New AI Task';
      
      const newTask: Omit<Task, 'id'> = {
          name: `Review Content: "${title.substring(0, 40)}..."`,
          logo: 'https://em-content.zobj.net/source/apple/354/robot_1f916.png',
          handle: `#AI-${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          status: TaskStatus.ToDo,
          amount: 0,
          priority: TaskPriority.Medium,
          assignees: [],
      };
      onAddTask(newTask);
      onClose();
  };

  if (!isOpen) return null;
  
  const renderForm = () => {
    switch(contentType) {
        case 'blog': return (
            <div className="space-y-4">
                <input type="text" value={blogTopic} onChange={e => setBlogTopic(e.target.value)} placeholder="Blog Post Topic" className="w-full bg-light border-light-3 rounded-lg p-3 font-semibold" />
                <input type="text" value={blogKeywords} onChange={e => setBlogKeywords(e.target.value)} placeholder="Keywords (comma-separated)" className="w-full bg-light border-light-3 rounded-lg p-3 font-semibold" />
                <select value={blogTone} onChange={e => setBlogTone(e.target.value)} className="w-full bg-light border-light-3 rounded-lg p-3 font-semibold">
                    <option>Professional</option>
                    <option>Casual</option>
                    <option>Enthusiastic</option>
                    <option>Funny</option>
                </select>
            </div>
        );
        case 'social': return (
             <div className="space-y-4">
                <select value={socialPlatform} onChange={e => setSocialPlatform(e.target.value)} className="w-full bg-light border-light-3 rounded-lg p-3 font-semibold">
                    <option>LinkedIn</option>
                    <option>Twitter</option>
                    <option>Facebook</option>
                </select>
                <input type="text" value={socialTopic} onChange={e => setSocialTopic(e.target.value)} placeholder="Post Topic / Message" className="w-full bg-light border-light-3 rounded-lg p-3 font-semibold" />
                <input type="text" value={socialCTA} onChange={e => setSocialCTA(e.target.value)} placeholder="Call to Action (e.g., Learn More)" className="w-full bg-light border-light-3 rounded-lg p-3 font-semibold" />
            </div>
        );
        case 'email': return (
            <div className="space-y-4">
                <select value={emailGoal} onChange={e => setEmailGoal(e.target.value)} className="w-full bg-light border-light-3 rounded-lg p-3 font-semibold">
                    <option>Promotion</option>
                    <option>Newsletter</option>
                    <option>Announcement</option>
                </select>
                <input type="text" value={emailProduct} onChange={e => setEmailProduct(e.target.value)} placeholder="Product / Service / Feature" className="w-full bg-light border-light-3 rounded-lg p-3 font-semibold" />
                <textarea value={emailMessage} onChange={e => setEmailMessage(e.target.value)} placeholder="Key message to convey" className="w-full bg-light border-light-3 rounded-lg p-3 font-semibold" rows={2}></textarea>
            </div>
        );
    }
  }

  const TabButton = ({ type, label }: { type: ContentType, label: string }) => (
      <button onClick={() => setContentType(type)} className={`px-4 py-2 text-sm font-bold rounded-lg ${contentType === type ? 'bg-dark text-white' : 'bg-light text-dark-text'}`}>
          {label}
      </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-light-3">
        <div className="flex justify-between items-center p-4 border-b border-light-3">
          <div className="flex items-center space-x-3">
            <SparklesIcon className="w-6 h-6 text-dark-text" />
            <h2 className="text-xl font-bold">Content Wizard</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-light-2">
            <XIcon className="w-5 h-5 text-gray-text" />
          </button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-dark-text mb-2">
              What would you like to create?
            </label>
            <div className="flex space-x-2 p-1 bg-light rounded-xl">
                <TabButton type="blog" label="📝 Blog Post" />
                <TabButton type="social" label="📱 Social Media" />
                <TabButton type="email" label="✉️ Email" />
            </div>
          </div>
          
          <div className="mb-4">
            {renderForm()}
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-dark-text mb-2">Generated Content</h3>
            <div className="bg-light rounded-lg p-4 min-h-[200px] text-sm text-dark-text border border-light-3 prose max-w-none">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dark-text"></div>
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <pre className="whitespace-pre-wrap font-sans bg-transparent border-0 p-0 m-0">{generatedContent || 'Your AI-generated content will appear here...'}</pre>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 border-t border-light-3 space-x-3 bg-light/50 rounded-b-2xl">
           <div>
            {generatedContent && !isLoading && (
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 text-sm font-bold text-white bg-green-dark rounded-lg hover:bg-opacity-80"
              >
                Create Review Task
              </button>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-dark-text bg-white border border-light-3 rounded-lg hover:bg-light-2"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              className="px-4 py-2 text-sm font-bold text-white bg-dark rounded-lg hover:bg-opacity-80 disabled:bg-opacity-50 flex items-center"
              disabled={isLoading}
            >
              <SparklesIcon className="w-4 h-4 mr-2" />
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentWizardModal;
