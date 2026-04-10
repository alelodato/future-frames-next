export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/admin/",
        },
        sitemap: "https://futureframes.it/sitemap.xml",
    };
}