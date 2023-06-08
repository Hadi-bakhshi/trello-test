import { Flex, useToast } from "@chakra-ui/react";
import { GetTodosAPI } from "apis";
import { Loading, TodoColumn } from "components";
import { PageContainer } from "layouts";
import { useContext, useEffect } from "react";
import "assets/styles/Home.page.css";
import { TodoContext } from "context";

const HomePage = () => {

  const toast = useToast();
  const { todos, setTodos, loading, setLoading } = useContext(TodoContext);

  const getTodos = () => {
    setLoading(true);
    GetTodosAPI().then(response => {
      if(response.status === 200) {
        setTodos(response.data);
      }
    }).catch(() => {
      toast({ title: 'Error To Get Todos !', status: 'error', duration: 3000, isClosable: true })
    }).finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    getTodos();
  }, [])
  
  return(
    <PageContainer>
      {
        loading ? <Loading/> :
        <Flex justifyContent="center" alignItems="center" gap="25px" py="25px" h="100%" flexWrap="wrap">
          <TodoColumn todoList={todos?.filter((todo: any) => todo.status === "todo")} headerTitle="Todo"/>
          <TodoColumn todoList={todos?.filter((todo: any) => todo.status === "wip")} headerTitle="In Progress"/>
          <TodoColumn todoList={todos?.filter((todo: any) => todo.status === "done")} headerTitle="Done"/>
        </Flex>
      }
    </PageContainer>
  )
}
export default HomePage;