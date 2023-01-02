import { useEffect, useState } from 'react';
import './App.scss';
import ColorBox from './components/ColorBox';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import queryString from 'query-string';
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/Clock';
import BetterClock from './components/BetterClock';
import MagicBox from './components/MagicBox';
import Hero from './components/Hero';
import Counter from './components/Counter';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'ABC' },
    { id: 2, title: 'DEF' },
    { id: 3, title: 'GHI' },
    { id: 4, title: 'JKL' },
    { id: 5, title: 'MNO' },
  ])

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: '',
  })

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('failed to fetch post list: ' + error.message)
      }
    }
    console.log('Post list effect');
    fetchPostList();
  }, [filters])

  useEffect(() => {
    console.log('TODO list effect');
  })

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    })
  }

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    console.log('Form submit: ', formValues);
    const newTodo = {
      id: todoList.lenght + 1,
      ...formValues
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handleFiltersChange(newFilters) {
    console.log('New filters: ', newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })
  }
  
  const [showClock, setShowClock] = useState(true);

  return (
    <div className="app">
      <h1>Color Box</h1>
      <ColorBox />
      <h1>Todo Form</h1>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <h1>Todo List</h1>
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
      <h1>Post List</h1>
      <PostFiltersForm  
        onSubmit={handleFiltersChange}
      />
      <PostList posts={postList} />
      <Pagination 
        pagination={pagination}
        onPageChange={handlePageChange}
      />
      <h1>Clock</h1>
      {showClock && <Clock />}
      {showClock && <BetterClock />}
      <button onClick={() => setShowClock(false)}>
        Hide Clock
      </button>
      <h1>Magic Box</h1>
      <MagicBox />
      <h1>Hero</h1>
      <Hero name="Easy Frontend"/>
      <br/>
      <Counter/>
    </div>
  );
}

export default App;
