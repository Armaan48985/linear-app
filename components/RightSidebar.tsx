"use client";
import React from "react";
import { MdCollections } from "react-icons/md";
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RightSidebar = () => {
  return (
    <div className="bg-darkergrey border-l border-[--gray-2400] min-h-[93vh] pl-6 m-0">
      <button className="bg-grey p-2 py-1 rounded-sm text-sm text-gray-200 mt-7">
        All issues
      </button>

      <div className="flex py-8">
        <span className="text-green-600 bg-gray-800 rounded-full p-1 mr-2 text-lg">
          <MdCollections />
        </span>
        <h1 className="text-lg">Error 404</h1>
      </div>

      <Separator className="bg-[--gray-2400] w-[28rem] h-[1px] mt-8 mr-10 p-0 ml-[-1.5rem]" />

      <div>
        <Tabs defaultValue="account" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3 bg-grey p-0">
            <TabsTrigger value="account">Assignees</TabsTrigger>
            
            <TabsTrigger value="password">Labels</TabsTrigger>
           
            <TabsTrigger value="passwordd">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader></CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="passwordd">
            <Card>
              <CardHeader></CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current passwords</Label>
                  <Input id="current" type="password" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RightSidebar;
