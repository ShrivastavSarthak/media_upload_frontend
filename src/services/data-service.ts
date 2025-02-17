import { apiResponse, responseWrapper } from "@/services/apiServices";
import { baseUrl } from "@/shared/enums/api-enum";
import {
  HttpRequest,
  ResponseInterface,
} from "@/shared/interface/api-interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DataServices = createApi({
  reducerPath: "dataServices",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    postMethod: builder.mutation<ResponseInterface, HttpRequest>({
      query: (httpResponse: HttpRequest) => {
        return apiResponse(
          httpResponse.httpResponse.url,
          httpResponse.httpResponse.reqType,
          httpResponse.httpResponse.headers || "",
          httpResponse?.payload
        );
      },
      transformResponse: (response, meta) => responseWrapper(response, meta),
    }),
    getMethod: builder.query<ResponseInterface, HttpRequest>({
      query: (httpResponse: HttpRequest) => {
        return apiResponse(
          httpResponse.httpResponse.url,
          httpResponse.httpResponse.reqType,
          httpResponse.httpResponse.headers || ""
        );
      },
      transformResponse: (response, meta) => responseWrapper(response, meta),
    }),
  }),
});

export const { usePostMethodMutation, useGetMethodQuery, useLazyGetMethodQuery } =
  DataServices;
