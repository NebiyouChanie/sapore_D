import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);

// Session payload type
type SessionPayload = {
  email: string;
  expiresAt: Date;
};

// Encrypt function to create JWT
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') 
    .sign(encodeKey);
}

// Decrypt function to verify JWT
export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, encodeKey, { algorithms: ['HS256'] });
    return payload as SessionPayload;
  } catch (error) {
    console.log(" ~ decrypt ~ error:", error)
    return null;
  }
}

// Create session function
export async function createSession(email: string) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); 
  const session = await encrypt({ email, expiresAt });

  // Set the session cookie
  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,  
    expires: expiresAt,
    sameSite: 'lax',  
    path: '/',  
  });

}

// lib/session.ts
export async function verifySession() {
  const session = (await cookies()).get('session')?.value;
  
  // Instead of redirecting, return null/false when no session
  if (!session) {
    return null;
  }

  const payload = await decrypt(session);
  if (!payload) {
    return null;
  }

  return { email: payload.email };
}

// Delete session function
export async function deleteSession() {
  (await cookies()).delete('session');
  redirect('/auth/singin');  
}


