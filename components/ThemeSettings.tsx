"use client";

import { useState } from 'react';
import { Palette, Sparkles, Gauge } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ColorPicker } from './ColorPicker';
import { useTheme } from '@/hooks/use-theme';

interface ThemeSettingsPanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
}

export function ThemeSettingsPanel({ isOpen, onOpenChange, trigger }: ThemeSettingsPanelProps) {
  const { theme, updateTheme, resetTheme } = useTheme();
  const [localTheme, setLocalTheme] = useState(theme);

  const handleColorChange = (key: string, value: string) => {
    setLocalTheme(prev => ({ ...prev, [key]: value }));
    updateTheme({ [key]: value });
  };

  const handleIntensityChange = (value: number) => {
    setLocalTheme(prev => ({ ...prev, glowIntensity: value }));
    updateTheme({ glowIntensity: value });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] bg-[#1E1E1E] border-none text-[#D4D4D4]">
        <SheetHeader>
          <SheetTitle className="text-[#D4D4D4] flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Theme Settings
          </SheetTitle>
        </SheetHeader>
        
        <div className="py-4 space-y-6">
          <ColorPicker
            label="Background Color"
            value={localTheme.backgroundColor}
            onChange={(value) => handleColorChange('backgroundColor', value)}
            icon={<Palette className="h-4 w-4" />}
          />

          <ColorPicker
            label="Terminal Glow Color"
            value={localTheme.glowColor}
            onChange={(value) => handleColorChange('glowColor', value)}
            icon={<Sparkles className="h-4 w-4" />}
          />

          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Glow Intensity
            </Label>
            <Slider
              value={[localTheme.glowIntensity]}
              onValueChange={([value]) => handleIntensityChange(value)}
              min={0}
              max={1}
              step={0.1}
              className="bg-[#1A1A1A]"
            />
          </div>

          <Button
            variant="outline"
            className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] border-none"
            onClick={resetTheme}
          >
            Reset to Default
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}