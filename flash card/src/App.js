

// import React, { useState, useEffect, useRef } from 'react';
// import FlashcardList from './FlashcardList';
// import './App.css'
// import axios from 'axios'

// function App() {
//   const [flashcards, setFlashcards] = useState([])
//   const [categories, setCategories] = useState([])
//   const [showPagination, setShowPagination] = useState(false) // New state variable0

//   const categoryEl = useRef()
//   const amountEl = useRef()

//   useEffect(() => {
//     axios
//       .get('https://opentdb.com/api_category.php')
//       .then(res => {
//         setCategories(res.data.trivia_categories)
//       })
//   }, [])

//   function decodeString(str) {
//     const textArea = document.createElement('textarea')
//     textArea.innerHTML = str
//     return textArea.value
//   }

//   function handleSubmit(e) {
//     e.preventDefault()
//     axios
//     .get('https://opentdb.com/api.php', {
//       params: {
//         amount: amountEl.current.value,
//         category: categoryEl.current.value
//       }
//     })
//     .then(res => {
//       const newFlashcards = res.data.results.map((questionItem, index) => {
//         const answer = decodeString(questionItem.correct_answer)
//         const options = [
//           ...questionItem.incorrect_answers.map(a => decodeString(a)),
//           answer
//         ]
//         return {
//           id: `${index}-${Date.now()}`,
//           question: decodeString(questionItem.question),
//           answer: answer,
//           options: options.sort(() => Math.random() - .5)
//         }
//       });

//       setFlashcards(newFlashcards);
//       setShowPagination(true); // Show pagination after generating flashcards
//     })
//   }

//   return (
//     <>
//       <form className="header" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="category">Category</label>
//           <select id="category" ref={categoryEl}>
//             {categories.map(category => {
//               return <option value={category.id} key={category.id}>{category.name}</option>
//             })}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="amount">Number of Questions</label>
//           <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
//         </div>
//         <div className="form-group">
//           <button className="btn">Generate</button>
//         </div>
//       </form>
//       <div className="container">
//         {flashcards.length > 0 && (
//           <FlashcardList flashcards={flashcards} showPagination={showPagination} />
//         )}
//       </div>
//     </>
//   );
// }

// export default App;













import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './App.css'
import './login.css'
import axios from 'axios'


function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform login authentication logic here
    if (email === 'example@example.com' && password === 'password') {
      setError('');
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className=''>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
    
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };


  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const [showPagination, setShowPagination] = useState(false) // New state variable0

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
    .get('https://opentdb.com/api.php', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
    .then(res => {
      const newFlashcards = res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)),
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      });

      setFlashcards(newFlashcards);
      setShowPagination(true); // Show pagination after generating flashcards
    })
  }
  return (
    <div>
      {loggedIn ? (
        // Render flashcard page when logged in
        <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container cardContainer">
        {flashcards.length > 0 && (
          <FlashcardList flashcards={flashcards} showPagination={showPagination} />
        )}
      </div>
    </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

