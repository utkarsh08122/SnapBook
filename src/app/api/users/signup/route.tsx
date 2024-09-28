import { User } from "@/lib/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helper/mailer";
import { error, success } from "@/contollers/responsController";
const dbConect = require("@/lib/dbConnect");

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(error(406, "All field are required"));
    } else {
      dbConect();

      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return NextResponse.json(error(406, "User is already exist"));
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username: name,
        email,
        password: hashedPassword,
      });

      await sendEmail({ email, emailType: "ovnafz", userId: user._id });
      return NextResponse.json(success(201, "User is successful signup"));
    }
  } catch (e: any) {
    return NextResponse.json(success(400, e._message));
  }
}
