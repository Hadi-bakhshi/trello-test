import { Suspense } from "react";
import "./assets/styles/App.css";
import { AppRouting } from './routes/index.routes';
import { Loading } from 'components';

function App() {

  return (
    <Suspense fallback={<Loading />}>
      <AppRouting/>
    </Suspense>
  )
}

export default App
