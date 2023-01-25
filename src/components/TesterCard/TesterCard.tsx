import styles from './TesterCard.module.css';
import change from '../static/change.svg';
import save from '../static/save.png';
import classnames from 'classnames';
import {useCallback, useState, useRef} from "react";

interface ICompanyCardProps {
    id: number;
    name: string;
    tests: number[];
    onSave: (id: number, name: string, billboards: number[]) => void;
}

export const TesterCard = ({id, name, onSave, tests}: ICompanyCardProps) => {
    const [isChange, setIsChange] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const testsRef = useRef<HTMLInputElement | null>(null);

    const onChangeClick = useCallback(() => {
        setIsChange(prev => !prev);
    }, []);

    const onSaveClick = useCallback(() => {
        if (inputRef?.current?.value) {
            onSave(id, inputRef.current.value, testsRef.current?.value.split(' ').map((t) => Number(t)) || []);
            setIsChange(prev => !prev);
            setIsValid(true);
            return;
        }

        setIsValid(false);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.inputs}>
                <input
                    className={classnames(styles.name, {
                        [styles.notValid]: !isValid
                    })}
                    defaultValue={name}
                    ref={inputRef}
                    disabled={!isChange} />
                <input
                    className={styles.name}
                    defaultValue={tests?.join(' ') || ''}
                    placeholder={'Номера заявок через пробел'}
                    ref={testsRef}
                    disabled={!isChange} />
            </div>
            {!isChange && <img
                src={change}
                alt="Изменить имя тестера"
                className={styles.img}
                onClick={onChangeClick}
            />}
            {isChange && <img
                src={save}
                alt="Сохранить имя"
                className={styles.img}
                onClick={onSaveClick}
            />}
        </div>
    )
}