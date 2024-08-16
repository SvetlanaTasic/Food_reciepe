

import { createContext } from "react";
import { useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);
    const [favoritesList, setFavoritesList] = useState([])

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        try {
            const responsive = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`)
            const data = await responsive.json();

            if (data?.data?.recipes) {
                setRecipeList(data?.data?.recipes)
                setLoading(false)
                setSearchParam("")
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
            setSearchParam("")
        }


    }

    function handleAddToFavorite(getCurrentItem) {
        let cpyFavoritesList = [...favoritesList];
        const index = cpyFavoritesList.findIndex(item => item.id === getCurrentItem.id)

        if (index === -1) {
            cpyFavoritesList.push(getCurrentItem)
        }
        else {
            cpyFavoritesList.splice(index, 1)
        }
        setFavoritesList(cpyFavoritesList)
    }
    return <GlobalContext.Provider
        value={{
            favoritesList,
            handleAddToFavorite,
            searchParam,
            setSearchParam,
            loading,
            recipeList,
            handleSubmit,
            recipeDetailsData,
            setRecipeDetailsData,
            setLoading
        }}>
        {children}
    </GlobalContext.Provider>
}