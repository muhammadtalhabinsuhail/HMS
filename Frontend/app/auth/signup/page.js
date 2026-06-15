"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signup } from "../../api";
import toast from "react-hot-toast";
import { Hotel } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error("Passwords do not match");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      await signup({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      toast.success("Account created! Please login.");
      router.push("/auth/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div key={key}>
      <label className="block font-jost text-sm font-medium text-neutral-700 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={key !== "phone"}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg font-jost font-light text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-700 rounded-2xl mb-4 shadow-lg">
            <Hotel size={26} className="text-white" />
          </div>
          <h1 className="font-playfair text-3xl font-semibold text-neutral-800">Create Account</h1>
          <p className="font-jost font-light text-neutral-500 mt-1 text-sm">Join RT Grace Hotel</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-brand-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {field("name", "Full Name", "text", "Your full name")}
            {field("email", "Email Address", "email", "you@example.com")}
            {field("phone", "Phone Number (optional)", "tel", "+92 300 000 0000")}
            {field("password", "Password", "password", "At least 6 characters")}
            {field("confirm", "Confirm Password", "password", "Re-enter password")}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-700 text-white font-jost font-medium py-3 rounded-lg hover:bg-brand-800 transition-colors disabled:opacity-60 text-sm tracking-wide mt-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-jost text-sm text-neutral-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-brand-700 font-medium hover:underline">Sign In</Link>
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