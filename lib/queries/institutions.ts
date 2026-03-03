import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '../api'

export interface Subject {
  id: string
  name: string
  icon: string | null
}

export function useSubjects() {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: () => apiFetch<Subject[]>('/subjects'),
  })
}

export interface Institution {
  id: string
  name: string
  shortName: string
  city: string
  type: 'SCHOOL' | 'UNIVERSITY'
  logoUrl: string
}

export function useInstitutions(params?: { search?: string; type?: string }) {
  const sp = new URLSearchParams()
  if (params?.search) sp.set('search', params.search)
  if (params?.type) sp.set('type', params.type)
  const qs = sp.toString()
  return useQuery({
    queryKey: ['institutions', params],
    queryFn: () => apiFetch<Institution[]>(`/institutions${qs ? `?${qs}` : ''}`),
  })
}

export function useInstitution(id: string) {
  return useQuery({
    queryKey: ['institutions', id],
    queryFn: () => apiFetch<Institution>(`/institutions/${id}`),
    enabled: !!id,
  })
}

export interface InstitutionSubject {
  subjectId: string
  subjectName: string
  teacherCount: number
}

export function useInstitutionSubjects(institutionId: string) {
  return useQuery({
    queryKey: ['institutions', institutionId, 'subjects'],
    queryFn: () =>
      apiFetch<InstitutionSubject[]>(
        `/institutions/${institutionId}/subjects`,
      ),
    enabled: !!institutionId,
  })
}

export interface SubjectTeacherEvent {
  id: string
  title: string
  description: string
  teacherProfileId: string
  subjectId: string
  institutionId: string
  startsAt: string
  durationMin: number
  priceCents: number
  capacity: number
  soldSeats: number
  publicationStatus: string
  meetingStatus: string
  createdAt: string
}

export interface SubjectTeacher {
  id: string
  photo: string
  headline: string
  bio: string
  isVerified: boolean
  userName: string
  openClassCount: number
  nextEvent: {
    id: string
    title: string
    startsAt: string
    durationMin: number
    priceCents: number
    capacity: number
    soldSeats: number
  } | null
  events: SubjectTeacherEvent[]
}

interface SubjectTeachersResponse {
  institution: { id: string; shortName: string }
  subject: { id: string; name: string; icon: string | null }
  totalTeachers: number
  totalClasses: number
  teachers: SubjectTeacher[]
}

export function useSubjectTeachers(
  institutionId: string,
  subjectId: string,
) {
  return useQuery({
    queryKey: [
      'institutions',
      institutionId,
      'subjects',
      subjectId,
      'teachers',
    ],
    queryFn: () =>
      apiFetch<SubjectTeachersResponse>(
        `/institutions/${institutionId}/subjects/${subjectId}/teachers`,
      ),
    enabled: !!institutionId && !!subjectId,
  })
}
