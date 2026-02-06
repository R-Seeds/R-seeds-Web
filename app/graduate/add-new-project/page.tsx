"use client";

import Header from "@/components/Header";
import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  createProject, 
  uploadProjectImage, 
  getGraduates,
  GraduateDTO,
  ProjectCreationRequest,
  ProjectCategory
} from "@/utils/api";
import { toast } from "react-hot-toast";

export default function AddNewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  
  const [graduates, setGraduates] = useState<GraduateDTO[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "AGRICULTURE" as ProjectCategory,
    description: "",
    mission: "",
    vision: "",
    keyFeature: "",
    fundingGoal: 0,
    logo: "/microguard.jpg", // Default logo
  });

  const [team, setTeam] = useState<GraduateDTO[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        const data = await getGraduates();
        setGraduates(data);
      } catch (error) {
        console.error("Failed to fetch graduates:", error);
      }
    };
    fetchGraduates();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const addTeamMember = (grad: GraduateDTO) => {
    if (!team.find(t => t.id === grad.id)) {
      setTeam([...team, grad]);
    }
    setShowTeam(false);
  };

  const removeTeamMember = (id: string) => {
    setTeam(team.filter(t => t.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Front-end validation for mandatory fields required by backend
    if (team.length === 0) {
      toast.error("Please add at least one team member.");
      return;
    }
    if (milestones.length === 0) {
      toast.error("Please add at least one project milestone.");
      return;
    }
    if (links.length === 0) {
      toast.error("Please add at least one project link (e.g., GitHub or Website).");
      return;
    }

    setLoading(true);

    try {
      let logoUrl = formData.logo;
      if (imageFile) {
        logoUrl = await uploadProjectImage(imageFile);
      }

      const request: ProjectCreationRequest = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        mission: formData.mission,
        vision: formData.vision,
        logo: logoUrl,
        keyFeature: formData.keyFeature,
        status: "ACTIVE",
        fundingInfo: {
          goal: Number(formData.fundingGoal),
        },
        links: links,
        team: team.map(t => ({ id: t.id })),
        milestones: milestones.map(m => ({
          ...m,
          budget: Number(m.budget),
          status: m.status === 'COMPLETED' ? 'COMPLETED' : 'IN_PROGRESS'
        })),
      };

      await createProject(request);
      toast.success("Project created successfully!");
      router.push("/graduate");
    } catch (error: any) {
      console.error("Error creating project:", error);
      toast.error(error.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Header />
      <Sidebar />

      <div className="flex justify-center items-start pt-10 px-2 pb-20">
        <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-xl p-12 border mx-auto">
          <div className="flex items-center gap-6 mb-10">
            <button
              className="flex-shrink-0 w-14 h-14 rounded-full bg-[#f3f4f6] shadow-md flex items-center justify-center"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
              aria-label="Back"
              onClick={() => window.history.back()}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00c399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-[#00c399] text-center w-full">Add New Project</h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-bold mb-1">Project Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="eg: SkyScout"
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              >
                <option value="AGRICULTURE">Agriculture</option>
                <option value="HEALTH">Health</option>
                <option value="TECHNOLOGY">Technology</option>
                <option value="EDUCATION">Education</option>
                <option value="FINANCE">Finance</option>
                <option value="BUSINESS">Business</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Description</label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write a brief about your project..."
                className="w-full border rounded px-3 py-2 bg-[#fafbfc] min-h-[100px]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Project Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Mission</label>
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleInputChange}
                placeholder="Describe the project's mission..."
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Vision</label>
              <textarea
                name="vision"
                value={formData.vision}
                onChange={handleInputChange}
                placeholder="Describe the Project's vision..."
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Key Features</label>
              <textarea
                name="keyFeature"
                value={formData.keyFeature}
                onChange={handleInputChange}
                placeholder="List main features"
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Team Members ({team.length}) <span className="text-red-500 font-normal">*Required</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {team.map(m => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 group transition-all hover:bg-white hover:shadow-md hover:border-brand/20">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm">
                        {m.user?.name?.charAt(0) || 'G'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 line-clamp-1">{m.user?.name || 'Anonymous'}</span>
                        <span className="text-xs text-gray-500 line-clamp-1">{m.user?.email}</span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeTeamMember(m.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove member"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-white text-brand border-2 border-dashed border-brand/30 rounded-xl py-3 font-bold hover:bg-brand/5 transition-all"
                onClick={() => setShowTeam(true)}
              >
                <span className="text-xl font-bold">+</span> Add Team Member
              </button>
            </div>

            <div>
              <label className="block font-bold mb-1">Project Milestones ({milestones.length}) <span className="text-red-500 font-normal">*Required</span></label>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-[#00c399] text-white rounded py-2 font-semibold mb-2"
                onClick={() => setShowMilestone(true)}
              >
                <span className="text-lg font-bold">+</span> Add Milestones
              </button>
            </div>

            <div>
              <label className="block font-bold mb-1">Funding Goal ($)</label>
              <input
                type="number"
                name="fundingGoal"
                required
                value={formData.fundingGoal}
                onChange={handleInputChange}
                placeholder="Funding Goal"
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Links & Docs ({links.length}) <span className="text-red-500 font-normal">*Required</span></label>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-[#00c399] text-white rounded py-2 font-semibold mb-2"
                onClick={() => setShowLinks(true)}
              >
                <span className="text-lg font-bold">+</span> Add Link
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#00c399] text-white rounded py-3 font-semibold mt-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating...' : 'Add Project'}
            </button>
          </form>
        </div>
      </div>

      {/* Team Modal */}
      {showTeam && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center" onClick={() => setShowTeam(false)}>
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg border relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={() => setShowTeam(false)}>&times;</button>
            <h2 className="text-xl font-bold text-center text-[#00c399] mb-4">Team Members</h2>
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Search graduates..." 
                className="w-full border rounded px-3 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {graduates.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No graduates found in the database.</p>
              ) : graduates.filter(g => 
                (g.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 g.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()))
              ).length === 0 ? (
                <p className="text-center text-gray-500 py-4">No graduates match your search.</p>
              ) : (
                graduates
                  .filter(g => 
                    (g.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                     g.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map(g => (
                    <div key={g.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-brand/20 transition-all">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">{g.user?.name || 'Anonymous Graduate'}</span>
                        <span className="text-xs text-gray-500">{g.user?.email}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => addTeamMember(g)}
                        className={`px-4 py-1 rounded-full text-sm font-bold transition-all ${
                          team.find(t => t.id === g.id) 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-brand/10 text-brand hover:bg-brand hover:text-white'
                        }`}
                        disabled={!!team.find(t => t.id === g.id)}
                      >
                        {team.find(t => t.id === g.id) ? 'Added' : 'Add'}
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Simplified Milestone Modal */}
      {showMilestone && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center" onClick={() => setShowMilestone(false)}>
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg border relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={() => setShowMilestone(false)}>&times;</button>
            <h2 className="text-xl font-bold text-center text-[#00c399] mb-4">Add Milestone</h2>
            <form onSubmit={(e: any) => {
              e.preventDefault();
              const m = {
                title: e.target.title.value,
                description: e.target.description.value,
                budget: e.target.budget.value,
                completionDate: e.target.completionDate.value,
                status: 'IN_PROGRESS'
              };
              setMilestones([...milestones, m]);
              setShowMilestone(false);
            }} className="space-y-3">
              <input name="title" required placeholder="Milestone Title" className="w-full border rounded px-3 py-2" />
              <input name="description" required placeholder="Short Description" className="w-full border rounded px-3 py-2" />
              <input name="budget" type="number" required placeholder="Budget" className="w-full border rounded px-3 py-2" />
              <input name="completionDate" type="date" required className="w-full border rounded px-3 py-2" />
              <button type="submit" className="w-full bg-[#00c399] text-white rounded py-2 font-semibold">Save Milestone</button>
            </form>
          </div>
        </div>
      )}

      {/* Simplified Links Modal */}
      {showLinks && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center" onClick={() => setShowLinks(false)}>
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg border relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={() => setShowLinks(false)}>&times;</button>
            <h2 className="text-xl font-bold text-center text-[#00c399] mb-4">Add Link</h2>
            <form onSubmit={(e: any) => {
              e.preventDefault();
              const l = { label: e.target.label.value, url: e.target.url.value };
              setLinks([...links, l]);
              setShowLinks(false);
            }} className="space-y-3">
              <input name="label" required placeholder="Label (e.g. GitHub)" className="w-full border rounded px-3 py-2" />
              <input name="url" required type="url" placeholder="URL" className="w-full border rounded px-3 py-2" />
              <button type="submit" className="w-full bg-[#00c399] text-white rounded py-2 font-semibold">Save Link</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
