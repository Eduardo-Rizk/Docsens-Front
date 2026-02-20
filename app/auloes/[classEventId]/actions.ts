"use server";

import { revalidatePath } from "next/cache";
import { enrollments, viewer } from "@/lib/domain";
import type { Enrollment } from "@/lib/domain";

export async function enrollInClass(classEventId: string): Promise<void> {
  const existing = enrollments.find(
    (e) =>
      e.classEventId === classEventId &&
      e.studentProfileId === viewer.studentProfileId,
  );
  if (existing) return;

  const newEnrollment: Enrollment = {
    id: `enr-${Date.now()}`,
    classEventId,
    studentProfileId: viewer.studentProfileId,
    status: "PAID",
    createdAt: new Date().toISOString(),
  };

  enrollments.push(newEnrollment);
  revalidatePath(`/auloes/${classEventId}`);
}
