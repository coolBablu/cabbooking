import { LegalShell } from "@/components/ui/LegalShell";

export const metadata = {
  title: "Terms of Service · SwiftCab",
  description: "The terms that govern your use of SwiftCab.",
};

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      crumbLabel="Terms of Service"
      title={
        <>
          Terms of <span className="gradient-text">Service.</span>
        </>
      }
      subtitle="The rules of the road for using SwiftCab. Plain English, no surprises."
      effectiveDate="May 1, 2026"
      sections={[
        {
          id: "agreement",
          title: "1. Agreement",
          body: (
            <p>
              By accessing or using SwiftCab, you agree to be bound by these Terms.
              If you don't agree, please don't use the platform. We may update
              these terms occasionally — when we do, we'll notify you in-app.
            </p>
          ),
        },
        {
          id: "account",
          title: "2. Your account",
          body: (
            <>
              <p>
                You're responsible for maintaining the confidentiality of your
                login credentials. SwiftCab is not liable for losses arising from
                unauthorized account use that resulted from your failure to keep
                credentials secure.
              </p>
              <p>
                Accounts may be suspended for activity that violates our Community
                Guidelines, including fraud, harassment, or unsafe behavior.
              </p>
            </>
          ),
        },
        {
          id: "rides",
          title: "3. Rides & payments",
          body: (
            <>
              <p>
                Fares are presented upfront before booking confirmation. Once
                confirmed, the fare is fixed — except where additional services
                (tolls, wait time, multi-stop, etc.) are added during the trip.
              </p>
              <p>
                Refunds are processed within 24 hours for most payment methods.
                Wallet refunds are instant.
              </p>
            </>
          ),
        },
        {
          id: "conduct",
          title: "4. Acceptable conduct",
          body: (
            <p>
              Treat drivers and other riders with respect. Damage to vehicles,
              harassment, or unsafe behavior may result in a permanent ban from
              the platform and, where applicable, legal action.
            </p>
          ),
        },
        {
          id: "liability",
          title: "5. Limitation of liability",
          body: (
            <p>
              SwiftCab is not liable for indirect, incidental, or consequential
              damages arising from your use of the service, except where
              prohibited by law. Our maximum aggregate liability is capped at
              the amount you paid for services in the prior six (6) months.
            </p>
          ),
        },
        {
          id: "ip",
          title: "6. Intellectual property",
          body: (
            <p>
              All content, branding, logos, and software are owned by SwiftCab
              Technologies, Inc. You may not copy, modify, or distribute them
              without our explicit written permission.
            </p>
          ),
        },
        {
          id: "termination",
          title: "7. Termination",
          body: (
            <p>
              You may delete your account at any time from Settings. We may
              terminate or suspend accounts that violate these Terms, with notice
              where reasonable.
            </p>
          ),
        },
        {
          id: "law",
          title: "8. Governing law",
          body: (
            <p>
              These Terms are governed by the laws of the State of Delaware, USA.
              Any disputes will be resolved exclusively in the courts of New
              Castle County, Delaware.
            </p>
          ),
        },
        {
          id: "contact",
          title: "9. Contact",
          body: (
            <p>
              Questions? Email{" "}
              <a className="text-sunny-400 underline" href="mailto:legal@swiftcab.com">
                legal@swiftcab.com
              </a>{" "}
              or reach us through the Help Center.
            </p>
          ),
        },
      ]}
    />
  );
}
