/**
 * Single source of truth for all invitation content.
 * Swap placeholder text, dates, contacts, accounts, and image URLs here —
 * no other file should hardcode copy or asset paths.
 */

// ---------- Types ----------

export interface Person {
  /** Full name in Korean */
  name: string;
  /** Romanized name, used for editorial/English display */
  nameEn: string;
  /** Relationship to the couple, e.g. "신랑", "신랑 아버지" */
  relation: string;
  phone: string;
}

export interface FamilySide {
  self: Person;
  father: Person;
  mother: Person;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  holderName: string;
  /** Optional deep link to a KakaoPay / Toss money-send page */
  kakaoPayLink?: string;
}

export interface AccountGroup {
  label: string; // e.g. "신랑측", "신부측"
  accounts: BankAccount[];
}

export type GalleryCategory = "couple" | "behind" | "detail";

export interface GalleryPhoto {
  id: string;
  category: GalleryCategory;
  thumbnailUrl: string;
  fullUrl: string;
  width: number;
  height: number;
  alt: string;
}

export interface QnaItem {
  id: string;
  question: string;
  groomAnswer: string;
  brideAnswer: string;
}

export interface ProfileField {
  label: string;
  groomValue: string;
  brideValue: string;
}

export interface TransportationInfo {
  subway: string[];
  bus: string[];
  carAndParking: string[];
}

export interface VenueInfo {
  name: string;
  hallName: string;
  address: string;
  addressDetail: string;
  phone: string;
  lat: number;
  lng: number;
  naverMapUrl: string;
  kakaoMapUrl: string;
  tmapUrl: string;
  transportation: TransportationInfo;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  /** Optional song recommendation for the couple's honeymoon/roadtrip playlist */
  song?: string;
  createdAtIso: string;
}

export interface InvitationData {
  meta: {
    siteTitle: string;
    ogDescription: string;
    ogImageUrl: string;
  };
  couple: {
    groom: Person;
    bride: Person;
    heroImageUrl: string;
    heroImageAlt: string;
  };
  wedding: {
    /** ISO 8601 datetime, local to the venue */
    dateTimeIso: string;
    dateDisplay: string; // e.g. "2026년 11월 14일 토요일"
    timeDisplay: string; // e.g. "오후 1시 30분"
  };
  greeting: {
    eyebrow: string;
    title: string;
    message: string[]; // paragraph split by lines for staggered reveal
    signature: string;
  };
  venue: VenueInfo;
  familyGroom: FamilySide;
  familyBride: FamilySide;
  accounts: {
    groom: AccountGroup;
    bride: AccountGroup;
  };
  gallery: GalleryPhoto[];
  profileFields: ProfileField[];
  qna: QnaItem[];
  bgm: {
    src: string;
    title: string;
    /** Autoplay is intentionally disabled by default; browsers block it and it's poor UX */
    autoPlay: boolean;
  };
  /** Playful mission prompts shown in the "photo quest" disposable-camera section */
  photoMissions: string[];
  /** Starting number for the local visit counter (see hooks/useVisitCount) */
  visitorCountSeed: number;
  /** Seed messages shown before any real guest has signed the guestbook on this device */
  guestbookSeed: GuestbookEntry[];
}

// ---------- Data ----------

