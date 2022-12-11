import { useState } from 'react';
import { IItem } from './index';

interface IEditItem {
    id?: number;
    name: string;
    initialName: string;
}

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [editItem, setEditItem]: [IEditItem, any] = useState({
        id: undefined,
        name: '',
        initialName: '',
    });

    return (
        <div>
            {props.initialData
                .sort((x, y) => {
                    if (props.sorting === 'ASC') {
                        return x.id - y.id;
                    } else {
                        return y.id - x.id;
                    }
                })
                .map((item) => {
                    if (item.id === editItem.id) {
                        return (
                            <input
                                key={item.id}
                                value={editItem.name}
                                onKeyDown={(event) => {
                                    switch (event.key) {
                                        case 'Enter':
                                            item.name = editItem.name;
                                            setEditItem({
                                                id: undefined,
                                                name: '',
                                                initialName: '',
                                            });
                                            break;

                                        case 'Escape':
                                            setEditItem({
                                                id: undefined,
                                                name: '',
                                                initialName: '',
                                            });
                                            break;
                                    }
                                }}
                                onChange={(event) => {
                                    setEditItem({
                                        ...editItem,
                                        name: event.target.value,
                                    });
                                }}
                            />
                        );
                    } else {
                        return (
                            <div
                                key={item.id}
                                onClick={() =>
                                    setEditItem({
                                        id: item.id,
                                        name: item.name,
                                        initialName: item.name,
                                    })
                                }
                            >
                                {item.name}
                            </div>
                        );
                    }
                })}
        </div>
    );
}
