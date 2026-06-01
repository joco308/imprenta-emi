'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Mensaje enviado:', message);
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 md:w-96 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur p-2 rounded-lg">
                <MessageCircle className="size-5" />
              </div>
              <div>
                <h3 className="font-bold">Soporte CopyCampus</h3>
                <p className="text-xs text-blue-100">Estamos aquí para ayudarte</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="h-80 p-4 bg-gray-50 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="bg-blue-600 text-white p-2 rounded-full size-8 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="size-4" />
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-xs">
                  <p className="text-sm text-gray-900">
                    ¡Hola! 👋 ¿En qué podemos ayudarte hoy?
                  </p>
                  <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="bg-blue-600 text-white p-2 rounded-full size-8 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="size-4" />
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-xs">
                  <p className="text-sm text-gray-900 mb-2">
                    Puedes preguntarnos sobre:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Estado de tu pedido</li>
                    <li>• Precios y servicios</li>
                    <li>• Horarios de atención</li>
                    <li>• Problemas técnicos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Send className="size-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition transform hover:scale-110 flex items-center gap-3"
        >
          <MessageCircle className="size-6" />
          <span className="font-semibold pr-2">¿Necesitas ayuda?</span>
        </button>
      )}
    </div>
  );
}
