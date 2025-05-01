'use server'

import { SignInFormSchema } from '@/lib/definitions'
import { createSession } from '@/lib/session';
import { db } from "@/lib/db/db";
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm';
import { admin } from '@/lib/db/schema';
import { SignupFormSchema } from '@/lib/definitions'

export async function signIn(data: { email: string; password: string }) {
  // Validation remains the same
  const validationResult = SignInFormSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validationResult.data;

  // Check if user exists
  const [adminUser] = await db.select().from(admin).where(eq(admin.email, email)).limit(1);

  if (!adminUser) {
    return {
      errors: { email: ['No user found with this email'] },
    };
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, adminUser.password);

  if (!isPasswordValid) {
    return {
      errors: { password: ['Incorrect password'] },
    };
  }

  await createSession(adminUser.email);
  return { success: true, message: 'Sign-in successful' };
}

export async function signup(data: { email: string; password: string; confirmPassword: string }) {
  // Validation remains the same
  const validationResult = SignupFormSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, password, confirmPassword } = validationResult.data;

  if (password !== confirmPassword) {
    return {
      errors: { confirmPassword: ['Passwords do not match'] },
    };
  }

  // Check if user exists
  const [existingUser] = await db.select().from(admin).where(eq(admin.email, email)).limit(1);

  if (existingUser) {
    return {
      errors: { email: ['Email is already in use'] },
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
  await db.insert(admin).values({
    email,
    password: hashedPassword,
  });

  return { success: true, message: 'User created successfully' };
}