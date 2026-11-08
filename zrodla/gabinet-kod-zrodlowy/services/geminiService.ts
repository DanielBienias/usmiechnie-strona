import { GoogleGenAI, Chat } from "@google/genai";
import { SERVICES, CLINIC_ADDRESS, CLINIC_PHONE, CLINIC_EMAIL } from '../constants';

let chatSession: Chat | null = null;

// Prepare system context based on real app data
const systemContext = `
Jesteś wirtualnym asystentem (recepcjonistą) w gabinecie stomatologicznym "Uśmiechnie".
Twoim zadaniem jest odpowiadanie na pytania pacjentów w sposób uprzejmy, profesjonalny i krótki (zoptymalizowany pod mobile).

Dane gabinetu:
Adres: ${CLINIC_ADDRESS}
Telefon: ${CLINIC_PHONE}
Email: ${CLINIC_EMAIL}

Usługi i ceny (orientacyjne):
${SERVICES.map(s => `- ${s.title} (${s.category}) Cena: ${s.price}`).join('\n')}

Godziny otwarcia:
Wtorek: 9:00 - 19:00
Środa: 9:00 - 17:00
Piątek: 9:00 - 19:00
(prosimy o kontakt telefoniczny)

Jeśli pacjent chce umówić wizytę, poproś o podanie numeru telefonu, a recepcja oddzwoni, lub zachęć do zadzwonienia pod numer gabinetu.
Nie wymyślaj usług, których nie ma na liście.
`;

export const getChatSession = (): Chat => {
  if (chatSession) return chatSession;

  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: systemContext,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const result = await chat.sendMessage({ message });
    return result.text || "Przepraszam, nie mogłem wygenerować odpowiedzi.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Przepraszam, wystąpił problem z połączeniem. Prosimy o kontakt telefoniczny.";
  }
};