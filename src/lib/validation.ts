import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(254)
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select an estimated budget"),
  message: z
    .string()
    .min(10, "Please provide at least 10 characters describing your project")
    .max(3000, "Message cannot exceed 3000 characters")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
