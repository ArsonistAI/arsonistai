import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

const SITE_URL = "https://arsonistai.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.privacy" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy-policy`,
      languages: { en: `${SITE_URL}/en/privacy-policy`, es: `${SITE_URL}/es/privacy-policy` },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("privacy");

  return (
    <article className="py-36 md:py-44">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-display-sm font-bold mb-14">{t("heading")}</h1>
        <div className="text-muted leading-relaxed space-y-6 text-body-md">
          <p>Effective Date: April 28, 2025</p>
          <p>
            Welcome to Arsonist AI (&ldquo;Company,&rdquo; &ldquo;we,&rdquo;
            &ldquo;our,&rdquo; &ldquo;us&rdquo;). Your privacy is important to
            us. This Privacy Policy explains how we collect, use, disclose, and
            protect your information when you visit our website
            https://arsonistai.com/ (the &ldquo;Site&rdquo;) and use our
            services.
          </p>
          <p>
            By using our Site, you consent to the practices described in this
            Policy.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            1. Information We Collect
          </h2>
          <p>
            <strong>Information you provide to us directly:</strong> Personal
            information such as your name, email address, company name, and
            other contact details when you fill out forms or correspond with us.
            Information you submit through inquiries, surveys, newsletter
            sign-ups, or account registrations.
          </p>
          <p>
            <strong>Information collected automatically:</strong> Device
            information (e.g., IP address, browser type, operating system).
            Usage information (e.g., pages visited, time spent on pages, clicks,
            referring URL).
          </p>
          <p>
            <strong>Information from third parties:</strong> If you interact with
            our services via social media or third-party platforms, we may
            collect limited information from those platforms subject to their
            privacy policies.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect to: Provide, operate, and improve
            our services and Site. Respond to your inquiries and provide
            customer support. Send administrative communications and marketing
            materials, where permitted. Analyze website usage and user behavior
            to improve our Site and offerings. Protect our legal rights and
            prevent misuse.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            3. Cookies and Tracking Technologies
          </h2>
          <p>
            We use cookies and similar tracking technologies to enable essential
            website functionality, analyze Site traffic and usage, and customize
            content based on your preferences. You can manage cookie settings
            through your browser.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            4. How We Share Your Information
          </h2>
          <p>
            We may share your information with service providers and partners
            who perform services on our behalf, legal authorities if required to
            comply with applicable law, or a successor entity in case of a
            merger, acquisition, or sale of assets. We do not sell or rent your
            personal information to third parties for their marketing purposes.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            5. Data Security
          </h2>
          <p>
            We implement industry-standard technical and organizational measures
            to protect your information. However, no method of transmission over
            the internet is 100% secure.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            6. International Data Transfers
          </h2>
          <p>
            If you access our Site from outside the United States, please note
            that your information may be transferred to, stored, and processed
            in the United States or other countries.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            7. Your Rights and Choices
          </h2>
          <p>
            Depending on your jurisdiction, you may have rights to access,
            correct, or delete your personal information; object to or restrict
            the processing of your data; and withdraw consent at any time. To
            exercise your rights, please contact us at hello@arsonistai.com.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            8. Children&apos;s Privacy
          </h2>
          <p>
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect personal information from children.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            9. Updates to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically. We will post the
            updated Policy on this page with a new effective date.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            10. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, you may contact
            us at:
            <br />
            Arsonist AI
            <br />
            Email: hello@arsonistai.com
          </p>
        </div>
      </div>
    </article>
  );
}
