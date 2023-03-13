import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import * as cognito from '../cognito'
import {useNavigate} from 'react-router-dom'





export default function TodoHomepage()  {
  const navigate = useNavigate();

  const [user, setUser] = useState(cognito.getCurrentUser())
  const [todos, setTodos] = useState([])
  const [userInput, setUserInput] = useState("")
  const [editInput, setEditInput] = useState("")
  const [idInput, setIdInput] = useState("")


  useEffect( () => {
    (async () => {
        const token = await cognito.getAccessToken();
        console.log(token);
        axios.get(("https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todo"), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }
        )
        .then((response) => {
        setTodos(response.data)
        })
    })();
  }, [])

  const handleAddTodo = async (event) => {
    event.preventDefault();
    const token = await cognito.getAccessToken();
    console.log("i'm here")
    const result = await axios.post("https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todo", 
    {
        "todo": userInput
    },{
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    .then (function (response) {
      console.log(response);
    })
    .catch (function (error) {
     console.log(error);
    })

    axios.get(("https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todo"), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    }
    )
    .then((response) => {
    setTodos(response.data)
    })
  };

  const handleDelete= async (id) => {
    event.preventDefault();
    const token = await cognito.getAccessToken();
    const url = "https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todo/" + id;
    console.log (url);
    const result = await axios.delete(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    });
    axios.get(("https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todo"), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    }
    )
    .then((response) => {
    setTodos(response.data)
    })
  }

  const handleEdit = async (id) => {
    event.preventDefault();
    const token = await cognito.getAccessToken();
    const url = "https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todo/" + id;
    const result = await axios.put(url,   {
      "todo": editInput
  },
  {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    }
)
  .then (function (response) {
    console.log(response);
  })
  .catch (function (error) {
   console.log(error);
  })

  axios.get(("https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todo"), {
    headers: {
        'Content-Type': 'application/json',
        Authorization: token
    }
}
)
.then((response) => {
setTodos(response.data)
})
  }

  const handleFilter = async (event) => {
    event.preventDefault();
    const token = await cognito.getAccessToken();
    const searchId = idInput
    const url = "https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todo/" + searchId
    console.log(url);
    axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    }
    )
    .then((response) => {
    setTodos(response.data)
    })
  }

  const handleSignOut = async () => {
    try {
      await cognito.signOut()
      console.log("log out succeeded")
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="App">
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Welcome to the Homepage, {user.username}</h1>
    </div>
      <div>
        <h1>Add To Your List!</h1>
        <form onSubmit={handleAddTodo}>
          <input type = "text" value = {userInput} onChange={(e) => setUserInput(e.target.value)} />
          <button type = "submit">
            Add To List
          </button>
        </form>
      </div>
{/*       <div>
        <h1>Search Todo By Id</h1>
        <form onSubmit={handleFilter}>
          <input type = "text" value = {idInput} onChange={(e) => setIdInput(e.target.value)} />
          <button type = "submit">
            Search!
          </button>
        </form>
      </div> */}
      {todos.map((todo) =>{
        return(
          <div key = {todo.id} className="todo">
            <h1>{todo.todo} - ID: {todo.id}</h1>
            <form id = "edit-field" onSubmit={() =>handleEdit(todo.id)}>
              <label>Edit Todo: </label>
              <input type = "text"  onChange={(e) => setEditInput(e.target.value)} />
              <button type = "submit">
                Click to Edit!
              </button>
            </form>
            <form onSubmit={() => handleDelete(todo.id)}>
              <button type = "submit">
                Delete Todo
              </button>
            </form>
          </div>
        )
      })}
    <div className="flex flex-col justify-center items-center h-screen">
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
    </div>
  )
}
