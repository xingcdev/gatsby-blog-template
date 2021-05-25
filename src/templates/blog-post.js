import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Comments from '../components/comments';

const BlogPostTemplate = ({ data, location }) => {
	const post = data.markdownRemark;
	const siteTitle = data.site.siteMetadata?.title || `Title`;
	const { previous, next } = data;
	return (
		<Layout location={location} title={siteTitle}>
			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
			/>
			<article
				className="blog-post centered-wrapper"
				itemScope
				itemType="http://schema.org/Article"
			>
				<header>
					<h1 itemProp="headline">{post.frontmatter.title}</h1>
					<p className="date">{post.frontmatter.date}</p>
				</header>
				<section
					dangerouslySetInnerHTML={{ __html: post.html }}
					itemProp="articleBody"
				/>
				<hr />
				<Comments
					// Ensure to do not have the hash # in the url like
					// "https://site.com/this-is-a-post#comment-form"
					currentPageUrl={`${location.origin}${location.pathname}`}
					currentPostSlug={data.markdownRemark.fields.slug}
					postComments={data.allCommentsYaml.edges}
				/>
				<nav className="blog-post-nav">
					<ul
						style={{
							display: `flex`,
							flexWrap: `wrap`,
							justifyContent: `space-between`,
							listStyle: `none`,
							padding: 0,
						}}
					>
						<li>
							{previous && (
								<Link to={previous.fields.slug} rel="prev">
									← {previous.frontmatter.title}
								</Link>
							)}
						</li>
						<li>
							{next && (
								<Link to={next.fields.slug} rel="next">
									{next.frontmatter.title} →
								</Link>
							)}
						</li>
					</ul>
				</nav>
			</article>
		</Layout>
	);
};

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug(
		$id: String!
		$previousPostId: String
		$nextPostId: String
		$slug: String
	) {
		site {
			siteMetadata {
				title
			}
		}
		markdownRemark(id: { eq: $id }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "ddd DD MMM YYYY, HH:mm", locale: "fr")
				description
			}
			fields {
				slug
			}
		}

		allCommentsYaml(filter: { slug: { eq: $slug } }) {
			edges {
				node {
					id
					_id
					message
					name
					date
					reply_to
				}
			}
		}

		previous: markdownRemark(id: { eq: $previousPostId }) {
			fields {
				slug
			}
			frontmatter {
				title
			}
		}
		next: markdownRemark(id: { eq: $nextPostId }) {
			fields {
				slug
			}
			frontmatter {
				title
			}
		}
	}
`;
