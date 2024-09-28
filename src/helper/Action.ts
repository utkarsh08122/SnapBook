"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@/lib/model/user.model";
import { Post } from "@/lib/model/post.model";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { Comments } from "@/lib/model/comment.model";
export const addUserPost = async (formData: FormData, img: any) => {
  const desc = formData.get("desc") as string;
  if (!desc) return;
  console.log("this is  1")

  try {
  console.log("this is  2")

    const cookieStore: any = cookies();
    const cookie = cookieStore.get("RefresToken").value;
  console.log("this is  3")

    const userData: any = jwt.decode(cookie);

    const user: any = await User.findOne({ _id: userData.id }).select(
      "-password"
    );
    if (!user) return;
    if (img) {
      const cloudImg = await cloudinary.uploader.upload(img);
      const post = await Post.create({
        owner: userData.id,
        caption: desc,
        image: {
          publicId: cloudImg.public_id,
          url: cloudImg.url,
        },
      });
      await user.posts.push(post._id);
      await user.save();
    }
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
export const LikeCount = async (postId: any) => {
  try {
    const cookieStore: any = cookies();
    const cookie = cookieStore.get("RefresToken").value;
    const userData: any = jwt.decode(cookie);
    const user: any = await User.findOne({ _id: userData.id }).select(
      "-password"
    );
    if (!user) return;
    const post = await Post.findOne({ _id: postId });
    if (post.likes.includes(user._id)) {
      const index = post.likes.indexOf(user._id);
      post.likes.splice(index, 1);
      await post.save();
    } else {
      post.likes.push(user._id);
      await post.save();
    }
    revalidatePath("/");
  } catch (e) {
    console.log(e);
  }
};
export const Commentinput = async (comment: any, postId: any) => {
  try {
    const cookieStore: any = cookies();
    const cookie = cookieStore.get("RefresToken").value;
    const userData: any = jwt.decode(cookie);
    const user: any = await User.findOne({ _id: userData.id }).select(
      "-password"
    );
    if (!user) return;
    const post = await Post.findOne({ _id: postId });

    const output = await Comments.create({
      ownername: user.username,
      commentowner: user._id,
      owner: post._id,
      content: comment,
    });

    await post.comments.push(output._id);
    await post.save();
    revalidatePath("/");
  } catch (e) {
    console.log(e);
  }
};
export const FollowRequest = async (userId: any) => {
  try {
    const cookieStore: any = cookies();
    const cookie = cookieStore.get("RefresToken").value;
    const userData: any = jwt.decode(cookie);
    const RequestSender: any = await User.findOne({ _id: userData.id }).select(
      "-password"
    );
    const RequestRecever = await User.findOne({ _id: userId }).select(
      "-password"
    );

    if (!RequestSender || !RequestRecever) return;
    if (RequestSender.following.includes(userId)) {
      const index1 = RequestSender.following.indexOf(userId);
      const index2 = RequestRecever.followers.indexOf(userId);
      RequestSender.following.splice(index1, 1);
      RequestRecever.followers.splice(index2, 1);
      await RequestSender.save();
      await RequestRecever.save();
      revalidatePath("/");
      return false;
    }
    RequestSender.following.push(RequestRecever._id);
    RequestRecever.followers.push(RequestSender._id);
    await RequestSender.save();
    await RequestRecever.save();

    revalidatePath("/");
    return true;
  } catch (e) {
    console.log(e);
  }
};
export const profile = async (
  userImg: any,
  ProfileImg: any,
  name: any,
  bio: any
) => {
  try {
    const cookieStore: any = cookies();
    const cookie = cookieStore.get("RefresToken").value;
    const userData: any = jwt.decode(cookie);
    const user: any = await User.findOne({ _id: userData.id }).select(
      "-password"
    );
    if (userImg) {
      const cloudImg = await cloudinary.uploader.upload(userImg);
      user.avatar = {
        publicId: cloudImg.public_id,
        url: cloudImg.url,
      };
    }

    if (ProfileImg) {
      const cloudImg = await cloudinary.uploader.upload(ProfileImg);
      user.profileImg = {
        publicId: cloudImg.public_id,
        url: cloudImg.url,
      };
    }
    if (name) {
      user.username = name;
    }

    if (bio) {
      user.bio = bio;
    }
    const newUser = await user.save();
    revalidatePath("/");
  } catch (e) {
    console.log(e);
  }
};
export const loginUserData = async () => {
  try {
    const cookieStore: any = cookies();
    const cookie = cookieStore.get("RefresToken").value;
    const userData: any = jwt.decode(cookie);
    const user: any = await User.findOne({ _id: userData.id }).select(
      "-password"
    );
    return user;
    revalidatePath("/");
  } catch (e) {
    console.log(e);
  }
};
