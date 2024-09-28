"use client";

import { axiosClient } from "@/lib/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [toaster, setToaster] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e: any) {
    toast.loading("Loding...", { position: "top-right", duration: 1000 });
    e.preventDefault();
    setClick(true);
    try {
      const respons = await axiosClient.post("/api/users/signup", formData);
      const { massage, status } = await respons.data;

      {
        status === "ok"
          ? (toast.success(massage, {
              position: "top-right",
              duration: 2000,
            }),
            toast.success("Send a varification Email", {
              position: "top-right",
              duration: 3000,
            }))
          : toast.error(massage, {
              position: "top-right",
              duration: 2000,
            });
      }

      router.push("/login");
    } catch (error) {
      setShow(true);
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <Link href="http://localhost:3000/login">Login</Link>
          {show && <p className="text-red-500">user is already login</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
