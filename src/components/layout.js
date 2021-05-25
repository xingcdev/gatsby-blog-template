import React from 'react'
import Header from './header'

const Layout = ({ location, title, children, isFullscreen = false }) => {
    const rootPath = `${__PATH_PREFIX__}/`
    const isRootPath = location.pathname === rootPath

    // if (isRootPath) {
    //     header = (
    //         <span className="logo">
    //             <Link to="/">{title}</Link>
    //         </span>
    //     )
    // } else {
    //     header = (
    //         <span className="logo">
    //             <Link to="/">{title}</Link>
    //         </span>
    //     )
    // }

    return (
        <div className="global-wrapper" data-is-root-path={isRootPath}>
            {isFullscreen ? null : <Header title={title} />}
            <main>{children}</main>
            {isFullscreen ? null : (
                <footer>
                    © {new Date().getFullYear()}, fait avec
                    {` `}
                    <a href="https://www.gatsbyjs.com">Gatsby</a>
                </footer>
            )}
        </div>
    )
}

export default Layout
