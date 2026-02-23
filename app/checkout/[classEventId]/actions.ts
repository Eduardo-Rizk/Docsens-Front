"use server";

import { redirect } from "next/navigation";
import { enrollments, viewer } from "@/lib/domain";
import type { Enrollment } from "@/lib/domain";

export async function confirmPayment(classEventId: string): Promise<void> {
  const existing = enrollments.find(
    (e) =>
      e.classEventId === classEventId &&
      e.studentProfileId === viewer.studentProfileId,
  );

  if (!existing) {
    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      classEventId,
      studentProfileId: viewer.studentProfileId,
      status: "PAID",
      createdAt: new Date().toISOString(),
    };
    enrollments.push(newEnrollment);
  }

  redirect(`/checkout/${classEventId}/sucesso`);
}
