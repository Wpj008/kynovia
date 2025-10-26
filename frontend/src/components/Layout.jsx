import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { site } from "../mock/mock";
import { Github, Linkedin, Twitter, ChevronRight, Instagram } from "lucide-react";
import { Toaster } from "../components/ui/toaster";
import { MapPin, Phone, Mail } from 'lucide-react';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
  }`;

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={site.logoUrl}
                  alt="Logo Kynovia Tech"
                  className="h-8 w-8 object-contain"
                />
                <span className="font-semibold tracking-tight">{site.brand}</span>
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/" className={navLinkClass} end>
                Accueil
              </NavLink>
              <NavLink to="/a-propos" className={navLinkClass}>
                À propos
              </NavLink>
              <NavLink to="/equipe" className={navLinkClass}>
                Notre équipe
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact & Devis
              </NavLink>
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <Button asChild style={{ backgroundColor: site.accent }}>
                <Link to="/contact" className="flex items-center gap-1">
                  Demander un devis <ChevronRight size={18} />
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent"
              aria-label="Ouvrir le menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="i-menu" />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile panel */}
        {open && (
          <div className="md:hidden border-t bg-white">
            <div className="space-y-1 px-4 py-3">
              <NavLink to="/" className={navLinkClass} end onClick={() => setOpen(false)}>
                Accueil
              </NavLink>
              <NavLink to="/a-propos" className={navLinkClass} onClick={() => setOpen(false)}>
                À propos
              </NavLink>
              <NavLink to="/equipe" className={navLinkClass} onClick={() => setOpen(false)}>
                Notre équipe
              </NavLink>
              <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>
                Contact & Devis
              </NavLink>
              <Button asChild className="w-full" style={{ backgroundColor: site.accent }}>
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Demander un devis
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={site.logoUrl} alt="Logo" className="h-8 w-8 object-contain" />
              <div>
                <p className="font-semibold">{site.brand}</p>
                <p className="text-sm text-muted-foreground">{site.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <a href={site.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground">
                <Linkedin size={20} />
              </a>
              <a href={site.socialLinks.twitter} target="_blank" rel="noreferrer" aria-label="Twitter/X" className="hover:text-foreground">
                <Twitter size={20} />
              </a>
              <a href={site.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-foreground">
                <Instagram size={20} />
              </a>
              <a href={site.socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground">
                <Github size={20} />
              </a>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-sm text-muted-foreground flex flex-col sm:flex-row gap-2 sm:gap-6 justify-between">
            <p>© {new Date().getFullYear()} {site.brand}. Tous droits réservés.</p>
            
            <div className="flex sm:items-end gap-2">
            <div className="flex sm:items-end gap-4">
  {/* Colonne des icônes */}
  <div className="flex flex-col items-center justify-center mr-3 space-y-3">
    <MapPin className="h-5 w-5 text-gray-400" />
    <Phone className="h-5 w-5 text-gray-400" />
    <Mail className="h-5 w-5 text-gray-400" />
  </div>

  {/* Colonne des textes */}
  <div className="flex flex-col space-y-3">
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.adress)}`}
      target="_blank"
      rel="noreferrer"
      className="transition-colors duration-200 hover:text-blue-500"
    >
      {site.adress}
    </a>

    <a
      href={`tel:${site.tel}`}
      className="transition-colors duration-200 hover:text-blue-500"
    >
      {site.tel}
    </a>

    <a
      href={`mailto:${site.email}`}
      className="transition-colors duration-200 hover:text-blue-500"
    >
      {site.email}
    </a>
  </div>
</div>

  </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
