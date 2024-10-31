"use client";

import { useState } from "react";
import { Mail, Terminal, Package, FileJson, Import, Plus, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ThemeSettingsPanel } from "@/components/ThemeSettings";
import { cn } from "@/lib/utils";

interface LeftPanelProps {
  onCommand: (command: string) => void;
}

interface CustomButton {
  id: string;
  name: string;
  command: string;
}

export function LeftPanel({ onCommand }: LeftPanelProps) {
  const [customButtons, setCustomButtons] = useState<CustomButton[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importApp, setImportApp] = useState("");
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [newButton, setNewButton] = useState({
    name: "",
    command: ""
  });

  const defaultButtons = [
    { id: "mail", name: "Check Mail", icon: Mail, command: "python3 .mail_064.py" },
    { id: "node", name: "Node.js", icon: Terminal, command: "node" },
    { id: "npm", name: "NPM", icon: Package, command: "npm" },
    { id: "json", name: "JSON Tools", icon: FileJson, command: "jq" },
    { id: "import", name: "Import Application", icon: Import, command: "import" }
  ];

  const handleAddButton = () => {
    if (newButton.name && newButton.command) {
      setCustomButtons([...customButtons, {
        id: Date.now().toString(),
        name: newButton.name,
        command: newButton.command
      }]);
      setNewButton({ name: "", command: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteButton = (id: string) => {
    setCustomButtons(customButtons.filter(button => button.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-[#1A1A1A] rounded-lg">
      <div className="flex-1 overflow-y-auto">
        {defaultButtons.map((button) => (
          <button
            key={button.id}
            className={cn(
              "sidebar-button",
              isDeleteMode && "cursor-not-allowed opacity-50"
            )}
            onClick={() => !isDeleteMode && (button.id === "import" ? setIsImportDialogOpen(true) : onCommand(button.command))}
          >
            <button.icon className="w-5 h-5" />
            {button.name}
          </button>
        ))}
        
        {customButtons.map((button) => (
          <button
            key={button.id}
            className={cn(
              "sidebar-button",
              isDeleteMode && "hover:bg-red-500/20 text-red-400"
            )}
            onClick={() => isDeleteMode ? handleDeleteButton(button.id) : onCommand(button.command)}
          >
            <Terminal className="w-5 h-5" />
            {button.name}
            {isDeleteMode && <Trash2 className="w-4 h-4 ml-auto text-red-400" />}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-[#2A2A2A] grid grid-cols-3 gap-2">
        <Button
          variant="ghost"
          className={cn(
            "action-button",
            isDeleteMode && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => setIsAddDialogOpen(true)}
          disabled={isDeleteMode}
        >
          <Plus className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "action-button",
            isDeleteMode && "bg-red-500/20 text-red-400 hover:bg-red-500/30"
          )}
          onClick={() => setIsDeleteMode(!isDeleteMode)}
          disabled={customButtons.length === 0}
        >
          <Trash2 className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "action-button",
            isDeleteMode && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => setIsThemeOpen(true)}
          disabled={isDeleteMode}
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#2A2A2A] text-[#D4D4D4]">
          <DialogHeader>
            <DialogTitle>Add Custom Button</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Button Name</Label>
              <Input
                value={newButton.name}
                onChange={(e) => setNewButton(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter button name..."
                className="bg-[#2A2A2A] border-[#3A3A3A]"
              />
            </div>
            <div className="space-y-2">
              <Label>Command</Label>
              <Textarea
                value={newButton.command}
                onChange={(e) => setNewButton(prev => ({ ...prev, command: e.target.value }))}
                placeholder="Enter command to execute..."
                className="bg-[#2A2A2A] border-[#3A3A3A] min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleAddButton}
              className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#D4D4D4]"
              disabled={!newButton.name || !newButton.command}
            >
              Add Button
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#2A2A2A] text-[#D4D4D4]">
          <DialogHeader>
            <DialogTitle>Import Application</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Application Name</Label>
              <Input
                value={importApp}
                onChange={(e) => setImportApp(e.target.value)}
                placeholder="Enter application name..."
                className="bg-[#2A2A2A] border-[#3A3A3A]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                onCommand(`import ${importApp}`);
                setImportApp("");
                setIsImportDialogOpen(false);
              }}
              className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#D4D4D4]"
              disabled={!importApp}
            >
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ThemeSettingsPanel
        isOpen={isThemeOpen}
        onOpenChange={setIsThemeOpen}
        trigger={null}
      />
    </div>
  );
}