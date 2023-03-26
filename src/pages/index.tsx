import { useState } from "react";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";

export default function Home() {
  const [values, setValues] = useState("");
  const [todos, setTodos] = useState<any[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (values === '') return

    setTodos([...todos, { msg: values, isComplete: false }]);
    setValues("");
  };

  const handleDelete = (e: any, index: number) => {
    e.preventDefault()
    const remainingTodo = [...todos]
    remainingTodo.splice(index, 1)
    setTodos(remainingTodo)
  }

  const handlChecked = (e: any, index: number) => {
    e.preventDefault()
    const check = [...todos]
    if (check[index].isComplete === true) {
      check[index].isComplete = false
    } else {
      check[index].isComplete = true
    }
    setTodos(check)
  }

  return (
    <>
      <div className="w-full h-[100vh] flex items-center justify-center bg-blue-700">
        <div className="w-[600px] h-[500px] bg-blue-800 shadow rounded-md">
          <h1 className="text-center font-semibold text-white text-[25px] my-4">
            Todo Next App
          </h1>
          {/* add todos */}
          <div className="w-full py-1 px-5 flex justify-center">
            <input
              type="text"
              placeholder="add todos..."
              value={values}
              onChange={(e) => setValues(e.target.value)}
              className="p-3 text-[15px] h-9 outline-0 border-0 w-[370px] rounded-md mr-2"
            />
            <button
              className="px-5 bg-blue-500 rounded-md text-white font-semibold"
              onClick={handleSubmit}
            >
              <AiOutlinePlus className="text-white" size={25} />
            </button>
          </div>
          {/* list todos */}
          <div className="mt-2 px-5 flex flex-col items-center h-[370px] overflow-y-scroll">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="flex w-[350px] bg-blue-500 p-3 m-2 rounded-md justify-between items-center"
              >
                <h4 
                  className={`${todo.isComplete && 'line-through decoration-black decoration-2'} 
                          text-white`}
                  onClick={(e) => handlChecked(e, index)}
                >{todo.msg}</h4>
                <button 
                  className="bg-red-600 p-1 rounded-full"
                  onClick={(e) => handleDelete(e, index)}
                >
                  <AiFillDelete className="text-white" size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
