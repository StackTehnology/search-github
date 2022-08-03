import { FC, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAction } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { IRepo } from "../modules/models";

interface CardProps {
    repo: IRepo;
}

const Card: FC<CardProps> = ({ repo }) => {

    const { addFavourite, removeFavourite } = useAction();

    const { favourites } = useAppSelector(state => state.github);

    const [isFav, setIsFav] = useState(favourites?.includes(repo.html_url));

    const addToFavourite = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addFavourite(repo.html_url);
        setIsFav(true);
    }
    const removeFromFavourite = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        removeFavourite(repo.html_url)
    }
    return (
        <div className="py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
            <a href={repo.html_url} target="_blank">
                <h2 className="text-lg font-bold">{repo.full_name}</h2>
                <p className="text-sm">
                    Forks: <span className="font-bold">{repo.forks}</span>
                    Watchers: <span className="font-bold">{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin">{repo?.description}</p>
                {!isFav ? <button className="py-2 px-4 bg-yellow-400 mr-2 rounded hover:shadow-md transition-all" onClick={addToFavourite}>Add</button> :
                    <button className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all" onClick={removeFromFavourite}>Remove</button>
                }
            </a>
        </div>
    );
};

export default Card;
