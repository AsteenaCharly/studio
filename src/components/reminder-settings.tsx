"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ReminderSettings() {
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [reminderFrequency, setReminderFrequency] = useState('60'); // in minutes
  const { toast } = useToast();

  const handleSaveChanges = () => {
    // In a real app, this would interact with a notification service.
    // For now, it's a UI placeholder.
    toast({
      title: "Reminder Settings",
      description: `Reminders ${remindersEnabled ? `enabled, every ${reminderFrequency} minutes` : 'disabled'}. (This is a demo feature)`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Smart Reminders</CardTitle>
        <Bell className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          Set up smart reminders to help you stay on track with your hydration goals. (Note: Actual notifications are not implemented in this demo.)
        </CardDescription>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="remindersEnabled" className="text-base">Enable Reminders</Label>
            <Switch
              id="remindersEnabled"
              checked={remindersEnabled}
              onCheckedChange={setRemindersEnabled}
            />
          </div>
          {remindersEnabled && (
            <div>
              <Label htmlFor="reminderFrequency">Remind me every</Label>
              <Select
                value={reminderFrequency}
                onValueChange={setReminderFrequency}
              >
                <SelectTrigger id="reminderFrequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveChanges} className="w-full bg-primary hover:bg-primary/90">
          <Clock className="mr-2 h-4 w-4" />
          Save Reminder Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
