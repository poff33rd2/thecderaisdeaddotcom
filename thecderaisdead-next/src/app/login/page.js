'use client';
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function Login() {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (!loading && user) {
router.push('/dashboard');    
return null;

}
  return (
    <main className="page">
      <div className="flex-1 flex items-center justify-center w-full px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-8">Login</h1>
          {/* Add your login form here */}
          {loading ? <h1>Loading...</h1> : <h1>Login form</h1>}
        </div>
      </div>
    </main>
  );
}

