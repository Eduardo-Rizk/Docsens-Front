import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiFetch } from '../api'
import { toast } from 'sonner'

export function useTeacherDashboard() {
  return useQuery({
    queryKey: ['teacher', 'dashboard'],
    queryFn: () =>
      apiFetch<{
        totalRevenueSucceededCents: number
        totalPaidStudents: number
        totalClasses: number
        publishedClasses: number
        rows: Array<{
          classEvent: {
            id: string
            title: string
            startsAt: string
            priceCents: number
            capacity: number | null
            soldSeats: number
            publicationStatus: string
          }
          institution: { shortName: string }
          subject: { name: string }
          paidEnrollments: number
          revenueSucceededCents: number
        }>
      }>('/teacher/dashboard'),
  })
}

export interface TeacherClassEvent {
  id: string
  title: string
  description: string
  startsAt: string
  durationMin: number
  priceCents: number
  capacity: number | null
  soldSeats: number
  publicationStatus: string
  meetingStatus: string
  meetingUrl?: string
  createdAt: string
  institution: { id: string; shortName: string }
  subject: { id: string; name: string }
}

export function useTeacherClassEvents() {
  return useQuery({
    queryKey: ['teacher', 'class-events'],
    queryFn: () =>
      apiFetch<{
        drafts: TeacherClassEvent[]
        published: TeacherClassEvent[]
        finished: TeacherClassEvent[]
      }>('/teacher/class-events'),
  })
}

export function useBuyerList(classEventId: string) {
  return useQuery({
    queryKey: ['teacher', 'class-events', classEventId, 'buyers'],
    queryFn: () =>
      apiFetch<{
        classEvent: { id: string; title: string; startsAt: string }
        institution: { shortName: string }
        subject: { name: string }
        paidCount: number
        buyers: Array<{
          enrollment: { id: string; status: string }
          user: { name: string; email: string }
          payment: {
            amountCents: number
            provider: string
            status: string
          } | null
        }>
      }>(`/teacher/class-events/${classEventId}/buyers`),
    enabled: !!classEventId,
  })
}

export function useUpdateTeacherProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: {
      bio?: string
      photoFile?: File
      institutionIds?: string[]
      subjectIds?: string[]
    }) => {
      let photoUrl: string | undefined

      if (data.photoFile) {
        // 1. Get signed upload URL from backend
        const upload = await apiFetch<{
          uploadUrl: string
          publicUrl: string
        }>('/uploads/profile-photo', {
          method: 'POST',
          body: JSON.stringify({
            filename: data.photoFile.name,
            contentType: data.photoFile.type,
            sizeBytes: data.photoFile.size,
          }),
        })

        // 2. Upload file directly to Supabase Storage
        const res = await fetch(upload.uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': data.photoFile.type },
          body: data.photoFile,
        })
        if (!res.ok) throw new Error('Falha ao enviar foto')

        photoUrl = upload.publicUrl
      }

      // 3. Update profile with all fields
      const { photoFile: _, ...rest } = data
      return apiFetch('/teacher-profile', {
        method: 'PUT',
        body: JSON.stringify({ ...rest, ...(photoUrl ? { photoUrl } : {}) }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
      toast.success('Perfil atualizado')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

export interface TeacherClassEventDetail {
  classEvent: {
    id: string
    title: string
    description: string
    startsAt: string
    durationMin: number
    priceCents: number
    capacity: number | null
    soldSeats: number
    publicationStatus: string
    meetingStatus: string
    meetingUrl?: string
    createdAt: string
    isSoldOut: boolean
    spotsLeft: number | null
  }
  institution: { id: string; name: string; shortName: string }
  subject: { id: string; name: string; icon: string | null }
}

export function useTeacherClassEvent(classEventId: string) {
  return useQuery({
    queryKey: ['teacher', 'class-events', classEventId],
    queryFn: () =>
      apiFetch<TeacherClassEventDetail>(
        `/teacher/class-events/${classEventId}`,
      ),
    enabled: !!classEventId,
  })
}

export function useCreateClassEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      apiFetch('/class-events', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher', 'class-events'] })
      toast.success('Class event created')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useUpdateClassEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Record<string, unknown>) =>
      apiFetch(`/class-events/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher', 'class-events'] })
      queryClient.invalidateQueries({ queryKey: ['class-events'] })
      toast.success('Class event updated')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}
