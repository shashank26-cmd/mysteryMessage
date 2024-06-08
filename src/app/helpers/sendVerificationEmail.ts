import { resend } from "@/app/lib/resend";
import VerificationEmail from "../../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
  await resend.emails.send({
        from: 'Shashank@Mishra.dev',
        to: email,
        subject: 'Mystery Message | Verification code',
        react: VerificationEmail({username,otp:verifyCode}),
    });
    return { success: true, message: "Verification email send Successfully" };
  } catch (emailError) {
    console.error("error sending verification email", emailError);
    return { success: false, message: "failed to send email" };
  }
}
