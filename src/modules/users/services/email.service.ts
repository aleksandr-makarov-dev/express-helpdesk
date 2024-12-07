async function sendEmail(receiver: string, subject: string, body: string) {
  console.log("=================================================");
  console.log("To: ", receiver);
  console.log("Subject: ", subject);
  console.log("Body:", body);
  console.log("=================================================");
}

async function sendVerificationEmail(email: string, token: string) {
  const subject = "Verification email: finish registration";
}

export const emailService = {};
