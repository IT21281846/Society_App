import express from "express";
import prisma from "../prisma";
import bcrypt from "bcryptjs";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// ✅ Get current user's profile
router.get("/", authenticateToken, async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, firstName: true, lastName: true, email: true, role: true },
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ✅ Update profile
router.put("/", authenticateToken, async (req: any, res) => {
  try {
    const { firstName, lastName,email, password } = req.body;
    const updateData: any = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: { id: true, firstName: true, lastName: true, email: true, role: true },
    });

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
