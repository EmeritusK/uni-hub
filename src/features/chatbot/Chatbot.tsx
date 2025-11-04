import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const WEBHOOK_URL = 'https://alanibot.app.n8n.cloud/webhook/bd479566-ab6e-4709-a4a7-715d50090728/chat';

const Chatbot: React.FC = () => {
  useEffect(() => {
    createChat({
      webhookUrl: WEBHOOK_URL,
      target: '#n8n-chat',
      mode: 'fullscreen',
      showWelcomeScreen: true,
      loadPreviousSession: true,
      defaultLanguage: 'en',
      i18n: {
        en: {
          title: 'Chatbot de Oficios',
          subtitle: 'Inicia una conversación. Estamos aquí para ayudarte.',
          footer: '',
          getStarted: 'Nueva Conversación',
          inputPlaceholder: 'Escribe tu pregunta...',
        },
      },
    });
  }, []);

  return <div id="n8n-chat" style={{ width: '100%', height: '100%', minHeight: '600px' }} />;
};

export default Chatbot;
