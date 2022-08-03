import { FC, useEffect, useState, MouseEvent } from "react";
import { useDebounce } from "../hooks/debounce";
import { useSearchUsersQuery, useLazyGetUserReposQuery } from "../store/github/github.api";
import { IUser, IRepo } from "../modules/models";
import Card from '../components/Card';

const HomePage: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [dropDown, setDropDown] = useState<boolean>(false);


  const [fetchRepos, { data: repos, isLoading: areRepoLoading, isError: areErrorLoading }] = useLazyGetUserReposQuery();

  const clickHandler = (name: string) => {
    fetchRepos(name);
    setDropDown(false);
  };

  const debounced = useDebounce(search);
  const {
    isLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  useEffect(() => {
    setDropDown(debounced.length > 3 && users?.length! > 0);
  }, [debounced, users]);

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong.....</p>
      )}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropDown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {users?.map((user: IUser) => (
              <li
                key={user.id}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                onClick={e => clickHandler(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="contaier">
          {areRepoLoading && <p className="text-center">Repos are loading...</p>}
          {repos && repos?.map((repo: IRepo, key: number) => <Card repo={repo} key={repo.id} />)}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
