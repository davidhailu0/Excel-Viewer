import { ChangeEvent, useReducer} from "react"
import { useLoaderData } from "react-router-dom"
import * as xlsx from "xlsx"
import { useNavigate } from "react-router-dom"
import { addItems, allItems } from "../services/item.services"
import Table from "../components/table"
import Popup from "../components/popup"
import ItemInterface from "../interfaces/ItemInterface"
import { stateInterface } from "../interfaces/popupPropInterface"
import ExcelFormat from "../interfaces/excelFileFormat"

function reducer(state:stateInterface,action: { payload: any }){
  return {...state,...action.payload}
}

export default function ListOfItems(){
    const itemListData = useLoaderData() as ItemInterface[] 
    const navigate = useNavigate()
    const [state,dispatch] = useReducer(reducer,{popupState:false,id:null})
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>)=>{
      e.preventDefault();
    if (e.target?.files) {
        const reader = new FileReader();
        reader.onload = async(e:ProgressEvent<FileReader>) => {
            const data = e.target?.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet) as ExcelFormat[];
            const itemNamed = json.map((it)=>{
              let newItem:ItemInterface = {Description:it.__EMPTY_1};
              if(it.__EMPTY){
                newItem["Item_NO"] = it.__EMPTY.toString()
              }
              if(it.__EMPTY_4&&Boolean(parseFloat(it.__EMPTY_4.toString()))){
                newItem["Rate"] = it.__EMPTY_4
              }
              if(it.__EMPTY_3&&Boolean(parseFloat(it.__EMPTY_3.toString()))){
                newItem["Quantity"] = it.__EMPTY_3
              }
              if(it.__EMPTY_5&&Boolean(parseFloat(it.__EMPTY_5.toString()))){
                newItem["Amount"] = it.__EMPTY_5
              }
              return newItem;
            })
            itemNamed.shift()
            await addItems(itemNamed)
            navigate("/items")
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
  }
    return (
        <>
        <div className="mt-10 flex items-center justify-end gap-x-6 px-10">
              <label htmlFor="upload" className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Upload File</label>
                  <input
                    type="file"
                    name="upload"
                    id="upload"
                    onChange={handleFileUpload}
                    hidden
                    className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  />
        </div>
       <Table tableData={itemListData} dispatch={dispatch}/>
       <Popup state={state} dispatch={dispatch}/>
    </>
    )
}

export async function loader(){
  const itemsData = await allItems() 
  return itemsData
}