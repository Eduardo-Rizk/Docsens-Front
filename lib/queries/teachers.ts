import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '../api'

export interface TeacherDetailEvent {
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

export interface TeacherDetail {
  teacher: {
    id: string
    photo: string
    headline: string
    bio: string
    isVerified: boolean
    userName: string
  }
  institution: {
    id: string
    name: string
    shortName: string
  }
  stats: {
    totalClasses: number
    totalSubjects: number
    openSpots: number
  }
  classesBySubject: Array<{
    subject: { id: string; name: string; icon: string | null }
    events: TeacherDetailEvent[]
  }>
}

export function useTeacherDetail(
  institutionId: string,
  teacherProfileId: string,
) {
  return useQuery({
    queryKey: ['teachers', institutionId, teacherProfileId],
    queryFn: () =>
      apiFetch<TeacherDetail>(
        `/institutions/${institutionId}/teachers/${teacherProfileId}`,
      ),
    enabled: !!institutionId && !!teacherProfileId,
  })
}
