import * as React from "react"
import { graphql, Link } from "gatsby"
import './style.css'
import Layout from "../components/layout"
import SEO from "../components/seo"

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
  }
  
`


const Gallery = ({data}) => {
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
    }else if(window.location.pathname === '/gallery') {
        setActive('gallery')
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
                <Link to='/gallery' className={active === 'gallery' ? 'link linkActive': 'link'}><li>Gallery</li></Link>
                <Link to='/book' className='link'><li>Book</li></Link>
                </ul>
            </div>
            </div>
            <div style={{padding: 35}}>
            {
                data.allSanityGallery.edges.map((data, index) =>
                    data.node.categories.length === 0 ? null :
                    data.node.imageGallery.length === 0 ? null :
                    data.node.author === null ? null :
                    data.node.publishedAt === null ? null :
                    <React.Fragment key={index}>
                        <div style={{marginBottom: 35}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>
                                    <p className='contentTagline' style={{color: 'gray'}}>{data.node.title}</p>                                                         
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    {data.node.imageGallery.asset === null ? null : <img src={data.node.author.image.asset.url} height='30'/>}
                                    <p className='contentAuthor'>{data.node.author.name}</p>                               
                                </div>
                            </div>
                            <hr />
                            <div>
                                <div>
                                    {/* <p style={{fontSize: 11, color: 'darkblue', marginTop: 0, marginBottom: 0}}>#{String(data.node.categories[0].genre).toLocaleLowerCase().replace(/ /g, '')}</p>*/}
                                    <p className='posted'>Shots Taken on: {data.node.publishedAt}</p>
                                </div>
                                <div className='cardGallery'>
                                    {data.node.imageGallery.map(gallery =>
                                        gallery.asset === null ? <h1 className='contentTitle' style={{padding: 15, marginBottom: -5}}>No Image Added Yet</h1> : <img src={gallery.asset.url} height='250' className='images'/>
                                    )}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            } 
            </div>
        </div>
    </div>
  )
}

export default Gallery
