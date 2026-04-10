export default function sitemap() {
    return [
        { url: "https://futureframes.it", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
        { url: "https://futureframes.it/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: "https://futureframes.it/servizi", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: "https://futureframes.it/portfolio", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: "https://futureframes.it/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: "https://futureframes.it/contact", lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
        { url: "https://futureframes.it/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
        { url: "https://futureframes.it/cookie", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ];
}