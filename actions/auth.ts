'use server'

import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

export async function loginAction(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
    await signIn("credentials", {
      email,
      password,
      redirect: false
    })
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid credentials." }
        default:
          return { success: false, error: "Something went wrong." }
      }
    }
    throw error
  }
}

export async function registerAction(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
    if (!name || !email || !password) {
      return { success: false, error: "Missing fields" }
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { success: false, error: "Email already exists." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const role = email.toLowerCase().includes('admin') ? 'ADMIN' : 'USER'
    
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        role
      }
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to register user." }
  }
}
