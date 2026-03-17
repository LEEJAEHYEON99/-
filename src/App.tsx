import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Instagram, Facebook, Share2, Lock, ChevronDown, Briefcase, Handshake, Landmark, LogOut, Trash2, MessageSquare, Send, X, Upload, Image as ImageIcon, Edit3 } from 'lucide-react';

const ADMIN_PASSWORD = '87511483';
const BRAND_BLUE = '#004EA2'; // 더불어민주당 상징색

type Message = {
  id: string;
  name: string;
  content: string;
  date: string;
};

type GalleryItem = {
  id: string;
  title: string;
  desc: string;
  icon?: string;
  imageUrl?: string;
};

const DEFAULT_CONTENT = {
  hero: {
    title: "이 재 현",
    subtitle: "준비된 청년, 일하는 정치",
    name: "이재현",
    role: "더불어민주당 순천시의원 비례대표 출마예정자",
    bottomText: "근면과 성실, 신뢰와 겸손으로\n시민·당원과 함께하는 27살 청년 정치인이 되겠습니다.\n끊임없는 배움과 열정으로\n지역과 더불어민주당의 미래를 위해 헌신하겠습니다."
  },
  stories: [
    {
      tag: "#준비된_일꾼",
      desc: "대선 청년외교특보, 더불어민주당 순천(갑) 대학생위원회 부위원장, 국회 인턴 비서관으로 이어지는 경험을 통해 당 조직과 정치 현장을 직접 경험했습니다.\n당, 지역, 국회 세 정치 현장을 모두 경험한 청년은 흔하지 않습니다. 저는 그 경험을 바탕으로 시민과 당을 위해 더 큰 역할로 헌신하는 27살 청년 정치인이 되고자 합니다."
    },
    {
      tag: "#행동하는_양심",
      desc: "고등학교 2학년 시절, 박근혜 정부의 국정농단 사태를 규탄하는 시국 대자보를 작성하여 광장으로 들고 나가 싸우고 또 싸웠습니다. 그리고 12.3 내란 규탄까지. 불의를 외면하지 않고, 돌멩이라도 던져 싸울 수 있는 용기와 정의감을 가진 부끄럽지 않은 사람이 되고 싶었습니다."
    },
    {
      tag: "#순천_토박이",
      desc: "순천에서 나고 자라 순천에서 공부하고 대학까지 졸업한 청년. 통계가 아닌 삶으로 순천을 느꼈습니다. 순천의 특성과 지역 문제를 잘 이해하고 있어, 순천 시민의 목소리를 제대로 반영할 수 있는 능력을 가지고 있습니다."
    }
  ],
  vision: {
    quote: "\"민원 해결사를 넘어, 순천의 내일을 기획하는 '정책 입안자'가 되겠습니다.\"",
    desc: "특정 동네의 문제에 얽매이지 않고, 순천시 전체의 문제(청년 유출, 일자리, 주거)를 구조적으로 해결하기 위해 비례대표에 도전합니다."
  },
  promises: [
    {
      title: "청년이 일할 수 있는 도시, 순천",
      desc: "문화콘텐츠, 우주항공·방산, 산업그린바이오 등 순천의 미래 산업 정책이 실제 지역 청년들의 일자리로 연결될 수 있도록 정책을 점검하고 제도적으로 뒷받침하겠습니다."
    },
    {
      title: "청년과 함께 만드는 정책",
      desc: "청년들이 정책 과정에 보다 적극적으로 참여할 수 있도록 제도적 기반을 보완하는 조례를 추진하겠습니다. 청년을 위한 정책을 청년과 함께 만드는 구조를 만드는 것이 출발점입니다."
    },
    {
      title: "열린 의정 및 당의 가치 실현",
      desc: "시의회 조례와 예산 심의 내용을 시민이 이해할 수 있는 언어로 공개하고, 지역위원회와 함께 현장에서 더불어민주당의 가치가 실현될 수 있도록 하겠습니다."
    }
  ],
  profileHighlights: [
    {
      current: true,
      title: "더불어민주당 순천(갑) 대학생위원회 부위원장"
    },
    {
      current: true,
      title: "민주평화통일자문회의 자문위원 [의장: 대통령]"
    },
    {
      current: false,
      title: "21대 국회의원 인턴 비서관"
    },
    {
      current: false,
      title: "더불어민주당 제21대 대통령선거 이재명 후보 순천시 특보"
    },
    {
      current: false,
      title: "더불어민주당 제20대 대통령선거 이재명 후보 청년외교특보"
    },
    {
      current: false,
      title: "국립순천대학교 제38대 총학생회 정책부장"
    },
    {
      current: false,
      title: "순천시청소년참여위원회 위원장"
    },
    {
      current: false,
      title: "EBS 청소년시청자위원회 위원"
    },
    {
      current: false,
      title: "대한민국학생기자단 전남권 대표 기자"
    }
  ],
  profileDetails: [
    {
      category: "학력",
      items: [
        "국립순천대학교 컴퓨터교육과 졸업 (2026)",
        "순천제일고등학교 졸업 (2018)",
        "순천팔마중학교 졸업 (2015)",
        "순천율산초등학교 졸업 (2012)"
      ]
    },
    {
      category: "수상",
      items: [
        "더불어민주당 당대표 1급 포상 (제21대 대통령선거 승리 기여, 2022)",
        "전라남도 교육감 표창 (지역사회 발전 및 청년 모범, 2023)",
        "전라남도지사 표창 (청소년 권익 증진, 2016)",
        "순천시장 표창 (2013순천만국제정원박람회 홍보 기여, 2012)",
        "국회의원 표창 (청소년 언론의식 함양 기여, 2017)"
      ]
    },
    {
      category: "기타",
      items: [
        "자치입법전문가 1급 취득 (제윤의정, 2024)"
      ]
    }
  ],
  footer: {
    quote: "\"서생의 문제의식과 상인의 현실감각을 겸비한\n청년이자, 쓰임 받는 큰 정치인이 되겠습니다.\""
  },
  contact: {
    phone: "010-6429-0847",
    message: "010-6429-0847",
    instagram: "https://www.instagram.com/lucasneal_?igsh=MWkyYWJhbzBpcnM5cg%3D%3D&utm_source=qr",
    facebook: "https://www.facebook.com/share/1CFRA6i268/?mibextid=wwXIfr"
  }
};

