"use client";

import { developer } from "@/data/portfolio";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export function CTABanner() {
  return (
    <section className="section !py-8 md:!py-12">
      <div className="container-main">
        <div className="card overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 p-6 text-center md:p-10">
          <h2 className="mb-2 text-xl font-bold sm:text-2xl md:text-3xl">
            Ready to start your project?
          </h2>
          <p className="mx-auto mb-6 max-w-md text-sm text-foreground-muted sm:text-base">
            Get in touch via WhatsApp, LinkedIn, or the contact form below.
          </p>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <a
              href={developer.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon width={18} height={18} /> Chat on WhatsApp
            </a>
            <a href="#contact" className="btn btn-glass">
              Send a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
