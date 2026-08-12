"use server";

import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";

function getString(value) {
  return typeof value === "string" ? value.trim() : "";
}

export async function loginUser(_prevState, formData) {
  try {
    const email = getString(formData.get("email"));
    const password = getString(formData.get("password"));

    if (!email || !password) {
      return { success: false, msg: "Email and password are required." };
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });

    if (!user) {
      return { success: false, msg: "User does not exist." };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { success: false, msg: "Incorrect password." };
    }

    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    return { success: true, msg: "Login successful." };
  } catch (error) {
    console.error("loginUser error:", error);
    return { success: false, msg: "Login failed." };
  }
}

export async function registerUser(_prevState, formData) {
  try {
    const name = getString(formData.get("name"));
    const email = getString(formData.get("email"));
    const password = getString(formData.get("password"));

    if (!name || !email || !password) {
      return { success: false, msg: "All fields are required." };
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, msg: "User already exists." };
    }

    const userCount = await prisma.user.count();
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userCount === 0 ? "ADMIN" : "AUTHOR",
      },
    });

    return { success: true, msg: "Account created successfully." };
  } catch (error) {
    console.error("registerUser error:", error);
    return { success: false, msg: "Registration failed." };
  }
}

export async function logoutUser() {
  try {
    await signOut({ redirect: false });
    return { success: true };
  } catch (error) {
    console.error("logoutUser error:", error);
    return { success: false };
  }
}
