"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import Community from "../models/community.model";
import { connectToMDB } from "../mongoose";

export async function fetchUser(userId: string) {
  try {
    await connectToMDB();
    return await User.findOne({ id: userId })
      .populate({ path: "communities", model: Community })
      .lean();
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    await connectToMDB();
    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true }
    );
    if (path === "/profile/edit") revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    await connectToMDB();
    const threads = await User.findOne({ id: userId })
      .populate({
        path: "threads",
        model: Thread,
        populate: [
          {
            path: "community",
            model: Community,
            select: "name id image _id",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "name image id",
            },
          },
        ],
      })
      .lean();
    return threads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    await connectToMDB();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const [users, totalUsersCount] = await Promise.all([
      User.find(query)
        .sort({ createdAt: sortBy })
        .skip(skipAmount)
        .limit(pageSize)
        .select("id name username image")
        .lean()
        .exec(),
      User.countDocuments(query),
    ]);

    // Shuffle for random order
    users.sort(() => Math.random() - 0.5);

    const isNext = totalUsersCount > skipAmount + users.length;
    return { users, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getActivity(userId: string) {
  try {
    await connectToMDB();

    const userThreads = await Thread.find({ author: userId })
      .select("children")
      .lean();

    const childThreadIds = userThreads.flatMap((t: any) => t.children);

    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId },
    })
      .populate({
        path: "author",
        model: User,
        select: "name image _id",
      })
      .lean();

    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}