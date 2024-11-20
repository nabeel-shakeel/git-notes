import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../redux/store';
import { Gist, SingleGist, StarGistResponse } from './gists.types';

export const gistsApi = createApi({
  reducerPath: 'gistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
    validateStatus: (response) => {
      return (
        response.status === 204 ||
        response.status === 404 ||
        (response.status >= 200 && response.status < 300)
      );
    },
  }),
  tagTypes: ['single-gist', 'star-status'],
  endpoints: (builder) => ({
    getPublicGists: builder.query<Gist[], { page: number; per_page: number }>({
      query: ({ page, per_page }) =>
        `/gists/public?page=${page}&per_page=${per_page}`,
    }),
    getSingleGist: builder.query<SingleGist, string>({
      query: (gistId) => `/gists/${gistId}`,
      providesTags: (_result, _error, gistId) => [
        { type: 'single-gist', id: gistId },
      ],
    }),
    getGistContent: builder.query<string, string>({
      query: (rawUrl) => ({
        url: rawUrl,
        responseHandler: (response) => response.text(),
      }),
    }),
    starGist: builder.mutation<StarGistResponse, string>({
      query: (gistId) => ({
        url: `/gists/${gistId}/star`,
        method: 'PUT',
      }),
      invalidatesTags: (_result, _error, gistId) => [
        { type: 'star-status', id: gistId },
      ],
    }),
    unstarGist: builder.mutation<void, string>({
      query: (gistId) => ({
        url: `/gists/${gistId}/star`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, gistId) => [
        { type: 'star-status', id: gistId },
      ],
    }),
    forkGist: builder.mutation<void, string>({
      query: (gistId) => ({
        url: `/gists/${gistId}/forks`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, gistId) => [
        { type: 'single-gist', id: gistId },
      ],
    }),
    checkIfStarred: builder.query<boolean, string>({
      query: (gistId) => ({
        url: `/gists/${gistId}/star`,
        method: 'GET',
      }),
      providesTags: (_result, _error, gistId) => [
        { type: 'star-status', id: gistId },
      ],
      transformResponse: (_response, meta) => {
        console.log('Transform response: ', meta);
        if (meta?.response?.status === 204) {
          return true; // Gist is starred
        }
        if (meta?.response?.status === 404) {
          return false; // Gist is not starred
        }
        throw new Error('Unexpected error'); // Handle unexpected cases
      },
    }),
  }),
});

export const {
  useGetPublicGistsQuery,
  useGetSingleGistQuery,
  useGetGistContentQuery,
  useStarGistMutation,
  useUnstarGistMutation,
  useForkGistMutation,
  useCheckIfStarredQuery,
} = gistsApi;
