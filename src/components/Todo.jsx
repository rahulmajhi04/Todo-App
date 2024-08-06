import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import './Todo.css'
import { useState } from 'react'
const todoKey = "ReactTodo";
const setLocalStorageItems = () => {
    const localTodo = localStorage.getItem(todoKey);
    if (!localTodo) {
        return [];
    }
    return JSON.parse(localTodo);
}

const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [task, setTask] = useState(() => setLocalStorageItems());
    const [dateTime, setDateTime] = useState("");

    // useEffect(()=> {
    //     document.title = inputValue;
    // },[inputValue])

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!inputValue) return;
        console.log("Rahul");

        if (task.includes(inputValue)) return;

        setTask((prev) => [ inputValue,...prev]);

    }

    //Locale Storage Implement
    localStorage.setItem(todoKey, JSON.stringify(task));

    //ToDo Date and Time
    useEffect(() => {

        const interval = setInterval(() => {
            const date = new Date();
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            setDateTime(`Date: ${formattedDate} & Time:${formattedTime}`)
        }, 1000);

        return (() => clearInterval(interval));

    }, [ dateTime])

    //ToDo HandleDeleteElement Functionality
    const handleClearElement = (currTask) => {
        // task.splice(task.indexOf(currTask), 1);
        // setTask(task);

        const updatedTask = task.filter((Elem) => Elem != currTask);
        setTask(updatedTask);
    }

    //Clear all the items
    const handleClear = () => {
        setTask([]);
    }
    return (
        <>
            <div className="todoContainer">
                <header>
                    <h1>Todo App</h1>
                    <h2>{dateTime}</h2>
                </header>
                <section >
                    <form className="form" onSubmit={handleFormSubmit}>
                        <div>
                            <input
                                type="text"
                                className='inputBox'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                        <button className='clear add'>Add Task</button>
                    </form>
                </section>
                <div>
                    <ul>
                        {
                            task.map((element, index) => {

                                return (<li key={index}>
                                    <span>{element}</span>
                                    <input type="text" />
                                    <button
                                        onClick={() => handleClearElement(element)}
                                        className='deleteBtn'
                                    > <MdDelete /> </button>
                                </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <button
                    className='clear'
                    onClick={handleClear}
                >Clear All</button>
            </div>
        </>
    )
}

export default Todo;