const DEFAULT_PROFILE_IMAGE = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAJYAlgDASIAAhEBAxEB/8QAHAAAAAcBAQAAAAAAAAAAAAAAAAECAwQFBgcI/8QAUxAAAgEDAwEEBwQGBgYJAgUFAQIDAAQRBRIhMQYTQVFhFCJxgZEyobHBBxUjQlLR8DNi4RYkO0N0U1RjZHNzgpKywvE0";

const STORIES_BG = [
  { bg: 'bg-blue-50', text: 'text-blue-900' },
  { bg: 'bg-indigo-50', text: 'text-indigo-900' },
  { bg: 'bg-sky-50', text: 'text-sky-900' }
];

const GALLERY_TABS = [
  { id: 'protest', label: '불의에 맞선 현장' },
  { id: 'politics', label: '정치를 배운 국회와 당' },
  { id: 'citizens', label: '열정 많은 순천 청년 이재현' }
];

const DEFAULT_GALLERY_DATA: Record<string, GalleryItem[]> = {
  protest: [
    {
      "id": "1741574164101-0",
      "title": "12.3 내란 규탄 시위",
      "desc": "2024년 12월 3일, 헌법 유린과 민주주의 파괴에 맞서 거리로 나갔습니다. 순천대학교 정문에서 1인 피켓 시위를 진행하며, 시민의 양심을 지키고 민주주의를 수호하기 위해 목소리를 높였습니다. 불의에 침묵하지 않는 청년의 기개를 보여준 순간입니다.",
      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAJYAlgDASIAAhEBAxEB/8QAHAAAAAcBAQAAAAAAAAAAAAAAAAECAwQFBgcI/8QAUxAAAgEDAwEEBwQGBgYJAgUFAQIDAAQRBRIhMQYTQVFhFCJxgZEyobHBBxUjQlLR8DNi4RYkO0N0U1RjZHNzgpKywvE0"
    },
    {
      "id": "1741574164101-1",
      "title": "계엄군 체포 작전 참여",
      "desc": "비상계엄 선포 직후, 국회로 진입하려는 계엄군을 저지하고 민주주의의 최후 보루인 국회를 지키기 위해 현장에서 함께했습니다. 공권력의 부당한 행사에 맞서 몸을 던져 저항하며, 주권자의 권리를 지켜내고자 했던 치열한 투쟁의 기록입니다.",
      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAJYAlgDASIAAhEBAxEB/8QAHAAAAAcBAQAAAAAAAAAAAAAAAAECAwQFBgcI/8QAUxAAAgEDAwEEBwQGBgYJAgUFAQIDAAQRBRIhMQYTQVFhFCJxgZEyobHBBxUjQlLR8DNi4RYkO0N0U1RjZHNzgpKywvE0"
    }
  ],
  politics: [
    {
      "id": "1741574164101-2",
      "title": "국회 인턴 비서관 시절",
      "desc": "국회 인턴 비서관으로 근무하며 입법 과정의 실무를 익히고, 국가 정책이 국민의 삶에 미치는 영향을 깊이 체감했습니다. 현장의 목소리를 정책으로 연결하는 법을 배운 소중한 경험입니다.",
      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAJYAlgDASIAAhEBAxEB/8QAHAAAAAcBAQAAAAAAAAAAAAAAAAECAwQFBgcI/8QAUxAAAgEDAwEEBwQGBgYJAgUFAQIDAAQRBRIhMQYTQVFhFCJxgZEyobHBBxUjQlLR8DNi4RYkO0N0U1RjZHNzgpKywvE0"
    },
    {
      "id": "1741574164101-3",
      "title": "더불어민주당 지역위원회 활동",
      "desc": "더불어민주당 순천(갑) 대학생위원회 부위원장으로서 지역 당원들과 소통하고, 민주당의 가치를 지역사회에 전파하기 위해 노력했습니다. 풀뿌리 민주주의의 중요성을 깨닫고 정당 정치의 기초를 다진 시간입니다.",
      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAJYAlgDASIAAhEBAxEB/8QAHAAAAAcBAQAAAAAAAAAAAAAAAAECAwQFBgcI/8QAUxAAAgEDAwEEBwQGBgYJAgUFAQIDAAQRBRIhMQYTQVFhFCJxgZEyobHBBxUjQlLR8DNi4RYkO0N0U1RjZHNzgpKywvE0"
    },
    {
      "id": "1741574164101-4",
      "title": "대선 청년외교특보 활동",
      "desc": "대선 당시 청년외교특보로 활동하며 청년들의 시각에서 외교 정책을 제안하고, 더 나은 대한민국을 위한 비전을 공유했습니다. 큰 정치를 경험하며 순천의 미래를 설계하는 안목을 넓혔습니다.",
      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAJYAlgDASIAAhEBAxEB/8QAHAAAAAcBAQAAAAAAAAAAAAAAAAECAwQFBgcI/8QAUxAAAgEDAwEEBwQGBgYJAgUFAQIDAAQRBRIhMQYTQVFhFCJxgZEyobHBBxUjQlLR8DNi4RYkO0N0U1RjZHNzgpKywvE0"
    }
  ],
  citizens: [
    {
      "id": "1741574164101-5",
      "title": "소중한 순간 나누는 기쁨, 봉사활동",
      "desc": "이웃들과 함께하는 봉사활동을 통해 작은 실천이 큰 변화를 만들어간다고 믿습니다. 사회적 책임을 다하며 더 나은 세상을 위한 발걸음을 계속 내딛고 있습니다. \"세상 한 가운데 사랑이 넘치길\"",
      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAJYAlgDASIAAhEBAxEB/8QAHAAAAAcBAQAAAAAAAAAAAAAAAAECAwQFBgcI/8QAUxAAAgEDAwEEBwQGBgYJAgUFAQIDAAQRBRIhMQYTQVFhFCJxgZEyobHBBxUjQlLR8DNi4RYkO0N0U1RjZHNzgpKywvE0"
    },
    {
      "id": "1741574164101-6",
      "title": "순천대학교 총학생회 활동",
      "desc": "순천대학교 총학생회 정책부장으로서 학생들의 권익을 대변하고, 학교와 학생 사이의 가교 역할을 수행했습니다. 청년들의 고민을 현장에서 듣고 해결책을 모색했던 열정적인 시간이었습니다.",
      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAJYAlgDASIAAhEBAxEB/8QAHAAAAAcBAQAAAAAAAAAAAAAAAAECAwQFBgcI/8QAUxAAAgEDAwEEBwQGBgYJAgUFAQIDAAQRBRIhMQYTQVFhFCJxgZEyobHBBxUjQlLR8DNi4RYkO0N0U1RjZHNzgpKywvE0"
    },
    {
      "id": "1741574164101-7",
      "title": "순천시 청소년 참여위원회 위원장",
      "desc": "청소년 시절부터 지역사회에 관심을 갖고 청소년 참여위원회 위원장으로 활동하며, 청소년들의 목소리가 시정에 반영될 수 있도록 노력했습니다. 일찍이 시민 사회의 일원으로서 책임을 배운 경험입니다.",
      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAJYAlgDASIAAhEBAxEB/8QAHAAAAAcBAQAAAAAAAAAAAAAAAAECAwQFBgcI/8QAUxAAAgEDAwEEBwQGBgYJAgUFAQIDAAQRASP/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAJYAlgDASIAAhEBAxEB/8QAHAAAAAcBAQAAAAAAAAAAAAAAAAECAwQFBgcI/8QAUxAAAgEDAwEEBwQGBgYJAgUFAQIDAAQRBRIhMQYTQVFhFCJxgZEyobHBBxUjQlLR8DNi4RYkO0N0U1RjZHNzgpKywvE0"
    },
    {
      "id": "1741574164101-8",
      "title": "민주평화통일자문회의 활동",
      "desc": "민주평화통일자문회의 자문위원으로서 평화 통일에 대한 지역사회의 공감대를 형성하고, 청년들의 통일 의식을 높이기 위해 활동했습니다. 국가의 미래와 평화의 가치를 고민하는 소중한 기회였습니다.",
      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAJYAlgDASIAAhEBAxEB/8QAHAAAAAcBAQAAAAAAAAAAAAAAAAECAwQFBgcI/8QAUxAAAgEDAwEEBwQGBgYJAgUFAQIDAAQRBRIhMQYTQVFhFCJxgZEyobHBBxUjQlLR8DNi4RYkO0N0U1RjZHNzgpKywvE0"
    }
  ]
};


