export type UserRole = "STUDENT" | "TEACHER" | "BOTH";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type StudentProfile = {
  id: string;
  userId: string;
  preferredInstitutionId?: string;
};

export type TeacherProfile = {
  id: string;
  userId: string;
  photo: string;
  bio: string;
  headline: string;
  isVerified: boolean;
};

export type Institution = {
  id: string;
  name: string;
  shortName: string;
  city: string;
  type: "SCHOOL" | "UNIVERSITY";
  logoUrl: string;
};

// Let me use the original content from Step 28.
export type Subject = {
  id: string;
  name: string;
};

export type TeacherSubject = {
  id: string;
  teacherProfileId: string;
  subjectId: string;
  levelTag?: string;
};

export type ClassPublicationStatus = "DRAFT" | "PUBLISHED" | "FINISHED";
export type MeetingReleaseStatus = "LOCKED" | "RELEASED";

export type ClassEvent = {
  id: string;
  title: string;
  description: string;
  teacherProfileId: string;
  subjectId: string;
  institutionId: string;
  startsAt: string;
  durationMin: number;
  priceCents: number;
  capacity: number;
  soldSeats: number;
  publicationStatus: ClassPublicationStatus;
  meetingStatus: MeetingReleaseStatus;
  meetingUrl?: string;
};

export type EnrollmentStatus = "PENDING" | "PAID" | "CANCELLED" | "REFUNDED";

export type Enrollment = {
  id: string;
  classEventId: string;
  studentProfileId: string;
  status: EnrollmentStatus;
  createdAt: string;
};

export type PaymentProvider = "STRIPE" | "MERCADOPAGO" | "MOCK";
export type PaymentStatus = "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED";

export type Payment = {
  id: string;
  enrollmentId: string;
  provider: PaymentProvider;
  amountCents: number;
  status: PaymentStatus;
};

const now = new Date();

