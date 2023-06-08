import { Suspense, useState } from "react";
import "./assets/styles/App.css";
import { AppRouting } from './routes/index.routes';
import { Loading } from 'components';
import { TodoContext } from "context";

function App() {

  const [ todos, setTodos ] = useState<any>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  return (
    <Suspense fallback={<Loading />}>
      <TodoContext.Provider value={{ todos, setTodos, loading, setLoading }}>
        <AppRouting/>
      </TodoContext.Provider>
    </Suspense>
  )
}

export default App;