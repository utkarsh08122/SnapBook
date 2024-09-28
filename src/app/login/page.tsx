"use client";
import {
  KEY_ACCESS_TOKEN,
  getItems,
  setItem,
} from "@/helper/localStroageManager";
import { axiosClient } from "@/lib/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface LoginFormValues {
  email: string;
  password: string;
}

function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function submit(e: any) {
    e.preventDefault();
    try {
      toast.loading("", {
        position: "top-right",
        duration: 2000,
      });
      const respons = await axiosClient.post("/api/users/login", formValues);
      setItem(KEY_ACCESS_TOKEN, respons.data.result);

      const { massage, status } = await respons.data;
      {
        status
          ? toast.success(massage, {
              position: "top-right",
              duration: 2000,
            })
          : toast.error(massage, {
              position: "top-right",
              duration: 2000,
            });
      }

      if (status) {
        router.push("/");
      }
    } catch (error) {
      setShow(true)
      router.push("/login");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={submit}
          >
            Login
          </button>
          <Link href="http://localhost:3000/signup">Signup</Link>
          {show && <p className="text-red-500">user does not exist</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