function isoAtOffset(dayOffset: number, hour: number, minute: number) {
  const date = new Date(now);
  date.setDate(now.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

export const users: User[] = [
  {
    id: "u-student-ana",
    name: "Ana Martins",
    email: "ana@aluno.docens.app",
    role: "STUDENT",
  },
  {
    id: "u-teacher-luiza",
    name: "Luiza Costa",
    email: "luiza@docens.app",
    role: "TEACHER",
  },
  {
    id: "u-teacher-rafael",
    name: "Rafael Prado",
    email: "rafael@docens.app",
    role: "TEACHER",
  },
];

export const studentProfiles: StudentProfile[] = [
  {
    id: "sp-ana",
    userId: "u-student-ana",
    preferredInstitutionId: "ins-fgv",
  },
];

export const teacherProfiles: TeacherProfile[] = [
  {
    id: "tp-luiza",
    userId: "u-teacher-luiza",
    photo: "LC",
    bio: "Ex-aluna de Direito FGV. Coordena grupos de argumentacao para provas orais e estudos de caso.",
    headline: "Direito e redacao argumentativa",
    isVerified: true,
  },
  {
    id: "tp-rafael",
    userId: "u-teacher-rafael",
    photo: "RP",
    bio: "Ex-insper com foco em calculo e estatistica aplicada para graduacao e vestibulares concorridos.",
    headline: "Calculo, estatistica e raciocinio quantitativo",
    isVerified: true,
  },
];


export const institutions: Institution[] = [
  { 
    id: "ins-fgv", 
    name: "Fundação Getulio Vargas", 
    shortName: "FGV", 
    city: "São Paulo",
    type: "UNIVERSITY",
    logoUrl: "/imgs/faculdades/fgv-logo-0.png"
  },
  { 
    id: "ins-insper", 
    name: "Insper Instituto de Ensino e Pesquisa", 
    shortName: "Insper", 
    city: "São Paulo",
    type: "UNIVERSITY",
    logoUrl: "/imgs/faculdades/INsper.png"
  },
  {
    id: "ins-inteli",
    name: "Inteli - Instituto de Tecnologia e Liderança",
    shortName: "Inteli",
    city: "São Paulo",
    type: "UNIVERSITY",
    logoUrl: "/imgs/faculdades/inteli-logo.png"
  },
  {
    id: "ins-mobile",
    name: "Colégio Móbile",
    shortName: "Móbile",
    city: "São Paulo",
    type: "SCHOOL",
    logoUrl: "/imgs/escolas/mobile.png"
  },
  {
    id: "ins-band",
    name: "Colégio Bandeirantes",
    shortName: "Band",
    city: "São Paulo",
    type: "SCHOOL",
    logoUrl: "/imgs/escolas/Band-logo.jpg"
  },
  {
    id: "ins-vertice",
    name: "Colégio Vértice",
    shortName: "Vértice",
    city: "São Paulo",
    type: "SCHOOL",
    logoUrl: "/imgs/escolas/vertice.png"
  },
];

export const subjects: Subject[] = [
  { id: "sub-calculo", name: "Calculo I" },
  { id: "sub-direito", name: "Direito Constitucional" },
  { id: "sub-fisica", name: "Fisica" },
  { id: "sub-redacao", name: "Redacao" },
];

export const teacherSubjects: TeacherSubject[] = [
  {
    id: "ts-1",
    teacherProfileId: "tp-luiza",
    subjectId: "sub-direito",
    levelTag: "Graduacao",
  },
  {
    id: "ts-2",
    teacherProfileId: "tp-luiza",
    subjectId: "sub-redacao",
    levelTag: "Vestibular",
  },
  {
    id: "ts-3",
    teacherProfileId: "tp-rafael",
    subjectId: "sub-calculo",
    levelTag: "Graduacao",
  },
  {
    id: "ts-4",
    teacherProfileId: "tp-rafael",
    subjectId: "sub-fisica",
    levelTag: "Vestibular",
  },
];

export const classEvents: ClassEvent[] = [
  {
    id: "ce-fgv-argumentacao",
    title: "Clinica de Argumentacao para Casos Contemporaneos",
    description:
      "Sessao ao vivo focada em construcao de tese e estrutura de resposta para discussao juridica oral.",
    teacherProfileId: "tp-luiza",
    subjectId: "sub-direito",
    institutionId: "ins-fgv",
    startsAt: isoAtOffset(1, 19, 30),
    durationMin: 90,
    priceCents: 12900,
    capacity: 60,
    soldSeats: 48,
    publicationStatus: "PUBLISHED",
    meetingStatus: "LOCKED",
  },
  {
    id: "ce-fgv-redacao",
    title: "Oficina de Redacao para Provas de Bolsa",
    description:
      "Aulao com foco em repertorio, clareza e construcao de introducoes de alto impacto.",
    teacherProfileId: "tp-luiza",
    subjectId: "sub-redacao",
    institutionId: "ins-fgv",
    startsAt: isoAtOffset(4, 18, 0),
    durationMin: 120,
    priceCents: 9900,
    capacity: 90,
    soldSeats: 90,
    publicationStatus: "PUBLISHED",
    meetingStatus: "LOCKED",
  },
  {
    id: "ce-insper-calculo",
    title: "Calculo Intensivo: Limites e Derivadas",
    description:
      "Imersao ao vivo com lista guiada e resolucao de questoes de nivel Insper para a primeira prova.",
    teacherProfileId: "tp-rafael",
    subjectId: "sub-calculo",
    institutionId: "ins-insper",
    startsAt: isoAtOffset(0, now.getHours() - 1, 0),
    durationMin: 100,
    priceCents: 14900,
    capacity: 50,
    soldSeats: 34,
    publicationStatus: "PUBLISHED",
    meetingStatus: "RELEASED",
    meetingUrl: "https://meet.docens.app/calculo-intensivo",
  },
  {
    id: "ce-insper-estatistica",
    title: "Leitura de Dados para Estudos de Caso",
    description:
      "Sessao pratica com datasets reais, foco em interpretacao de graficos e narrativa quantitativa.",
    teacherProfileId: "tp-rafael",
    subjectId: "sub-calculo",
    institutionId: "ins-insper",
    startsAt: isoAtOffset(3, 20, 0),
    durationMin: 80,
    priceCents: 13900,
    capacity: 45,
    soldSeats: 19,
    publicationStatus: "PUBLISHED",
    meetingStatus: "LOCKED",
  },
  {
    id: "ce-mobile-fisica",
    title: "Fisica Aplicada para Segunda Fase",
    description:
      "Aulao orientado por questoes discursivas com enfase em movimento, energia e interpretacao fisica.",
    teacherProfileId: "tp-rafael",
    subjectId: "sub-fisica",
    institutionId: "ins-mobile",
    startsAt: isoAtOffset(2, 17, 30),
    durationMin: 90,
    priceCents: 8900,
    capacity: 70,
    soldSeats: 55,
    publicationStatus: "PUBLISHED",
    meetingStatus: "LOCKED",
  },
  {
    id: "ce-fgv-draft-casos",
    title: "Laboratorio de Casos Publicos",
    description:
      "Rascunho de novo encontro para aprofundar escrita de pareceres curtos e defesa de argumentos.",
    teacherProfileId: "tp-luiza",
    subjectId: "sub-direito",
    institutionId: "ins-fgv",
    startsAt: isoAtOffset(8, 19, 0),
    durationMin: 90,
    priceCents: 11900,
    capacity: 40,
    soldSeats: 0,
    publicationStatus: "DRAFT",
    meetingStatus: "LOCKED",
  },
];

export const enrollments: Enrollment[] = [
  {
    id: "enr-ana-insper-calculo",
    classEventId: "ce-insper-calculo",
    studentProfileId: "sp-ana",
    status: "PAID",
    createdAt: isoAtOffset(-3, 10, 0),
  },
  {
    id: "enr-ana-fgv-argumentacao",
    classEventId: "ce-fgv-argumentacao",
    studentProfileId: "sp-ana",
    status: "PAID",
    createdAt: isoAtOffset(-1, 14, 0),
  },
  {
    id: "enr-ana-mobile-fisica",
    classEventId: "ce-mobile-fisica",
    studentProfileId: "sp-ana",
    status: "PENDING",
    createdAt: isoAtOffset(-1, 16, 0),
  },
];

export const payments: Payment[] = [
  {
    id: "pay-ana-insper-calculo",
    enrollmentId: "enr-ana-insper-calculo",
    provider: "STRIPE",
    amountCents: 14900,
    status: "SUCCEEDED",
  },
  {
    id: "pay-ana-fgv-argumentacao",
    enrollmentId: "enr-ana-fgv-argumentacao",
    provider: "MERCADOPAGO",
    amountCents: 12900,
    status: "SUCCEEDED",
  },
  {
    id: "pay-ana-mobile-fisica",
    enrollmentId: "enr-ana-mobile-fisica",
    provider: "MOCK",
    amountCents: 8900,
    status: "PENDING",
  },
];

export const viewer = {
  userId: "u-student-ana",
  studentProfileId: "sp-ana",
  teacherProfileId: "tp-luiza",
};

export function getInstitutionById(institutionId: string) {
  return institutions.find((institution) => institution.id === institutionId);
}

export function getSubjectById(subjectId: string) {
  return subjects.find((subject) => subject.id === subjectId);
}

export function getTeacherById(teacherProfileId: string) {
  return teacherProfiles.find((teacher) => teacher.id === teacherProfileId);
}

export function getClassEventById(classEventId: string) {
  return classEvents.find((event) => event.id === classEventId);
}

export function getPublishedClassEvents() {
  return classEvents.filter((event) => event.publicationStatus === "PUBLISHED");
}

export function getPublishedClassEventsByInstitution(institutionId: string) {
  return getPublishedClassEvents().filter(
    (event) => event.institutionId === institutionId,
  );
}

export function getEnrollmentForStudent(
  classEventId: string,
  studentProfileId: string,
) {
  return enrollments.find(
    (enrollment) =>
      enrollment.classEventId === classEventId &&
      enrollment.studentProfileId === studentProfileId,
  );
}

export function getStudentAgenda(studentProfileId: string) {
  return enrollments
    .filter((enrollment) => enrollment.studentProfileId === studentProfileId)
    .map((enrollment) => ({
      enrollment,
      classEvent: getClassEventById(enrollment.classEventId),
    }))
    .filter((item): item is { enrollment: Enrollment; classEvent: ClassEvent } =>
      Boolean(item.classEvent),
    )
    .sort(
      (a, b) =>
        new Date(a.classEvent.startsAt).getTime() -
        new Date(b.classEvent.startsAt).getTime(),
    );
}

export function getTeacherClasses(teacherProfileId: string) {
  return classEvents
    .filter((classEvent) => classEvent.teacherProfileId === teacherProfileId)
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
}

export function isClassSoldOut(classEvent: ClassEvent) {
  return classEvent.soldSeats >= classEvent.capacity;
}

export function canStudentEnterClass(params: {
  classEvent: ClassEvent;
  enrollment?: Enrollment;
  now?: Date;
}) {
  const { classEvent, enrollment, now: nowInput } = params;
  const current = nowInput ?? new Date();
  const startsAt = new Date(classEvent.startsAt);

  return (
    enrollment?.status === "PAID" &&
    current.getTime() >= startsAt.getTime() &&
    classEvent.meetingStatus === "RELEASED"
  );
}

export type StudentAccessState =
  | "NEEDS_PURCHASE"
  | "PENDING_PAYMENT"
  | "WAITING_RELEASE"
  | "CAN_ENTER";

export function getStudentAccessState(params: {
  classEvent: ClassEvent;
  enrollment?: Enrollment;
  now?: Date;
}): StudentAccessState {
  const { classEvent, enrollment, now: nowInput } = params;
  const current = nowInput ?? new Date();
  const startsAt = new Date(classEvent.startsAt);

  if (!enrollment) {
    return "NEEDS_PURCHASE";
  }

  if (enrollment.status === "PENDING") {
    return "PENDING_PAYMENT";
  }

  if (canStudentEnterClass({ classEvent, enrollment, now: current })) {
    return "CAN_ENTER";
  }

  if (enrollment.status === "PAID" && current.getTime() < startsAt.getTime()) {
    return "WAITING_RELEASE";
  }

  if (enrollment.status === "PAID" && classEvent.meetingStatus === "LOCKED") {
    return "WAITING_RELEASE";
  }

  return "NEEDS_PURCHASE";
}
