module.exports = {
	siteMetadata: {
		title: `title`,
		author: {
			name: `xingcdev`,
			summary: `My awesome blog`,
		},
		description: `My awesome blog`,
		siteUrl: `https://www.gatsbyjs.com`,
		social: {
			twitter: ``,
		},
	},
	plugins: [
		'gatsby-transformer-yaml',
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/_data/comments/`,
				name: `comments`,
				// ignore files:
				// dotfiles
				// markdown files
				// bash scripts
				// undone posts folder
				ignore: [`**/\.*`, `**/README.md`, `**/base.md`, `**/*.sh`],
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets/`,
				name: `assets`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/posts/`,
				name: `posts`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						// Used for remote images
						resolve: `gatsby-remark-images-anywhere`,
						options: {
							maxWidth: 728,
							wrapperStyle: 'margin-left: 0 ; margin-right: 0;',
						},
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							// Article centered wrapper width
							maxWidth: 728,
							showCaptions: true,
							wrapperStyle: 'margin-left: 0 ; margin-right: 0;',
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				//trackingId: `ADD YOUR TRACKING ID HERE`,
			},
		},
		`gatsby-plugin-feed`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Gatsby Starter Blog`,
				short_name: `GatsbyJS`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `content/assets/site-icon.png`,
			},
		},
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-sass`,
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
