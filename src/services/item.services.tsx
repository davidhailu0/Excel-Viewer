import ItemInterface from "../interfaces/ItemInterface"

export async function allItems():Promise<ItemInterface[]>{
    const resp = await fetch("http://localhost:5000/")
    const jsonConverted = await resp.json()
    return jsonConverted.data as ItemInterface[]
}

export async function getItem(id:number):Promise<ItemInterface>{
    const resp = await fetch(`http://localhost:5000/${id}`)
    const jsonConverted = await resp.json()
    return jsonConverted.data as ItemInterface
}

export async function addItems(items:ItemInterface[]):Promise<ItemInterface[]>{
    const newlyAddedItems = await fetch("http://localhost:5000/create",{method:"POST",body:JSON.stringify(items),headers:{
        "Content-Type":"application/json"
    }})
    const jsonConverted = await newlyAddedItems.json()
    return jsonConverted.data as ItemInterface[]
}

export async function updateItem (id:number,updatedItem:ItemInterface):Promise<ItemInterface>{
    const newUpdatedItem = await fetch(`http://localhost:5000/${id}`,{method:"PUT",body:JSON.stringify(updatedItem),headers:{
        "Content-Type":"application/json"
    }})
    const jsonConverted = await newUpdatedItem.json()
    return jsonConverted.data as ItemInterface
}

export async function deleteItem (id:number):Promise<void>{
     await fetch(`http://localhost:5000/${id}`,{method:"DELETE"})
}
