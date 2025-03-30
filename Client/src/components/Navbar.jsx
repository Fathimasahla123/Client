import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <ul>
            <li> <Link to="/dashboard"> Dashboard </Link> </li>

            {user?.role === "Admin" && (
                <>
                <li> <Link to="/users"> Users </Link> </li>
                <li> <Link to="/staffs"> Staffs </Link> </li>
                <li> <Link to="/orders"> Orders </Link> </li>
                <li> <Link to="/reservations"> Reservations </Link> </li>
                <li> <Link to="/products"> Products </Link> </li>
                <li> <Link to="/analytic"> Analytic </Link> </li>
                <li> <Link to="/feedback"> Feedback</Link> </li>
                </>
            )}
        </ul>


    </nav>
  )
}

export default Navbar