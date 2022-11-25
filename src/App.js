import { useEffect, useState } from 'react';
import './App.css';

const PAGE_NUMBER = 3
function App() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(PAGE_NUMBER)
  const [img, setImg] = useState()

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setUsers(data.slice(0, page)))

    fetch(`https://avatars.dicebear.com/api/male/john.svg`)
      .then(data => setImg(data))
  }, [page])

  const scrollToEnd = () => {
    setPage(page + 1)
  }

  window.onscroll = function () {
    // console.log(`${window.innerHeight} + ${document.documentElement.scrollTop} (${window.innerHeight + document.documentElement.scrollTop}) === ${document.documentElement.offsetHeight}`)
    if ((window.innerHeight + document.documentElement.scrollTop) > (document.documentElement.offsetHeight - 2)) {
      // console.log("scolling")
      scrollToEnd()
    }
  }

  return (
    <div className="App">
      {users.map((user, index) => (
        <div key={index} className='container'>
          <div className="heading">
            <div className="imgDiv">
              <img src={img.url} alt="" />
            </div>
            <div className="textDiv">
              <h4>Title: {user.title}</h4>
            </div>
          </div>
          <div className="body">
            <h4>Body: {user.body}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
