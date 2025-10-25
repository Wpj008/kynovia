import React from "react";
import Layout from "../components/Layout";
import { site, founders, teamPlaceholders } from "../mock/mock";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function About() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-semibold">À propos</h1>
          <p className="mt-4 text-muted-foreground">
            {site.brand} nous combinons expertise, écoute et innovation pour bâtir des solutions qui ont un véritable impact.
             Nous ne nous contentons pas de livrer de la technologie :
              nous vous accompagnons à chaque étape, avec un suivi personnalisé et des résultats mesurables. 
              Notre objectif est simple : transformer vos enjeux en leviers de croissance durables.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notre mission</CardTitle>
              <CardDescription>
              Accompagner les organisations dans leur transformation digitale grâce à des services sur mesure, 
              performants et durables.

              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notre vision</CardTitle>
              <CardDescription>
              Offrir des solutions numériques innovantes qui façonnent l’avenir des entreprises.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Nos valeurs</CardTitle>
              <CardDescription>
                Simplicité, transparence et recherche de l’impact.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notre approche</CardTitle>
              <CardDescription>
              Nous sommes reconnus pour notre expertise, notre réactivité 
              et notre capacité à transformer les idées en solutions digitales concrètes. 
              Chaque projet est mené avec rigueur, passion et engagement.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold">Les co‑fondateurs</h2>
            <Badge style={{ backgroundColor: site.accent }} className="text-white">3 membres</Badge>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {founders.map((m) => (
              <Card key={m.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img src={m.photo} alt={m.name} className="h-20 w-20 rounded-full object-cover" />
                  <div className="mt-4">
                    <h3 className="font-semibold">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.role}</p>
                    <p className="text-sm mt-3">{m.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export function Team() {
  const fullTeam = [...founders, ...teamPlaceholders];
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold">Rencontrez notre équipe</h1>
        <p className="mt-4 text-muted-foreground max-w-3xl">
        Derrière Kynovia Tech, il y a avant tout des personnes passionnées. 
        Notre équipe d’experts réunit des compétences complémentaires, afin de vous offrir une approche globale et efficace.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullTeam.map((m) => (
            <Card key={m.id} className="hover:translate-y-[-2px] transition-transform">
              <CardContent className="p-6">
                <img src={m.photo} alt={m.name} className="h-24 w-24 rounded-full object-cover" />
                <div className="mt-4">
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                  {m.bio && <p className="text-sm mt-3">{m.bio}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
}
