import React, {useEffect, useState} from 'react';
import styles from './BoardPage.module.css';
import {TesterCard} from "../components/TesterCard/TesterCard";
import {TestCard} from "../components/TestCard/TestCard";
import {Button} from "../components/Button/Button";
import {useHttp} from "../hooks/useHttp";

interface ITester {
    id: number;
    name: string;
    tests: number[];
}

interface ITest {
    id: number;
    name: string;
    place: string;
    price: number;
}

export const BoardPage = () => {
    const {request} = useHttp();
    const [testers, setTesters] = useState(new Map<number, ITester>([]));
    const [tests, setTests] = useState(new Map<number, ITest>([]));

    useEffect(() => {
        request('/tester', 'GET')
            .then((res) => {
                setTesters(new Map(res.testers));
            });
        request('/test', 'GET')
            .then((res) => {
                setTests(new Map(res.tests));
            });
    }, []);

    const onChangeTester = async (id: number, name: string, tests: number[]): Promise<void> => {
        try {
            const res = await request('/tester/change', 'PUT', {id, name, tests})
            res.message && alert(res.message);
            !res.message && setTesters(prev => prev.set(id, {id, name, tests}))
        } catch (_) {}
    }

    const onAddTester = async (): Promise<void> => {
        const dummy = {name: 'Имя тестировщика',  tests: []}
        try {
            const res = await request('/tester/add', 'POST', dummy)
            res.message && alert(res.message);
            res.id && setTesters(prev => prev.set(res.id, {id: res.id, ...dummy}))
        } catch (_) {}
    }

    const onAddTest = async (): Promise<void> => {
        const dummy = {
            name: 'Объект тестирования',
            price: 0,
            place: 'Адрес'
        };

        try {
            const res = await request('/test/add', 'POST', dummy)
            res.message && alert(res.message);
            res.id && setTests(prev => prev.set(res.id, {id: res.id, ...dummy}))
        } catch (_) {}
    }

    const onChangeTest = async (id: number, name: string, place: string, price: number): Promise<void> => {
        try {
            const res = await request('/test/change', 'PUT', {id, name, place, price})
            res.message && alert(res.message);
            !res.message && setTests(prev => prev.set(id, {id, name, place, price}))
        } catch (_) {}
    }

    const onDeleteTest = async (id: number): Promise<void> => {
        try {
            const res = await request('/test/delete', 'DELETE', {id})
            res.message && alert(res.message);
            !res.message && setTests(prev => {prev.delete(id); return prev})
        } catch (_) {}
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>Доска управления заявками</div>
            <div className={styles.columns}>
                <div className={styles.right}>
                    <div className={styles.miniHeader}>Тестировщики:</div>
                    {Array.from(testers.values()).map((tester) =>
                        <TesterCard
                            tests={tester.tests}
                            id={tester.id}
                            name={tester.name}
                            onSave={onChangeTester}
                            key={tester.id}
                        />
                    )}
                    <Button text={'Добавить тестировщика'} onClick={onAddTester}/>
                </div>
                <div className={styles.left}>
                    <div className={styles.miniHeader}>Заявки:</div>
                    {Array.from(tests.values()).map((test) =>
                        <TestCard
                            {...test}
                            onSave={onChangeTest}
                            onDelete={onDeleteTest}
                            key={test.id}
                        />
                    )}
                    <Button text={'Добавить заявку'} onClick={onAddTest}/>
                </div>
            </div>
        </div>
    )
}