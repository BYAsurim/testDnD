import s from '../../../app/App.module.scss'
import {ItemType} from "../model/boardsReducer.ts";
import {useSelector} from "react-redux";
import {AppRootState} from "../../../app/store.ts";


type Props = {
    item: ItemType
}
export const Item = ({item,}: Props) => {
    const currentItem = useSelector((state: AppRootState) => state.boards.currentItem)

    const classNames = `${s.item}  ${currentItem?.id === item.id && s.draggable}`
    return (
        <div key={item.id} className={classNames} id={item.id.toString()}>
            {item.name}
        </div>
    );
};

