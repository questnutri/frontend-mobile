// src/context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dailyMealRecord: {
    completedToday: any[];
    checkingDay: number;
  };
  details: {
    healthState: {
      diabetic: boolean;
      allergies: string[];
      chronicDiseases: string[];
      currentMedications: string[];
    };
    rg: string;
    cpf: string;
    phone: string;
    birth: string;
    height: number;
    gender: string;
    lastWeight: number | null;
    routine: string;
    goals: string;
    foodPreferences: string;
    weights: any[];
  };
  nutri: string;
  activeDiet: any;
  diets: {
    name: string;
    _id: string;
    meals: {
      name: string;
      hour: string;
      daysOfWeek: string[];
      _id: string;
      foods: any[];
    }[];
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type UserContextType = {
  user: UserData | null;
  setUser: (userData: UserData) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<UserData | null>(null);

  const setUser = (userData: UserData) => {
    setUserState(userData);
  };

  const clearUser = () => {
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
