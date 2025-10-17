import { clsx } from 'clsx';
import { forwardRef } from 'react';

export function cn(...inputs: Array<string | undefined | null | false>) {
  return clsx(inputs.filter(Boolean));
}

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('glass rounded-xl shadow-card', className)}>{children}</div>
);

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' }>(
  ({ className, variant = 'primary', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition',
        variant === 'primary' && 'bg-brand text-white hover:bg-brand-dark',
        variant === 'outline' && 'border border-slate-200 hover:bg-slate-50',
        className
      )}
      {...props}
    />
  )
);
Button.displayName = 'Button';


