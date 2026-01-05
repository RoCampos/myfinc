
import './App.css'
import { Link } from '@inertiajs/react'

function App(props: any) {

  return (
    <>
      <div>
        Oi {props.user}


        <Link href="/login">Login</Link>

      </div>
    </>
  )
}

export default App
