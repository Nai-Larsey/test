import { pgTable, varchar, timestamp, integer, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const students = pgTable("students", {
  id: varchar("id", { length: 128 }).$defaultFn(() => createId()).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const courses = pgTable("courses", {
  id: varchar("id", { length: 128 }).$defaultFn(() => createId()).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }),
  capacity: integer("capacity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: varchar("id", { length: 128 }).$defaultFn(() => createId()).primaryKey(),
  studentId: varchar("student_id", { length: 128 })
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  courseId: varchar("course_id", { length: 128 })
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  uniqueEnrollment: unique().on(t.studentId, t.courseId),
}));

export const studentRelations = relations(students, ({ many }) => ({
  enrollments: many(enrollments),
}));

export const courseRelations = relations(courses, ({ many }) => ({
  enrollments: many(enrollments),
}));

export const enrollmentRelations = relations(enrollments, ({ one }) => ({
  student: one(students, {
    fields: [enrollments.studentId],
    references: [students.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));
