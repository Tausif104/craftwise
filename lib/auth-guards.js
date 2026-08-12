import { auth } from "@/auth";

/**
 * Shared session guards for server actions.
 *
 * These were previously copy-pasted into blog.actions.js, announcement.actions.js
 * and legal-documents.actions.js with slightly different wording. Any change to
 * the auth contract now only has to happen here.
 */

export async function requireSession() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You need to be signed in to do that.");
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireSession();

  if (session.user.role !== "ADMIN") {
    throw new Error("You need admin access to do that.");
  }

  return session;
}

/**
 * Wraps a server action body so every action returns the same shape the rest of
 * the codebase already expects: { success: true, ...data } or { success: false, msg }.
 */
export async function guarded(fn, { admin = false } = {}) {
  try {
    const session = admin ? await requireAdmin() : await requireSession();
    const result = await fn(session);
    return { success: true, ...(result || {}) };
  } catch (error) {
    console.error(error);
    return { success: false, msg: error.message || "Something went wrong." };
  }
}
