import { LegalShell } from "@/components/ui/LegalShell";

export const metadata = {
  title: "Privacy Policy · SwiftCab",
  description: "How SwiftCab collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      crumbLabel="Privacy Policy"
      title={
        <>
          Privacy <span className="gradient-text">Policy.</span>
        </>
      }
      subtitle="Your data, your control. Here's exactly what we collect, why, and how to manage it."
      effectiveDate="May 1, 2026"
      sections={[
        {
          id: "data",
          title: "1. Data we collect",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Account info — name, email, phone, profile photo.</li>
              <li>Trip data — pickup, drop-off, route, fare, ratings.</li>
              <li>Device data — IP, app version, OS, crash logs.</li>
              <li>Payment info — tokenized; we never store full card numbers.</li>
            </ul>
          ),
        },
        {
          id: "use",
          title: "2. How we use it",
          body: (
            <p>
              We use your data to provide rides, improve routing, prevent fraud,
              and (with your consent) personalize promotions. We do not sell
              your personal data to third parties — ever.
            </p>
          ),
        },
        {
          id: "share",
          title: "3. Who we share with",
          body: (
            <>
              <p>
                Drivers receive your name, photo, and pickup/drop-off — only for
                the duration of your trip. Service providers (cloud, analytics,
                payments) process data on our behalf under strict contracts.
              </p>
              <p>
                We may share data when required by law or to protect rider/driver
                safety.
              </p>
            </>
          ),
        },
        {
          id: "rights",
          title: "4. Your rights",
          body: (
            <p>
              You can request a copy of your data, correct inaccuracies, or
              delete your account from Settings → Privacy. We process requests
              within 30 days as required under GDPR and CCPA.
            </p>
          ),
        },
        {
          id: "retention",
          title: "5. Retention",
          body: (
            <p>
              We retain trip and account data for the duration of your account
              plus 5 years for accounting and safety records, unless you request
              earlier deletion (where legally permissible).
            </p>
          ),
        },
        {
          id: "cookies",
          title: "6. Cookies",
          body: (
            <p>
              We use essential cookies for authentication and analytics cookies
              (only with consent) to improve the product. You can manage cookie
              preferences in your account settings or browser.
            </p>
          ),
        },
        {
          id: "children",
          title: "7. Children",
          body: (
            <p>
              SwiftCab is not directed at children under 13 (or 16 in the EEA).
              We do not knowingly collect data from children. If you believe we
              have, please contact us and we'll delete it promptly.
            </p>
          ),
        },
        {
          id: "changes",
          title: "8. Changes",
          body: (
            <p>
              We'll notify you in-app and via email of any material changes to
              this Policy at least 14 days before they take effect.
            </p>
          ),
        },
        {
          id: "contact",
          title: "9. Contact",
          body: (
            <p>
              Reach our Data Protection Officer at{" "}
              <a
                className="text-sunny-400 underline"
                href="mailto:privacy@swiftcab.com"
              >
                privacy@swiftcab.com
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
