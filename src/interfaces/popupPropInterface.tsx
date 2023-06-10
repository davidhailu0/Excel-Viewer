export interface stateInterface{
    id:number
    popupState:boolean
}

interface PopupPropInterface{
    state:stateInterface
    dispatch:React.Dispatch<any>
}

export default PopupPropInterface