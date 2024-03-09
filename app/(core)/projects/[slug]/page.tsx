import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { absoluteUrl } from '@/utils/urls'
import { allProjects } from 'contentlayer/generated'

import { Routes } from '@/config/routes'
import { site } from '@/config/site'
import { Content } from '@/components/mdx-content'
import Header from '@/components/projects/header'
import { ScrollIndicator } from '@/components/scroll-indicator'

type Props = {
    params: {
        slug: string
    }
}

export const generateStaticParams = () => {
    return allProjects.map((project) => ({
        slug: project.slug,
    }))
}

export const generateMetadata = (props: Props): Metadata => {
    const { params } = props

    const project = allProjects.find((project) => project.slug === params.slug)

    if (!project) {
        return {}
    }

    return {
        title: project.name,
        description: project.description,
        alternates: {
            canonical: `${site.url}/projects/${params.slug}`,
        },
        openGraph: {
            url: `${site.url}/projects/${params.slug}`,
            type: 'website',
            title: project.name,
            siteName: site.name,
            description: project.description,
            locale: 'it-IT',
            images: [
                {
                    url: `${site.url}${project.image}`,
                    width: 1200,
                    height: 630,
                    alt: project.description,
                    type: 'image/png',
                },
            ],
        },
    }
}

export default function Page({ params: { slug } }: Props) {
    const project = allProjects.find((project) => project.slug === slug)

    if (!project) {
        notFound()
    }

    return (
        <>
            <Header
                title={project.name}
                description={project.description}
                icon={project.icon}
                url={project.url}
                github={project.github}
                image={project.image}
            />

            <Content title={project.name} body={project.body} url={absoluteUrl(Routes.LocalBlogPost(slug))} />

            <ScrollIndicator />
        </>
    )
}