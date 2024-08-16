import { GlobalContext } from "../../components/context";
import RecipeItem from "../recipeItem";
import { useContext } from "react";



export default function Favorites() {

    const { favoritesList, loading } = useContext(GlobalContext)

    if (loading) return <div>Loading...Please wait.</div>
    return <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {
            favoritesList && favoritesList.length > 0
                ? favoritesList.map(item => <RecipeItem item={item} />)
                : <p className="lg:text-4xl text-xl text-center text-black font-extrabold"> Nothing is added in favorites. </p>
        }
    </div>

}