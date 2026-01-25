"use client"

import { useCallback, useState, type ChangeEvent, type FormEvent } from "react"
import { useCookie } from "react-use"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  IS_SENT_COOKIE_NAME,
  IS_SENT_COOKIE_VALUE,
  IS_SENT_REDIRECT_URL,
} from "@/lib/constants/safety"

type FormState = {
  firstName: string
  lastName: string
  email: string
  telegramUsername: string
  link: string
  comments: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  telegramUsername: "",
  link: "",
  comments: "",
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidHumanName(name: string) {
  const trimmed = name.trim()
  if (trimmed.length < 2 || trimmed.length > 64) return false
  if (/\d/.test(trimmed)) return false
  return true
}

function isValidTelegramUsername(username: string) {
  const trimmed = username.trim()
  const normalized = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed
  return /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(normalized)
}

function isValidHttpUrl(raw: string) {
  try {
    const url = new URL(raw)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

function validateForm(data: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!isValidHumanName(data.firstName)) {
    errors.firstName = "Enter a valid first name."
  }

  if (!isValidHumanName(data.lastName)) {
    errors.lastName = "Enter a valid last name."
  }

  if (!data.email.trim()) {
    errors.email = "Email is required."
  } else if (!isValidEmail(data.email.trim())) {
    errors.email = "Enter a valid email."
  }

  if (!data.telegramUsername.trim()) {
    errors.telegramUsername = "Telegram username is required."
  } else if (!isValidTelegramUsername(data.telegramUsername)) {
    errors.telegramUsername = "Enter a valid Telegram username (e.g., @username)."
  }

  if (!data.link.trim()) {
    errors.link = "Link is required."
  } else if (!isValidHttpUrl(data.link.trim())) {
    errors.link = "Enter a valid link (http/https)."
  }

  if (!data.comments.trim()) {
    errors.comments = "Comments are required."
  }

  return errors
}

function getFirstErrorMessage(errors: FormErrors): string | null {
  const keys: (keyof FormState)[] = [
    "firstName",
    "lastName",
    "email",
    "telegramUsername",
    "link",
    "comments",
  ]

  for (const key of keys) {
    const message = errors[key]
    if (message) return message
  }

  return null
}

export default function SafetyViolationForm() {
  const [, updateIsSentCookie] = useCookie(IS_SENT_COOKIE_NAME)
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))

      setErrors((prev) => {
        if (!prev[name as keyof FormState]) return prev
        const next = { ...prev }
        delete next[name as keyof FormState]
        return next
      })
    },
    []
  )

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const nextErrors = validateForm(formData)
      setErrors(nextErrors)

      if (Object.keys(nextErrors).length > 0) {
        const message =
          getFirstErrorMessage(nextErrors) ??
          "Please fill in all fields and make sure they are valid."
        toast.error(message)
        return
      }

      updateIsSentCookie(IS_SENT_COOKIE_VALUE, { path: "/" })
      window.location.assign(IS_SENT_REDIRECT_URL)
    },
    [formData, updateIsSentCookie]
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          aria-invalid={Boolean(errors.firstName)}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          aria-invalid={Boolean(errors.lastName)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
        />
        <Input
          type="text"
          name="telegramUsername"
          placeholder="Your Telegram Username*"
          value={formData.telegramUsername}
          onChange={handleChange}
          aria-invalid={Boolean(errors.telegramUsername)}
        />
      </div>

      <Input
        type="url"
        name="link"
        placeholder="Link to the post or page you want to report"
        value={formData.link}
        onChange={handleChange}
        aria-invalid={Boolean(errors.link)}
      />

      <Textarea
        name="comments"
        placeholder="Do you have any additional comments that will help us understand your report?..."
        value={formData.comments}
        onChange={handleChange}
        rows={4}
        aria-invalid={Boolean(errors.comments)}
      />

      <Button type="submit" className="w-full">
        Submit Form
      </Button>
    </form>
  )
}

