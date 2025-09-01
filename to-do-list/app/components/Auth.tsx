"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Code,
  Sparkles,
  ArrowRight,
  Coffee,
  BrickWallFire,
} from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export default function Auth() {
  const provider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 text-white/10 font-mono text-sm animate-float">
          function() {"{ "}
        </div>
        <div className="absolute top-40 right-1/3 text-white/10 font-mono text-sm animate-float animation-delay-1000">
          const [state, setState] = useState();
        </div>
        <div className="absolute bottom-40 left-1/3 text-white/10 font-mono text-sm animate-float animation-delay-2000">
          return &lt;Component /&gt;
        </div>
        <div className="absolute top-60 right-1/4 text-white/10 font-mono text-sm animate-float animation-delay-3000">
          {"}"};
        </div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Header Section */}
          <div className="text-center mb-10">
            {/* Developer Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-6">
              <Code className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">
                นักพัฒนาฝึกหัด
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>

            {/* App Icon */}
            <div className="w-20 h-20 bg-gradient-to-tr from-purple-400 via-pink-400 to-red-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              To do list By นัก dev ฝึกหัด
            </h1>
            <p className="text-white/80 text-lg mb-2">
              เริ่มต้นการเดินทางของนักพัฒนา
            </p>
            <p className="text-white/60 text-sm">
              จัดการงานอย่างมืออาชีพ ด้วยแอปที่สร้างด้วยใจ
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
            <div className="space-y-6">
              {/* Google Sign In Button */}
              <button
                onClick={signInWithGoogle}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                    <span>กำลังเข้าสู่ระบบ...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>เข้าสู่ระบบด้วย Google</span>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
              <Coffee className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-white/80 text-xs">สร้างด้วย Next.js</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
              <BrickWallFire className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-white/80 text-xs">เก็บข้อมูลด้วย Firebase</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
              <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-white/80 text-xs">จัดการงานได้</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-white/40 text-sm">
              สร้างด้วย ❤️ โดยนัก dev ฝึกหัด
            </p>
            <p className="text-white/30 text-xs mt-1">
              `Every expert was once a beginner`
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
