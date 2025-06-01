"use client";

import { useHydrationData } from '@/hooks/use-hydration-data';
import { ProgressTracker } from '@/components/progress-tracker';
import { WaterLogger } from '@/components/water-logger';
import { GoalSetter } from '@/components/goal-setter';
import { HydrationTips } from '@/components/hydration-tips';
import { ReminderSettings } from '@/components/reminder-settings';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function Dashboard() {
  const {
    logs,
    goal,
    todaysIntake,
    addWaterLog,
    updateGoal,
    isInitialized,
    clearTodayLogs,
  } = useHydrationData();

  if (!isInitialized) {
    return (
      <div className="container mx-auto max-w-2xl p-4 space-y-6">
        <Skeleton className="h-12 w-1/2 mb-6" /> 
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-52 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-6 space-y-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-primary text-center font-headline">HydrateNow</h1>
        <p className="text-center text-muted-foreground">Your daily water intake companion.</p>
      </header>

      <ProgressTracker todaysIntake={todaysIntake} goal={goal} />
      <WaterLogger onLogWater={addWaterLog} />
      <HydrationTips />
      <GoalSetter currentGoal={goal} onUpdateGoal={updateGoal} />
      <ReminderSettings />
      
      <div className="pt-4 text-center">
        <Button variant="outline" onClick={clearTodayLogs}>
          <RefreshCcw className="mr-2 h-4 w-4" /> Reset Today's Logs
        </Button>
      </div>
    </div>
  );
}
