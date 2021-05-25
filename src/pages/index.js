import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Banner from '../components/banner';

const BlogIndex = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata?.title || `Title`;
	const posts = data.allMarkdownRemark.nodes;
	// datePrefix = "yyyy-mm-dd"

	if (posts.length === 0) {
		return (
			<Layout location={location} title={siteTitle}>
				<SEO title="" />
				<p>
					No blog posts found. Add markdown posts to "content/blog" (or the
					directory you specified for the "gatsby-source-filesystem" plugin in
					gatsby-config.js).
				</p>
			</Layout>
		);
	}

	return (
		<Layout location={location} title={siteTitle}>
			<SEO title="" />

			<header>
				<Banner />
			</header>
			<section className="centered-wrapper">
				<ol style={{ listStyle: `none` }}>
					{posts.map((post) => {
						const title = post.frontmatter.title || post.fields.slug;

						return (
							<li key={post.fields.slug}>
								<article
									className="post-list-item"
									itemScope
									itemType="http://schema.org/Article"
								>
									<header>
										<h2
											style={{
												margin: '2.5rem 0 0.6rem 0',
											}}
										>
											<Link to={post.fields.slug} itemProp="url">
												<span itemProp="headline">{title}</span>
											</Link>
										</h2>
										<span className="date">{post.frontmatter.date}</span>
									</header>
								</article>
							</li>
						);
					})}
				</ol>
			</section>
		</Layout>
	);
};

export default BlogIndex;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			nodes {
				excerpt
				fields {
					slug
				}
				frontmatter {
					date(formatString: "ddd DD MMM YYYY, HH:mm", locale: "fr")
					title
					description
				}
			}
		}
	}
`;