const PROMISES = [
  { icon: <Briefcase size={24} /> },
  { icon: <Handshake size={24} /> },
  { icon: <Landmark size={24} /> }
];

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminTab, setAdminTab] = useState<'messages' | 'gallery' | 'content' | 'contact'>('messages');
  const [adminGalleryCategory, setAdminGalleryCategory] = useState('protest');

  const [messages, setMessages] = useState<Message[]>([]);
  const [galleryData, setGalleryData] = useState<Record<string, GalleryItem[]>>(DEFAULT_GALLERY_DATA);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [newMessageName, setNewMessageName] = useState('');
  const [newMessageContent, setNewMessageContent] = useState('');

  const [activeGalleryTab, setActiveGalleryTab] = useState('protest');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ message: string, onConfirm: () => void } | null>(null);
  
  const [profileImage, setProfileImage] = useState<string | null>(DEFAULT_PROFILE_IMAGE);
  const profileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem('portfolio_messages');
    if (storedMessages) {
      try { setMessages(JSON.parse(storedMessages)); } catch (e) {}
    }
    
    const storedGallery = localStorage.getItem('portfolio_gallery');
    if (storedGallery) {
      try { setGalleryData(JSON.parse(storedGallery)); } catch (e) {}
    }

    const storedContent = localStorage.getItem('portfolio_content');
    if (storedContent) {
      try { 
        const parsed = JSON.parse(storedContent);
        if (parsed.footer?.quote === '"말이 아닌 정책과 제도로 바꾸는\n청년 정치인이 되겠습니다."' || parsed.footer?.quote === '"서생의 문제의식과 상인의 현실감각을 겸비한\n청년이자, 큰 정치인이 되겠습니다."') {
          parsed.footer.quote = '"서생의 문제의식과 상인의 현실감각을 겸비한\n청년이자, 쓰임 받는 큰 정치인이 되겠습니다."';
          localStorage.setItem('portfolio_content', JSON.stringify(parsed));
        }
        setContent(parsed); 
      } catch (e) {}
    }

    const storedProfileImage = localStorage.getItem('portfolio_profile_image');
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  const saveMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    localStorage.setItem('portfolio_messages', JSON.stringify(newMessages));
  };

  const updateContent = (section: keyof typeof DEFAULT_CONTENT, field: string, value: string) => {
    const newContent = {
      ...content,
      [section]: {
        ...(content[section] as any),
        [field]: value
      }
    };
    setContent(newContent);
    localStorage.setItem('portfolio_content', JSON.stringify(newContent));
  };

  const updateArrayContent = (section: 'stories' | 'promises', index: number, field: string, value: string) => {
    const newArray = [...content[section]];
    newArray[index] = { ...newArray[index], [field]: value };
    const newContent = { ...content, [section]: newArray };
    setContent(newContent);
    localStorage.setItem('portfolio_content', JSON.stringify(newContent));
  };

  const updateProfileHighlight = (index: number, field: 'title' | 'current', value: any) => {
    const newArray = [...(content.profileHighlights || DEFAULT_CONTENT.profileHighlights)];
    newArray[index] = { ...newArray[index], [field]: value };
    const newContent = { ...content, profileHighlights: newArray };
    setContent(newContent);
    localStorage.setItem('portfolio_content', JSON.stringify(newContent));
  };

  const addProfileHighlight = () => {
    const newArray = [...(content.profileHighlights || DEFAULT_CONTENT.profileHighlights), { current: false, title: '새로운 경력' }];
    const newContent = { ...content, profileHighlights: newArray };
    setContent(newContent);
    localStorage.setItem('portfolio_content', JSON.stringify(newContent));
  };

  const removeProfileHighlight = (index: number) => {
    const newArray = [...(content.profileHighlights || DEFAULT_CONTENT.profileHighlights)];
    newArray.splice(index, 1);
    const newContent = { ...content, profileHighlights: newArray };
    setContent(newContent);
    localStorage.setItem('portfolio_content', JSON.stringify(newContent));
  };

  const updateProfileDetailCategory = (index: number, value: string) => {
    const newArray = [...(content.profileDetails || DEFAULT_CONTENT.profileDetails)];
    newArray[index] = { ...newArray[index], category: value };
    const newContent = { ...content, profileDetails: newArray };
    setContent(newContent);
    localStorage.setItem('portfolio_content', JSON.stringify(newContent));
  };

  const updateProfileDetailItem = (sectionIndex: number, itemIndex: number, value: string) => {
    const newArray = [...(content.profileDetails || DEFAULT_CONTENT.profileDetails)];
    const newItems = [...newArray[sectionIndex].items];
    newItems[itemIndex] = value;
    newArray[sectionIndex] = { ...newArray[sectionIndex], items: newItems };
    const newContent = { ...content, profileDetails: newArray };
    setContent(newContent);
    localStorage.setItem('portfolio_content', JSON.stringify(newContent));
  };

  const addProfileDetailSection = () => {
    const newArray = [...(content.profileDetails || DEFAULT_CONTENT.profileDetails), { category: '새 카테고리', items: ['새 항목'] }];
    const newContent = { ...content, profileDetails: newArray };
    setContent(newContent);
    localStorage.setItem('portfolio_content', JSON.stringify(newContent));
  };

  const removeProfileDetailSection = (index: number) => {
    const newArray = [...(content.profileDetails || DEFAULT_CONTENT.profileDetails)];
    newArray.splice(index, 1);
    const newContent = { ...content, profileDetails: newArray };
    setContent(newContent);
    localStorage.setItem('portfolio_content', JSON.stringify(newContent));
  };

  const addProfileDetailItem = (sectionIndex: number) => {
    const newArray = [...(content.profileDetails || DEFAULT_CONTENT.profileDetails)];
    const newItems = [...newArray[sectionIndex].items, '새 항목'];
    newArray[sectionIndex] = { ...newArray[sectionIndex], items: newItems };
    const newContent = { ...content, profileDetails: newArray };
    setContent(newContent);
    localStorage.setItem('portfolio_content', JSON.stringify(newContent));
  };

  const removeProfileDetailItem = (sectionIndex: number, itemIndex: number) => {
    const newArray = [...(content.profileDetails || DEFAULT_CONTENT.profileDetails)];
    const newItems = [...newArray[sectionIndex].items];
    newItems.splice(itemIndex, 1);
    newArray[sectionIndex] = { ...newArray[sectionIndex], items: newItems };
    const newContent = { ...content, profileDetails: newArray };
    setContent(newContent);
    localStorage.setItem('portfolio_content', JSON.stringify(newContent));
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      setAdminError('');
    } else {
      setAdminError('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageName.trim() || !newMessageContent.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      name: newMessageName.trim(),
      content: newMessageContent.trim(),
      date: new Date().toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
    };

    saveMessages([newMsg, ...messages]);
    setShowMessageModal(false);
    setNewMessageName('');
    setNewMessageContent('');
    alert('응원 메시지가 성공적으로 전달되었습니다. 감사합니다!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '이재현 포트폴리오',
          text: content.hero.title.replace(/\n/g, ' '),
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      alert('현재 브라우저에서는 공유하기 기능을 지원하지 않습니다. URL을 복사해주세요.');
    }
  };

  const scrollToPromises = () => {
    document.getElementById('promises')?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- 이미지 압축 및 업로드 로직 ---
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 600; // 최대 너비 제한으로 용량 최적화
          let width = img.width;
          let height = img.height;
          
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7)); // 70% 품질의 JPEG로 압축
        };
        img.onerror = reject;
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files) as File[];
    const newItems: GalleryItem[] = [];
    
    for (const file of files) {
      try {
        const compressedDataUrl = await compressImage(file);
        newItems.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          title: '새로운 활동 사진',
          desc: '활동에 대한 설명을 입력해주세요.',
          imageUrl: compressedDataUrl
        });
      } catch (error) {
        console.error('Image compression failed', error);
        alert('이미지 업로드 중 오류가 발생했습니다.');
      }
    }
    
    const updatedData = {
      ...galleryData,
      [adminGalleryCategory]: [...newItems, ...(galleryData[adminGalleryCategory] || [])]
    };
    
    setGalleryData(updatedData);
    localStorage.setItem('portfolio_gallery', JSON.stringify(updatedData));
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    try {
      const compressedDataUrl = await compressImage(file);
      setProfileImage(compressedDataUrl);
      localStorage.setItem('portfolio_profile_image', compressedDataUrl);
    } catch (error) {
      console.error('Profile image compression failed', error);
      alert('프로필 이미지 업로드 중 오류가 발생했습니다.');
    }
    
    if (profileInputRef.current) {
      profileInputRef.current.value = '';
    }
  };

  const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editingItemId) return;
    
    const file = e.target.files[0];
    try {
      const compressedDataUrl = await compressImage(file);
      const updatedCategory = galleryData[adminGalleryCategory].map(item => 
        item.id === editingItemId ? { ...item, imageUrl: compressedDataUrl } : item
      );
      const updatedData = { ...galleryData, [adminGalleryCategory]: updatedCategory };
      setGalleryData(updatedData);
      localStorage.setItem('portfolio_gallery', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Image compression failed', error);
      // Fallback if alert fails
      console.error('이미지 업로드 중 오류가 발생했습니다.');
    }
    
    setEditingItemId(null);
    if (editFileInputRef.current) {
      editFileInputRef.current.value = '';
    }
  };

  const updateGalleryItem = (categoryId: string, itemId: string, field: 'title' | 'desc', value: string) => {
    const updatedCategory = galleryData[categoryId].map(item => 
      item.id === itemId ? { ...item, [field]: value } : item
    );
    const updatedData = { ...galleryData, [categoryId]: updatedCategory };
    setGalleryData(updatedData);
    localStorage.setItem('portfolio_gallery', JSON.stringify(updatedData));
  };

  const deleteGalleryItem = (categoryId: string, itemId: string) => {
    setConfirmDialog({
      message: '정말 삭제하시겠습니까?',
      onConfirm: () => {
        const updatedCategory = galleryData[categoryId].filter(item => item.id !== itemId);
        const updatedData = { ...galleryData, [categoryId]: updatedCategory };
        setGalleryData(updatedData);
        localStorage.setItem('portfolio_gallery', JSON.stringify(updatedData));
        setConfirmDialog(null);
      }
    });
  };

  // --- 관리자 대시보드 렌더링 ---
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center font-sans text-gray-800">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-xl relative flex flex-col">
          <div className="text-white p-4 flex justify-between items-center sticky top-0 z-20 shadow-md" style={{ backgroundColor: BRAND_BLUE }}>
            <h1 className="font-bold text-lg">관리자 대시보드</h1>
            <button onClick={() => setIsAdmin(false)} className="p-2 hover:bg-black/10 rounded-full transition-colors">
              <LogOut size={20} />
            </button>
          </div>
          
          <div className="flex border-b border-gray-200 bg-white sticky top-[60px] z-10">
            <button 
              onClick={() => setAdminTab('messages')}
              className={`flex-1 py-3 text-[13px] font-bold transition-colors ${adminTab === 'messages' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              응원 메시지
            </button>
            <button 
              onClick={() => setAdminTab('gallery')}
              className={`flex-1 py-3 text-[13px] font-bold transition-colors ${adminTab === 'gallery' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              갤러리 관리
            </button>
            <button 
              onClick={() => setAdminTab('content')}
              className={`flex-1 py-3 text-[13px] font-bold transition-colors ${adminTab === 'content' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              텍스트 수정
            </button>
            <button 
              onClick={() => setAdminTab('contact')}
              className={`flex-1 py-3 text-[13px] font-bold transition-colors ${adminTab === 'contact' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              연락처/SNS
            </button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            {adminTab === 'messages' && (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="text-blue-700" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">받은 응원 메시지</h2>
                  <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">{messages.length}</span>
                </div>
                {messages.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                    <p>아직 도착한 메시지가 없습니다.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 relative group">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900">{msg.name}</h3>
                          <span className="text-[10px] text-gray-400">{msg.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        <button 
                          onClick={() => {
                            setConfirmDialog({
                              message: '삭제하시겠습니까?',
                              onConfirm: () => saveMessages(messages.filter(m => m.id !== msg.id))
                            });
                          }}
                          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {adminTab === 'gallery' && (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <ImageIcon className="text-blue-700" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">갤러리 사진 관리</h2>
                </div>
                
                <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
                  {GALLERY_TABS.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setAdminGalleryCategory(tab.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${adminGalleryCategory === tab.id ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-600 border border-transparent hover:bg-gray-200'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                <div className="mb-8">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={editFileInputRef}
                    onChange={handleEditImageUpload}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 border-2 border-dashed border-blue-300 bg-blue-50 text-blue-700 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
                  >
                    <Upload size={20} /> 내 컴퓨터에서 사진 여러 장 첨부하기
                  </button>
                  <p className="text-[11px] text-gray-500 text-center mt-2">
                    * 첨부된 사진은 자동으로 압축되어 저장됩니다.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {galleryData[adminGalleryCategory]?.map(item => (
                    <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-4 relative">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center border border-gray-300 relative group">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-4xl">{item.icon}</span>
                        )}
                        <button 
                          onClick={() => {
                            setEditingItemId(item.id);
                            editFileInputRef.current?.click();
                          }}
                          className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
                        >
                          사진 변경
                        </button>
                      </div>
                      <div className="flex-1 space-y-2 pr-6">
                        <input 
                          type="text" 
                          value={item.title}
                          onChange={(e) => updateGalleryItem(adminGalleryCategory, item.id, 'title', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                          placeholder="사진 제목"
                        />
                        <textarea 
                          value={item.desc}
                          onChange={(e) => updateGalleryItem(adminGalleryCategory, item.id, 'desc', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                          rows={2}
                          placeholder="사진에 대한 설명"
                        />
                      </div>
                      <button 
                        onClick={() => deleteGalleryItem(adminGalleryCategory, item.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1 bg-white rounded-md shadow-sm border border-gray-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {(!galleryData[adminGalleryCategory] || galleryData[adminGalleryCategory].length === 0) && (
                    <div className="text-center py-8 text-gray-400">
                      <ImageIcon size={32} className="mx-auto mb-2 opacity-20" />
                      <p className="text-sm">등록된 사진이 없습니다.</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {adminTab === 'content' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Edit3 className="text-blue-700" size={24} />
                    <h2 className="text-xl font-bold text-gray-900">텍스트 수정</h2>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        if (window.confirm('모든 수정한 내용을 초기화하고 서버의 기본 설정으로 되돌리시겠습니까?')) {
                          localStorage.removeItem('portfolio_content');
                          localStorage.removeItem('portfolio_gallery');
                          localStorage.removeItem('portfolio_profile_image');
                          window.location.reload();
                        }
                      }}
                      className="px-3 py-1.5 bg-gray-100 border border-gray-300 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors"
                    >
                      기본값으로 초기화
                    </button>
                    <button 
                      onClick={() => {
                        const exportData = {
                          content,
                          galleryData,
                          profileImage
                        };
                        const jsonString = JSON.stringify(exportData, null, 2);
                        const blob = new Blob([jsonString], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'portfolio_data.json';
                        a.click();
                        alert('현재 설정 데이터가 portfolio_data.json 파일로 다운로드되었습니다. 이 파일의 내용을 복사해서 저(AI)에게 전달해 주시면 소스 코드에 영구적으로 반영해 드릴 수 있습니다.');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors shadow-sm"
                    >
                      <Share2 size={14} />
                      소스 코드 반영용 데이터 추출
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-6">포트폴리오 페이지의 주요 문구들을 직접 수정할 수 있습니다. 수정 즉시 반영됩니다.</p>

                <div className="space-y-8">
                  {/* Hero Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">1. 메인 화면 (히어로)</h3>
                    <div className="space-y-3">
                      <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-600 mb-2">프로필 사진</label>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gray-200 border border-gray-300 overflow-hidden flex items-center justify-center text-gray-400 text-xl font-bold">
                            {profileImage ? (
                              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              content.hero.name.charAt(0)
                            )}
                          </div>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            ref={profileInputRef}
                            onChange={handleProfileImageUpload}
                          />
                          <div className="flex gap-2">
                            <button 
                              onClick={() => profileInputRef.current?.click()}
                              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
                            >
                              사진 변경
                            </button>
                            {profileImage && (
                              <button 
                                onClick={() => {
                                  if (window.confirm('프로필 사진을 삭제하시겠습니까?')) {
                                    setProfileImage(null);
                                    localStorage.removeItem('portfolio_profile_image');
                                  }
                                }}
                                className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                              >
                                삭제
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">메인 카피 (큰 글씨)</label>
                        <textarea 
                          value={content.hero.title} onChange={(e) => updateContent('hero', 'title', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">서브 카피</label>
                        <textarea 
                          value={content.hero.subtitle} onChange={(e) => updateContent('hero', 'subtitle', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">이름</label>
                        <input 
                          type="text" value={content.hero.name} onChange={(e) => updateContent('hero', 'name', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">직책 / 소개 (상단 배지용)</label>
                        <input 
                          type="text" value={content.hero.role} onChange={(e) => updateContent('hero', 'role', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">하단 다짐 문구</label>
                        <textarea 
                          value={content.hero.bottomText || ''} onChange={(e) => updateContent('hero', 'bottomText', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" rows={4}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Story Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">2. 이재현은 누구인가? (키워드)</h3>
                    <div className="space-y-4">
                      {content.stories.map((story, idx) => (
                        <div key={idx} className="space-y-2 bg-white p-3 rounded-lg border border-gray-200">
                          <input 
                            type="text" value={story.tag} onChange={(e) => updateArrayContent('stories', idx, 'tag', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold text-blue-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                          />
                          <textarea 
                            value={story.desc} onChange={(e) => updateArrayContent('stories', idx, 'desc', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" rows={2}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vision Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">3. 왜 비례대표 시의원인가?</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">강조 문구</label>
                        <textarea 
                          value={content.vision.quote} onChange={(e) => updateContent('vision', 'quote', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">상세 설명</label>
                        <textarea 
                          value={content.vision.desc} onChange={(e) => updateContent('vision', 'desc', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Promises Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">4. 당선 후 3가지 핵심 과제</h3>
                    <div className="space-y-4">
                      {content.promises.map((promise, idx) => (
                        <div key={idx} className="space-y-2 bg-white p-3 rounded-lg border border-gray-200">
                          <input 
                            type="text" value={promise.title} onChange={(e) => updateArrayContent('promises', idx, 'title', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                          />
                          <textarea 
                            value={promise.desc} onChange={(e) => updateArrayContent('promises', idx, 'desc', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" rows={2}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profile Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">5. 걸어온 길 (주요경력 및 학력/수상)</h3>
                    
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-bold text-gray-800">주요 경력</label>
                        <button onClick={addProfileHighlight} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold hover:bg-blue-200">추가</button>
                      </div>
                      <div className="space-y-3">
                        {(content.profileHighlights || DEFAULT_CONTENT.profileHighlights).map((item, idx) => (
                          <div key={idx} className="flex gap-2 items-start bg-white p-3 rounded-lg border border-gray-200">
                            <div className="flex flex-col gap-2 flex-1">
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  checked={item.current} 
                                  onChange={(e) => updateProfileHighlight(idx, 'current', e.target.checked)}
                                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-xs text-gray-600">현재 역임 중 (현/전 표시)</span>
                              </div>
                              <input 
                                type="text" value={item.title} onChange={(e) => updateProfileHighlight(idx, 'title', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                              />
                            </div>
                            <button onClick={() => removeProfileHighlight(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-bold text-gray-800">학력, 수상, 기타 내역</label>
                        <button onClick={addProfileDetailSection} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold hover:bg-blue-200">카테고리 추가</button>
                      </div>
                      <div className="space-y-4">
                        {(content.profileDetails || DEFAULT_CONTENT.profileDetails).map((section, sectionIdx) => (
                          <div key={sectionIdx} className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex gap-2 mb-3">
                              <input 
                                type="text" value={section.category} onChange={(e) => updateProfileDetailCategory(sectionIdx, e.target.value)}
                                className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold text-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                placeholder="카테고리명 (예: 학력)"
                              />
                              <button onClick={() => removeProfileDetailSection(sectionIdx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                            </div>
                            
                            <div className="space-y-2 pl-4 border-l-2 border-gray-100">
                              {section.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex gap-2">
                                  <input 
                                    type="text" value={item} onChange={(e) => updateProfileDetailItem(sectionIdx, itemIdx, e.target.value)}
                                    className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                  />
                                  <button onClick={() => removeProfileDetailItem(sectionIdx, itemIdx)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><X size={14} /></button>
                                </div>
                              ))}
                              <button onClick={() => addProfileDetailItem(sectionIdx)} className="text-xs text-blue-600 font-bold hover:underline mt-2 inline-block">+ 항목 추가</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">6. 하단 (푸터)</h3>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">마무리 문구</label>
                      <textarea 
                        value={content.footer.quote} onChange={(e) => updateContent('footer', 'quote', e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" rows={2}
                      />
                    </div>
                  </div>

                </div>
              </>
            )}

            {adminTab === 'contact' && (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <Phone className="text-blue-700" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">연락처 및 SNS 설정</h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">연락처 정보</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">전화번호</label>
                        <input 
                          type="text" 
                          value={content.contact?.phone || ''} 
                          onChange={(e) => updateContent('contact', 'phone', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                          placeholder="010-0000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">문자 메시지 수신 번호</label>
                        <input 
                          type="text" 
                          value={content.contact?.message || ''} 
                          onChange={(e) => updateContent('contact', 'message', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                          placeholder="010-0000-0000"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">SNS 링크</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">인스타그램 URL</label>
                        <input 
                          type="text" 
                          value={content.contact?.instagram || ''} 
                          onChange={(e) => updateContent('contact', 'instagram', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                          placeholder="https://instagram.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">페이스북 URL</label>
                        <input 
                          type="text" 
                          value={content.contact?.facebook || ''} 
                          onChange={(e) => updateContent('contact', 'facebook', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                          placeholder="https://facebook.com/..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Confirm Dialog Modal */}
          <AnimatePresence>
            {confirmDialog && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              >
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">확인</h3>
                  <p className="text-sm text-gray-600 mb-6">{confirmDialog.message}</p>
                  <div className="flex gap-3 justify-end">
                    <button 
                      onClick={() => setConfirmDialog(null)}
                      className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      취소
                    </button>
                    <button 
                      onClick={confirmDialog.onConfirm}
                      className="px-4 py-2 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // --- 메인 포트폴리오 렌더링 ---
  return (
    <div className="min-h-screen bg-gray-100 sm:py-8 flex justify-center font-sans text-gray-800 selection:bg-blue-200 selection:text-blue-900">
      <div className="w-full max-w-[480px] bg-white sm:rounded-[32px] sm:shadow-2xl overflow-hidden relative flex flex-col sm:border border-gray-200">
        
        {/* 1. Intro (히어로 섹션) */}
        <section className="relative text-white px-6 pt-16 pb-28 text-center flex flex-col items-center justify-center min-h-[90vh]" style={{ backgroundColor: BRAND_BLUE }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="mb-6 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-md shadow-sm">
              <span className="text-sm font-medium text-white tracking-wide">{content.hero.role}</span>
            </div>
            
            <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-white/20 border-4 border-white/30 mb-6 flex items-center justify-center text-6xl font-bold shadow-xl backdrop-blur-sm overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover object-top" />
              ) : (
                <span className="text-white drop-shadow-md">{content.hero.name.charAt(0)}</span>
              )}
            </div>
            
            <p className="text-2xl sm:text-3xl text-sky-300 font-bold mb-3 leading-snug break-keep whitespace-pre-wrap drop-shadow-md">
              {content.hero.subtitle}
            </p>
            
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 leading-tight tracking-tight break-keep whitespace-pre-wrap drop-shadow-lg">
              {content.hero.title}
            </h1>
            
            <a 
              href={`tel:${content.contact?.phone || '010-6429-0847'}`}
              className="inline-flex items-center gap-2 text-xl sm:text-2xl font-bold text-white mb-8 hover:text-sky-200 transition-colors drop-shadow-md bg-white/10 px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm"
            >
              <Phone size={20} />
              {content.contact?.phone || '010-6429-0847'}
            </a>
            
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-5 w-full max-w-sm mx-auto shadow-inner">
              <p className="text-[14px] text-blue-50 leading-relaxed font-light break-keep whitespace-pre-wrap">
                {content.hero.bottomText || '근면과 성실, 신뢰와 겸손으로\n시민·당원과 함께하는 28살 청년 정치인이 되겠습니다.\n끊임없는 배움과 열정으로\n지역과 더불어민주당의 미래를 위해 헌신하겠습니다.'}
              </p>
            </div>
          </div>

          <button 
            onClick={scrollToPromises}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white hover:text-blue-100 transition-colors animate-bounce z-20"
          >
            <span className="text-sm font-bold mb-1 drop-shadow-md tracking-wide">이재현의 약속 보기</span>
            <ChevronDown size={24} className="drop-shadow-md" />
          </button>
        </section>

        {/* 2. Story : 이재현은 누구인가? */}
        <section className="px-6 py-14 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">이재현은 누구인가?</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
            {content.stories.map((story, idx) => (
              <div key={idx} className={`flex-shrink-0 w-[85%] sm:w-[280px] ${STORIES_BG[idx % STORIES_BG.length].bg} rounded-2xl p-6 snap-center border border-black/5`}>
                <h3 className={`text-lg font-bold ${STORIES_BG[idx % STORIES_BG.length].text} mb-3`}>{story.tag}</h3>
                <p className="text-[14px] text-gray-700 leading-relaxed break-keep whitespace-pre-wrap">{story.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Vision : 왜 비례대표 시의원인가? */}
        <section className="px-6 py-14 bg-gray-50 border-y border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full" style={{ backgroundColor: BRAND_BLUE }}></div>
            <h2 className="text-xl font-bold text-gray-900">왜 비례대표 시의원인가?</h2>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-[17px] font-bold text-gray-900 mb-4 leading-snug break-keep whitespace-pre-wrap" style={{ color: BRAND_BLUE }}>
              {content.vision.quote}
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed break-keep whitespace-pre-wrap">
              {content.vision.desc}
            </p>
          </div>
        </section>

        {/* 4. Promises : 당선 후 3가지 핵심 과제 */}
        <section id="promises" className="px-6 py-14 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">당선 후 3가지 핵심 과제</h2>
          <div className="space-y-6">
            {content.promises.map((promise, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-md" style={{ backgroundColor: BRAND_BLUE }}>
                  {PROMISES[idx % PROMISES.length].icon}
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-1.5">{promise.title}</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed break-keep whitespace-pre-wrap">{promise.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Gallery : 행동으로 증명해 온 시간들 */}
        <section className="px-6 py-14 bg-gray-50 border-y border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-snug">
            <span className="block text-[15px] font-medium mb-1" style={{ color: BRAND_BLUE }}>"행동하지 않는 양심은 악의 편이다"</span>
            행동으로 증명해 온 이재현의 시간들
          </h2>
          
          {/* Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6">
            {GALLERY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveGalleryTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-bold transition-colors border ${
                  activeGalleryTab === tab.id 
                    ? 'text-white border-transparent' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
                style={{ backgroundColor: activeGalleryTab === tab.id ? BRAND_BLUE : undefined }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGalleryTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {galleryData[activeGalleryTab]?.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedGalleryItem(item)}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex gap-4 items-center cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="w-28 h-28 rounded-xl bg-gray-100 flex items-center justify-center text-4xl flex-shrink-0 overflow-hidden border border-gray-100">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        item.icon
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[15px] font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-[12px] text-gray-500 leading-relaxed break-keep">{item.desc}</p>
                    </div>
                  </div>
                ))}
                
                {(!galleryData[activeGalleryTab] || galleryData[activeGalleryTab].length === 0) && (
                  <div className="text-center py-8 text-gray-400 bg-white rounded-2xl border border-gray-200">
                    <ImageIcon size={32} className="mx-auto mb-2 opacity-20" />
                    <p className="text-sm">등록된 사진이 없습니다.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* 6. Profile : 걸어온 길 */}
        <section className="px-6 py-14 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">걸어온 길</h2>
          
          <div className="mb-8">
            <h3 className="text-[13px] font-bold text-gray-400 mb-4 uppercase tracking-wider">주요 경력</h3>
            <div className="space-y-4">
              {content.profileHighlights?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`mt-1 px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${item.current ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                    {item.current ? '현' : '전'}
                  </div>
                  <p className="text-[14px] font-medium text-gray-800 leading-snug">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {content.profileDetails?.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-[13px] font-bold text-gray-400 mb-3 uppercase tracking-wider">{section.category}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-[13px] text-gray-600 flex items-start gap-2">
                      <span className="text-gray-300 mt-0.5">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Footer : 소통 채널 및 마무리 */}
        <section className="px-6 py-12 text-center text-white relative overflow-hidden" style={{ backgroundColor: BRAND_BLUE }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-8 leading-snug break-keep whitespace-pre-wrap">
              {content.footer.quote}
            </h2>
            
            <div className="flex justify-center gap-4 mb-8">
              <a href={`tel:${content.contact?.phone || '010-6429-0847'}`} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm">
                <Phone size={20} />
              </a>
              <a href={`sms:${content.contact?.message || '010-6429-0847'}`} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm">
                <MessageSquare size={20} />
              </a>
              <a href={content.contact?.instagram || '#'} target={content.contact?.instagram ? "_blank" : "_self"} rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm">
                <Instagram size={20} />
              </a>
              <a href={content.contact?.facebook || '#'} target={content.contact?.facebook ? "_blank" : "_self"} rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm">
                <Facebook size={20} />
              </a>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleShare}
                className="w-full bg-white text-blue-900 font-bold text-[15px] py-4 rounded-xl hover:bg-gray-50 transition-colors shadow-lg flex justify-center items-center gap-2"
              >
                <Share2 size={18} /> 페이지 공유하기
              </button>
              
              <button 
                onClick={() => setShowMessageModal(true)}
                className="w-full bg-blue-800 text-white font-bold text-[15px] py-4 rounded-xl hover:bg-blue-900 transition-colors shadow-inner flex justify-center items-center gap-2 border border-blue-700"
              >
                <MessageSquare size={18} /> 응원 메시지 남기기
              </button>
            </div>
            
            <div className="mt-12 flex flex-col items-center justify-center gap-3 text-blue-200/50 text-[10px]">
              <p>© 2026 이재현. All rights reserved.</p>
              <button onClick={() => setShowAdminLogin(true)} className="p-2 hover:text-white transition-colors">
                <Lock size={12} />
              </button>
            </div>
          </div>
        </section>

        {/* MESSAGE MODAL */}
        <AnimatePresence>
          {showMessageModal && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
              onClick={() => setShowMessageModal(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[24px] p-6 max-w-sm w-full shadow-2xl relative"
                onClick={e => e.stopPropagation()}
              >
                <button onClick={() => setShowMessageModal(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 bg-gray-100 rounded-full transition-colors"><X size={16} /></button>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center"><MessageSquare size={20} /></div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">응원 메시지</h3>
                    <p className="text-[11px] text-gray-500">힘이 되는 한마디를 남겨주세요.</p>
                  </div>
                </div>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">이름 (또는 닉네임)</label>
                    <input type="text" required value={newMessageName} onChange={e => setNewMessageName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="홍길동" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">메시지</label>
                    <textarea required value={newMessageContent} onChange={e => setNewMessageContent(e.target.value)} rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" placeholder="응원의 메시지를 자유롭게 작성해주세요."></textarea>
                  </div>
                  <button type="submit" className="w-full text-white font-bold text-[14px] py-3.5 rounded-xl transition-colors shadow-md flex justify-center items-center gap-2" style={{ backgroundColor: BRAND_BLUE }}>
                    보내기 <Send size={16} />
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ADMIN LOGIN MODAL */}
        <AnimatePresence>
          {showAdminLogin && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
              onClick={() => setShowAdminLogin(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[24px] p-8 max-w-sm w-full shadow-2xl relative"
                onClick={e => e.stopPropagation()}
              >
                <button onClick={() => setShowAdminLogin(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 bg-gray-100 rounded-full transition-colors"><X size={16} /></button>
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center mb-4 mx-auto"><Lock size={24} /></div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-6">관리자 로그인</h3>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <input type="password" required value={adminPassword} onChange={e => setAdminPassword(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-center tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all" placeholder="••••••••" />
                  </div>
                  {adminError && <p className="text-red-500 text-[11px] text-center">{adminError}</p>}
                  <button type="submit" className="w-full bg-gray-900 text-white font-bold text-[14px] py-3.5 rounded-xl hover:bg-black transition-colors shadow-md">접속하기</button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GALLERY MODAL */}
        <AnimatePresence>
          {selectedGalleryItem && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedGalleryItem(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-[24px] max-w-lg w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedGalleryItem(null)} 
                  className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-md"
                >
                  <X size={20} />
                </button>
                
                <div className="w-full bg-gray-100 flex items-center justify-center relative">
                  {selectedGalleryItem.imageUrl ? (
                    <img src={selectedGalleryItem.imageUrl} alt={selectedGalleryItem.title} className="w-full h-auto max-h-[60vh] object-contain" />
                  ) : (
                    <div className="text-7xl py-20">{selectedGalleryItem.icon}</div>
                  )}
                </div>
                
                <div className="p-6 overflow-y-auto">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{selectedGalleryItem.title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed break-keep whitespace-pre-wrap">{selectedGalleryItem.desc}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
