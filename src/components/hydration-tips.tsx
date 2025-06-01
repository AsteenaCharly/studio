"use client";

import type { AiActivityLevel } from '@/lib/types';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lightbulb, Zap } from 'lucide-react';
import { personalizedHydrationTips, type PersonalizedHydrationTipsInput, type PersonalizedHydrationTipsOutput } from '@/ai/flows/personalized-hydration-tips';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';


const aiActivityLevels: AiActivityLevel[] = ['sedentary', 'moderate', 'active'];

export function HydrationTips() {
  const [activityLevel, setActivityLevel] = useState<AiActivityLevel>('moderate');
  const [weatherConditions, setWeatherConditions] = useState('');
  const [tips, setTips] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchTips = async () => {
    if (!weatherConditions.trim()) {
      toast({
        title: "Missing Information",
        description: "Please describe the weather conditions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTips(null);
    try {
      const input: PersonalizedHydrationTipsInput = { activityLevel, weatherConditions };
      const result: PersonalizedHydrationTipsOutput = await personalizedHydrationTips(input);
      setTips(result.hydrationTips);
    } catch (error) {
      console.error("Error fetching hydration tips:", error);
      toast({
        title: "Error",
        description: "Could not fetch hydration tips. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">AI Hydration Tips</CardTitle>
        <Lightbulb className="h-5 w-5 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="aiActivityLevel">Activity Level</Label>
            <Select
              value={activityLevel}
              onValueChange={(value: string) => setActivityLevel(value as AiActivityLevel)}
            >
              <SelectTrigger id="aiActivityLevel">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                {aiActivityLevels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="weatherConditions">Weather Conditions</Label>
            <Input
              id="weatherConditions"
              placeholder="e.g., Hot and sunny, Cold and dry"
              value={weatherConditions}
              onChange={(e) => setWeatherConditions(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <Button onClick={fetchTips} disabled={isLoading} className="bg-primary hover:bg-primary/90">
          <Zap className="mr-2 h-4 w-4" />
          {isLoading ? 'Getting Tips...' : 'Get Personalized Tips'}
        </Button>
        {isLoading && (
          <div className="space-y-2 w-full pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}
        {tips && !isLoading && (
          <div className="pt-4 prose prose-sm max-w-none text-foreground">
            <h4 className="font-semibold">Your Personalized Tips:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {tips.split('\n').map((tip, index) => tip.trim() && <li key={index}>{tip.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
