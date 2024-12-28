import Header from '@/app/component/header/page';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation'

async function getRecipe(id: string): Promise<Recipe> {
    const res = await fetch(`http://localhost:3001/recipes/${id}`,
        { cache: 'force-cache', });
    if (!res.ok) { notFound(); }
    const recipe: Recipe = await res.json();
    return recipe;
}

export async function generateStaticParams() {
    const res = await fetch('http://localhost:3001/recipes',

        { cache: 'force-cache', });

    if (!res.ok) { throw new Error("Failed to fetch data"); }

    const recipes: Recipe[] = await res.json();

    return recipes.map((item) => ({ id: String(item.id), }));
}

export default async function Page({ params }: { params: { id: string } }) {
    const recipe = await getRecipe(params.id);
    console.log(recipe);

    return (
        <>
            <Header />
            <div className="p-6 flex justify-between items-center flex-col sm:flex-row sm:gap-0 gap-5">
                <h1 className="text-3xl font-bold">Recipe Details</h1>
                <Link href={'/api/recipes'} className="text-xl px-6 py-2 rounded text-primary border-primary border hover:bg-primary hover:text-black">
                    <span>Return</span>
                </Link>
            </div>
            <div className='  max-w-sm  mx-auto border-2 border-secondry rounded-lg overflow-hidden shadow-lg'>

                <div className="relative">
                    <Image width={400} height={300} alt={recipe.title} src={recipe.image} />
                    <div className='absolute top-3 right-3'>
                        <div
                            className="w-10 h-10 text-black bg-white rounded-full flex items-center justify-center cursor-pointer"
                        >
                            <span>Edit</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 flex flex-col gap-3">
                    <div className='flex justify-between text-2xl items-center'>
                        <h1 className="font-bold">{recipe.title}</h1>
                        <span className='text-secondry'>
                            {recipe.dishType}
                        </span>
                    </div>
                    <div className='flex flex-wrap gap-3'>
                        {recipe.dietaryLabels.map((label, index) => (
                            <div key={index} className="text-center w-auto border border-primary text-primary  max-w-24 inline-block px-2 py-1 rounded-md">
                                {label}
                            </div>
                        ))}
                    </div>

                    <p className="mt-2 text-gray-300">{recipe.description}</p>
                </div>

                <div className="flex flex-col gap-4 p-4 border-t border-gray-200">
                    <div>
                        <h2 className="font-semibold text-xl mb-1 text-primary">Ingredients</h2>
                        <ul className="list-none flex flex-col gap-1 ">
                            {recipe.ingredients.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <span className="w-3 h-3 rounded-full border-2 border-secondry mr-2"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-xl mb-1 text-primary">Instructions</h2>
                        <ol className="custom-list list-decimal  ">
                            {recipe.instructions.map((item, index) => (
                                <li key={index} className=" ">
                                    {item}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

        </>
    );
}