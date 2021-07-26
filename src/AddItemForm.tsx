import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo( (props:AddItemFormPropsType) =>  {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null)

    const changeTitle = ((e: ChangeEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null);
        }
        setTitle(e.currentTarget.value)

    })

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    const addItem = () => {
        const trimmedTitle: string = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError('Title is required!')
        }
        setTitle('')

    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                label = {"Title"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                error={!!error}
                helperText={error}
            />
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={changeTitle}*/}
            {/*    onKeyPress={onKeyPressAddItem}*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*/>*/}
            {/*<button onClick={addItem}>ADD</button>*/}
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={"error-message"}>{error} </div>}*/}
        </div>
    )
})

export default AddItemForm;