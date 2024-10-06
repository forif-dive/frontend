import { instance } from "./axios-instance";

interface ChatProps {
  previous_chat: string[];
  preferences: string[];
  latitude: number | undefined;
  longitude: number | undefined;
}

export async function chat(props: ChatProps) {
  const message: { response: string } = await instance
    .post("/chat", props)
    .then((res) => res.data);
  return message;
}
