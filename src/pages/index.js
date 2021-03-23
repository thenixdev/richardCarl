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
}


`


const IndexPage = ({data}) => {
  const [background, setBackground] = React.useState(null)
  const [logo, setLogo] = React.useState(null)
  const [active, setActive] = React.useState(null)
  console.log(data)

  React.useEffect(() => {
    data.allSanityPageSetting.edges.map(image =>{
      console.log(image)
      if(image.node.configurePage[0]._type === 'backgroundImage') {
        setBackground(image.node.configurePage[0])
      }else {
        setLogo(image.node.configurePage[0].mainImage.asset.url)
      }
    })

   console.log(window.location.pathname)
   if(window.location.pathname === '/') {
      setActive('home')
   }else if(window.location.pathname === '/blog') {
    setActive('blog')
 }
  }, []);
  
  const navigate = () => {
    window.open(background.buttonLink)
  };

  return(
    <body>
      {background && <div style={{backgroundImage: `url(${background.mainImage.asset.url})`, overflow: 'hidden', backgroundSize: 'cover', height: '100vh', objectFit: 'cover', backgroundRepeat: 'no-repeat'}}>
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
              <div style={{padding: 60, position: 'absolute', width: '100%', bottom:0, background: 'linear-gradient(transparent, black)', textAlign: 'center'}}>
                <p className='contentTitle'>{background.title}</p>
                <p className='contentTagline' >{background.tagline}</p>
                <button className='button' onClick={navigate}>{background.buttonName}</button>
              </div>
            </div>
        </div>}
    </body>
  )
}

export default IndexPage
