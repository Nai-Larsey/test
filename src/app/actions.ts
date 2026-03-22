"use server"

import { db } from "@/db";
import { students, courses, enrollments } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function registerStudent(data: { name: string; email: string }) {
  try {
    const [student] = await db.insert(students).values({
      name: data.name,
      email: data.email,
    }).returning();
    
    return { success: true, student };
  } catch (error) {
    return { success: false, error: "Failed to register student. Email may already be in use." };
  }
}

export async function enrollInCourse(studentId: string, courseId: string) {
  try {
    const result = await db.transaction(async (tx) => {
      const course = await tx.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
          enrollments: true, 
        },
      });

      if (!course) throw new Error("Course not found.");

      if (course.enrollments.length >= course.capacity) {
        throw new Error("Course is already at full capacity.");
      }

      const existingEnrollment = await tx.query.enrollments.findFirst({
        where: and(
          eq(enrollments.studentId, studentId),
          eq(enrollments.courseId, courseId)
        ),
      });

      if (existingEnrollment) {
        throw new Error("Student is already enrolled in this course.");
      }

      const [enrollment] = await tx.insert(enrollments).values({
        studentId,
        courseId,
      }).returning();

      return enrollment;
    });

    return { success: true, enrollment: result };
  } catch (error: any) {
    return { success: false, error: error.message || "Enrollment failed." };
  }
}
