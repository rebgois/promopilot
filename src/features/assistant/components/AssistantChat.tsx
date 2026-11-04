
import ChatBot, { type Flow } from "react-chatbotify";
import { usePromotionFiltersStore } from "../../promotions/store/usePromotionFiltersStore";
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
  message: (params) => respondToMessage(params.userInput),
  path: "conversation",
},
};

export function AssistantChat() {
  return (
    <ChatBot
      id="promopilot-assistant"
      flow={flow}
      settings={{
        tooltip: {
          text: "Fale comigo! 👋",
        },
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

function respondToMessage(userInput: string): string {
  const response = processAssistantMessage(
    userInput,
    analysis,
  );

  if (response.action) {
    const store = usePromotionFiltersStore.getState();

    switch (response.action.type) {
      case "apply_filter":
        store.setSearch("");
        store.setStatusFilter(response.action.status);
        break;

      case "clear_filters":
        store.clearFilters();
        break;
    }
  }

  return response.message;
}
