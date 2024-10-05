const fields = [
  "향토음식",
  "해산물",
  "카페 & 디저트",
  "주점",
  "액티비티",
  "관광",
  "문화",
  "교육",
  "테마파크",
  "여가시설",
] as const;

type Field = (typeof fields)[number];

interface Category {
  name: Field;
  options: string[];
}

const categories: Category[] = [
  {
    name: "향토음식",
    options: ["돼지국밥", "밀면", "동래파전", "부산어묵"],
  },
  {
    name: "해산물",
    options: ["해물탕", "해물찜", "해물라면", "해물파전"],
  },
  {
    name: "액티비티",
    options: [
      "서핑",
      "스쿠버다이빙",
      "요트 투어",
      "등산",
      "달리기",
      "바닷길 산책",
      "템플스테이",
      "전통 문화 체험",
    ],
  },
  {
    name: "관광",
    options: [
      "해운대",
      "광안리",
      "태종대",
      "감천문화마을",
      "용두산공원",
      "오륙도",
      "을숙도 생태공원",
    ],
  },
  {
    name: "문화",
    options: ["공연", "축제"],
  },
  {
    name: "교육",
    options: ["박물관", "미술관", "역사관 & 기념관"],
  },
  {
    name: "테마파크",
    options: ["롯데월드 어드벤처 부산", "스파랜드 센텀시티", "부산시립미술관"],
  },
];

export { categories, fields };
