import { instance } from "./axios-instance";

interface category {
  [key: string]: string[]; // 키는 카테고리 이름(문자열)이고, 값은 문자열 배열
}

export async function getCategory() {
  const data: category[] = await instance
    .get("/categories")
    .then((res) => res.data);
  return data;
}
