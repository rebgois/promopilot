
import ChatBot, { type Flow } from "react-chatbotify";

import products from "../../promotions/data/products.json";
import { analyzePromotions } from "../../promotions/domain/analyzePromotions";
import { processAssistantMessage } from "../domain/processAssistantMessage";

const analysis = analyzePromotions(products);

const flow: Flow = {

start: {
  message:
    "Olá! Sou o assistente comercial do PromoPilot. " +
    "Escolha uma sugestão ou digite sua pergunta.",

  options: {
    items: [
      "Me dê um resumo",
      "Quais produtos estão em prejuízo?",
      "Quais produtos têm margem baixa?",
      "Quais produtos são saudáveis?",
    ],
    reusable: false,
    sendOutput: true,
  },

  path: "conversation",
},


  conversation: {
    message: (params) => {
      const response = processAssistantMessage(
        params.userInput,
        analysis,
      );

      return response.message;
    },

    path: "conversation",
  },
};

export function AssistantChat() {
  return (
    <ChatBot
      id="promopilot-assistant"
      flow={flow}
      settings={{
        general: {
          primaryColor: "#1976d2",
          secondaryColor: "#4338ca",
        },
        header: {
          title: "Assistente PromoPilot",
        },
        chatInput: {
          enabledPlaceholderText:
            "Pergunte sobre suas promoções...",
        },
        notification: {
          disabled: true,
        },
      }}
      styles={{
        botBubbleStyle: {
          backgroundColor: "#eef2ff",
          color: "#1e293b",
        },
        userBubbleStyle: {
          backgroundColor: "#1976d2",
          color: "#ffffff",
        },
      }}
    />
  );
}
