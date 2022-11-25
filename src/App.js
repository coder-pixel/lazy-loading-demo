import { useEffect, useState } from 'react';
import './App.css';

const Num = 6
function App() {
  const [users, setUsers] = useState([])
  const [profileTitle, setProfileTitle] = useState("john2")
  const [page, setPage] = useState(Num)
  const [img, setImg] = useState()

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setUsers(data.slice(0, page)))

    fetch(`https://avatars.dicebear.com/api/male/${profileTitle}.svg`)
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
      <div className="mainText">
        <h1>Welcome to lazy-loaded website</h1>
        <h4>Scroll down to load more results!</h4>
      </div>
      
      <div className="wrapper">
        {users.map((user, index) => (
          <div key={index} className='container'>
            <div className="heading">
              <div className="imgDiv">
                <img src={img.url} alt="" />
              </div>
              <div className="textDiv">
                <h4>{user.title}</h4>
              </div>
            </div>
            <div className="body">
              <h4>{user.body}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
