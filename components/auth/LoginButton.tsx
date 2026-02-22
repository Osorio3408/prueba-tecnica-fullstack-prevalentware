'use client';

import { authClient } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { useState } from 'react';

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await authClient.signIn.social({
      provider: 'github',
    });
  };

  return (
    <div className='flex justify-center'>
      <Button
        onClick={handleLogin}
        disabled={loading}
        className='w-full bg-black hover:bg-gray-900 text-white flex items-center justify-center gap-3 py-6 text-base transition-all shadow-lg'
      >
        {loading ? (
          <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full' />
        ) : (
          <Github size={18} />
        )}
        {loading ? 'Redirecting...' : 'Continue with GitHub'}
      </Button>
    </div>
  );
}
