"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Header from '@/app/component/header/page';

const Recipe: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:3001/recipes');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                setError('Failed to fetch recipes');
                console.error('Failed to fetch recipes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.dishType.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow p-4">
                <div className="flex justify-between items-center mb-4 flex-col sm:flex-row gap-5">
                    <h2 className="text-2xl">List of Recipes</h2>
                    <div className="flex items-center flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-300 rounded-md p-2 mr-2 dark:bg-transparent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Loading/Error State */}
                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}

                {/* Grid System */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredRecipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="border border-secondry rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg relative flex flex-col justify-center items-center gap-4"
                        >
                            <Image width={300} height={300} alt={recipe.title} src={recipe.image} />
                            <h3 className="font-semibold text-white">{recipe.title}</h3>
                            <div className="rounded-lg p-4 absolute inset-0 bg-black bg-opacity-80 backdrop-blur-lg flex flex-col items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity text-center gap-4">
                                <h3 className="font-bold">{recipe.description}</h3>
                                <Link href={`recipes/${recipe.id}`} className="text-xl px-6 py-2 rounded text-secondry border-secondry border hover:bg-secondry hover:text-customText">
                                    Get the recipe
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="p-4 text-center text-secondry">
                <p>Copyright &copy; Mezghani Mohamed Aymen - 2024</p>
            </footer>
        </div>
    );
};

export default Recipe;