"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, AlertCircle, User } from "lucide-react";

export function LoginForm() {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Espace Administration</h1>
          <p className="text-muted-foreground mt-2">Portfolio BTS SIO - GARNIER Dylan</p>
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Connexion</CardTitle>
            <CardDescription>
              Entrez le mot de passe administrateur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Entrez le mot de passe"
                  className={`h-11 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {error && (
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Mot de passe incorrect</span>
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full h-11">
                Se connecter
              </Button>
            </form>
            <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                Accès réservé à l&apos;administrateur du portfolio.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
