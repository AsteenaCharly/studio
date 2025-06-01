"use client";

import type { HydrationGoal } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from 'lucide-react';

interface ProgressTrackerProps {
  todaysIntake: number;
  goal: HydrationGoal;
}

export function ProgressTracker({ todaysIntake, goal }: ProgressTrackerProps) {
  const progressPercentage = goal.dailyGoal > 0 ? (todaysIntake / goal.dailyGoal) * 100 : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Today's Progress</CardTitle>
        <Target className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">
          {todaysIntake.toLocaleString()}ml
        </div>
        <p className="text-xs text-muted-foreground">
          Goal: {goal.dailyGoal.toLocaleString()}ml
        </p>
        <Progress value={progressPercentage} className="mt-4 h-3" />
        {todaysIntake >= goal.dailyGoal && (
          <p className="mt-2 text-sm font-medium text-green-600">
            🎉 Goal achieved! Keep it up!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
