"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { submitContactForm } from "./actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Loader2,
  Send,
} from "lucide-react";

const agents = [
  "0812 436 2413",
  "0901 121 5084",
  "0907 060 4655",
  "0901 145 5223",
];

const inquirySchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  comments: z.string().min(10, "Comments must be at least 10 characters"),
});

const productSchema = z.object({
  prodFirstName: z.string().min(2, "First name is required"),
  prodLastName: z.string().optional(),
  prodEmail: z.string().email("Invalid email address"),
  orderNumber: z.string().min(2, "Order number or product name is required"),
  prodDetails: z.string().min(10, "Details must be at least 10 characters"),
});

export default function ContactPage() {
  const [isPendingInquiry, startTransitionInquiry] = useTransition();
  const [isPendingProduct, startTransitionProduct] = useTransition();

  const inquiryForm = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      comments: "",
    },
  });

  const productForm = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      prodFirstName: "",
      prodLastName: "",
      prodEmail: "",
      orderNumber: "",
      prodDetails: "",
    },
  });

  function onSubmitInquiry(values: z.infer<typeof inquirySchema>) {
    startTransitionInquiry(async () => {
      const response = await submitContactForm({ type: "inquiry", ...values });
      if (response.success) {
        toast.success(response.message);
        inquiryForm.reset();
      } else {
        toast.error(response.message);
      }
    });
  }

  function onSubmitProduct(values: z.infer<typeof productSchema>) {
    startTransitionProduct(async () => {
      const response = await submitContactForm({ type: "product", ...values });
      if (response.success) {
        toast.success(response.message);
        productForm.reset();
      } else {
        toast.error(response.message);
      }
    });
  }

  const inputClass =
    "bg-background border-border h-11 focus-visible:ring-primary/30 focus-visible:border-primary";
  const labelClass =
    "text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-semibold";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Strip */}
      <section className="bg-secondary relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80"
          alt=""
          fill
          className="object-cover opacity-70"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-secondary via-secondary/90 to-secondary/60" />
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
                Get in Touch
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Let&apos;s talk about
                <br />
                your next project
              </h1>
              <p className="text-sm text-white/60 leading-relaxed max-w-md">
                Whether you need enterprise hardware, bulk pricing, or expert
                consultation — our team is ready to help.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 lg:justify-end">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-white/20 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                    Email
                  </span>
                  <a
                    href="mailto:info@technocratng.com"
                    className="text-sm text-white hover:text-primary transition-colors"
                  >
                    info@technocratng.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-white/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                    Location
                  </span>
                  <span className="text-sm text-white">
                    15 Kodesoh St, Ikeja, Lagos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Stripe */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {agents.map((number) => (
              <a
                key={number}
                href={`tel:${number.replace(/\s/g, "")}`}
                className="flex items-center gap-3 py-4 px-4 group hover:bg-primary/5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-sm font-mono font-medium text-foreground group-hover:text-primary transition-colors">
                  {number}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="border border-border">
              {/* Form Header */}
              <div className="px-6 py-5 border-b border-border">
                <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Send className="w-4 h-4 text-primary" />
                  Send a Message
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Fill out the form below and we&apos;ll respond within 24
                  hours.
                </p>
              </div>

              <div className="p-6">
                <Tabs defaultValue="inquiries" className="w-full">
                  <TabsList className="mb-8 p-0 bg-transparent border border-border inline-flex h-auto">
                    <TabsTrigger
                      value="inquiries"
                      className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none transition-colors"
                    >
                      General Inquiry
                    </TabsTrigger>
                    <TabsTrigger
                      value="product"
                      className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-l border-border transition-colors"
                    >
                      Product Order
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="inquiries" className="space-y-5 mt-0">
                    <Form {...inquiryForm}>
                      <form
                        onSubmit={inquiryForm.handleSubmit(onSubmitInquiry)}
                        className="space-y-5"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <FormField
                            control={inquiryForm.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem className="space-y-1.5">
                                <FormLabel className={labelClass}>
                                  First Name *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="First Name"
                                    className={inputClass}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={inquiryForm.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem className="space-y-1.5">
                                <FormLabel className={labelClass}>
                                  Last Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Last Name"
                                    className={inputClass}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={inquiryForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className={labelClass}>
                                Email *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="you@company.com"
                                  className={inputClass}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={inquiryForm.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className={labelClass}>
                                Subject *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="How can we help?"
                                  className={inputClass}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={inquiryForm.control}
                          name="comments"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className={labelClass}>
                                Message *
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us more about what you need..."
                                  className={`${inputClass} min-h-28 resize-y`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={isPendingInquiry}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-11 text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
                        >
                          {isPendingInquiry && (
                            <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                          )}
                          Submit Inquiry
                          <ArrowRight className="w-3.5 h-3.5 ml-2" />
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>

                  <TabsContent value="product" className="space-y-5 mt-0">
                    <Form {...productForm}>
                      <form
                        onSubmit={productForm.handleSubmit(onSubmitProduct)}
                        className="space-y-5"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <FormField
                            control={productForm.control}
                            name="prodFirstName"
                            render={({ field }) => (
                              <FormItem className="space-y-1.5">
                                <FormLabel className={labelClass}>
                                  First Name *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="First Name"
                                    className={inputClass}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={productForm.control}
                            name="prodLastName"
                            render={({ field }) => (
                              <FormItem className="space-y-1.5">
                                <FormLabel className={labelClass}>
                                  Last Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Last Name"
                                    className={inputClass}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={productForm.control}
                          name="prodEmail"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className={labelClass}>
                                Email *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="you@company.com"
                                  className={inputClass}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={productForm.control}
                          name="orderNumber"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className={labelClass}>
                                Product Name *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. MacBook Pro M3"
                                  className={inputClass}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={productForm.control}
                          name="prodDetails"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className={labelClass}>
                                Order Details *
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Quantity, specs, delivery requirements..."
                                  className={`${inputClass} min-h-28 resize-y`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={isPendingProduct}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-11 text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
                        >
                          {isPendingProduct && (
                            <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                          )}
                          Submit Order Request
                          <ArrowRight className="w-3.5 h-3.5 ml-2" />
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Right: Info Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Business Hours */}
            <div className="border border-border">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Business Hours
                </h3>
              </div>
              <div className="divide-y divide-border">
                {[
                  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
                  { day: "Saturday", hours: "9:00 AM – 4:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between px-5 py-3 text-sm"
                  >
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className="font-mono font-medium text-foreground">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="border border-border">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Our Office
                </h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-foreground font-medium mb-1">
                  Blessing Computers Limited
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  No 15, Kodesoh Street,
                  <br />
                  Ikeja, Lagos. Nigeria.
                </p>
                <a
                  href="https://maps.google.com/?q=15+Kodesoh+Street+Ikeja+Lagos+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                >
                  View on Map <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Why Us */}
            <div className="border border-border bg-primary/5">
              <div className="px-5 py-4 border-b border-border">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Why Work With Us
                </h3>
              </div>
              <div className="p-5 space-y-4">
                {[
                  {
                    stat: "16,000+",
                    label: "Products across all categories",
                  },
                  {
                    stat: "20+ Years",
                    label: "In the electronics industry",
                  },
                  {
                    stat: "Same Day",
                    label: "Response on all inquiries",
                  },
                  {
                    stat: "Bulk Pricing",
                    label: "Available for corporate buyers",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-baseline gap-3">
                    <span className="text-sm font-mono font-bold text-primary shrink-0">
                      {item.stat}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
