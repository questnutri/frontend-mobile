import React, { createContext, useContext, useState, ReactNode } from "react";

interface NutritionalInfo {
  energy: string;
  carbs: string;
  protein: string;
  totalFat: string;
  saturatedFat: string;
  fiber: string;
  sodium: string;
}

interface FoodData {
  foodName: string;
  calories: number;
  units: number;
  observation: string;
  nutritionalInfo: NutritionalInfo;
}

interface FoodModalContextType {
  isVisible: boolean;
  foodData: FoodData | null;
  openModal: (foodData: FoodData) => void;
  closeModal: () => void;
}

const FoodModalContext = createContext<FoodModalContextType | undefined>(
  undefined
);

interface FoodModalProviderProps {
  children: ReactNode;
}

export const FoodModalProvider: React.FC<FoodModalProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [foodData, setFoodData] = useState<FoodData | null>(null);

  const openModal = (data: FoodData) => {
    setFoodData(data);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setFoodData(null);
  };

  return (
    <FoodModalContext.Provider
      value={{ isVisible, foodData, openModal, closeModal }}
    >
      {children}
    </FoodModalContext.Provider>
  );
};

export const useFoodModal = () => {
  const context = useContext(FoodModalContext);
  if (context === undefined) {
    throw new Error("useFoodModal must be used within a FoodModalProvider");
  }
  return context;
};
