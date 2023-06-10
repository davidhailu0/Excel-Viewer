import { Link } from "react-router-dom"
import { Space, Table} from 'antd';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import type { ColumnsType } from 'antd/es/table';
import TablePropupInterface from "../interfaces/tablePropInterface"
import ItemInterface from "../interfaces/ItemInterface";

export default function TableComponent({tableData,dispatch}:TablePropupInterface){
  const columns: ColumnsType<ItemInterface> = [
    {
      title: 'Item_NO',
      dataIndex: 'Item_NO',
      key: 'Item_NO',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
    },
    {
      title: 'Rate',
      dataIndex: 'Rate',
      key: 'Rate',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (_, record) => (
        <Space size="middle">
          <Link to={"/edit/"+record.id} className={"flex justify-center"}>
          <PencilSquareIcon className="h-6 w-6 text-blue-400"/>
        </Link>
        </Space>
      ),
    },
    {
      title: 'Delete',
      key: 'Delete',
      render: (_, record) => (
        <Space size="middle">
          <button type="button" onClick={()=>dispatch({payload:{popupState:true,id:record.id}})}>
              <TrashIcon className="w-6 h-6 text-red-400"/>
          </button>
        </Space>
      ),
    },
  ];
    return <Table columns={columns} dataSource={tableData} />;
    
}