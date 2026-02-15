Model Decisions — Aulões Platform (MVP)

This document explains the domain modeling decisions for the live group‑class marketplace connecting alumni instructors to students from specific institutions.

⸻

Core Product Concept

The platform revolves around a ** informing object: a scheduled live class (“Aulão”)**.

An Aulão is defined by four mandatory relations:

Aulão = Teacher + Subject + Institution + Time

If any of these are missing, the product loses its filtering, scheduling, and purchase logic.

Therefore the database is centered around the ClassEvent entity.

⸻

Identity Layer

User

Represents authentication identity (from Supabase Auth).

Why:
	•	Single login system
	•	User may become student or teacher later
	•	Avoid duplicated auth data across tables

Roles:
	•	STUDENT
	•	TEACHER
	•	BOTH (future‑proof)

The User never stores domain‑specific teaching data directly.

⸻

Profile Separation

We intentionally split profiles to keep the User table small and flexible.

StudentProfile

Minimal structure for now.

Purpose:
	•	Track purchases (enrollments)
	•	Future features (history, preferences, progress)

TeacherProfile

Contains public instructor information.

Fields include:
	•	photo
	•	bio
	•	headline
	•	verification flag

Why separated:
	•	Not every user is a teacher
	•	Teachers require moderation and richer metadata

⸻

Academic Structure

Institution

Represents the school or university affiliation used as a discovery filter.

Examples:
	•	FGV
	•	Insper
	•	Colégio Mobile

Purpose:
Primary browsing entry point in UI.

⸻

Subject

Represents the academic topic taught.

Examples:
	•	Mathematics
	•	Physics
	•	Calculus I

We keep it generic to support both school and university contexts.

⸻

TeacherSubject (Teaching Qualification)

Defines what a teacher is capable of teaching.

Structure:
Teacher ↔ Subject + optional level tag

Examples:
	•	Math — 2nd year high school
	•	Physics — Vestibular prep
	•	Calculus — University

Why separate from ClassEvent:
	•	Reusable qualification
	•	Enables filtering teachers before showing schedules
	•	Prevents inconsistent classes

⸻

Core Domain — Classes

ClassEvent (Aulão)

The central object of the platform.

A ClassEvent always belongs to:
	•	one Teacher
	•	one Subject
	•	one Institution
	•	one scheduled time

Additional properties:
	•	duration
	•	price
	•	capacity limit
	•	publication status
	•	meeting release status
	•	meeting URL

Conceptual states:
	•	Draft → not visible
	•	Published → purchasable
	•	Locked → students cannot enter
	•	Released → meeting accessible
	•	Finished → historical record

⸻

Purchase System

Enrollment

Represents the student’s right to attend a class.

Important rule:

A student can only have one enrollment per class.

Status lifecycle:
	•	PENDING (created but unpaid)
	•	PAID (confirmed access)
	•	CANCELLED
	•	REFUNDED

The system checks Enrollment status to decide:
	•	whether the user sees checkout
	•	waiting message
	•	or “Enter class” button

⸻

Payment

Stores payment provider state independently from enrollment.

Why separated:
	•	Payment gateways have complex states
	•	Refunds may not cancel enrollment immediately
	•	Allows integration with multiple providers

Provider examples:
	•	Stripe
	•	MercadoPago
	•	Mock (development)

⸻

Access Logic (Important Product Rule)

A student can enter the class only if:
	1.	Enrollment status = PAID
	2.	Current time >= class start time
	3.	Meeting status = RELEASED

Otherwise UI shows waiting state.

⸻

Constraints Enforced in Backend

Planned validations:
	1.	Teacher cannot have overlapping classes
	2.	Class capacity cannot be exceeded
	3.	Only class owner teacher can release meeting link
	4.	Students can only view their own enrollments
	5.	Public users can only see published classes

⸻

Why This Model Works

The design intentionally separates:

Identity → Profiles → Qualifications → Events → Access → Payment

Benefits:
	•	scalable
	•	minimal redundancy
	•	supports future recorded classes
	•	supports moderation
	•	clean filtering queries

The system remains centered around ClassEvent while all other tables act as permissions, metadata, or access control layers.

⸻

Future Extensions Supported

Without refactor:
	•	recorded classes
	•	subscriptions
	•	teacher ratings
	•	institutions approval system
	•	class materials
	•	chat per class

⸻

End of document.