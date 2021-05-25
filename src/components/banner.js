import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
// import backgroundImage from '../../content/assets/your-name-stars.gif'
import style from './banner.module.css'
// Source: https://imgur.com/a/bl33J
import background from '../../content/assets/your-name-stars.mp4'
import Image from 'gatsby-image'
import Button from './button'

const Banner = function () {

    const data = useStaticQuery(graphql`
        query {
            avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
                childImageSharp {
                    fixed(width: 250, height: 250, quality: 95) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
            site {
                siteMetadata {
                    author {
                        name
                        summary
                    }
                }
            }
        }
    `)

    const author = data.site.siteMetadata?.author
    const avatar = data?.avatar?.childImageSharp?.fixed

    return (
        <div className={style.banner}>
            <div className={style.content}>
                <div className={style.summary}>
                    <h1 className={style.summary}>{author.summary}</h1>
                </div>
                <div className={style.author}>
                    {avatar && (
                        <Image
                            fixed={avatar}
                            alt={author?.name || ``}
                            className={style.avatar}
                            imgStyle={{
                                borderRadius: `50%`,
                            }}
                        />
                    )}
                    <p className={style.name}>{author.name}</p>
                    <Button
                        text="En savoir plus"
                        bgColor="#FDCF72"
                        color="#333"
                        goTo="/about/"
                    />
                </div>
            </div>
            <video
                autoPlay
                muted
                loop
                style={{
                    width: '100%',
                    height: '100%',
                    zIndex: '-1',
                    objectFit: 'cover',
                    // Positioned 60% from the left of the <video>
                    objectPosition: '60%',
                }}
            >
                <source src={background} type="video/mp4" />
                Votre
            </video>
            
        </div>
    )
}

export default Banner
