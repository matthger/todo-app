import { useEffect, useState } from "react";
import { getTodos, createTodo, deleteTodo, Todo } from "./api/todoApi";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleAdd = async () => {
    const newTodo = await createTodo({ title, status: "open" });
    setTodos([newTodo, ...todos]);
    setTitle("");
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">To-Do Liste</h1>

        <div className="flex gap-2 mb-4">
          <input
              className="border rounded p-2 flex-1"
              placeholder="Neues To-Do..."
              value={title}
              onChange={e => setTitle(e.target.value)}
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 rounded">
            Hinzufügen
          </button>
        </div>

        <ul>
          {todos.map(todo => (
              <li key={todo.id} className="border-b py-2 flex justify-between items-center">
                <span>{todo.title}</span>
                <button onClick={() => handleDelete(todo.id!)} className="text-red-500">✕</button>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
