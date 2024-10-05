import { instance } from "./axios-instance";

interface Station {
  station_name: string;
  distance: number;
  latitude: number;
  longitude: number;
}

export async function getStation({
  latitude,
  longitude,
}: {
  latitude: number | undefined;
  longitude: number | undefined;
}) {
  const res: Station = await instance
    .post(`/find_nearest_station`, {
      latitude,
      longitude,
    })
    .then((res) => res.data);
  return res;
}

interface Attraction {
  attractions: [
    {
      name: string;
      description: string;
      latitude: number;
      longitude: number;
      distance: number;
      image_url: string;
    }
  ];
}

export async function getAttractionsByStation({
  station_name,
}: {
  station_name: string | undefined;
}) {
  const res: Attraction = await instance
    .post(`/get_attractions_by_station`, {
      station_name,
    })
    .then((res) => res.data);
  return res;
}
