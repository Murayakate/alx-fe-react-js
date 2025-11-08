// First, we import createContext from React - this is like getting a special box-making tool
import { createContext } from 'react';

// createContext() creates our magical box (we call it context)
// This box will hold our user data and make it available anywhere in our app!
export const UserContext = createContext();

// That's all for this file! We've created our magical box (UserContext)
// We'll fill it with data in App.jsx and use it in other components