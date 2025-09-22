import { Request, Response } from "express";
import UserDetails from "../models/userDetailsModel";
import User from "../models/userModel";

//getting user details
export const getDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch UserDetails with associated User (to get email)
    const users = await UserDetails.findAll({
      include: [
        {
          model: User,
          attributes: ["email"], // fetch only email from user created
        },
      ],
    });

    if (users.length === 0) {
      res.status(200).json({
        success: true,
        data: [
          {
            id: null,
            fullname: null,
            email: null,
            phone: null,
            dateofbirth: null,
            address: null,
          },
        ],
      });
      return;
    }

    // Map results, getting email from associated User
    const formattedUsers = users.map((detail) => ({
      id: detail.id,
      fullname: detail.fullname,
      email: detail.user?.email ?? null, // get email from User
      phone: detail.phone,
      dateofbirth: detail.dateofbirth,
      address: detail.address,
    }));

    res.status(200).json({
      success: true,
      data: formattedUsers,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
    });
  }
};
