import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";
import { site, services as servicesData } from "../mock/mock";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { useToast } from "../hooks/use-toast";
import { Calendar as CalendarIcon, Paperclip, ShieldCheck } from "lucide-react";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha"; 

export default function Contact() {
  const { toast } = useToast();
  const [date, setDate] = useState();
  const [file, setFile] = useState(null);
  const [consent, setConsent] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);//captcha token state

  const [form, setForm] = useState({
    nom: "",
    email: "",
    tel: "",
    entreprise: "",
    service: "",
    budget: "",
    description: "",
  });

  const budgets = ["< 2k€", "2k€ – 5k€", "5k€ – 10k€", "> 10k€", "À définir"];

  const canSubmit = useMemo(() => {
    return (
      form.nom && form.email && form.tel && form.service && consent && captchaToken
    );
  }, [form, consent, captchaToken]);

  //capture le token captcha

  const onHCaptchaChange = (token) => {
    setCaptchaToken(token);
  };


  // Début onSubmit Correctif apporté

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis et  valider le captcha.",
        variant: "destructive",
      });
      return;

    }
      

    const formData = {
      access_key: "85d1b3f5-d84b-42de-86f0-8fcb513bba11", 
      name: form.nom,
      email: form.email,
      tel: form.tel,
      entreprise: form.entreprise,
      service: form.service,
      budget: form.budget,
      description: form.description,
      date: date ? new Date(date).toLocaleDateString("fr-FR") : "",
      subject: `Demande de devis - ${form.nom}`,
      "h-captcha-response": captchaToken,
      redirect: "",//le chemin de redirection après soumission
        };

    
  try {
    const response = await axios.post("https://api.web3forms.com/submit", formData);
    if (response.data.success) {
      toast({
        title: "Message envoyé",
        description: "Merci ! Votre demande a bien été envoyée.",
      });
      setForm({
        nom: "",
        email: "",
        tel: "",
        entreprise: "",
        service: "",
        budget: "",
        description: "",
      });
      setDate(null);
      setFile(null);
      setConsent(false);
      setCaptchaToken(null);
    }
  } catch (err) {
    toast({
      title: "Erreur",
      description: "Une erreur est survenue lors de l'envoi du formulaire.",
      variant: "destructive",
    });
  }

 };

// Fin onSubmit Correctif apporté

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-semibold">Contact & Demande de devis</h1>
          <p className="mt-3 text-muted-foreground">
            Décrivez votre besoin, nous revenons vers vous sous 24–48h.
          </p>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Formulaire</CardTitle>
            <CardDescription>Tous les champs marqués sont requis.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    placeholder="Votre nom"
                    value={form.nom}
                    onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tel">Téléphone *</Label>
                  <Input
                    id="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={form.tel}
                    onChange={(e) => setForm((f) => ({ ...f, tel: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="entreprise">Entreprise</Label>
                  <Input
                    id="entreprise"
                    placeholder="Nom de votre entreprise"
                    value={form.entreprise}
                    onChange={(e) => setForm((f) => ({ ...f, entreprise: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Service souhaité *</Label>
                  <Select value={form.service} onValueChange={(v) => setForm((f) => ({ ...f, service: v }))}>
                    <SelectTrigger id="service-select" aria-label="Service souhaité" data-testid="service-select">
                      <SelectValue placeholder="Choisissez un service" />
                    </SelectTrigger>
                    <SelectContent>
                      {servicesData.map((s) => (
                        <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Budget estimé</Label>
                  <Select value={form.budget} onValueChange={(v) => setForm((f) => ({ ...f, budget: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgets.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Échéance</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? new Date(date).toLocaleDateString("fr-FR") : "Choisir une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label>Description du projet</Label>
                <Textarea
                  placeholder="Expliquez vos objectifs, le contexte, les contraintes…"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={6}
                />
              </div>

              <div>
                <Label>Pièce jointe</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  {file && (
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Paperclip size={16} /> {file.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">

                <HCaptcha
                  sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                  onVerify={onHCaptchaChange} 
                />


              </div>



              <div className="flex items-start gap-3">
                <Checkbox id="rgpd" checked={consent} onCheckedChange={(v) => setConsent(!!v)} />
                <Label htmlFor="rgpd" className="text-sm leading-relaxed">
                  J’accepte que {site.brand} traite ces données pour répondre à ma demande.
                  <span className="block text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <ShieldCheck size={14} /> Conformité RGPD — aucune donnée n’est stockée côté serveur.
                  </span>
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={!canSubmit} style={{ backgroundColor: site.accent }}>
                  Valider
                </Button>
                <Button type="button" variant="outline" asChild>
                  <a href={`mailto:${site.email}`}>Écrire directement</a>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Astuce: En cliquant sur « Valider », votre client mail s’ouvre avec un message prérempli adressé à {site.email}.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}
