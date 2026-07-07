import { Mail } from "lucide-react";
import { QuoteMiniForm } from "@/components/contact/QuoteMiniForm";

export function ServiceContentSidebar() {
  return (
    <aside className="h-fit rounded-2xl bg-muted p-6 lg:sticky lg:top-24">
      <span className="flex size-12 items-center justify-center rounded-full bg-background text-primary-accent">
        <Mail className="size-5" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-foreground">
        Contact details
      </h3>
      <p className="mt-2 text-sm text-body">
        Please leave your information and we will contact you with next steps
        as soon as we can.
      </p>
      <QuoteMiniForm />
    </aside>
  );
}
