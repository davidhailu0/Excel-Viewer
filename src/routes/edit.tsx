import { useState } from 'react'
import {Link,LoaderFunctionArgs,useLoaderData,useNavigate} from "react-router-dom"
import ItemInterface from '../interfaces/ItemInterface'
import LoaderInterface from '../interfaces/loaderDataInterface'
import {getItem,updateItem} from "../services/item.services"

export default function EditItem(){
    const {id,data}:LoaderInterface = useLoaderData() as LoaderInterface
    const [item_NO,setItem_NO] = useState(data['Item_NO'])
    const [description,setDescription] = useState(data['Description'])
    const [rate,setRate] = useState(data['Rate'])
    const [quantity,setQuantity] = useState(data['Quantity'])
    const [amount,setAmount] = useState(data['Amount'])
    const navigate = useNavigate()

    const handleSubmit = async(e: { preventDefault: () => void })=>{
      e.preventDefault()
      await updateItem(id,{
        Item_NO: item_NO,
        Description: description,
        Rate: rate,
        Quantity: quantity,
        id: id,
        Amount: amount
      })
      navigate('/items')
    }

    const handleItemNoChange = (e: { target: { value: any } })=>{
        setItem_NO(e.target.value)
    }

    const handleDescriptionChange = (e: { target: { value: any } })=>{
        setDescription(e.target.value)
    }

    const handleRateChange = (e: { target: { value: any } })=>{
        setRate(e.target.value)
    }

    const handleQuantityChange = (e: { target: { value: any } })=>{
        setQuantity(e.target.value)
    }

    const handleAmountChange = (e: { target: { value: any } })=>{
      setAmount(e.target.value)
  }

    return <form onSubmit={handleSubmit}>
    <div className="space-y-12 px-32">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900 mt-5">Item Information</h2>
        <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Item NO
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="Item NO"
                id="Item NO"
                value={item_NO}
                onChange={handleItemNoChange}
                autoComplete="Item NO"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="Description"
                id="Description"
                value={description}
                onChange={handleDescriptionChange}
                autoComplete="Description"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
              Quantity
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="Quantity"
                id="Quantity"
                value={quantity}
                onChange={handleQuantityChange}
                autoComplete="Quantity"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Rate
            </label>
            <div className="mt-2">
              <input
                id="Rate"
                name="Rate"
                type="text"
                value={rate}
                onChange={handleRateChange}
                autoComplete="Rate"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
              Amount
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="Amount"
                id="Amount"
                value={amount}
                onChange={handleAmountChange}
                autoComplete="Amount"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-end gap-x-6 px-32">
      <Link to={"/"} className="text-sm font-semibold leading-6 text-gray-900">
        Cancel
      </Link>
      <button
        type="submit"
        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Update
      </button>
    </div>
  </form>
}


export async function loader({params}:LoaderFunctionArgs){
    const doc:ItemInterface = await getItem(parseInt(params.id as string))
    return {id:doc.id,data:doc}
}