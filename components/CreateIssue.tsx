'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from './ui/button'
import { Input } from './ui/input'

const CreateIssue = ({trigger, createIssue}:any) => {

    const [issueTitle, setIssueTitle] = useState('');

    const handleSaveIssue = () => {
      if (issueTitle.trim() !== '') {
        createIssue(issueTitle);
        setIssueTitle('');
      }
    };
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className='m-0 p-0'>{trigger}</Button>
        </DialogTrigger>
        <DialogContent className="min-w-[50rem] bg-grey border-none outline-none">
          <DialogHeader>
            <DialogTitle className='text-md'>New Issue</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="name"
                placeholder="Issue Title"
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
                className="col-span-3 border-none bg-transparent outline-none placeholder:text-2xl placeholder:font-bold placeholder:text-gray-500 text-lg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input id="description" placeholder='Add description...' className="col-span-3 border-none outline-none placeholder:text-lg placeholder:font-bold placeholder:text-gray-500 text-sm" />
            </div>
  
            <div className='flex'>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Backlog" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="default">Todo</Button>
              <Button variant="default">Todo</Button>
              <Button variant="default">Todo</Button>
              <Button variant="default">Todo</Button>
              <Button variant="default">Todo</Button>
            </div>
          </div>
          <DialogFooter className='border-t-2 border-gray-600'>
            <Button type="submit" className='bg-lightgrey hover:bg-lightgrey mt-5' onClick={handleSaveIssue}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}

export default CreateIssue