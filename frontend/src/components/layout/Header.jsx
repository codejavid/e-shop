import React from 'react'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg">
    <div className="container">

        <a className="navbar-brand text-white fw-bold" href="/">
            Eshop
        </a>

        <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

            <form className="d-flex mx-auto w-50">
                <input className="form-control me-2" type="search" placeholder="Search Products..." name="keyword" />

                <button className="btn" id="search_btn" type="submit">
                    <i className="fa fa-search"></i>
                </button>
            </form>

            <ul className="navbar-nav ms-auto align-items-center">

                <li className="nav-item me-3">
                    <a href="/cart" className="text-decoration-none text-white">

                        <i className="fa fa-shopping-cart"></i>
                        <span id="cart">Cart</span>

                        <span id="cart_count">0</span>

                    </a>
                </li>

                <li className="nav-item dropdown">

                    <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">

                        {/* <img src={defaultAvatar} alt="User avatar" className="rounded-circle" width="32" height="32" /> */}

                        User

                    </a>

                    <ul className="dropdown-menu dropdown-menu-end">

                        <li>
                            <a className="dropdown-item" href="/admin/dashboard">
                                Dashboard
                            </a>
                        </li>

                        <li>
                            <a className="dropdown-item" href="/me/orders">
                                Orders
                            </a>
                        </li>

                        <li>
                            <a className="dropdown-item" href="/me/profile">
                                Profile
                            </a>
                        </li>

                        <li>
                            <hr className="dropdown-divider"/>
                        </li>

                        <li>
                            <a className="dropdown-item text-danger" href="/">
                                Logout
                            </a>
                        </li>

                    </ul>

                </li>

               
                <li className="nav-item ms-3">
                    <a href="/login" className="btn" id="login_btn">
                        Login
                    </a>
                </li>

            </ul>

        </div>

    </div>
</nav>
  )
}

export default Header