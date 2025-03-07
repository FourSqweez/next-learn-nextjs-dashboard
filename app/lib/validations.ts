import { z } from 'zod';

export const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

// Infer the form values dynamically
type FormValues = z.infer<typeof FormSchema>;

// Define the State type dynamically
export type State =
  | { errors: Partial<Record<keyof FormValues, string[]>>; message: string }
  | { message: string; errors?: undefined };
