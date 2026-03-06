"use client";

import { useState, useTransition } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  HelpCircle,
  Facebook,
  Twitter,
  Instagram,
  Car,
  Bus,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* 1. Header Section */}
      <section
        className="relative bg-muted/30 py-20 px-4 md:px-8 lg:px-16 text-center overflow-hidden border-b
      border-border"
      >
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, oklch(0.596 0.233 27.2 / 0.1) 0%, transparent 20%), radial-gradient(circle at 90% 80%, oklch(0.596 0.233 27.2 / 0.1) 0%, transparent 20%)",
          }}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">
            Contact Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're here to answer your questions, help you book consultations,
            and support your technology journey every step of the way.
          </p>
        </div>
      </section>

      {/* 2. Contact Methods Row */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-background relative z-20 -mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Phone className="w-6 h-6 text-primary" />,
              title: "Phone",
              desc: "Call us for immediate assistance or book a consultation",
              details: ["(02) 123-4567", "Mon-Fri: 9AM–7PM"],
            },
            {
              icon: <Mail className="w-6 h-6 text-primary" />,
              title: "Email",
              desc: "Send us a message and we'll respond within 24 hours",
              details: [
                "info@blessingcomputers.com",
                "sales@blessingcomputers.com",
              ],
            },
            {
              icon: <MessageSquare className="w-6 h-6 text-primary" />,
              title: "Live Chat",
              desc: "Chat with our customer service team in real-time",
              details: ["Available Mon-Fri", "9AM-6PM AEST"],
            },
            {
              icon: <MapPin className="w-6 h-6 text-primary" />,
              title: "Location",
              desc: "Visit us in the heart of the tech district",
              details: ["Level 1, 10 Tech Lane", "Innovation City, NSW 12345"],
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-card text-card-foreground p-6 rounded-2xl border border-border flex flex-col items-center
              text-center transition-transform hover:-translate-y-1 hover:shadow-md duration-300"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 opacity-90">
                {item.desc}
              </p>
              <div className="mt-auto pt-4 border-t border-border/50 w-full text-sm font-medium">
                {item.details.map((detail, i) => (
                  <p key={i}>{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Main Split Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Form Area */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8">
          <h2 className="text-2xl mb-6 text-foreground">Send us Message</h2>

          <Tabs defaultValue="inquiries" className="w-full">
            <TabsList className="mb-8 p-1 bg-muted/50 rounded-lg inline-flex w-full sm:w-auto h-auto">
              <TabsTrigger
                value="inquiries"
                className="rounded-md px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
              >
                Basic Inquiries
              </TabsTrigger>
              <TabsTrigger
                value="product"
                className="rounded-md px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
              >
                Product Order
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="inquiries"
              className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <Form {...inquiryForm}>
                <form
                  onSubmit={inquiryForm.handleSubmit(onSubmitInquiry)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={inquiryForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs text-muted-foreground uppercase font-semibold">
                            First Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="First Name"
                              className="rounded-xl bg-background border-border/50 h-12 focus-visible:ring-primary/20"
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
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs text-muted-foreground uppercase font-semibold">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Last Name"
                              className="rounded-xl bg-background border-border/50 h-12 focus-visible:ring-primary/20"
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
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs text-muted-foreground uppercase font-semibold">
                          Email *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@domain.com"
                            className="rounded-xl bg-background border-border/50 h-12 focus-visible:ring-primary/20"
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
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs text-muted-foreground uppercase font-semibold">
                          Subject *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="How can we help?"
                            className="rounded-xl bg-background border-border/50 h-12 focus-visible:ring-primary/20"
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
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs text-muted-foreground uppercase font-semibold">
                          Comments *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please let us know what is on your mind..."
                            className="rounded-xl bg-background border-border/50 min-h-30
                            resize-y focus-visible:ring-primary/20"
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
                    className="w-full disabled:cursor-not-allowed disabled:bg-primary/50 sm:w-auto px-8 h-12 rounded-full 
                    bg-primary hover:bg-primary/90 text-white font-medium transition-all"
                  >
                    {isPendingInquiry && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    Submit Inquiry
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent
              value="product"
              className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <Form {...productForm}>
                <form
                  onSubmit={productForm.handleSubmit(onSubmitProduct)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={productForm.control}
                      name="prodFirstName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs text-muted-foreground uppercase font-semibold">
                            First Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="First Name"
                              className="rounded-xl bg-background border-border/50 h-12 focus-visible:ring-primary/20"
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
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs text-muted-foreground uppercase font-semibold">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Last Name"
                              className="rounded-xl bg-background border-border/50 h-12 focus-visible:ring-primary/20"
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
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs text-muted-foreground uppercase font-semibold">
                          Email *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@domain.com"
                            className="rounded-xl bg-background border-border/50 h-12 focus-visible:ring-primary/20"
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
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs text-muted-foreground uppercase font-semibold">
                          Product Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. MacBook Pro M3"
                            className="rounded-xl bg-background border-border/50 h-12 focus-visible:ring-primary/20"
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
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs text-muted-foreground uppercase font-semibold">
                          Request Details *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about the product you'd like to order or inquire about..."
                            className="rounded-xl bg-background border-border/50 min-h-30 resize-y focus-visible:ring-primary/20"
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
                    className="w-full disabled:cursor-not-allowed disabled:bg-primary/50 sm:w-auto px-8 h-12 rounded-full 
                    bg-primary hover:bg-primary/90 text-white font-medium transition-all"
                  >
                    {isPendingProduct && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    Submit Order Request
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Info Area */}
        <div className="space-y-8">
          {/* Business Hours */}
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-lg">Business Hours</h3>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { day: "Monday", hours: "9:00 AM – 6:00 PM" },
                { day: "Tuesday", hours: "9:00 AM – 6:00 PM" },
                { day: "Wednesday", hours: "9:00 AM – 6:00 PM" },
                { day: "Thursday", hours: "9:00 AM – 6:00 PM" },
                { day: "Friday", hours: "9:00 AM – 6:00 PM" },
                { day: "Saturday", hours: "9:00 AM – 4:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0"
                >
                  <span className="text-muted-foreground">{item.day}</span>
                  <span className="font-medium">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ Link */}
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h3 className="text-lg">Frequently Asked Questions</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Check out the frequently asked questions and their answers that we
              receive regularly.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
            >
              View FAQ's{" "}
              <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Follow Us */}
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary font-bold">@</span>
              <h3 className="text-lg">Follow Us</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Stay connected for tech tips and special offers.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-secondary/20 transition-colors text-sm font-medium"
              >
                <Facebook className="w-4 h-4" /> Facebook
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-secondary/20 transition-colors text-sm font-medium"
              >
                <Twitter className="w-4 h-4" /> Twitter
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-secondary/20 transition-colors text-sm font-medium"
              >
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Accordion Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto text-center">
        {/* <h2 className="text-3xl text-foreground mb-4">
          Other Important Information
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
          Find essential details regarding parking, transportation options, and
          what new customers need to know.
        </p> */}

        {/* <Accordion
          type="single"
          collapsible
          className="w-full text-left space-y-4"
        >
          <AccordionItem
            value="item-1"
            className="border border-border rounded-xl px-4 bg-card shadow-sm data-[state=open]:border-primary/30 transition-colors"
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-4 text-left">
                <div className="bg-primary/10 p-2.5 rounded-lg">
                  <Car className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px]">Parking</h4>
                  <p className="text-sm text-muted-foreground font-normal">
                    Parking Details: Everything You Need to Know
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 pt-1 px-14 leading-relaxed">
              We offer complimentary parking for our customers right behind our
              main building. Simply pull into the driveway off Tech Lane and
              follow the signs for Customer Parking. If our lot is full, there
              is metered street parking available nearby.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border border-border rounded-xl px-4 bg-card shadow-sm data-[state=open]:border-primary/30 transition-colors"
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-4 text-left">
                <div className="bg-primary/10 p-2.5 rounded-lg">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px]">
                    Public Transport
                  </h4>
                  <p className="text-sm text-muted-foreground font-normal">
                    Public Transport Information: Essential Insights You Should
                    Have
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 pt-1 px-14 leading-relaxed">
              Our store is highly accessible via public transportation. We are
              located just a 5-minute walk from the Innovation City Central
              Station. The 401, 402, and 405 bus lines also stop directly across
              the street from our front entrance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border border-border rounded-xl px-4 bg-card shadow-sm data-[state=open]:border-primary/30 transition-colors"
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-4 text-left">
                <div className="bg-primary/10 p-2.5 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px]">
                    Returns & Warranty
                  </h4>
                  <p className="text-sm text-muted-foreground font-normal">
                    Return Policy: Key Details You Need to Know
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 pt-1 px-14 leading-relaxed">
              We stand by the quality of our products. Most items come with a
              standard 1-year manufacturer warranty and a 30-day return window
              for unopened products. Please bring your original receipt and
              ensure the item is in its original packaging when requesting a
              return.
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
      </section>
    </div>
  );
}
