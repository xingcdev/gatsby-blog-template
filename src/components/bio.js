/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import style from './bio.module.css'
import Button from './button'

const Bio = () => {
    const data = useStaticQuery(graphql`
        query BioQuery {
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
                    social {
                        twitter
                    }
                }
            }
        }
    `)

    // Set these values by editing "siteMetadata" in gatsby-config.js
    const author = data.site.siteMetadata?.author
    const avatar = data?.avatar?.childImageSharp?.fixed

    return (
        <div className={style.bio}>
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
            <p className={style.summary}>{author.summary}</p>
            <Button
                text="En savoir plus"
                bgColor="#FDCF72"
                color="#333"
                goTo="/about/"
            />
        </div>
    )
}

export default Bio
