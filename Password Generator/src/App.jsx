import { useState, useCallback,useEffect,useRef } from 'react'


function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");
  //useref hook
  const passwordRef=useRef(null);

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characters) {
      str += "!@#$%^&*-_+=[]{}~`";
    }
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, characters]);

  const copyPasswordtoClipboard=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password);
  },[password])
useEffect(()=>{
  passwordGen();
},[length,numberAllowed,characters,passwordGen])
  return (
    <>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className='text-3xl text-center text-white py-4'>Password Generator</h1>
        <div className="flex sgadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordtoClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>

        </div>
        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label >Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={characters}
              id="charInput"
              onChange={() => {
                setCharacters((prev) => !prev);
              }}
            />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
