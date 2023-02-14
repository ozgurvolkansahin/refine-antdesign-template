import { List } from '@pankod/refine-antd';
import { type IResourceComponentsProps } from '@pankod/refine-core';
import React, { useEffect } from 'react';
import { TestApi } from 'service/test.service';

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  // const { tableProps } = useTable({
  //   syncWithLocation: true
  // });

  // const { data: categoryData, isLoading: categoryIsLoading } = useMany({
  //   resource: 'categories',
  //   ids: tableProps?.dataSource?.map((item) => item?.category?.id) ?? [],
  //   queryOptions: {
  //     enabled: !(tableProps?.dataSource == null)
  //   }
  // });

  useEffect(() => {
    void (async () => {
      const tst = await TestApi();
      console.log('tst', tst);
    })();
  }, []);
  return (
    <List>
      {/* <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column
          dataIndex="description"
          title="Description"
          render={(value: string) => <MarkdownField value={`${value.slice(0, 80)}...`} />}
        />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          dataIndex={['category', 'id']}
          title="Category"
          // render={(value) =>
          //   categoryIsLoading ? (
          //     <>Loading...</>
          //   ) : (
          //     categoryData?.data?.find((item) => item.id === value)?.title
          //   )
          // }
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table> */}
    </List>
  );
};
