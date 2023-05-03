import z from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const userSchema = z.object({
  body: z
    .object({
      name: z.object({
        firstName: z
          .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be string",
          })
          .min(3, { message: "must be at least 3 characters long" })
          .regex(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/, {
            message: "Must be valid Alphabet",
          }),

        lastName: z
          .string({
            required_error: "lastName is required",
            invalid_type_error: "Name must be string",
          })
          .min(3, { message: "must be at least 3 characters long" })
          .regex(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/, {
            message: "Must be valid Alphabet",
          }),
        otherName: z
          .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be string",
          })
          .min(3, { message: "must be at least 3 characters long" })
          .regex(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/, {
            message: "Must be valid Alphabet",
          })
          .optional(),
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      phone: z.string().regex(phoneRegex, "Invalid phone number"),
      BVN: z.number().nonnegative(),
      password: z
        .string({
          required_error: "Enter valid password",
        })
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(6),
      role: z.enum(["ADMIN", "CUSTOMER"]),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
        });
      }
    }),
});

export type userType = z.infer<typeof userSchema>["body"];

export const userSignIn = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    password: z
      .string({
        required_error: "Enter valid password",
      })
      .min(6, "Password must be at least 6 characters"),
  }),
});

export type userSignInType = z.infer<typeof userSignIn>["body"];

export const transferSchema = z.object({
  body: z.object({
    amount: z.number().nonnegative(),
    accountNumber: z
      .string()
      .refine(
        value => /^\d{10}$/.test(value),
        "Account number must be a 10-digit string"
      ),
  }),
});

export type transferType = z.infer<typeof transferSchema>["body"];
