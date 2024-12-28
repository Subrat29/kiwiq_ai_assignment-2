import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, FileText } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome</CardTitle>
          <CardDescription className="text-lg">
            Choose a tool to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button 
            variant="default" 
            className="w-full h-16 text-lg justify-between group"
            asChild
          >
            <Link to="/workflow-builder">
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5" />
                <span>Workflow Builder</span>
              </div>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button 
            variant="default"
            className="w-full h-16 text-lg justify-between group"
            asChild
          >
            <Link to="/report-generator">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>Report Generator</span>
              </div>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;