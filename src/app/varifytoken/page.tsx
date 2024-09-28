"use client";

import { axiosClient } from "@/lib/axiosInstance";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function page() {
  const [token, setToken] = useState("");
  const [verified, setVarifide] = useState(false);

  let data: any;
  const varifyUserEmail = async () => {

    try {
      const respons = await axiosClient.post("api/users/varifyemail", {
        token,
      });
      const { result, status } = await respons.data;
      {
        status === "ok"
          ? toast.success(result, {
              position: "top-right",
              duration: 2000,
            })
          : toast.error(result, {
              position: "top-right",
              duration: 2000,
            });
      }

      {
        result == "User is varifide" ? setVarifide(true) : "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <span>Verify Email</span>
        {token ? `${token}` : ""}
        <button
          onClick={() => {
            varifyUserEmail();
          }}
        >
          verify
        </button>
        {verified && (
          <div>
            <h2>varifide</h2>
            <Link href="/login"> Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
