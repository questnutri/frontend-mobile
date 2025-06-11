// types/Meal.ts

export type MealType = {
    _id: string;
    name: string;
    hour: string;
    daysOfWeek: string[]; // ex: ["Monday", "Tuesday"]
    foods: any[]; // se quiser detalhar os alimentos, você pode criar um tipo FoodType depois
};
