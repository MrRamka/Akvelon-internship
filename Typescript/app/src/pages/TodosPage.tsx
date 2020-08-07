import React, {useEffect, useState} from "react";
import {TodoForm} from "../components/TodoForm";
import {TodoList} from "../components/TodoList";
import {ITodo} from "../interfaces";

export const TodosPage: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([])

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
        setTodos(saved)
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addHandler = (title: string): void => {
        const newTodo: ITodo = {
            title: title,
            id: Date.now(),
            completed: false
        }
        // setTodos([newTodo, ...todos])
        setTodos(prevState => [newTodo, ...prevState])
    }

    const toggleHandler = (id: number): void => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        )

    }
    const removeHandler = (id: number) => {

        const shouldRemove = window.confirm('Delete todo')
        if (shouldRemove) {
            setTodos(prevState => prevState.filter(todo => todo.id !== id))
        }
    }

    return (
        <React.Fragment>
            <TodoForm onAdd={addHandler}/>

            <TodoList
                todos={todos}
                onToggle={toggleHandler}
                onRemove={removeHandler}
            />

        </React.Fragment>
    )

}