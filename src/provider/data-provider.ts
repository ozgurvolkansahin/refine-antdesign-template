import { type DataProvider } from '@pankod/refine-core';
import { type AxiosInstance } from 'axios';
import axiosInstance from 'http/axios';
import { stringify } from 'query-string';

export const dataProvider = (
  httpClient: AxiosInstance = axiosInstance
): Omit<Required<DataProvider>, 'createMany' | 'updateMany' | 'deleteMany'> => ({
  getList: async ({ hasPagination = false, pagination = { current: 1, pageSize: 10 } }) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};

    const query: {
      _start?: number;
      _end?: number;
      _sort?: string;
      _order?: string;
    } = hasPagination
      ? {
          _start: (current - 1) * pageSize,
          _end: current * pageSize
        }
      : {};

    const { data } = await httpClient.get(`?${stringify(query)}`);

    return {
      data,
      total: data.length
    };
  },

  getMany: async ({ resource, ids }) => {
    const { data } = await httpClient.get(`/${resource}?${stringify({ id: ids })}`);

    return {
      data
    };
  },

  create: async ({ resource, variables }) => {
    const url = `/${resource}`;

    const { data } = await httpClient.post(url, variables);

    return {
      data
    };
  },

  update: async ({ resource, id, variables }) => {
    const url = `/${resource}/${id}`;

    const { data } = await httpClient.patch(url, variables);

    return {
      data
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `/${resource}/${id}`;

    const { data } = await httpClient.get(url);

    return {
      data
    };
  },

  deleteOne: async ({ resource, id, variables }) => {
    const url = `/${resource}/${id}`;

    const { data } = await httpClient.delete(url, {
      data: variables
    });

    return {
      data
    };
  },

  getApiUrl: () => {
    return httpClient.defaults.baseURL ?? '';
  },

  custom: async ({ url, method, payload }) => {
    let axiosResponse;
    switch (method) {
      case 'put':
      case 'post':
      case 'patch':
        axiosResponse = await httpClient[method](url, payload);
        break;
      case 'delete':
        axiosResponse = await httpClient.delete(url, {
          data: payload
        });
        break;
      default:
        axiosResponse = await httpClient.get(url);
        break;
    }
    const { data } = axiosResponse;

    return await Promise.resolve({ data });
  }
});
