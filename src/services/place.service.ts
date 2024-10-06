import { GreetingType, Recommendation } from "@/types/station";
import { instance } from "./axios-instance";

type FindNearActivityProps = {
  latitude: number | undefined;
  longitude: number | undefined;
  preferences: string[];
};

export async function Greeting({
  latitude,
  longitude,
  preferences,
}: FindNearActivityProps) {
  const data: GreetingType = await instance
    .post("/greetings", {
      latitude,
      longitude,
      preferences: preferences,
    })
    .then((res) => res.data);
  return data;
}

export async function FindNearActivity({
  latitude,
  longitude,
  preferences,
}: FindNearActivityProps) {
  const data: {
    recommendations: Recommendation[];
  } = await instance
    .post("/find_near_activity", {
      latitude,
      longitude,
      preferences: preferences,
    })
    .then((res) => res.data);
  return data;
}
