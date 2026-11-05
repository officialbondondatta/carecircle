import Image from "next/image";

const photos = [
    {
        image: "https://i.ibb.co.com/1tVYc1c5/homepage-banner-v2.png",
        title: "Sharing warmth",
        description: "Winter clothing and blanket donations",
        alt: "Community volunteers handing out blankets to a neighbor",
    },
    {
        image: "https://i.ibb.co.com/MxGWYnvr/care-circle-login.png",
        title: "Growing together",
        description: "Planting for a greener neighborhood",
        alt: "Volunteers planting a sapling together",
    },
    {
        image: "https://i.ibb.co.com/DfLCb9V5/care-circle-flood-relief-modern.png",
        title: "Helping in hard times",
        description: "Community flood relief efforts",
        alt: "Volunteers supporting the community during flood relief",
    },
];

const Gallery = () => {
    return (
        <section className="bg-carecircle-secondary/50" aria-labelledby="gallery-heading">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
                <header className="mx-auto mb-8 max-w-xl text-center">
                    <h2 id="gallery-heading" className="text-3xl font-bold text-carecircle-primary">Care in action</h2>
                    <p className="mt-3 text-carecircle-text/75">A glimpse of the ways we can show up for our neighbors.</p>
                </header>
                <div className="grid gap-6 md:grid-cols-3">
                    {photos.map((photo) => (
                        <figure key={photo.title} className="overflow-hidden rounded-xl bg-carecircle-bg">
                            <div className="relative aspect-4/3">
                                <Image src={photo.image} alt={photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                            </div>
                            <figcaption className="p-5">
                                <h3 className="text-xl font-semibold text-carecircle-primary">{photo.title}</h3>
                                <p className="mt-2 text-sm text-carecircle-text/75">{photo.description}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
