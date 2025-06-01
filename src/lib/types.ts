export interface WaterLog {
  id: string;
  amount: number; // in ml
  timestamp: number;
}

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export interface HydrationGoal {
  dailyGoal: number; // in ml
  weight?: number; // in kg
  activityLevel?: ActivityLevel;
}

export type AiActivityLevel = 'sedentary' | 'moderate' | 'active';