const UNSPLASH = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const invitationData: InvitationData = {
  meta: {
    siteTitle: "혜진 ♥ 해준의 결혼식에 초대합니다",
    ogDescription: "2026년 11월 14일 토요일, 저희 두 사람이 하나가 되는 날 함께해 주세요.",
    ogImageUrl: UNSPLASH("photo-1519741497674-611481863552", 1200),
  },

  couple: {
    groom: {
      name: "김해준",
      nameEn: "Haejun Kim",
      relation: "신랑",
      phone: "010-1234-5678",
    },
    bride: {
      name: "이혜진",
      nameEn: "Hyejin Lee",
      relation: "신부",
      phone: "010-8765-4321",
    },
    heroImageUrl: UNSPLASH("photo-1519741497674-611481863552", 1600),
    heroImageAlt: "신랑 신부의 웨딩 포토",
  },

  wedding: {
    dateTimeIso: "2026-11-14T13:30:00+09:00",
    dateDisplay: "2026년 11월 14일 토요일",
    timeDisplay: "오후 1시 30분",
  },

  greeting: {
    eyebrow: "INVITATION",
    title: "저희 결혼합니다",
    message: [
      "함께 있으면 편안하고,",
      "함께라서 더 빛나는 사람을 만났습니다.",
      "",
      "서로 다른 길을 걸어온 두 사람이",
      "이제 같은 곳을 바라보며",
      "한 걸음씩 걸어가려 합니다.",
      "",
      "저희 두 사람의 새로운 시작을",
      "귀한 걸음으로 축복해 주시면",
      "더없이 큰 기쁨으로 간직하겠습니다.",
    ],
    signature: "김해준 · 이혜진 드림",
  },

  venue: {
    name: "그레이스 컨벤션",
    hallName: "3층 그랜드홀",
    address: "서울특별시 강남구 테헤란로 123",
    addressDetail: "그레이스 컨벤션 3층",
    phone: "02-1234-5678",
    lat: 37.5006,
    lng: 127.0364,
    naverMapUrl: "https://map.naver.com/p/search/그레이스컨벤션",
    kakaoMapUrl: "https://map.kakao.com/link/search/그레이스컨벤션",
    tmapUrl: "https://tmap.life/search/그레이스컨벤션",
    transportation: {
      subway: [
        "2호선 강남역 3번 출구에서 도보 5분",
        "신분당선 강남역 6번 출구에서 도보 7분",
      ],
      bus: [
        "간선버스: 140, 143, 401 (강남역.강남역환승센터 하차)",
        "지선버스: 4412, 4419 (강남역 하차)",
      ],
      carAndParking: [
        "네비게이션에 '그레이스 컨벤션' 또는 주소 검색",
        "건물 지하 1~3층 주차, 예식 하객 3시간 무료",
        "만차 시 인근 강남역 공영주차장 이용 바랍니다",
      ],
    },
  },

  familyGroom: {
    self: {
      name: "김해준",
      nameEn: "Haejun Kim",
      relation: "신랑",
      phone: "010-1234-5678",
    },
    father: {
      name: "김민석",
      nameEn: "Minseok Kim",
      relation: "신랑 아버지",
      phone: "010-1111-2222",
    },
    mother: {
      name: "박선영",
      nameEn: "Seonyoung Park",
      relation: "신랑 어머니",
      phone: "010-3333-4444",
    },
  },
  familyBride: {
    self: {
      name: "이혜진",
      nameEn: "Hyejin Lee",
      relation: "신부",
      phone: "010-8765-4321",
    },
    father: {
      name: "이준호",
      nameEn: "Junho Lee",
      relation: "신부 아버지",
      phone: "010-5555-6666",
    },
    mother: {
      name: "최은경",
      nameEn: "Eunkyung Choi",
      relation: "신부 어머니",
      phone: "010-7777-8888",
    },
  },

  accounts: {
    groom: {
      label: "신랑측 마음 전하실 곳",
      accounts: [
        { bankName: "국민은행", accountNumber: "123456-78-901234", holderName: "김해준" },
        { bankName: "신한은행", accountNumber: "110-123-456789", holderName: "김민석" },
        { bankName: "농협은행", accountNumber: "302-1234-5678-91", holderName: "박선영" },
      ],
    },
    bride: {
      label: "신부측 마음 전하실 곳",
      accounts: [
        { bankName: "우리은행", accountNumber: "1002-123-456789", holderName: "이혜진" },
        { bankName: "하나은행", accountNumber: "123-456789-01234", holderName: "이준호" },
        { bankName: "카카오뱅크", accountNumber: "3333-12-3456789", holderName: "최은경" },
      ],
    },
  },

  gallery: [
    {
      id: "g01",
      category: "couple",
      thumbnailUrl: UNSPLASH("photo-1519741497674-611481863552", 480),
      fullUrl: UNSPLASH("photo-1519741497674-611481863552", 1600),
      width: 1600,
      height: 2133,
      alt: "부케를 든 신부",
    },
    {
      id: "g02",
      category: "couple",
      thumbnailUrl: UNSPLASH("photo-1519225421980-715cb0215aed", 480),
      fullUrl: UNSPLASH("photo-1519225421980-715cb0215aed", 1600),
      width: 1600,
      height: 1067,
      alt: "손을 맞잡은 신랑 신부",
    },
    {
      id: "g03",
      category: "detail",
      thumbnailUrl: UNSPLASH("photo-1465495976277-4387d4b0b4c6", 480),
      fullUrl: UNSPLASH("photo-1465495976277-4387d4b0b4c6", 1600),
      width: 1600,
      height: 1067,
      alt: "웨딩 반지",
    },
    {
      id: "g04",
      category: "couple",
      thumbnailUrl: UNSPLASH("photo-1533749047139-189de3cf06d3", 480),
      fullUrl: UNSPLASH("photo-1533749047139-189de3cf06d3", 1600),
      width: 1600,
      height: 2400,
      alt: "웨딩 촬영 중인 신랑 신부",
    },
    {
      id: "g05",
      category: "behind",
      thumbnailUrl: UNSPLASH("photo-1522673607200-164d1b6ce486", 480),
      fullUrl: UNSPLASH("photo-1522673607200-164d1b6ce486", 1600),
      width: 1600,
      height: 2133,
      alt: "웨딩드레스",
    },
    {
      id: "g06",
      category: "detail",
      thumbnailUrl: UNSPLASH("photo-1606800052052-a08af7148866", 480),
      fullUrl: UNSPLASH("photo-1606800052052-a08af7148866", 1600),
      width: 1600,
      height: 1067,
      alt: "웨딩 테이블 세팅",
    },
    {
      id: "g07",
      category: "couple",
      thumbnailUrl: UNSPLASH("photo-1583939003579-730e3918a45a", 480),
      fullUrl: UNSPLASH("photo-1583939003579-730e3918a45a", 1600),
      width: 1600,
      height: 2400,
      alt: "노을 아래 신랑 신부 실루엣",
    },
    {
      id: "g08",
      category: "behind",
      thumbnailUrl: UNSPLASH("photo-1509927083803-4bd519298ac4", 480),
      fullUrl: UNSPLASH("photo-1509927083803-4bd519298ac4", 1600),
      width: 1600,
      height: 1067,
      alt: "부케 클로즈업",
    },
    {
      id: "g09",
      category: "couple",
      thumbnailUrl: UNSPLASH("photo-1550005809-91ad75fb315f", 480),
      fullUrl: UNSPLASH("photo-1550005809-91ad75fb315f", 1600),
      width: 1600,
      height: 2133,
      alt: "신부 준비 모습",
    },
    {
      id: "g10",
      category: "behind",
      thumbnailUrl: UNSPLASH("photo-1587271636175-90d58cdad458", 480),
      fullUrl: UNSPLASH("photo-1587271636175-90d58cdad458", 1600),
      width: 1600,
      height: 1067,
      alt: "웨딩 소품",
    },
    {
      id: "g11",
      category: "couple",
      thumbnailUrl: UNSPLASH("photo-1592621385612-4d7129426394", 480),
      fullUrl: UNSPLASH("photo-1592621385612-4d7129426394", 1600),
      width: 1600,
      height: 2400,
      alt: "신랑 신부 포옹",
    },
    {
      id: "g12",
      category: "detail",
      thumbnailUrl: UNSPLASH("photo-1519671482749-fd09be7ccebf", 480),
      fullUrl: UNSPLASH("photo-1519671482749-fd09be7ccebf", 1600),
      width: 1600,
      height: 1067,
      alt: "웨딩 부케와 소품",
    },
  ],

  profileFields: [
    { label: "생일", groomValue: "1994.03.12", brideValue: "1995.07.28" },
    { label: "MBTI", groomValue: "ISTJ", brideValue: "ENFP" },
    { label: "취미", groomValue: "등산, 사진", brideValue: "베이킹, 여행" },
    { label: "직업", groomValue: "소프트웨어 엔지니어", brideValue: "인테리어 디자이너" },
  ],

  qna: [
    {
      id: "q01",
      question: "처음 만난 순간을 기억하나요?",
      groomAnswer: "친구 결혼식 피로연에서 우연히 옆자리에 앉았던 게 시작이었어요.",
      brideAnswer: "낯을 많이 가리는 사람인 줄 알았는데 의외로 말이 잘 통해서 놀랐어요.",
    },
    {
      id: "q02",
      question: "결혼을 결심하게 된 계기는?",
      groomAnswer: "힘든 하루를 보내고도 이 사람과 이야기하면 편안해진다는 걸 느꼈을 때요.",
      brideAnswer: "함께 있을 때 가장 나다운 모습이 될 수 있다는 걸 깨달았을 때요.",
    },
    {
      id: "q03",
      question: "앞으로 어떤 부부가 되고 싶나요?",
      groomAnswer: "서로의 편이 되어주는, 오래도록 친구 같은 부부가 되고 싶습니다.",
      brideAnswer: "함께 웃는 날이 더 많은, 다정한 부부가 되고 싶어요.",
    },
  ],

  bgm: {
    src: "/audio/bgm.mp3",
    title: "Wedding BGM (placeholder)",
    autoPlay: false,
  },

  photoMissions: [
    "신랑이 신부를 보고 활짝 웃는 순간을 담아주세요",
    "울컥하신 양가 부모님의 표정을 몰래 포착해 주세요",
    "하객들과 가장 신나게 찍은 단체 셀카를 남겨주세요",
  ],

  visitorCountSeed: 482,

  guestbookSeed: [
    {
      id: "seed-1",
      name: "박지은",
      message: "혜진아 결혼 진심으로 축하해! 늘 행복하길 바랄게 💛",
      song: "장범준 - 흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야",
      createdAtIso: "2026-08-20T09:12:00+09:00",
    },
    {
      id: "seed-2",
      name: "이도현",
      message: "해준아 축하한다! 신혼여행 가서도 계속 알콩달콩하길~",
      song: "폴킴 - 모든 날, 모든 순간",
      createdAtIso: "2026-08-22T14:30:00+09:00",
    },
  ],
};

export default invitationData;
