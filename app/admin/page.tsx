"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  LayoutDashboard, 
  FolderKanban, 
  GraduationCap, 
  Newspaper, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Home,
  User,
  FileText,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  X,
  Check,
  Loader2,
  Copy,
  Save
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects as initialProjects, skills as initialSkills, veilleArticles as initialVeilleArticles, realisationsE5 as initialRealisationsE5, personalInfo as initialPersonalInfo, type Project, type Skill, type VeilleArticle, type RealisationE5, type CompetenceDetail } from "@/lib/data";

interface UploadedFile {
  url: string;
  pathname: string;
  filename: string;
  folder: string;
  uploadedAt: string;
  size: number;
}

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [selectedFolder, setSelectedFolder] = useState("preuves");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  // State for editable data
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [veilleArticles, setVeilleArticles] = useState<VeilleArticle[]>(initialVeilleArticles);
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [realisationsE5, setRealisationsE5] = useState<RealisationE5[]>(initialRealisationsE5);

  // Persistance
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  // Charger le contenu persisté au démarrage
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/content", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.projects) setProjects(data.projects);
          if (data.skills) setSkills(data.skills);
          if (data.veilleArticles) setVeilleArticles(data.veilleArticles);
          if (data.personalInfo) setPersonalInfo(data.personalInfo);
          if (data.realisationsE5) setRealisationsE5(data.realisationsE5);
        }
      } catch (error) {
        console.error("Erreur de chargement du contenu:", error);
      } finally {
        setIsLoadingContent(false);
      }
    })();
  }, []);

  // Enregistre le contenu complet de façon permanente (Vercel Blob / fichier local)
  const persist = useCallback(
    async (override: Partial<{
      personalInfo: typeof personalInfo;
      projects: Project[];
      skills: Skill[];
      veilleArticles: VeilleArticle[];
      realisationsE5: RealisationE5[];
    }>) => {
      setSaveStatus("saving");
      const payload = {
        personalInfo,
        projects,
        skills,
        veilleArticles,
        realisationsE5,
        ...override,
      };
      try {
        const res = await fetch("/api/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setSaveStatus(res.ok ? "saved" : "error");
      } catch (error) {
        console.error("Erreur d'enregistrement:", error);
        setSaveStatus("error");
      }
      setTimeout(() => setSaveStatus("idle"), 2500);
    },
    [personalInfo, projects, skills, veilleArticles, realisationsE5]
  );

  // Edit dialog states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingArticle, setEditingArticle] = useState<VeilleArticle | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);

  // New project form state
  const [newProject, setNewProject] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    context: "",
    type: "Scolaire" as "Professionnel" | "Personnel" | "Scolaire",
    status: "En cours" as "En cours" | "Terminé" | "En pause",
    technologies: "",
    objectives: "",
    competences: "",
    startDate: "",
    endDate: "",
  });

  // Edit handlers
  const handleEditProject = (project: Project) => {
    setEditingProject({...project});
    setIsEditDialogOpen(true);
  };

  const handleSaveProject = () => {
    if (editingProject) {
      const updated = projects.map(p => p.id === editingProject.id ? editingProject : p);
      setProjects(updated);
      persist({ projects: updated });
      setIsEditDialogOpen(false);
      setEditingProject(null);
    }
  };

  const handleDeleteProject = (projectId: number) => {
    const updated = projects.filter(p => p.id !== projectId);
    setProjects(updated);
    persist({ projects: updated });
  };

  const handleAddProject = () => {
    const slug = newProject.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newProjectData: Project = {
      id: Math.max(...projects.map(p => p.id), 0) + 1,
      slug,
      title: newProject.title,
      shortDescription: newProject.shortDescription,
      fullDescription: newProject.fullDescription,
      context: newProject.context,
      objectives: newProject.objectives.split('\n').filter(o => o.trim()),
      technologies: newProject.technologies.split(',').map(t => t.trim()).filter(t => t),
      competences: newProject.competences.split('\n').filter(c => c.trim()),
      image: "/projects/placeholder.png",
      gallery: [],
      status: newProject.status,
      startDate: newProject.startDate,
      endDate: newProject.endDate || undefined,
      type: newProject.type,
    };
    setProjects(prev => [newProjectData, ...prev]);
    persist({ projects: [newProjectData, ...projects] });
    setNewProject({
      title: "",
      shortDescription: "",
      fullDescription: "",
      context: "",
      type: "Scolaire",
      status: "En cours",
      technologies: "",
      objectives: "",
      competences: "",
      startDate: "",
      endDate: "",
    });
  };

  // Compétences détaillées (argument + preuve) du projet en cours d'édition
  const updateCompDetail = (index: number, field: keyof CompetenceDetail, value: string) => {
    if (!editingProject) return;
    const list = [...(editingProject.competencesDetaillees || [])];
    list[index] = { ...list[index], [field]: value };
    setEditingProject({ ...editingProject, competencesDetaillees: list });
  };
  const addCompDetail = () => {
    if (!editingProject) return;
    const list = [
      ...(editingProject.competencesDetaillees || []),
      { code: "", intitule: "", preuve: "", argumentaire: "" },
    ];
    setEditingProject({ ...editingProject, competencesDetaillees: list });
  };
  const removeCompDetail = (index: number) => {
    if (!editingProject) return;
    const list = (editingProject.competencesDetaillees || []).filter((_, i) => i !== index);
    setEditingProject({ ...editingProject, competencesDetaillees: list });
  };

  // Édition des preuves du tableau E5
  const updateE5Preuve = (
    realisationId: string,
    preuveIndex: number,
    field: "competence" | "preuve" | "description",
    value: string
  ) => {
    setRealisationsE5((prev) =>
      prev.map((r) => {
        if (r.id !== realisationId) return r;
        const preuves = [...(r.preuves || [])];
        preuves[preuveIndex] = { ...preuves[preuveIndex], [field]: value };
        return { ...r, preuves };
      })
    );
  };
  const saveE5 = () => {
    persist({ realisationsE5 });
  };

  // Skill handlers
  const handleEditSkill = (skill: Skill) => {
    setEditingSkill({...skill});
    setIsSkillDialogOpen(true);
  };

  const handleSaveSkill = () => {
    if (editingSkill) {
      const updated = skills.map(s => s.id === editingSkill.id ? editingSkill : s);
      setSkills(updated);
      persist({ skills: updated });
      setIsSkillDialogOpen(false);
      setEditingSkill(null);
    }
  };

  const handleDeleteSkill = (skillId: number) => {
    const updated = skills.filter(s => s.id !== skillId);
    setSkills(updated);
    persist({ skills: updated });
  };

  // Article handlers
  const handleEditArticle = (article: VeilleArticle) => {
    setEditingArticle({...article});
    setIsArticleDialogOpen(true);
  };

  const handleSaveArticle = () => {
    if (editingArticle) {
      const updated = veilleArticles.map(a => a.id === editingArticle.id ? editingArticle : a);
      setVeilleArticles(updated);
      persist({ veilleArticles: updated });
      setIsArticleDialogOpen(false);
      setEditingArticle(null);
    }
  };

  const handleDeleteArticle = (articleId: number) => {
    const updated = veilleArticles.filter(a => a.id !== articleId);
    setVeilleArticles(updated);
    persist({ veilleArticles: updated });
  };

  const loadFiles = useCallback(async () => {
    setIsLoadingFiles(true);
    try {
      const response = await fetch("/api/files");
      if (response.ok) {
        const data = await response.json();
        setUploadedFiles(data.files || []);
      }
    } catch (error) {
      console.error("Error loading files:", error);
    } finally {
      setIsLoadingFiles(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "preuves") {
      loadFiles();
    }
  }, [activeTab, loadFiles]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress(`Upload de ${file.name}... (${i + 1}/${files.length})`);
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", selectedFolder);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setUploadedFiles((prev) => [{
            url: data.url,
            pathname: data.pathname,
            filename: data.filename,
            folder: selectedFolder,
            uploadedAt: new Date().toISOString(),
            size: file.size,
          }, ...prev]);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }

    setIsUploading(false);
    setUploadProgress("");
    e.target.value = "";
  };

  const handleDelete = async (url: string) => {
    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        setUploadedFiles((prev) => prev.filter((f) => f.url !== url));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const folders = [
    { value: "preuves", label: "Preuves de competences" },
    { value: "projects", label: "Apercu projet - (Image principale)" },
    { value: "gallery/m2l-dynamique", label: "Galerie - Site Dynamique M2L" },
    { value: "gallery/ferme-laroche", label: "Galerie - Stage Ferme Laroche" },
    { value: "gallery/m2l-statique", label: "Galerie - Site Statique M2L" },
    { value: "gallery/gsb", label: "Galerie - GSB Gestion Frais" },
    { value: "gallery/claviers-citoyens", label: "Galerie - Aux Claviers Citoyens" },
    { value: "gallery/vivonsexpo", label: "Galerie - VivonsExpo" },
    { value: "screenshots", label: "Screenshots generaux" },
  ];

  const stats = [
    { 
      title: "Realisations", 
      count: projects.length, 
      icon: FolderKanban,
      description: "Projets documentes",
      color: "bg-blue-500/10 text-blue-500"
    },
    { 
      title: "Competences", 
      count: skills.length, 
      icon: GraduationCap,
      description: "Technologies maitrisees",
      color: "bg-emerald-500/10 text-emerald-500"
    },
    { 
      title: "Articles Veille", 
      count: veilleArticles.length, 
      icon: Newspaper,
      description: "Articles de veille",
      color: "bg-amber-500/10 text-amber-500"
    },
    { 
      title: "Entrees E5", 
      count: realisationsE5.length, 
      icon: LayoutDashboard,
      description: "Realisations E5",
      color: "bg-purple-500/10 text-purple-500"
    },
  ];

  const filteredFiles = uploadedFiles.filter(
    (f) => selectedFolder === "all" || f.folder === selectedFolder || f.pathname.startsWith(selectedFolder)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card hidden lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                D
              </div>
              <span className="font-semibold text-foreground">Admin Panel</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Navigation
            </p>
            {[
              { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
              { id: "projects", label: "Realisations", icon: FolderKanban },
              { id: "preuves", label: "Preuves / Screenshots", icon: ImageIcon },
              { id: "skills", label: "Competences", icon: GraduationCap },
              { id: "veille", label: "Veille", icon: Newspaper },
              { id: "e5", label: "Tableau E5", icon: FileText },
              { id: "profile", label: "Profil", icon: User },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}

            <div className="pt-4">
              <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Liens rapides
              </p>
              <Link
                href="/"
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                Voir le site
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Link>
            </div>
          </nav>

          {/* User section */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                DG
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">GARNIER Dylan</p>
                <p className="text-xs text-muted-foreground truncate">Administrateur</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Deconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            D
          </div>
          <span className="font-semibold">Admin</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <Eye className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              {activeTab === "overview" && "Tableau de bord"}
              {activeTab === "projects" && "Gestion des realisations"}
              {activeTab === "preuves" && "Preuves et Screenshots"}
              {activeTab === "skills" && "Gestion des competences"}
              {activeTab === "veille" && "Articles de veille"}
              {activeTab === "e5" && "Tableau E5 - Preuves & compétences"}
              {activeTab === "profile" && "Informations du profil"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {activeTab === "overview" && "Vue d'ensemble de votre portfolio"}
              {activeTab === "projects" && "Ajoutez, modifiez ou supprimez vos projets"}
              {activeTab === "preuves" && "Uploadez vos captures d'ecran et preuves de competences"}
              {activeTab === "skills" && "Gerez vos competences techniques"}
              {activeTab === "veille" && "Gerez vos articles de veille technologique"}
              {activeTab === "e5" && "Modifiez les preuves et compétences du tableau de synthèse E5"}
              {activeTab === "profile" && "Modifiez vos informations personnelles"}
            </p>
          </div>

          {saveStatus !== "idle" && (
            <div
              data-testid="save-status"
              className={`mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                saveStatus === "saving"
                  ? "bg-amber-500/10 text-amber-600"
                  : saveStatus === "saved"
                  ? "bg-green-500/10 text-green-600"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {saveStatus === "saving" && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Enregistrement…
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <Check className="h-4 w-4" /> Modifications publiées sur le site
                </>
              )}
              {saveStatus === "error" && (
                <>
                  <X className="h-4 w-4" /> Échec de l&apos;enregistrement
                </>
              )}
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <Card key={stat.title} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-3xl font-bold text-foreground mt-1">{stat.count}</p>
                          <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.color}`}>
                          <stat.icon className="h-6 w-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Actions rapides</CardTitle>
                  <CardDescription>Accedez rapidement aux fonctionnalites principales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("projects")}>
                      <Plus className="w-5 h-5" />
                      <span className="text-xs">Nouvelle realisation</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("preuves")}>
                      <Upload className="w-5 h-5" />
                      <span className="text-xs">Upload preuves</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("skills")}>
                      <Plus className="w-5 h-5" />
                      <span className="text-xs">Nouvelle competence</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("veille")}>
                      <Plus className="w-5 h-5" />
                      <span className="text-xs">Nouvel article</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                      <Link href="/" target="_blank">
                        <Eye className="w-5 h-5" />
                        <span className="text-xs">Voir le site</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Projects */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Dernieres realisations</CardTitle>
                      <CardDescription>Vos projets les plus recents</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("projects")}>
                      Voir tout
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {projects.slice(0, 3).map((project) => (
                        <div 
                          key={project.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm text-foreground truncate">{project.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{project.type} - {project.status}</p>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Competences principales</CardTitle>
                      <CardDescription>Vos technologies maitrisees</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("skills")}>
                      Voir tout
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {skills.slice(0, 4).map((skill) => (
                        <div 
                          key={skill.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-sm text-foreground">{skill.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                              {skill.category}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < skill.level ? "bg-primary" : "bg-border"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Info Card */}
              <Card className="border-border/50 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Enregistrement automatique</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Vos modifications (réalisations, compétences, veille, tableau E5 et profil) sont
                        <span className="font-medium text-foreground"> enregistrées automatiquement et publiées sur le site</span> à chaque action.
                        Un indicateur confirme la sauvegarde en haut de page.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Preuves Tab */}
          {activeTab === "preuves" && (
            <div className="space-y-6">
              {/* Upload Section */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Uploader des fichiers
                  </CardTitle>
                  <CardDescription>
                    Glissez-deposez ou selectionnez vos captures d&apos;ecran et preuves
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="folder" className="mb-2 block">Dossier de destination</Label>
                      <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un dossier" />
                        </SelectTrigger>
                        <SelectContent>
                          {folders.map((folder) => (
                            <SelectItem key={folder.value} value={folder.value}>
                              {folder.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={isUploading}
                    />
                    <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isUploading ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary/30"
                    }`}>
                      {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="text-sm text-muted-foreground">{uploadProgress}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-3 rounded-full bg-primary/10">
                            <ImageIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Cliquez ou glissez vos fichiers ici</p>
                            <p className="text-sm text-muted-foreground">PNG, JPG, GIF jusqu&apos;a 10MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Files List */}
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Fichiers uploades</CardTitle>
                    <CardDescription>
                      {filteredFiles.length} fichier{filteredFiles.length !== 1 ? "s" : ""} 
                      {selectedFolder !== "all" && ` dans "${folders.find(f => f.value === selectedFolder)?.label || selectedFolder}"`}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={loadFiles} disabled={isLoadingFiles}>
                    {isLoadingFiles ? <Loader2 className="h-4 w-4 animate-spin" /> : "Actualiser"}
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingFiles ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : filteredFiles.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Aucun fichier uploade</p>
                      <p className="text-sm">Commencez par uploader des captures d&apos;ecran</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFiles.map((file) => (
                        <div 
                          key={file.url}
                          className="group relative border border-border rounded-lg overflow-hidden bg-secondary/20"
                        >
                          <div className="aspect-video relative">
                            <Image
                              src={file.url}
                              alt={file.filename}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <p className="font-medium text-sm text-foreground truncate" title={file.filename}>
                              {file.filename}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)} - {file.folder}
                            </p>
                          </div>
                          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="secondary" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => copyToClipboard(file.url)}
                            >
                              {copiedUrl === file.url ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                            <Button 
                              variant="secondary" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => window.open(file.url, "_blank")}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleDelete(file.url)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Usage Info */}
              <Card className="border-border/50 bg-blue-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Comment utiliser les images</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Après l&apos;upload, copiez l&apos;URL de l&apos;image puis collez-la dans le champ
                        <span className="font-medium text-foreground"> « URL de l&apos;image »</span> d&apos;une réalisation
                        (onglet Réalisations → bouton modifier). La modification est enregistrée et publiée automatiquement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{projects.length} realisations</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Nouvelle realisation</DialogTitle>
                      <DialogDescription>
                        Ajoutez une nouvelle realisation a votre portfolio
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Titre du projet</Label>
                        <Input 
                          id="title" 
                          placeholder="Ex: Site e-commerce" 
                          value={newProject.title}
                          onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description courte</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Decrivez brievement le projet..." 
                          value={newProject.shortDescription}
                          onChange={(e) => setNewProject({...newProject, shortDescription: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="fullDescription">Description complete</Label>
                        <Textarea 
                          id="fullDescription" 
                          placeholder="Description detaillee du projet..." 
                          rows={4}
                          value={newProject.fullDescription}
                          onChange={(e) => setNewProject({...newProject, fullDescription: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="context">Contexte</Label>
                        <Input 
                          id="context" 
                          placeholder="Ex: Formation BTS SIO" 
                          value={newProject.context}
                          onChange={(e) => setNewProject({...newProject, context: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="type">Type</Label>
                          <Select 
                            value={newProject.type} 
                            onValueChange={(value: "Professionnel" | "Personnel" | "Scolaire") => setNewProject({...newProject, type: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Type de projet" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Scolaire">Scolaire</SelectItem>
                              <SelectItem value="Professionnel">Professionnel</SelectItem>
                              <SelectItem value="Personnel">Personnel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="status">Statut</Label>
                          <Select 
                            value={newProject.status} 
                            onValueChange={(value: "En cours" | "Terminé" | "En pause") => setNewProject({...newProject, status: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="En cours">En cours</SelectItem>
                              <SelectItem value="Terminé">Terminé</SelectItem>
                              <SelectItem value="En pause">En pause</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="startDate">Date de debut</Label>
                          <Input 
                            id="startDate" 
                            placeholder="Ex: 2024" 
                            value={newProject.startDate}
                            onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="endDate">Date de fin (optionnel)</Label>
                          <Input 
                            id="endDate" 
                            placeholder="Ex: 2025" 
                            value={newProject.endDate}
                            onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="technologies">Technologies (separees par des virgules)</Label>
                        <Input 
                          id="technologies" 
                          placeholder="Ex: PHP, MySQL, HTML, CSS" 
                          value={newProject.technologies}
                          onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="objectives">Objectifs (un par ligne)</Label>
                        <Textarea 
                          id="objectives" 
                          placeholder="Objectif 1&#10;Objectif 2&#10;Objectif 3" 
                          rows={3}
                          value={newProject.objectives}
                          onChange={(e) => setNewProject({...newProject, objectives: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="competences">Competences validees (une par ligne)</Label>
                        <Textarea 
                          id="competences" 
                          placeholder="Competence 1&#10;Competence 2" 
                          rows={3}
                          value={newProject.competences}
                          onChange={(e) => setNewProject({...newProject, competences: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="outline">Annuler</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={handleAddProject} disabled={!newProject.title}>
                          <Save className="w-4 h-4 mr-2" />
                          Enregistrer
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            project.type === "Professionnel" 
                              ? "bg-blue-500/10 text-blue-500"
                              : project.type === "Scolaire"
                              ? "bg-amber-500/10 text-amber-500"
                              : "bg-emerald-500/10 text-emerald-500"
                          }`}>
                            <FolderKanban className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">{project.type} - {project.status}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground hidden sm:block">
                            {project.technologies.slice(0, 3).join(", ")}
                          </span>
                          <Button variant="ghost" size="icon" onClick={() => handleEditProject(project)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteProject(project.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Edit Project Dialog */}
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Modifier la realisation</DialogTitle>
                    <DialogDescription>
                      Modifiez les informations de votre projet
                    </DialogDescription>
                  </DialogHeader>
                  {editingProject && (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Titre du projet</Label>
                        <Input 
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Description courte</Label>
                        <Textarea 
                          value={editingProject.shortDescription}
                          onChange={(e) => setEditingProject({...editingProject, shortDescription: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Description complete</Label>
                        <Textarea 
                          rows={4}
                          value={editingProject.fullDescription}
                          onChange={(e) => setEditingProject({...editingProject, fullDescription: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Contexte</Label>
                        <Input 
                          value={editingProject.context}
                          onChange={(e) => setEditingProject({...editingProject, context: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Type</Label>
                          <Select 
                            value={editingProject.type} 
                            onValueChange={(value: "Professionnel" | "Personnel" | "Scolaire") => setEditingProject({...editingProject, type: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Scolaire">Scolaire</SelectItem>
                              <SelectItem value="Professionnel">Professionnel</SelectItem>
                              <SelectItem value="Personnel">Personnel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Statut</Label>
                          <Select 
                            value={editingProject.status} 
                            onValueChange={(value: "En cours" | "Terminé" | "En pause") => setEditingProject({...editingProject, status: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="En cours">En cours</SelectItem>
                              <SelectItem value="Terminé">Terminé</SelectItem>
                              <SelectItem value="En pause">En pause</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Date de debut</Label>
                          <Input 
                            value={editingProject.startDate}
                            onChange={(e) => setEditingProject({...editingProject, startDate: e.target.value})}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Date de fin</Label>
                          <Input 
                            value={editingProject.endDate || ""}
                            onChange={(e) => setEditingProject({...editingProject, endDate: e.target.value || undefined})}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Technologies (separees par des virgules)</Label>
                        <Input 
                          value={editingProject.technologies.join(", ")}
                          onChange={(e) => setEditingProject({...editingProject, technologies: e.target.value.split(",").map(t => t.trim()).filter(t => t)})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Objectifs (un par ligne)</Label>
                        <Textarea 
                          rows={3}
                          value={editingProject.objectives.join("\n")}
                          onChange={(e) => setEditingProject({...editingProject, objectives: e.target.value.split("\n").filter(o => o.trim())})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Competences validees (une par ligne)</Label>
                        <Textarea 
                          rows={3}
                          value={editingProject.competences.join("\n")}
                          onChange={(e) => setEditingProject({...editingProject, competences: e.target.value.split("\n").filter(c => c.trim())})}
                        />
                      </div>
                      {/* Compétences détaillées : argument + preuve */}
                      <div className="grid gap-3 rounded-lg border border-border p-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-semibold">Compétences Bloc 1 — argument &amp; preuve</Label>
                          <Button type="button" variant="outline" size="sm" onClick={addCompDetail} data-testid="add-comp-detail-btn">
                            <Plus className="w-4 h-4 mr-1" /> Ajouter
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Pour chaque compétence : son code (C1.1 à C1.6), son intitulé, l&apos;argument (contexte → action → résultat) et la preuve concrète. Ces éléments s&apos;affichent sur la page de la réalisation.
                        </p>
                        {(editingProject.competencesDetaillees || []).map((comp, index) => (
                          <div key={index} className="grid gap-2 rounded-md bg-secondary/30 p-3">
                            <div className="flex items-center gap-2">
                              <Input
                                className="w-24"
                                placeholder="C1.3"
                                value={comp.code}
                                onChange={(e) => updateCompDetail(index, "code", e.target.value)}
                              />
                              <Input
                                placeholder="Intitulé de la compétence"
                                value={comp.intitule}
                                onChange={(e) => updateCompDetail(index, "intitule", e.target.value)}
                              />
                              <Button type="button" variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => removeCompDetail(index)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <Textarea
                              rows={2}
                              placeholder="Argument : contexte → action → résultat"
                              value={comp.argumentaire}
                              onChange={(e) => updateCompDetail(index, "argumentaire", e.target.value)}
                            />
                            <Input
                              placeholder="Preuve : livrable concret (capture, code, MCD…)"
                              value={comp.preuve}
                              onChange={(e) => updateCompDetail(index, "preuve", e.target.value)}
                            />
                          </div>
                        ))}
                        {(editingProject.competencesDetaillees || []).length === 0 && (
                          <p className="text-xs text-muted-foreground italic">Aucune compétence détaillée. Cliquez sur « Ajouter ».</p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label>URL de l&apos;image</Label>
                        <Input 
                          value={editingProject.image}
                          onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>URL de demonstration (optionnel)</Label>
                        <Input 
                          value={editingProject.demoUrl || ""}
                          onChange={(e) => setEditingProject({...editingProject, demoUrl: e.target.value || undefined})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>URL GitHub (optionnel)</Label>
                        <Input 
                          value={editingProject.githubUrl || ""}
                          onChange={(e) => setEditingProject({...editingProject, githubUrl: e.target.value || undefined})}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
                    <Button onClick={handleSaveProject}>
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{skills.length} competences</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {skills.map((skill) => (
                  <Card key={skill.id} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">{skill.name}</h3>
                          <p className="text-sm text-muted-foreground">{skill.category}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2.5 h-2.5 rounded-full ${
                                  i < skill.level ? "bg-primary" : "bg-border"
                                }`}
                              />
                            ))}
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleEditSkill(skill)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteSkill(skill.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Edit Skill Dialog */}
              <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Modifier la competence</DialogTitle>
                    <DialogDescription>
                      Modifiez les informations de la competence
                    </DialogDescription>
                  </DialogHeader>
                  {editingSkill && (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Nom</Label>
                        <Input 
                          value={editingSkill.name}
                          onChange={(e) => setEditingSkill({...editingSkill, name: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Categorie</Label>
                        <Select 
                          value={editingSkill.category} 
                          onValueChange={(value: "Frontend" | "Backend" | "Database" | "DevOps" | "Autres") => setEditingSkill({...editingSkill, category: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Frontend">Frontend</SelectItem>
                            <SelectItem value="Backend">Backend</SelectItem>
                            <SelectItem value="Database">Database</SelectItem>
                            <SelectItem value="DevOps">DevOps</SelectItem>
                            <SelectItem value="Autres">Autres</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Niveau (1-5)</Label>
                        <div className="flex items-center gap-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setEditingSkill({...editingSkill, level: i + 1})}
                              className={`w-8 h-8 rounded-full border-2 transition-colors ${
                                i < editingSkill.level 
                                  ? "bg-primary border-primary" 
                                  : "bg-transparent border-border hover:border-primary/50"
                              }`}
                            >
                              <span className="sr-only">Niveau {i + 1}</span>
                            </button>
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">{editingSkill.level}/5</span>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea 
                          rows={3}
                          value={editingSkill.description}
                          onChange={(e) => setEditingSkill({...editingSkill, description: e.target.value})}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsSkillDialogOpen(false)}>Annuler</Button>
                    <Button onClick={handleSaveSkill}>
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Veille Tab */}
          {activeTab === "veille" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{veilleArticles.length} articles</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>

              <div className="grid gap-4">
                {veilleArticles.map((article) => (
                  <Card key={article.id} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                            <Newspaper className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{article.title}</h3>
                            <p className="text-sm text-muted-foreground">{article.category} - {article.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditArticle(article)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteArticle(article.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Edit Article Dialog */}
              <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Modifier l&apos;article</DialogTitle>
                    <DialogDescription>
                      Modifiez les informations de l&apos;article de veille
                    </DialogDescription>
                  </DialogHeader>
                  {editingArticle && (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Titre</Label>
                        <Input 
                          value={editingArticle.title}
                          onChange={(e) => setEditingArticle({...editingArticle, title: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Resume</Label>
                        <Textarea 
                          rows={2}
                          value={editingArticle.summary}
                          onChange={(e) => setEditingArticle({...editingArticle, summary: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Contenu</Label>
                        <Textarea 
                          rows={4}
                          value={editingArticle.content}
                          onChange={(e) => setEditingArticle({...editingArticle, content: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Source</Label>
                          <Input 
                            value={editingArticle.source}
                            onChange={(e) => setEditingArticle({...editingArticle, source: e.target.value})}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>URL de la source</Label>
                          <Input 
                            value={editingArticle.sourceUrl}
                            onChange={(e) => setEditingArticle({...editingArticle, sourceUrl: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Date</Label>
                          <Input 
                            value={editingArticle.date}
                            onChange={(e) => setEditingArticle({...editingArticle, date: e.target.value})}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Categorie</Label>
                          <Select 
                            value={editingArticle.category} 
                            onValueChange={(value: "IA" | "Web" | "Sécurité" | "DevOps" | "Autre") => setEditingArticle({...editingArticle, category: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Web">Web</SelectItem>
                              <SelectItem value="IA">IA</SelectItem>
                              <SelectItem value="Sécurité">Sécurité</SelectItem>
                              <SelectItem value="DevOps">DevOps</SelectItem>
                              <SelectItem value="Autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Tags (separes par des virgules)</Label>
                        <Input 
                          value={editingArticle.tags.join(", ")}
                          onChange={(e) => setEditingArticle({...editingArticle, tags: e.target.value.split(",").map(t => t.trim()).filter(t => t)})}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsArticleDialogOpen(false)}>Annuler</Button>
                    <Button onClick={handleSaveArticle}>
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* E5 Tab */}
          {activeTab === "e5" && (
            <div className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Tableau de synthèse E5</CardTitle>
                  <CardDescription>
                    Modifiez, pour chaque réalisation, la preuve et l&apos;argument de chaque compétence du Bloc 1, puis cliquez sur « Enregistrer » pour publier sur le site.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {realisationsE5.map((r) => (
                    <div key={r.id} className="rounded-lg border border-border p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-bold">{r.code}</span>
                        <span className="font-medium text-foreground">{r.titre}</span>
                      </div>
                      <div className="space-y-3">
                        {(r.preuves || []).map((p, idx) => (
                          <div key={idx} className="grid gap-2 rounded-md bg-secondary/30 p-3">
                            <div className="flex items-center gap-2">
                              <Input
                                className="w-28"
                                placeholder="C1.3"
                                value={p.competence}
                                onChange={(e) => updateE5Preuve(r.id, idx, "competence", e.target.value)}
                              />
                              <Input
                                placeholder="Preuve (livrable concret)"
                                value={p.preuve}
                                onChange={(e) => updateE5Preuve(r.id, idx, "preuve", e.target.value)}
                              />
                            </div>
                            <Textarea
                              rows={2}
                              placeholder="Argument / explication"
                              value={p.description}
                              onChange={(e) => updateE5Preuve(r.id, idx, "description", e.target.value)}
                            />
                          </div>
                        ))}
                        {(!r.preuves || r.preuves.length === 0) && (
                          <p className="text-xs text-muted-foreground italic">Aucune preuve enregistrée.</p>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button onClick={saveE5} data-testid="save-e5-btn">
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer le tableau E5
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6 max-w-2xl">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Ces informations sont affichees sur votre portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Nom complet</Label>
                    <Input 
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Titre</Label>
                    <Input 
                      value={personalInfo.title}
                      onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Localisation</Label>
                    <Input 
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Description</Label>
                    <Textarea 
                      rows={4}
                      value={personalInfo.description}
                      onChange={(e) => setPersonalInfo({...personalInfo, description: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>GitHub</Label>
                      <Input 
                        value={personalInfo.github}
                        onChange={(e) => setPersonalInfo({...personalInfo, github: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>LinkedIn</Label>
                      <Input 
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      Cliquez sur « Enregistrer » pour publier vos informations sur le site.
                    </p>
                    <Button onClick={() => persist({ personalInfo })} data-testid="save-profile-btn">
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
