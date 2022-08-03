import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRepo, IUser, ServerResponse } from "../../modules/models";

export const githubApi = createApi({
  reducerPath: "github/api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
  }),
  
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: `search/users`,
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (respone: ServerResponse<IUser>) => respone.items,
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
      }),
    }),
    createUser: build.mutation<{}, IUser>({
      query: (user: IUser) => ({
        url: `/users`,
        method: `POST`,
        body: user,
      }),
    }),
  }),
});

export const {
  useSearchUsersQuery,
  useLazyGetUserReposQuery,
  useCreateUserMutation,
} = githubApi;
