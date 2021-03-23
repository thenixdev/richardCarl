import * as React from "react"
import { graphql, Link } from "gatsby"
import './style.css'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Box, Divider, Grid } from "@material-ui/core"

export const query = graphql`
{
    allSanityPageSetting {
      edges {
        node {
          settingName
          configurePage {
            ... on SanityBackgroundImage {
              _key
              _type
              mainImage {
                asset {
                  url
                }
              }
              tagline
              title
              buttonName
              buttonLink
            }
            ... on SanityLogo {
              _key
              _type
              mainImage {
                asset {
                  url
                }
              }
            }
          }
        }
      }
    }
    allSanityGallery {
      edges {
        node {
          title
          categories {
            genre
          }
          author {
            name
            image {
              asset {
                url
              }
            }
            slug {
              current
            }
            bio {
              style
              children {
                marks
                text
              }
              list
            }
          }
          imageGallery {
            asset {
              url
            }
          }
          publishedAt(formatString: "MM/DD/YYYY")
        }
      }
    }
    allSanityPost {
      edges {
        node {
          title
          slug {
            current
          }
          author {
            name
            slug {
              current
            }
          }
          mainImage {
            asset {
              url
            }
          }
          publishedAt(formatString: "MM/DD/YYYY")
          categories {
            genre
          }
          body {
            list
            style
            children {
              marks
              text
            }
          }
        }
      }
    }
  }
`


const Blog = ({data}) => {
  const [background, setBackground] = React.useState(null)
  const [logo, setLogo] = React.useState(null)
  const [active, setActive] = React.useState(null)
      
  React.useEffect(() => {
    data.allSanityPageSetting.edges.map(image =>{
        if(image.node.configurePage.length === 0) {
            return null
        }else if(image.node.configurePage[0]._type === 'backgroundImage') {
            setBackground(image.node.configurePage[0])
        }else {
            setLogo(image.node.configurePage[0].mainImage.asset.url)
        }
    })

   if(window.location.pathname === '/') {
      setActive('home')
   }else if(window.location.pathname === '/blog') {
    setActive('blog')
 }
  }, []);
  
  return(
    <div>
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(black, transparent)', padding: 7, alignItems: 'center'}}>
            <div style={{marginLeft: 25, padding: 10}}>              
                {logo && <img src={logo} height='50' />}
            </div>
            <div>
                <ul style={{display: 'flex', justifyContent:'space-evenly', width: 400, listStyleType: 'none', marginRight: 15}}>
                <Link to='/' className={active === 'home' ? 'link linkActive': 'link'}><li>Home</li></Link>
                <Link to='/blog' className={active === 'blog' ? 'link linkActive': 'link'}><li>Blog</li></Link>
                <Link to='/gallery' className='link'><li>Gallery</li></Link>
                <Link to='/book' className='link'><li>Book</li></Link>
                </ul>
            </div>
            </div>
            <div>
                <div style={{padding: 25}}>
                    <p className='contentTitle'>Blog</p>
                    <hr />
                </div>
                {data.allSanityPost.edges.length === 0 ? null :
                    data.allSanityPost.edges.map(post =>
                        // post.node.title === null ? null :
                        // post.node.slug === null  ? null :
                        // post.node.author === null  ? null :
                        // post.node.mainImage === null  ? null :
                        // post.node.mainImage.asset === null  ? null :
                        // post.node.publishedAt === null  ? null :
                        // post.node.categeories.length === 0  ? null :
                        // post.node.body === null ? null :

                        <div className='blogCard'>
                            <Box className='card'>
                                <Grid container spacing={2} style={{display: 'flex', alignItems: 'center'}}>
                                    <Grid item lg={4}>
                                        {post.node.mainImage === null || post.node.mainImage.asset === null ? null : <img src={post.node.mainImage.asset.url} className='blogImage' /> }
                                    </Grid>
                                    <Grid item lg={1} />
                                    <Grid item lg={7}>
                                        <Box>
                                            {post.node.title === null ? null : <p className='blogTitle'>{post.node.title}</p>}
                                            {post.node.body === null || post.node.body.length === 0 ? null : 
                                                post.node.body[0].style === 'normal' ? 
                                                <p className='bodyNormal'>{post.node.body[0].children[0].text}</p> : null
                                            }
                                            {post.node.publishedAt === null  ? null : <p className='blogPublishedDate'>{post.node.publishedAt}</p>}
                                        </Box>
                                    </Grid>                               
                                </Grid>                                             
                            </Box>
                        </div>
                    )
                }
            </div>   
        </div>
    </div>
  )
}

export default Blog
