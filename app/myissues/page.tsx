'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setIsOpened, setValue } from '../GlobalRedux/Slice';
import { RootState } from '../GlobalRedux/reducers';

const page = () => {

    const dispatch = useDispatch();
    const { value, isOpened } = useSelector((state: RootState) => state.app);

    const handleSetValue = (newValue: string) => {
        dispatch(setValue(newValue));
      };
    
      const handleSetIsOpened = (newIsOpened: boolean) => {
        dispatch(setIsOpened(newIsOpened));
      };

    return (
        <div className='flex flex-col gap-4'>
            <h1>Issue Page</h1>
            <p>{value} here is it</p>
            <p>{isOpened ? 'true' : 'false'}</p>

            <button onClick={() => handleSetValue('new value')}>Set Value</button>
            <button onClick={() => handleSetIsOpened(!isOpened)}>Toggle Is Opened</button>
        </div>
  )
}

export default page