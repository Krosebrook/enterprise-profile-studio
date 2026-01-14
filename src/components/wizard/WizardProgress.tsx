import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface WizardProgressProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function WizardProgress({ steps, currentStep, onStepClick }: WizardProgressProps) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <li 
              key={step.id} 
              className={cn(
                'flex items-center',
                index < steps.length - 1 && 'flex-1'
              )}
            >
              <button
                onClick={() => onStepClick?.(index)}
                disabled={!onStepClick || index > currentStep}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                  isCompleted && 'text-primary',
                  isCurrent && 'bg-primary/10 text-primary',
                  !isCompleted && !isCurrent && 'text-muted-foreground',
                  onStepClick && index <= currentStep && 'hover:bg-muted cursor-pointer'
                )}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all',
                    isCompleted && 'border-primary bg-primary text-primary-foreground',
                    isCurrent && 'border-primary',
                    !isCompleted && !isCurrent && 'border-muted-foreground/30'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{step.title}</p>
                </div>
              </button>
              
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    'mx-2 h-0.5 flex-1 transition-colors',
                    isCompleted ? 'bg-primary' : 'bg-border'
                  )} 
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
