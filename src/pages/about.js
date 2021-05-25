import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Image from 'gatsby-image';
import styles from './about.module.css';
import { navigate } from 'gatsby';

export default function About({ data, location }) {
	const siteTitle = data.site.siteMetadata?.title || `Title`;
	const author = data.site.siteMetadata?.author;
	const avatar = data?.avatar?.childImageSharp?.fixed;

	/* see: https://github.com/reach/router/issues/44 */
	const goBack = function () {
		navigate(-1);
	};

	return (
		<Layout location={location} title={siteTitle} isFullscreen={true}>
			<SEO title="Propos" />

			<section className={styles.wrapper}>
				<span className={styles.backLink}>
					<a onClick={goBack}>Retour</a>
				</span>

				<section className={styles.infos}>
					<p>My name is ...</p>
				</section>
			</section>
		</Layout>
	);
}

export const pageQuery = graphql`
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
				title
				author {
					name
					summary
				}
			}
		}
	}
`;
