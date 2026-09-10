import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { SeoProps } from '../data/seo'

const siteBase = 'https://www.hybridcontrol.co.za'
const defaultImage = '/industrial-hero.png'

export default function Seo({ title, description, canonical, ogImage, noIndex }: SeoProps) {
  const { pathname } = useLocation()
  const url = canonical || `${siteBase}${pathname === '/' ? '/' : pathname}`

  useEffect(() => {
    document.title = title

    let desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!desc) {
      desc = document.createElement('meta')
      desc.name = 'description'
      document.head.appendChild(desc)
    }
    desc.content = description

    let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.content = title

    let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null
    if (!ogDesc) {
      ogDesc = document.createElement('meta')
      ogDesc.setAttribute('property', 'og:description')
      document.head.appendChild(ogDesc)
    }
    ogDesc.content = description

    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null
    if (!ogUrl) {
      ogUrl = document.createElement('meta')
      ogUrl.setAttribute('property', 'og:url')
      document.head.appendChild(ogUrl)
    }
    ogUrl.content = url

    let ogImg = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null
    if (!ogImg) {
      ogImg = document.createElement('meta')
      ogImg.setAttribute('property', 'og:image')
      document.head.appendChild(ogImg)
    }
    ogImg.content = ogImage ? `${siteBase}${ogImage}` : `${siteBase}${defaultImage}`

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonicalEl) {
      canonicalEl = document.createElement('link')
      canonicalEl.rel = 'canonical'
      document.head.appendChild(canonicalEl)
    }
    canonicalEl.href = url

    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (noIndex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'noindex, nofollow'
    } else if (robots) {
      robots.remove()
    }
  }, [title, description, url, ogImage, noIndex])

  // JSON-LD for organization on every page except to avoid duplication
  useEffect(() => {
    if (pathname !== '/') return
    const existing = document.getElementById('org-jsonld')
    if (existing) return
    const script = document.createElement('script')
    script.id = 'org-jsonld'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Hybrid Control Corporation',
      url: siteBase,
      logo: `${siteBase}/logo-transparent.png`,
      email: 'info@hybridcontrol.co.za',
      telephone: '+27 35 789 1699',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Unit 2, 73 Dollar Drive',
        addressLocality: 'Richards Bay',
        addressRegion: 'KwaZulu-Natal',
        addressCountry: 'ZA',
      },
      sameAs: [],
      description,
    })
    document.head.appendChild(script)
  }, [pathname, description])

  return null
}
