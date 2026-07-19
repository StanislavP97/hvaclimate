import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | HVA Climate Control",
  description:
    "Learn how HVA Climate Control collects, uses, and protects your information when you engage with our HVAC services.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 text-body">
      <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
        Privacy Policy
      </h1>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-foreground">
          HVA Climate Control SMS/Text Messaging Privacy Policy
        </h2>
        <p className="mt-2 text-sm">Estimated reading time: 5 minutes</p>
        <p className="text-sm">Effective Date: April 28, 2025</p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">Introduction</h2>
        <p className="mt-3">
          At HVA Climate Control (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;), your privacy is important to us. This
          SMS/Text Messaging Privacy Policy (&ldquo;Privacy
          Policy&rdquo;) outlines how we collect, use, disclose, and
          safeguard your information when you opt in to receiving
          SMS/text messages from us.
        </p>
        <p className="mt-3">
          By opting in to our SMS/text messaging services, you agree to
          the terms of this Privacy Policy.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          Information We Collect
        </h2>
        <p className="mt-3">
          When you sign up for SMS/text messaging from HVA Climate
          Control, we collect:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Phone Number</strong> -
            Required to send SMS/text messages.
          </li>
          <li>
            <strong className="text-foreground">Name</strong> - Optional,
            used to personalize communications.
          </li>
          <li>
            <strong className="text-foreground">Consent Records</strong>{" "}
            - Documentation of your opt-in, including date/time/method.
          </li>
          <li>
            <strong className="text-foreground">
              Message Interactions
            </strong>{" "}
            - Engagement metrics like delivery status, responses, and
            interaction history.
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          How We Use Your Information
        </h2>
        <p className="mt-3">We use this data to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Send Updates</strong> -
            Deliver service notifications, appointment reminders, and
            occasional promotions.
          </li>
          <li>
            <strong className="text-foreground">
              Personalize Communication
            </strong>{" "}
            - Tailor messages based on your needs or services
            you&rsquo;ve requested.
          </li>
          <li>
            <strong className="text-foreground">Provide Support</strong>{" "}
            - Respond to inquiries and troubleshoot issues.
          </li>
          <li>
            <strong className="text-foreground">Analyze Trends</strong> -
            Improve message delivery and relevance.
          </li>
          <li>
            <strong className="text-foreground">Ensure Compliance</strong>{" "}
            - Meet legal requirements and protect user rights.
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          Consent and Opt-In
        </h2>
        <p className="mt-3">
          By submitting your phone number and opting in:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            You <strong className="text-foreground">consent</strong> to
            receive SMS/text messages from HVA Climate Control.
          </li>
          <li>
            You <strong className="text-foreground">confirm</strong>{" "}
            you&rsquo;re the authorized user of the phone number.
          </li>
          <li>
            You <strong className="text-foreground">understand</strong>{" "}
            message frequency may vary.
          </li>
          <li>
            You <strong className="text-foreground">acknowledge</strong>{" "}
            that standard messaging/data rates may apply.
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          Opt-Out Instructions
        </h2>
        <p className="mt-3">You can opt out anytime by:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            Texting <strong className="text-foreground">&ldquo;STOP&rdquo;</strong>{" "}
            to any message.
          </li>
          <li>
            Contacting us at{" "}
            <a href="mailto:office@hvaclimate.com" className="text-primary-accent">
              Office@hvaclimate.com
            </a>{" "}
            or calling{" "}
            <a href="tel:+13608882217" className="text-primary-accent">
              360-888-2217
            </a>
            .
          </li>
        </ul>
        <p className="mt-3">
          Please allow up to 48 hours for your request to be processed.
          After opting out, you may receive one final message confirming
          your opt-out.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          Data Sharing and Disclosure
        </h2>
        <p className="mt-3">
          We do <strong className="text-foreground">not</strong> sell or
          rent your personal information. However, we may share it with:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Service Providers</strong>{" "}
            - Trusted vendors like SMS delivery platforms (under strict
            confidentiality).
          </li>
          <li>
            <strong className="text-foreground">Legal Authorities</strong>{" "}
            - When required by law or regulation.
          </li>
          <li>
            <strong className="text-foreground">Business Transitions</strong>{" "}
            - In the case of mergers, acquisitions, or business transfers.
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          Data Security
        </h2>
        <p className="mt-3">We take steps to secure your information:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Technical Measures</strong>{" "}
            - SSL encryption, secure databases, and firewall protection.
          </li>
          <li>
            <strong className="text-foreground">
              Administrative Measures
            </strong>{" "}
            - Staff training and role-based access.
          </li>
          <li>
            <strong className="text-foreground">Physical Security</strong>{" "}
            - Secure office facilities and hosting environments.
          </li>
        </ul>
        <p className="mt-3">
          However, no system is 100% secure. Use at your own discretion.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          Data Retention
        </h2>
        <p className="mt-3">
          We retain your data only as long as necessary to provide
          services or comply with regulations.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">Your Rights</h2>
        <p className="mt-3">Depending on your jurisdiction, you may have the right to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Access, update, or correct your data</li>
          <li>Request deletion or restricted processing</li>
          <li>Object to data use in certain cases</li>
        </ul>
        <p className="mt-3">
          To exercise your rights, email{" "}
          <a href="mailto:office@hvaclimate.com" className="text-primary-accent">
            Office@hvaclimate.com
          </a>{" "}
          or call{" "}
          <a href="tel:+13608882217" className="text-primary-accent">
            360-888-2217
          </a>
          .
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          International Users
        </h2>
        <p className="mt-3">
          HVA Climate Control&rsquo;s services are intended for users in
          the United States. If you access our site from outside the
          U.S., you consent to your data being processed in the U.S.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          Children&rsquo;s Privacy
        </h2>
        <p className="mt-3">
          Our services are <strong className="text-foreground">not</strong>{" "}
          intended for users under 13. We do not knowingly collect data
          from children. If we discover such information, it will be
          deleted promptly.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          Message Frequency and Charges
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Frequency</strong> -
            Varies based on your engagement and services.
          </li>
          <li>
            <strong className="text-foreground">Charges</strong> -
            Standard messaging and data rates may apply.
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          Changes to This Policy
        </h2>
        <p className="mt-3">
          We may revise this Privacy Policy periodically. Updates will
          be:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            Posted on this page at{" "}
            <a
              href="https://www.hvaclimate.com/privacy-policy"
              className="text-primary-accent"
            >
              www.hvaclimate.com/privacy-policy
            </a>
          </li>
          <li>Sent via SMS or email if required</li>
        </ul>
        <p className="mt-3">
          Continued use of our services indicates your acceptance of
          changes.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">Contact Us</h2>
        <p className="mt-3">
          If you have any questions or concerns:
        </p>
        <p className="mt-3">
          <strong className="text-foreground">HVA Climate Control</strong>
          <br />
          Vancouver, WA
          <br />
          Email:{" "}
          <a href="mailto:office@hvaclimate.com" className="text-primary-accent">
            Office@hvaclimate.com
          </a>
          <br />
          Phone: 360-888-2217
          <br />
          Website:{" "}
          <a
            href="https://www.hvaclimate.com"
            className="text-primary-accent"
          >
            https://www.hvaclimate.com
          </a>
        </p>
      </div>
    </article>
  );
}
