import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Alert, AlertDescription } from "../ui/alert";

const formSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  address: z.string().min(1, "Address is required"),
  trackingNumber: z.string().min(1, "Tracking number is required"),
  sentDate: z.string().min(1, "Sent date is required"),
  status: z.enum(["created", "in_transit", "delivered", "returned"]),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void;
  error?: string;
  isLoading?: boolean;
}

export const LetterForm = ({ defaultValues, onSubmit, error, isLoading }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "created",
      sentDate: new Date().toISOString().split("T")[0],
      notes: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="recipientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="123 Main St, City, State, ZIP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Number</FormLabel>
              <FormControl>
                <Input placeholder="TRK123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sentDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sent Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional notes..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Letter"}
          </Button>
        </div>
      </form>
    </Form>
  );
};