"use client";

import type { WaterLog, HydrationGoal, ActivityLevel } from '@/lib/types';
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY_LOGS = 'hydrateNow_logs';
const STORAGE_KEY_GOAL = 'hydrateNow_goal';

const isBrowser = typeof window !== 'undefined';

export function useHydrationData() {
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const [goal, setGoal] = useState<HydrationGoal>({ dailyGoal: 2000, activityLevel: 'moderate', weight: 70 });
  const [todaysIntake, setTodaysIntake] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isBrowser) {
      const storedLogs = localStorage.getItem(STORAGE_KEY_LOGS);
      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
      }
      const storedGoal = localStorage.getItem(STORAGE_KEY_GOAL);
      if (storedGoal) {
        setGoal(JSON.parse(storedGoal));
      }
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isBrowser && isInitialized) {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
    }
  }, [logs, isInitialized]);

  useEffect(() => {
    if (isBrowser && isInitialized) {
      localStorage.setItem(STORAGE_KEY_GOAL, JSON.stringify(goal));
    }
  }, [goal, isInitialized]);

  const calculateTodaysIntake = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    const newTodaysIntake = logs
      .filter(log => log.timestamp >= todayTimestamp)
      .reduce((sum, log) => sum + log.amount, 0);
    setTodaysIntake(newTodaysIntake);
  }, [logs]);

  useEffect(() => {
    if (isInitialized) {
      calculateTodaysIntake();
    }
  }, [logs, calculateTodaysIntake, isInitialized]);

  const addWaterLog = useCallback((amount: number) => {
    const newLog: WaterLog = {
      id: crypto.randomUUID(),
      amount,
      timestamp: Date.now(),
    };
    setLogs(prevLogs => [...prevLogs, newLog]);
  }, []);

  const updateGoal = useCallback((newGoal: Partial<HydrationGoal>) => {
    setGoal(prevGoal => ({ ...prevGoal, ...newGoal }));
  }, []);
  
  const clearTodayLogs = useCallback(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const startOfToday = today.getTime();
    setLogs(prevLogs => prevLogs.filter(log => log.timestamp < startOfToday));
  }, []);

  return {
    logs,
    goal,
    todaysIntake,
    addWaterLog,
    updateGoal,
    isInitialized,
    clearTodayLogs,
  };
}
