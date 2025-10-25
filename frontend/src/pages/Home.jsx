import React, { useRef } from "react";
import Layout from "../components/Layout";
import { site, services, projects, testimonials, news } from "../mock/mock";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel";
import { Code2, Database, Cloud, Compass, ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const iconMap = { Code2, Database, Cloud, Compass };

export default function Home() {
  const servicesRef = useRef(null);

  const handleScrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-white"
        style={{
          backgroundImage: "radial-gradient(600px 200px at 20% -20%, rgba(14,165,233,.12), transparent), radial-gradient(600px 200px at 120% 0%, rgba(14,165,233,.10), transparent)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {site.brand} : l’élégance dans chaque ligne de code
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              {site.tagline}. Nous concevons des produits utiles, rapides et durables,
              propulsés par la data et une ingénierie logicielle exigeante.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={handleScrollToServices} style={{ backgroundColor: site.accent }}>
                Découvrir nos services
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Nous contacter <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Nos services</h2>
            <p className="text-muted-foreground mt-2">Kynovia Tech, votre partenaire technologique de confiance,
               vous accompagne dans la conception, le développement et l’optimisation de solutions digitales innovantes,
               pensées pour répondre à vos enjeux stratégiques et accélérer votre croissance.</p>
          </div>
          <Badge style={{ backgroundColor: site.accent }} className="text-white">Expertise senior</Badge>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => {
            const Icon = iconMap[s.icon] || Code2;
            return (
              <Card key={s.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-10 w-10 rounded-md flex items-center justify-center" style={{ backgroundColor: `${site.accent}1A` }}>
                    <Icon color={site.accent} size={22} />
                  </div>
                  <CardTitle className="mt-3">{s.title}</CardTitle>
                  <CardDescription>{s.desc}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Projets */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold">Nos projets</h2>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Quelques résultats obtenus avec nos clients. Chaque contexte est unique ; nos approches aussi.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <Card key={p.id} className="hover:translate-y-[-2px] transition-transform">
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                  <CardDescription>{p.sector}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm"><span className="font-medium">Impact:</span> {p.result}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold">Témoignages clients</h2>
          <Carousel className="mt-6">
            <CarouselContent>
              {testimonials.map((t) => (
                <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="p-6 h-full flex flex-col justify-between">
                      <p className="text-lg leading-relaxed">“{t.quote}”</p>
                      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                        <Quote size={16} /> {t.author}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Fil d’actualité */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl sm:text-3xl font-semibold">Fil d’actualité</h2>
            <Button asChild variant="ghost">
              <a href={site.socialLinks.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                Suivre sur Twitter <ArrowRight size={18} />
              </a>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((n) => (
              <Card key={n.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardDescription className="uppercase tracking-wide text-xs">{n.source}</CardDescription>
                  <CardTitle className="text-base">{n.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{new Date(n.date).toLocaleDateString("fr-FR")}</span>
                  <a href={n.url} target="_blank" rel="noreferrer" className="underline">Voir</a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
