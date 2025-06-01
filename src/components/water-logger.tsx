"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Droplet, PlusCircle, GlassWater } from 'lucide-react';

interface WaterLoggerProps {
  onLogWater: (amount: number) => void;
}

const presetAmounts = [
  { label: "250ml", amount: 250, icon: <Droplet className="mr-2 h-4 w-4" /> },
  { label: "500ml", amount: 500, icon: <GlassWater className="mr-2 h-4 w-4" /> },
  { label: "1L", amount: 1000, icon: <GlassWater className="mr-2 h-4 w-4" /> },
];

export function WaterLogger({ onLogWater }: WaterLoggerProps) {
  const [customAmount, setCustomAmount] = useState('');
  const { toast } = useToast();

  const handleLogWater = (amount: number) => {
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a positive amount of water.",
        variant: "destructive",
      });
      return;
    }
    onLogWater(amount);
    toast({
      title: "Water Logged!",
      description: `${amount}ml added to your intake.`,
    });
    setCustomAmount('');
  };

  const handleCustomLog = () => {
    const amount = parseInt(customAmount, 10);
    if (isNaN(amount)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number for custom amount.",
        variant: "destructive",
      });
      return;
    }
    handleLogWater(amount);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Log Water</CardTitle>
        <PlusCircle className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {presetAmounts.map(preset => (
            <Button
              key={preset.label}
              variant="outline"
              className="flex items-center justify-center py-6 text-base bg-accent/20 hover:bg-accent/40 border-accent text-accent-foreground"
              onClick={() => handleLogWater(preset.amount)}
            >
              {preset.icon}
              {preset.label}
            </Button>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Custom amount (ml)"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="text-base"
          />
          <Button onClick={handleCustomLog} className="text-base bg-primary hover:bg-primary/90">
            Log
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
