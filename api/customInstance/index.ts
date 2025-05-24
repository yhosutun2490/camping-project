import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios'

export interface CustomMutatorConfig<TBody = unknown>
  extends AxiosRequestConfig {
  url: string
  method: Method
  body?: TBody                 // ← 由泛型決定
  query?: Record<string, unknown>
  headers?: Record<string, string>
  options?: AxiosRequestConfig
}

export const customInstance = <
  TResponse,
  TBody = unknown
>(
  config: CustomMutatorConfig<TBody>
): Promise<AxiosResponse<TResponse>> => {
  const { url, method, body, query, headers, options, ...rest } = config
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000/api/v1",
    withCredentials: true,
  })

  return instance.request<TResponse>({
    url,
    method,
    data: body,
    params: query,
    headers,
    ...rest,
    ...options,
  })
}