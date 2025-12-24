import React from 'react';
import { Button } from '@/components/ui/button';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  rightButtonText: string;
  onRightButtonClick: () => void;
}

export default function AuthLayout({
  children,
  title,
  description,
  rightButtonText,
  onRightButtonClick,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side: Branding */}
      <div className="hidden w-1/2 bg-[#f4f4f5] p-10 lg:flex flex-col border-r border-zinc-200">
        <div className="flex items-center gap-2 font-medium">
          <span className="text-xl">⌘</span>
          <span>Multi Vendor Marketplace</span>
        </div>
        {/* You could add a quote or image here later */}
      </div>

      {/* Right Side: Content Area */}
      <div className="flex w-full flex-col bg-white lg:w-1/2 p-10">
        {/* Dynamic Top-right Button */}
        <div className="flex justify-end">
          <Button variant="ghost" onClick={onRightButtonClick}>
            {rightButtonText}
          </Button>
        </div>

        {/* Centered Content */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col space-y-6 w-full max-w-[350px]">
            {/* Dynamic Header */}
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            {/* Where the Form will be injected */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
