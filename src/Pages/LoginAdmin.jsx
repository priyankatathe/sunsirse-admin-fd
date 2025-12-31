import React, { useState } from 'react';
import login from '../../public/loginimg.png';
import logo from '../../public/logo (2).png';
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useForm } from 'react-hook-form';
import { useLoginAdminMutation } from '../redux/api/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const [loginAdmin, { isLoading }] = useLoginAdminMutation();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const onSubmit = async (data) => {
        try {
            const response = await loginAdmin(data).unwrap();

            if (response?.token) {
                toast.success(response.message || 'Login successful!');
                reset();
                navigate('/')
                localStorage.setItem("token", response?.token);
                console.log("response", response);
                return;
            }

        } catch (err) {
            //  ONLY real error comes here
            const errorMsg =
                err?.data?.message ||
                err?.error ||
                'Login failed!';
            toast.error(errorMsg);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center ">
            <div className="w-full max-w-6xl bg-white rounded-[32px] overflow-hidden flex">

                {/* LEFT LOGIN */}
                <div className="w-full md:w-1/2 px-10 py-14 flex flex-col justify-center">

                    {/* LOGO */}
                    <div className="flex justify-center mb-3">
                        <img
                            src={logo} // ideally use high-res PNG or SVG
                            alt="Sunrise Smart Geyser"
                            className="w-48 h-auto max-h-24 object-contain"
                            style={{ imageRendering: "auto" }} // ensures browser renders sharply
                        />
                    </div>


                    {/* HEADING */}
                    <div className="text-center mb-10">
                        <h2 className="text-[28px] font-bold text-gray-900">
                            Welcome Back, Admin
                        </h2>
                        <p className="text-[#212121BD] font-semibold text-[15px] ">
                            welcome back ! Please enter your details
                        </p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                        {/* EMAIL */}
                        <div className="relative mb-5">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                {...register("email", { required: true })}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">Email is required</p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className="relative mb-5">
                            {/* Left Icon */}
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                            {/* Input */}
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register("password", { required: true })}
                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                            />

                            {/* Right Eye Icon */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>

                            {/* Error */}
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">Password is required</p>
                            )}
                        </div>

                        {/* REMEMBER */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300"
                            />
                            Remember Me
                        </div>

                        {/* BUTTON at bottom */}
                        <div className="mt-10">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-black text-[20px] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
                            >
                                {isLoading ? "Logging in..." : "login →"}
                            </button>
                        </div>
                    </form>

                </div>

                {/* RIGHT IMAGE */}
                <div className="hidden md:block md:w-1/2 p-4">
                    <div className="w-full h-full rounded-[28px] overflow-hidden">
                        <img
                            src={login}
                            alt="heater"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </div>
    );


};

export default LoginAdmin;
