import prisma from "#config/prisma.js";
import { HttpError } from "#errors/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "#config/index.js";
import { JwtPayload } from "./types";

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  age: number,
  username: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new HttpError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      age,
      username,
    },
  });
  if (!user) {
    throw new HttpError(400, "Error creating user");
  }
  const { password: _, ...safeUser } = user;
  return {
    token: generateToken(user),
    user: safeUser,
  };
};

export const loginUser = async (emailOrUsername: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
    },
  });

  if (!user) {
    throw new HttpError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new HttpError(401, "Invalid credentials");
  }

  const { password: _, ...safeUser } = user;

  const token = generateToken(user);

  return { user: safeUser, token };
};

const generateToken = (user: JwtPayload) => {
  return jwt.sign(user, config.SECRET_KEY || "", { expiresIn: "24h" });
};
