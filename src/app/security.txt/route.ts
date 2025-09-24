import { NextResponse } from 'next/server';

export async function GET() {
  const securityTxt = `Contact: mailto:security@birdiebriefing.com
Contact: https://www.birdiebriefing.com/contact-us
Expires: 2025-12-31T23:59:59.000Z
Encryption: https://www.birdiebriefing.com/pgp-key.txt
Acknowledgments: https://www.birdiebriefing.com/security-acknowledgments
Preferred-Languages: en
Canonical: https://www.birdiebriefing.com/.well-known/security.txt
Policy: https://www.birdiebriefing.com/security-policy

# Security Policy
# We take security seriously and appreciate responsible disclosure.
# Please report security vulnerabilities to the contact methods above.
# We will respond within 48 hours and work with you to resolve issues.`;

  return new NextResponse(securityTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}
