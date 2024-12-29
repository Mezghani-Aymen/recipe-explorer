import Header from '@/app/component/header/page';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getRecipe(id: string): Promise<Recipe> {
    const res = await fetch(`http://localhost:3001/recipes/${id}` );
    if (!res.ok) { notFound(); }
    const recipe: Recipe = await res.json();
    return recipe;
}

export async function generateStaticParams() {
    const res = await fetch('http://localhost:3001/recipes' );
    if (!res.ok) { throw new Error("Failed to fetch data"); }
    const recipes: Recipe[] = await res.json();
    return recipes.map((item) => ({ id: String(item.id) }));
}

export default async function Page({ params }: { params: { id: string } }) {
    const recipe = await getRecipe(params.id);
    console.log(recipe);

    return (
        <>
            <Header />
            <div className="p-6 flex justify-between  items-center">
                <h1 className="text-3xl font-bold mb-4">Recipe Details</h1>
                <Link href={'/api/recipes'} className="text-xl px-6 py-2 rounded text-primary border-primary border hover:bg-primary hover:text-black mb-4">
                    <span>Return</span>
                </Link>
            </div>
            <div className='max-w-4xl mx-auto bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg flex flex-col'>
                <div className='flex flex-col sm:flex-row text-center gap-3'>
                    {/* Image Part */}
                    <div className="relative">
                        <Image width={400} height={400} alt={recipe.title} src={recipe.image}  />
                        {/* <div className='absolute top-3 right-3'>
                            <div className="w-10 h-10 text-black bg-white rounded-full flex items-center justify-center cursor-pointer">
                                <span>Edit</span>
                            </div>
                        </div> */}
                    </div>
                    <div className="p-4 flex flex-col justify-start gap-5 text-start  w-full">
                        <div className='text-2xl flex flex-col sm:flex-row  justify-between  items-center mt-4'>
                            <h1 className=" font-bold">{recipe.title}</h1>
                            <span className='text-secondry'>{recipe.dishType}</span>
                        </div>
                        <div>
                            {recipe.dietaryLabels.map((label, index) => (
                                <div key={index} className="text-center w-auto border border-primary text-primary  max-w-24 inline-block px-2 py-1 rounded-md">
                                    {label}
                                </div>
                            ))}
                        </div>
                        <p className="mt-2 text-gray-300">{recipe.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
}