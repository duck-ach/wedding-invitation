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
    dateDisplay: string; // e.g. "2027년 8월 29일 일요일"
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

export const invitationData: InvitationData = {
  meta: {
    siteTitle: "혜진 ♥ 병현의 결혼식에 초대합니다",
    ogDescription: "2027년 8월 29일 일요일, 저희 두 사람이 하나가 되는 날 함께해 주세요.",
    ogImageUrl: "/images/hero.jpg",
  },

  couple: {
    groom: {
      name: "임병현",
      nameEn: "Byeonghyeon Lim",
      relation: "신랑",
      phone: "010-1234-5678",
    },
    bride: {
      name: "조혜진",
      nameEn: "Hyejin Cho",
      relation: "신부",
      phone: "010-8765-4321",
    },
    heroImageUrl: "/images/hero.jpg",
    heroImageAlt: "부케를 담은 신발을 사이에 두고 마주보며 웃는 신랑 신부",
  },

  wedding: {
    dateTimeIso: "2027-08-29T13:30:00+09:00",
    dateDisplay: "2027년 8월 29일 일요일",
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
    signature: "임병현 · 조혜진 드림",
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
      name: "임병현",
      nameEn: "Byeonghyeon Lim",
      relation: "신랑",
      phone: "010-1234-5678",
    },
    father: {
      name: "임민석",
      nameEn: "Minseok Lim",
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
      name: "조혜진",
      nameEn: "Hyejin Cho",
      relation: "신부",
      phone: "010-8765-4321",
    },
    father: {
      name: "조준호",
      nameEn: "Junho Cho",
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
        { bankName: "국민은행", accountNumber: "123456-78-901234", holderName: "임병현" },
        { bankName: "신한은행", accountNumber: "110-123-456789", holderName: "임민석" },
        { bankName: "농협은행", accountNumber: "302-1234-5678-91", holderName: "박선영" },
      ],
    },
    bride: {
      label: "신부측 마음 전하실 곳",
      accounts: [
        { bankName: "우리은행", accountNumber: "1002-123-456789", holderName: "조혜진" },
        { bankName: "하나은행", accountNumber: "123-456789-01234", holderName: "조준호" },
        { bankName: "카카오뱅크", accountNumber: "3333-12-3456789", holderName: "최은경" },
      ],
    },
  },

  gallery: [
    {
      id: "gallery-1",
      category: "couple",
      thumbnailUrl: "/images/gallery/g06-thumb.jpg",
      fullUrl: "/images/gallery/g06-full.jpg",
      width: 1280,
      height: 1920,
      alt: "손을 잡고 활짝 웃는 신랑 신부",
    },
    {
      id: "gallery-2",
      category: "detail",
      thumbnailUrl: "/images/gallery/g02-thumb.jpg",
      fullUrl: "/images/gallery/g02-full.jpg",
      width: 1280,
      height: 1920,
      alt: "두 손으로 하트를 만든 신랑 신부의 다정한 순간",
    },
    {
      id: "gallery-3",
      category: "detail",
      thumbnailUrl: "/images/gallery/g07-thumb.jpg",
      fullUrl: "/images/gallery/g07-full.jpg",
      width: 1280,
      height: 1920,
      alt: "이마를 맞대고 서로를 바라보는 신랑 신부",
    },
    {
      id: "gallery-4",
      category: "couple",
      thumbnailUrl: "/images/gallery/g04-thumb.jpg",
      fullUrl: "/images/gallery/g04-full.jpg",
      width: 1280,
      height: 1920,
      alt: "들꽃 다발과 함께 장난스러운 표정을 짓는 신랑 신부",
    },
    {
      id: "gallery-5",
      category: "couple",
      thumbnailUrl: "/images/gallery/g03-thumb.jpg",
      fullUrl: "/images/gallery/g03-full.jpg",
      width: 1280,
      height: 1920,
      alt: "하얀 배경 앞에서 나란히 앉아 있는 신랑 신부",
    },
    {
      id: "gallery-6",
      category: "couple",
      thumbnailUrl: "/images/gallery/g05-thumb.jpg",
      fullUrl: "/images/gallery/g05-full.jpg",
      width: 1280,
      height: 1920,
      alt: "부케를 사이에 두고 다정하게 포옹하는 신랑 신부",
    },
    {
      id: "gallery-7",
      category: "couple",
      thumbnailUrl: "/images/gallery/g01-thumb.jpg",
      fullUrl: "/images/gallery/g01-full.jpg",
      width: 1280,
      height: 1920,
      alt: "웨딩 화보 촬영 중 마주보며 웃는 신랑 신부",
    },
  ],

  profileFields: [
    { label: "생일", groomValue: "1994.01.01", brideValue: "2000.04.02" },
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
      message: "병현아 축하한다! 신혼여행 가서도 계속 알콩달콩하길~",
      song: "폴킴 - 모든 날, 모든 순간",
      createdAtIso: "2026-08-22T14:30:00+09:00",
    },
  ],
};

export default invitationData;
