import { Todos } from "./components/Todos";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { TodoProvider } from "./context/TodoProvider";



const App = (): JSX.Element => {
  

  return (
    <div className="todoapp">
      <TodoProvider>
        <Header />
        <Todos />
        <Footer />
      </TodoProvider>
    </div>
  )
}

export default App
