import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('http://localhost:4001/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (data.user) {
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
      //   change this to something better
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side: Light Gray Background */}
      <div className="hidden w-1/2 bg-[#f4f4f5] p-10 lg:flex flex-col border-r border-zinc-200">
        {/* Logo/Brand placeholder can go here */}
        <div className="flex items-center gap-2 font-medium">
          <span className="text-xl">⌘</span>
          <span>Multi Vendor Marketplace</span>
        </div>
      </div>

      {/* Right Side: Solid White Background */}
      <div className="flex w-full flex-col bg-white lg:w-1/2 p-10">
        {/* Top-right 'Login' placeholder */}
        <div className="flex justify-end">
          <span className="text-sm font-medium cursor-pointer">Sign Up</span>
        </div>

        {/* Content Area (Where your form would be centered) */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col space-y-6 w-full max-w-[350px]">
            {/* Header text */}
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
