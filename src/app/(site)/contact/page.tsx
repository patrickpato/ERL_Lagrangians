import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SEO from "@/lib/seo";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Enter a valid email."),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const submitContact = async (payload: ContactFormValues) => {
    const webhookUrl = import.meta.env.CONTACT_WEBHOOK_URL;
    if (!webhookUrl) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return;
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Contact submission failed.");
    }
  };

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setStatus("sending");
      await submitContact(data);
      setStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Talk to the ClearDrop Tech team."
        path="/contact"
      />
      <PageHeader
        title="Contact"
        subtitle="Tell us about your operations and we will respond within two business days."
        eyebrow="Contact"
      />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <label className="text-sm text-cd-muted" htmlFor="name">
                Full name
              </label>
              <Input id="name" placeholder="Jane Doe" {...register("name")} />
              {errors.name ? (
                <p className="mt-2 text-xs text-cd-danger">
                  {errors.name.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="text-sm text-cd-muted" htmlFor="email">
                Work email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="jane@company.com"
                {...register("email")}
              />
              {errors.email ? (
                <p className="mt-2 text-xs text-cd-danger">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm text-cd-muted" htmlFor="company">
                  Company
                </label>
                <Input id="company" placeholder="Company" {...register("company")} />
              </div>
              <div>
                <label className="text-sm text-cd-muted" htmlFor="role">
                  Role
                </label>
                <Input id="role" placeholder="Role" {...register("role")} />
              </div>
            </div>
            <div>
              <label className="text-sm text-cd-muted" htmlFor="message">
                Message
              </label>
              <Textarea
                id="message"
                rows={6}
                placeholder="Tell us about your goals."
                {...register("message")}
              />
              {errors.message ? (
                <p className="mt-2 text-xs text-cd-danger">
                  {errors.message.message}
                </p>
              ) : null}
            </div>
            <Button type="submit" size="lg" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Submit"}
            </Button>
            {status === "success" ? (
              <p className="text-sm text-cd-success">
                Thanks. We will be in touch soon.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="text-sm text-cd-danger">
                Submission failed. Please try again.
              </p>
            ) : null}
          </form>
          <div className="space-y-6">
            <Card>
              <h3 className="h4">ClearDrop Tech HQ</h3>
              <p className="body mt-3">
                4th Floor, Westlands Innovation Hub
                <br />
                Nairobi, Kenya
              </p>
              <p className="body mt-3">hello@cleardroptech.com</p>
              <p className="body mt-3">+254 (0) 700 000 000</p>
              <p className="body mt-3">
                Office hours: Monday to Friday, 9:00 - 18:00
              </p>
              {/* TODO: Update contact info, office hours, and address. */}
            </Card>
            <Card>
              <h3 className="h4">Partnerships</h3>
              <p className="body mt-3">
                Interested in co-building or piloting a solution? Reach out to
                our partnerships desk.
              </p>
              <p className="body mt-3">partners@cleardroptech.com</p>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ContactPage;
