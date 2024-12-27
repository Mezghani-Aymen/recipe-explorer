interface Recipe {
    id: string;
    title: string;
    description: string;
    image: string;
    dishType: string;
    dietaryLabels: string[];
    ingredients: string[];
    instructions: string[];
    rates?: number;
    level?: string;
}

interface RecipeProps {
    recipes: Recipe[];
}