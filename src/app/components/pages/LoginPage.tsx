import { type FormEvent, useId, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { ROUTES } from '@/app/const';
import BspBlueprintLogo from '@/app/components/auth/BspBlueprintLogo';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { cn } from '@/app/components/ui/utils';

export default function LoginPage() {
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate(ROUTES.projects);
  }

  return (
    <div
      className={cn(
        'login-page relative mx-auto box-border h-auto min-h-screen w-full max-w-[1440px]',
        'bg-login-surface min-[1440px]:min-h-[900px]',
      )}
    >
      <div
        className={cn(
          'flex justify-center px-4 pt-8',
          'min-[1440px]:absolute min-[1440px]:left-[536px] min-[1440px]:top-[118px] min-[1440px]:block min-[1440px]:px-0 min-[1440px]:pt-0',
        )}
      >
        <BspBlueprintLogo />
      </div>

      <main
        className={cn(
          'mx-auto mt-8 box-border w-full max-w-[450px] px-4 pb-8',
          'min-[1440px]:absolute min-[1440px]:left-[495px] min-[1440px]:top-[254px] min-[1440px]:mt-0 min-[1440px]:px-0 min-[1440px]:pb-0',
        )}
      >
        <form
          onSubmit={handleSubmit}
          className={cn(
            'flex w-full flex-col items-start gap-6 rounded-xl border border-login-border bg-card',
            'box-border p-8 max-[1439px]:h-auto min-[1440px]:h-[451px] min-[1440px]:w-[450px]',
          )}
          noValidate
        >
          <div className="flex w-[386px] max-w-full flex-shrink-0 flex-col gap-2">
            <h1 className="h-6 w-full text-center text-xl leading-6 font-semibold text-login-heading">
              Welcome back!
            </h1>
            <p className="h-[21px] w-full text-center text-sm leading-[21px] text-login-body">
              Enter your email and password to sign in.
            </p>
          </div>

          <div className="flex w-[386px] max-w-full flex-shrink-0 flex-col gap-6">
            <div className="flex w-full flex-col gap-1">
              <Label
                htmlFor={emailId}
                className="h-[21px] p-0 text-sm font-medium leading-[21px] text-login-heading"
              >
                Email
              </Label>
              <Input
                id={emailId}
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter email"
                className="h-9 rounded-lg border-login-border bg-card py-[7.5px] pr-3 pl-3 text-sm leading-[21px] text-login-heading placeholder:text-login-soft"
              />
            </div>

            <div className="flex w-full flex-col gap-1">
              <Label
                htmlFor={passwordId}
                className="h-[21px] p-0 text-sm font-medium leading-[21px] text-login-heading"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id={passwordId}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="h-9 rounded-lg border-login-border bg-card py-[7.5px] pr-10 pl-3 text-sm leading-[21px] text-login-heading placeholder:text-login-soft"
                />
                <button
                  type="button"
                  className="text-login-soft hover:text-login-heading absolute top-1/2 right-3 size-5 -translate-y-1/2 rounded-md focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" aria-hidden strokeWidth={1.5} />
                  ) : (
                    <Eye className="size-5" aria-hidden strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex w-full flex-row items-start justify-between gap-0">
              <div className="flex h-6 min-w-0 flex-1 flex-row items-center gap-2 sm:w-[264px] sm:flex-none">
                <Switch
                  id="remember-me"
                  checked={remember}
                  onCheckedChange={setRemember}
                  className="h-[18px] w-[33px] shrink-0 border-0 data-[state=checked]:bg-login-button [&>span]:size-4 [&>span]:data-[state=checked]:translate-x-[15px] [&>span]:data-[state=unchecked]:translate-x-0"
                />
                <Label
                  htmlFor="remember-me"
                  className="h-[21px] cursor-pointer text-sm font-medium leading-[21px] text-login-heading"
                >
                  Remember me
                </Label>
              </div>
              <div className="flex h-6 w-[122px] flex-shrink-0 flex-row items-center justify-end gap-2.5 sm:justify-center">
                <Link
                  to={ROUTES.help}
                  className="h-[21px] w-full text-right text-sm leading-[21px] text-login-link underline-offset-4 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="h-9 w-[386px] max-w-full rounded-lg bg-login-button px-4 py-[7.5px] text-sm font-medium text-white hover:bg-login-button/90"
          >
            Login
          </Button>

          <div className="relative h-8 w-[386px] max-w-full shrink-0 max-[1439px]:flex max-[1439px]:h-auto max-[1439px]:flex-col max-[1439px]:items-center">
            <span className="text-login-body absolute top-1.5 left-[111px] h-[21px] w-[76px] text-center text-sm leading-[21px] max-[1439px]:static max-[1439px]:mb-0 max-[1439px]:block max-[1439px]:h-auto max-[1439px]:w-full max-[1439px]:text-center">
              Need help?
            </span>
            <div className="absolute top-0 left-[187px] flex h-8 flex-row items-center justify-center gap-2 rounded-lg px-1.5 py-[5.5px] max-[1439px]:static max-[1439px]:mt-1">
              <Link
                to={ROUTES.help}
                className="h-[21px] text-sm leading-[21px] text-login-link underline-offset-4 hover:underline"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </form>
      </main>

      <footer
        className={cn(
          'mt-12 flex w-full flex-col items-center gap-2 px-4 text-sm leading-[14px] text-login-soft',
          'min-[1440px]:absolute min-[1440px]:top-[769px] min-[1440px]:left-[495px] min-[1440px]:mt-0 min-[1440px]:h-[14px] min-[1440px]:w-[450px] min-[1440px]:flex-row min-[1440px]:justify-between min-[1440px]:px-0',
        )}
      >
        <span className="h-[14px] shrink-0 text-center min-[1440px]:w-[72px]">Version 1.0</span>
        <span className="h-[14px] shrink-0 text-center min-[1440px]:w-[200px]">
          Privacy Policy&nbsp;&nbsp;|&nbsp;&nbsp;Terms of Use
        </span>
      </footer>
    </div>
  );
}
