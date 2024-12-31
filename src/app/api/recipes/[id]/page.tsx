import Header from '@/app/component/header/page';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        id: string;
    };
}

async function getRecipe(id: string): Promise<Recipe> {
    const res = await fetch(`http://localhost:3001/recipes/${id}`);
    if (!res.ok) {
        notFound();
    }
    const recipe: Recipe = await res.json();
    return recipe;
}

export async function generateStaticParams(): Promise<PageProps[]> {
    const res = await fetch('http://localhost:3001/recipes');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const recipes: Recipe[] = await res.json();
    return recipes.map((item) => ({ params: { id: String(item.id) } })); // Ensure params is structured correctly
}

export default async function Page({ params }: PageProps) {
    const recipe = await getRecipe(params.id);
    console.log(recipe);

    return (
        <>
            <Header />
            <div className="p-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-4">Recipe Details</h1>
                <Link href={'/api/recipes'} className="text-xl px-6 py-2 rounded text-primary border-primary border hover:bg-primary hover:text-black mb-4">
                    <span>Return</span>
                </Link>
            </div>
            <div className="max-w-4xl mx-auto mb-5  bg-white bg-opacity-5 backdrop-blur-xl text-white rounded-lg overflow-hidden shadow-lg flex flex-col">
                <div className="flex flex-col sm:flex-row text-center gap-3   mx-3 items-center py-3">
                    {/* Image Part */}
                    <div className='relative w-96 h-56 bg-slate-200 rounded-xl'>
                        <img src={recipe.image} alt={recipe.title} className='object-cover w-full h-full  rounded-xl ' />
                    </div>
                    <div className="p-4 flex flex-col justify-start gap-5 text-start w-full">
                        <div className="text-2xl flex flex-col sm:flex-row justify-between items-center mt-3 mb-2 sm:mb-0">
                            <h1 className="font-bold">{recipe.title}</h1>
                            <span className="text-secondry">{recipe.dishType}</span>
                        </div>
                        <div>
                            {recipe.dietaryLabels.map((label, index) => (
                                <div key={index} className="text-center w-auto border border-primary text-primary max-w-24 inline-block px-2 py-1 rounded-md">
                                    {label}
                                </div>
                            ))}
                        </div>
                        <p className="mt-2 text-gray-50">{recipe.description}</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row text-start gap-3 mx-3 items-start py-3">
                    <div className="flex-1">
                        <h2 className="font-bold text-2xl text-center text-primary  mb-2">Ingredients:</h2>
                        <ul className="">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="flex items-center mb-2">
                                    <span className="w-4 h-4 border-2 border-secondry rounded-full flex items-center justify-center mr-2"></span>
                                    <span>{ingredient}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h2 className="font-bold text-2xl text-center text-primary mb-2">Instructions:</h2>
                        <ol className="list-none custom-list-ordred ">
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index} className='my-2'>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}