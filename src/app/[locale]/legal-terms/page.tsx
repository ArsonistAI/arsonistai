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
  const t = await getTranslations({ locale, namespace: "meta.legal" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${SITE_URL}/${locale}/legal-terms`,
      languages: { en: `${SITE_URL}/en/legal-terms`, es: `${SITE_URL}/es/legal-terms` },
    },
  };
}

export default async function LegalTermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalContent />;
}

function LegalContent() {
  const t = useTranslations("legal");

  return (
    <article className="py-36 md:py-44">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-display-sm font-bold mb-14">{t("heading")}</h1>
        <div className="text-muted leading-relaxed space-y-6 text-body-md">
          <p>Last updated: April 28, 2025</p>
          <p>
            Welcome to Arsonist AI (&ldquo;Company,&rdquo; &ldquo;we,&rdquo;
            &ldquo;our,&rdquo; &ldquo;us&rdquo;). These Terms and Conditions
            (&ldquo;Terms&rdquo;) govern your use of our website
            arsonistai.com (&ldquo;Site&rdquo;) and any services, products, or
            content provided through the Site.
          </p>
          <p>
            By accessing or using the Site, you agree to comply with and be
            bound by these Terms. If you do not agree, please do not use the
            Site.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            1. Use of the Site
          </h2>
          <p>
            You must be at least 18 years old to use this Site. You agree to use
            the Site lawfully and not engage in any activity that could harm or
            disrupt the Site or its services.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            2. Intellectual Property
          </h2>
          <p>
            All content on the Site, including text, graphics, logos, icons,
            images, audio, video, software, and code, is owned by or licensed to
            Arsonist AI and is protected by copyright, trademark, and other
            laws. You may not reproduce, distribute, modify, create derivative
            works of, publicly display, or otherwise exploit any content without
            our prior written consent.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            3. AI Services Disclaimer
          </h2>
          <p>
            Our services involve the use of artificial intelligence tools and
            technologies. While we strive for accuracy and reliability,
            AI-generated outputs may contain errors, biases, or limitations. We
            do not guarantee the completeness, accuracy, or suitability of any
            AI-generated content for any particular purpose.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            4. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, Arsonist AI shall not be
            liable for any direct, indirect, incidental, consequential, or
            punitive damages arising out of your use of the Site or our
            services. Use of the Site and services is at your own risk.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            5. Third-Party Links
          </h2>
          <p>
            The Site may contain links to third-party websites or services that
            we do not own or control. We are not responsible for the content,
            policies, or practices of any third-party sites.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            6. Privacy
          </h2>
          <p>
            Your use of the Site is also subject to our Privacy Policy. By using
            the Site, you consent to the collection, use, and disclosure of
            information as described in the Privacy Policy.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            7. Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time. Updates will be posted
            on this page, and your continued use of the Site constitutes
            acceptance of any changes.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            8. Governing Law
          </h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of the State of California, United States. Any disputes shall
            be resolved exclusively in the courts located in San Francisco,
            California.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">
            9. Contact Us
          </h2>
          <p>
            If you have any questions about these Terms, you may contact us at:
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
