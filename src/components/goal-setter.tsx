"use client";

import type { HydrationGoal, ActivityLevel } from '@/lib/types';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface GoalSetterProps {
  currentGoal: HydrationGoal;
  onUpdateGoal: (newGoal: Partial<HydrationGoal>) => void;
}

const activityLevels: ActivityLevel[] = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

export function GoalSetter({ currentGoal, onUpdateGoal }: GoalSetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(currentGoal.dailyGoal.toString());
  const [weight, setWeight] = useState(currentGoal.weight?.toString() || '');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(currentGoal.activityLevel || 'moderate');
  const { toast } = useToast();

  const handleSave = () => {
    const goalAmount = parseInt(dailyGoal, 10);
    const weightAmount = weight ? parseInt(weight, 10) : undefined;

    if (isNaN(goalAmount) || goalAmount <= 0) {
      toast({ title: "Invalid Goal", description: "Daily goal must be a positive number.", variant: "destructive" });
      return;
    }
    if (weight && (isNaN(weightAmount!) || weightAmount! <= 0)) {
      toast({ title: "Invalid Weight", description: "Weight must be a positive number.", variant: "destructive" });
      return;
    }

    onUpdateGoal({ dailyGoal: goalAmount, weight: weightAmount, activityLevel });
    toast({ title: "Goal Updated!", description: "Your hydration goal has been saved." });
    setIsOpen(false);
  };
  
  // Sync local state if currentGoal prop changes
  useState(() => {
    setDailyGoal(currentGoal.dailyGoal.toString());
    setWeight(currentGoal.weight?.toString() || '');
    setActivityLevel(currentGoal.activityLevel || 'moderate');
  });


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Hydration Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">{currentGoal.dailyGoal.toLocaleString()} ml</p>
            <p className="text-xs text-muted-foreground">
              {currentGoal.weight ? `${currentGoal.weight}kg, ` : ''}
              {currentGoal.activityLevel ? `${currentGoal.activityLevel.charAt(0).toUpperCase() + currentGoal.activityLevel.slice(1)} activity` : ''}
            </p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings2 className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Set Your Hydration Goal</DialogTitle>
                <DialogDescription>
                  Personalize your daily water intake goal. You can set it directly or based on weight and activity.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dailyGoal" className="text-right">
                    Daily Goal (ml)
                  </Label>
                  <Input
                    id="dailyGoal"
                    type="number"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="weight" className="text-right">
                    Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Optional"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="activityLevel" className="text-right">
                    Activity Level
                  </Label>
                  <Select
                    value={activityLevel}
                    onValueChange={(value: string) => setActivityLevel(value as ActivityLevel)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityLevels.map(level => (
                        <SelectItem key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleSave}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
