import { type ResourceProps } from '@pankod/refine-core';
import { AntdInferencer } from '@pankod/refine-inferencer/antd';
import { ProductList } from 'components/common/list';

export const Routes: ResourceProps[] = [
  {
    name: 'posts',
    list: AntdInferencer,
    edit: AntdInferencer,
    show: AntdInferencer,
    create: AntdInferencer,
    canDelete: true
  },
  {
    name: 'products',
    list: ProductList,
    edit: AntdInferencer,
    show: AntdInferencer,
    create: AntdInferencer
  }
];
