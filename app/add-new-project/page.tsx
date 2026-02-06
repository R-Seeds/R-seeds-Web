"use client";

import Header from "@/components/Header";
import Sidebar from "../user/Sidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { uploadProjectImage, createProject, getAuthToken, type ProjectLink, type Milestone, type GraduateDTO } from "@/utils/api";

export default function AddNewProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"EDUCATION" | "AGRICULTURE" | "FINANCE" | "BUSINESS" | "HEALTH" | "SOCIAL" | "TRANSPORTATION" | "ECOMMERCE" | "GOVERNMENT">("HEALTH");
  const [description, setDescription] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [keyFeature, setKeyFeature] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "ARCHIVED">("ACTIVE");

  // Modals
  const [showMilestone, setShowMilestone] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  // Milestones
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState({
    title: "",
    description: "",
    completionDate: "",
    budget: "",
    status: "IN_PROGRESS" as "IN_PROGRESS" | "COMPLETED",
  });

  // Links
  const [links, setLinks] = useState<ProjectLink[]>([]);
  const [currentLink, setCurrentLink] = useState({ label: "", url: "" });

  // Team
  const [team, setTeam] = useState<GraduateDTO[]>([]);
  const [currentTeamMember, setCurrentTeamMember] = useState({ id: "" });

  useEffect(() => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  if (!isAuthenticated) return null;

  const handleImageUpload = async (file: File) => {
    try {
      setIsLoading(true);
      const url = await uploadProjectImage(file);
      setLogoUrl(url);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMilestone = () => {
    if (!currentMilestone.title || !currentMilestone.description) {
      setError("Please fill in milestone title and description");
      return;
    }
    const milestone: Milestone = {
      title: currentMilestone.title,
      description: currentMilestone.description,
      completionDate: currentMilestone.completionDate,
      budget: parseFloat(currentMilestone.budget) || 0,
      status: currentMilestone.status,
    };
    setMilestones([...milestones, milestone]);
    setCurrentMilestone({ title: "", description: "", completionDate: "", budget: "", status: "IN_PROGRESS" });
    setShowMilestone(false);
  };

  const handleAddLink = () => {
    if (!currentLink.label || !currentLink.url) {
      setError("Please fill in link label and URL");
      return;
    }
    setLinks([...links, { ...currentLink }]);
    setCurrentLink({ label: "", url: "" });
    setShowLinks(false);
  };

  const handleAddTeamMember = () => {
    if (!currentTeamMember.id) {
      setError("Please enter graduate ID (UUID)");
      return;
    }
    setTeam([...team, { id: currentTeamMember.id }]);
    setCurrentTeamMember({ id: "" });
    setShowTeam(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!title || !description || !mission || !vision || !keyFeature) {
      setError("Please fill in all required fields");
      return;
    }

    if (!logoUrl) {
      setError("Please upload a project image");
      return;
    }

    if (links.length === 0) {
      setError("Please add at least one link");
      return;
    }

    if (milestones.length === 0) {
      setError("Please add at least one milestone");
      return;
    }

    // Team members are required by backend
    if (team.length === 0) {
      setError("Please add at least one team member. You need to add a Graduate ID.");
      return;
    }

    if (!fundingGoal || parseFloat(fundingGoal) <= 0) {
      setError("Please enter a valid funding goal");
      return;
    }

    setIsLoading(true);

    try {
      const projectData = {
        title,
        category,
        description,
        mission,
        vision,
        logo: logoUrl,
        keyFeature,
        status,
        fundingInfo: {
          goal: parseFloat(fundingGoal),
          raised: 0,
        },
        links,
        team, // Team is required by backend
        milestones,
      };

      console.log('Creating project with data:', JSON.stringify(projectData, null, 2));
      const createdProject = await createProject(projectData);
      console.log('Project created successfully:', createdProject);
      // Redirect to user dashboard with a refresh parameter to trigger refetch
      router.push("/user?refresh=true");
    } catch (err: any) {
      console.error('Error creating project:', err);
      const errorMessage = err.message || "Failed to create project";
      setError(errorMessage);
      // Show more detailed error if available
      if (err.response) {
        console.error('Error response:', err.response);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Header />
      <Sidebar />

      <div className="flex justify-center items-start pt-10 px-2">
        <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-xl p-12 border mx-auto">
          <div className="flex items-center gap-6 mb-10">
            <button
              className="flex-shrink-0 w-14 h-14 rounded-full bg-[#f3f4f6] shadow-md flex items-center justify-center"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
              aria-label="Back"
              onClick={() => router.back()}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00c399"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-[#00c399] text-center w-full" style={{ letterSpacing: 0 }}>
              Add New Project
            </h1>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-1">Project Title *</label>
              <input
                type="text"
                placeholder="eg: SkyScout"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
                required
                disabled={isLoading}
              >
                <option value="EDUCATION">Education</option>
                <option value="AGRICULTURE">Agriculture</option>
                <option value="FINANCE">Finance</option>
                <option value="BUSINESS">Business</option>
                <option value="HEALTH">Health</option>
                <option value="SOCIAL">Social</option>
                <option value="TRANSPORTATION">Transportation</option>
                <option value="ECOMMERCE">E-commerce</option>
                <option value="GOVERNMENT">Government</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Description *</label>
              <textarea
                placeholder="Write a brief about your project..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
                rows={4}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Project Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setLogoFile(file);
                    handleImageUpload(file);
                  }
                }}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
                required
                disabled={isLoading}
              />
              {logoUrl && (
                <p className="text-sm text-green-600 mt-1">Image uploaded successfully</p>
              )}
            </div>

            <div>
              <label className="block font-bold mb-1">Mission *</label>
              <textarea
                placeholder="Describe the project's mission..."
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
                rows={3}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Vision *</label>
              <textarea
                placeholder="Describe the Project's vision..."
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
                rows={3}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Key Features *</label>
              <textarea
                placeholder="List main features"
                value={keyFeature}
                onChange={(e) => setKeyFeature(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
                rows={3}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "ACTIVE" | "ARCHIVED")}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
                required
                disabled={isLoading}
              >
                <option value="ACTIVE">Active</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Funding Goal *</label>
              <input
                type="number"
                placeholder="Funding Goal"
                value={fundingGoal}
                onChange={(e) => setFundingGoal(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
                min="0"
                step="0.01"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Team Members * ({team.length} added)</label>
              <p className="text-xs text-gray-500 mb-2">At least one graduate ID is required</p>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-[#00c399] text-white rounded py-2 font-semibold mb-2"
                onClick={() => setShowTeam(true)}
                disabled={isLoading}
              >
                <span className="text-lg font-bold">+</span> Add Members
              </button>
              {team.length > 0 && (
                <div className="space-y-2 mt-2">
                  {team.map((member, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">Graduate ID: {member.id}</span>
                      <button
                        type="button"
                        onClick={() => setTeam(team.filter((_, i) => i !== idx))}
                        className="text-red-500 text-sm"
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block font-bold mb-1">Project Milestones * ({milestones.length} added)</label>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-[#00c399] text-white rounded py-2 font-semibold mb-2"
                onClick={() => setShowMilestone(true)}
                disabled={isLoading}
              >
                <span className="text-lg font-bold">+</span> Add Milestones
              </button>
              {milestones.length > 0 && (
                <div className="space-y-2 mt-2">
                  {milestones.map((milestone, idx) => (
                    <div key={idx} className="bg-gray-50 p-2 rounded">
                      <p className="text-sm font-semibold">{milestone.title}</p>
                      <p className="text-xs text-gray-600">{milestone.description}</p>
                      <button
                        type="button"
                        onClick={() => setMilestones(milestones.filter((_, i) => i !== idx))}
                        className="text-red-500 text-xs mt-1"
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block font-bold mb-1">Links & Docs * ({links.length} added)</label>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-[#00c399] text-white rounded py-2 font-semibold mb-2"
                onClick={() => setShowLinks(true)}
                disabled={isLoading}
              >
                <span className="text-lg font-bold">+</span> Add Link
              </button>
              {links.length > 0 && (
                <div className="space-y-2 mt-2">
                  {links.map((link, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{link.label}: {link.url}</span>
                      <button
                        type="button"
                        onClick={() => setLinks(links.filter((_, i) => i !== idx))}
                        className="text-red-500 text-sm"
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00c399] text-white rounded py-3 font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Project..." : "Add Project"}
            </button>
          </form>
        </div>
      </div>

      {/* Milestone Modal */}
      {showMilestone && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center"
          onClick={() => setShowMilestone(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl border relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowMilestone(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-center text-[#00c399] mb-4">Milestones</h2>
            <div className="space-y-3 bg-[#f6fafd] p-4 rounded-lg">
              <input
                type="text"
                placeholder="Milestone Title"
                value={currentMilestone.title}
                onChange={(e) => setCurrentMilestone({ ...currentMilestone, title: e.target.value })}
                className="w-full border rounded px-3 py-2 bg-white"
              />
              <input
                type="text"
                placeholder="Short Description"
                value={currentMilestone.description}
                onChange={(e) => setCurrentMilestone({ ...currentMilestone, description: e.target.value })}
                className="w-full border rounded px-3 py-2 bg-white"
              />
              <select
                value={currentMilestone.status}
                onChange={(e) => setCurrentMilestone({ ...currentMilestone, status: e.target.value as any })}
                className="w-full border rounded px-3 py-2 bg-white"
              >
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <input
                type="number"
                placeholder="Budget"
                value={currentMilestone.budget}
                onChange={(e) => setCurrentMilestone({ ...currentMilestone, budget: e.target.value })}
                className="w-full border rounded px-3 py-2 bg-white"
                min="0"
                step="0.01"
              />
              <input
                type="date"
                placeholder="Expected Completion Date"
                value={currentMilestone.completionDate}
                onChange={(e) => setCurrentMilestone({ ...currentMilestone, completionDate: e.target.value })}
                className="w-full border rounded px-3 py-2 bg-white"
              />
            </div>
            <button
              className="w-full bg-[#00c399] text-white rounded py-2 font-semibold mt-4"
              onClick={handleAddMilestone}
            >
              Save Milestone
            </button>
          </div>
        </div>
      )}

      {/* Team Modal */}
      {showTeam && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center"
          onClick={() => setShowTeam(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl border relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowTeam(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-center text-[#00c399] mb-4">Team Members</h2>
            <div className="space-y-3 bg-[#f6fafd] p-4 rounded-lg">
              <input
                type="text"
                placeholder="Graduate ID (UUID)"
                value={currentTeamMember.id}
                onChange={(e) => setCurrentTeamMember({ id: e.target.value })}
                className="w-full border rounded px-3 py-2 bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">Enter the UUID of the graduate to add to the team</p>
            </div>
            <button
              className="w-full bg-[#00c399] text-white rounded py-2 font-semibold mt-4"
              onClick={handleAddTeamMember}
            >
              Save Team Member
            </button>
          </div>
        </div>
      )}

      {/* Links Modal */}
      {showLinks && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center"
          onClick={() => setShowLinks(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl border relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowLinks(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-center text-[#00c399] mb-4">Links & Docs</h2>
            <div className="space-y-3 bg-[#f6fafd] p-4 rounded-lg">
              <input
                type="text"
                placeholder="Label (e.g. Project website, GitHub repo...)"
                value={currentLink.label}
                onChange={(e) => setCurrentLink({ ...currentLink, label: e.target.value })}
                className="w-full border rounded px-3 py-2 bg-white"
              />
              <input
                type="url"
                placeholder="Enter Link URL"
                value={currentLink.url}
                onChange={(e) => setCurrentLink({ ...currentLink, url: e.target.value })}
                className="w-full border rounded px-3 py-2 bg-white"
              />
            </div>
            <button
              className="w-full bg-[#00c399] text-white rounded py-2 font-semibold mt-4"
              onClick={handleAddLink}
            >
              Save Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
