"use client";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { axiosClient } from "@/lib/axiosInstance";
import Search from "./Search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import AddSearchButton from "./AddSearchButton";
import { profile } from "@/helper/Action";

function Nav_bar() {
  const [userImg, setUserImg] = useState<any>("");
  const [ProfileImg, setProgileImg] = useState<any>("");
  const [isopen, setisopen] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [isFind, setIsFind] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [input, setinput] = useState<any>("");

  const send = async () => {
    try {
      const respons: any = await axiosClient.post("/api/users/user", {
        username,
      });
      setUsername("");
      const data = await respons.data;
      const { result } = await data;
      console.log("int he ", result);

      if (data.status === "ok") {
        console.log("int he sataus");
        setIsFind(true);
        setData(result);
      }
    } catch (error) {}
  };

  const userData = async () => {
    const respons: any = await axiosClient.get("/api/users/profile");
    const data = await respons.data;
    const { result } = await data;
    console.log("int he ", result);

    if (data.status === "ok") {
      console.log("int he sataus");
      setName(result.username);
      setBio(result.bio);
    }
  };

  const post = async () => {
    toast.loading("Loading", {
      position: "top-right",
      duration: 2000,
    });
    await profile(userImg, ProfileImg, name, bio);
  };
  const handelImagechange = (e: any) => {
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      if (filereader.readyState === FileReader.DONE) {
        setUserImg(filereader.result);
      }
    };
  };
  const handelProfileImagechange = (e: any) => {
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      if (filereader.readyState === FileReader.DONE) {
        setProgileImg(filereader.result);
      }
    };
  };

  return (
    <div className="bg-white  fixed z-10  top-0 w-full h-10 flex justify-center">
      <div className="relative w-[95%] h-full   flex justify-between items-center">
        <form action={send} className="flex gap-1 md:gap-4 ">
          <Link href="/"> SnapBook</Link>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Search..."
            name="input"
            id="input"
            value={username}
            className="bg-slate-400/20 outline-none pl-5 py-1 rounded-lg w-40  md:w-72"
          />
          <AddSearchButton />
        </form>
        {isFind && (
          <div
            className="fixed top-10 left-0 bg-white w-full h-full"
            onClick={() => {
              setIsFind(false);
            }}
          >
            <Search userData={data} />
          </div>
        )}
        <div className="h-full flex gap-2 md:gap-10">
          <button className="block md:hidden cursor-pointer">
            {isopen ? (
              <ImCross
                onClick={() => {
                  setisopen(false);
                }}
              />
            ) : (
              <GiHamburgerMenu
                onClick={() => {
                  setisopen(true);
                }}
              />
            )}
          </button>
          <Link
            href="http://localhost:3000/signup"
            className="flex items-center"
          >
            {/* {isOpen && <div className="fixed z-0 left-0 top-28 w-full h-full bg-green-700 "><input type="file" name="" id="" /></div>} */}
          </Link>
          <Dialog>
            <DialogTrigger>
              <div onClick={userData} className="hidden md:block">
                Update
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right">
                    Username
                  </label>

                  <Input
                    id="username"
                    value={name}
                    className="col-span-3 border"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="bio" className="text-right">
                    Bio
                  </label>
                  <Input
                    id="bio"
                    value={bio}
                    className="col-span-3 border"
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="picture" className="text-right">
                    Picture
                  </label>
                  <Input
                    className="col-span-3 border "
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    accept="image/*"
                    onChange={handelProfileImagechange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="image" className="text-right">
                    Image
                  </label>
                  <Input
                    className="col-span-3 border"
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handelImagechange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={post}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {isopen && (
        <div className="absolute top-10 w-full h-[calc(100vh-40px)] bg-white flex flex-col items-center gap-3 z-10">
          <Link
            href={`http://localhost:3000`}
            onClick={() => {
              setisopen(false);
            }}
          >
            Home
          </Link>
          <Link
            href={`http://localhost:3000/profile`}
            onClick={() => {
              setisopen(false);
            }}
          >
            Profile
          </Link>

          <Dialog>
            <DialogTrigger>
              <div
                onClick={() => {
                  userData();
                }}
                className="block md:hidden"
              >
                Update
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right">
                    Username
                  </label>

                  <Input
                    id="username"
                    value={name}
                    className="col-span-3 border"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="bio" className="text-right">
                    Bio
                  </label>
                  <Input
                    id="bio"
                    value={bio}
                    className="col-span-3 border"
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="picture" className="text-right">
                    Picture
                  </label>
                  <Input
                    className="col-span-3 border "
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    accept="image/*"
                    onChange={handelProfileImagechange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="image" className="text-right">
                    Image
                  </label>
                  <Input
                    className="col-span-3 border"
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handelImagechange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={post}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}

export default Nav_bar;
