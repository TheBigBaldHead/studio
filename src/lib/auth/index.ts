
import { cookies } from 'next/headers';
import { Lucia, verifyRequestOrigin } from 'lucia';
import {
  FirebaseAdminAdapter,
  transformIntoLuciaUser,
} from 'lucia-auth-adapter-firebase';
import { auth as adminAuth } from 'firebase-admin';
import { cache } from 'react';
import type { Session, User } from 'lucia';
import { initializeApp, getApps, getApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

const firebaseApps = getApps();

const adminApp =
  firebaseApps.find((app) => app.name === 'admin') ||
  initializeApp(
    {
      credential: credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env
          .FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      }),
    },
    'admin'
  );

const auth = adminAuth(adminApp);

const adapter = new FirebaseAdminAdapter(auth, transformIntoLuciaUser());

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      emailVerified: attributes.email_verified,
      picture: attributes.picture,
      name: attributes.name,
    };
  },
});

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
}
