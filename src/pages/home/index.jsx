import { useContext } from "react";
import { GlobalContext } from "../../components/context";
import RecipeItem from "../recipeItem";

export default function Home({ item }) {
    const { recipeList, loading } = useContext(GlobalContext)

    if (loading) return <div>Loading...Please wait.</div>
    return <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {
            recipeList && recipeList.length > 0
                ? recipeList.map(item => <RecipeItem item={item} />)
                : <p className="lg:text-4xl text-xl text-center text-black font-extrabold"> Nothing to show. Please try something.</p>
        }
    </div>
}