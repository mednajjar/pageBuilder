import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function VerifyEmailPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">PageBuilder</Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "The email verification process was smooth and secure. I felt confident about the security of my account."
            </p>
            <footer className="text-sm">Sarah Johnson</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Check your email
            </h1>
            <p className="text-sm text-muted-foreground">
              We've sent you a verification link. Please check your email to verify your account.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
              <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
              <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Didn't receive an email?{' '}
              <Button variant="ghost" className="p-0 h-auto font-normal">
                Click here to resend
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 