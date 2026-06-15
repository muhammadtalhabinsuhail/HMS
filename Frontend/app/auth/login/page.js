"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "../../api";
import { useAuth } from "../../AuthContext";
import toast from "react-hot-toast";
import { Hotel, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      loginUser(res.data.token, res.data.user);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      if (res.data.user.role === "Admin") router.push("/admin");
      else router.push("/customer/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-700 rounded-2xl mb-4 shadow-lg">
            <Hotel size={26} className="text-white" />
          </div>
          <h1 className="font-playfair text-3xl font-semibold text-neutral-800">Welcome Back</h1>
          <p className="font-jost font-light text-neutral-500 mt-1 text-sm">Sign in to RT Grace Hotel</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-brand-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-jost text-sm font-medium text-neutral-700 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg font-jost font-light text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block font-jost text-sm font-medium text-neutral-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg font-jost font-light text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-700 text-white font-jost font-medium py-3 rounded-lg hover:bg-brand-800 transition-colors disabled:opacity-60 text-sm tracking-wide"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-jost text-sm text-neutral-500">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-brand-700 font-medium hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-xs font-jost text-neutral-400">
          <Link href="/" className="hover:text-brand-600 transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}