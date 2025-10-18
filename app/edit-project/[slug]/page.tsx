"use client";

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

export default function EditProjectPage() {
  // my dummy data
  const [title, setTitle] = useState('SkyScout');
  const [categories, setCategories] = useState(['Agriculture', 'Education']);
  const [description, setDescription] = useState('SkyScout is an intelligent drone platform designed for aerial mapping, surveillance, and delivery. Equipped with advanced sensors and GPS navigation, SkyScout can capture real-time data from above, making it valuable for agriculture, logistics, disaster management, and security.');
  const [mission, setMission] = useState('To provide reliable, versatile, and cost-effective drone solutions that empower communities, businesses, and organizations.');
  const [vision, setVision] = useState('A future where drones become everyday assistants improving efficiency, safety, and sustainability across multiple industries.');
  const [keyFeatures, setKeyFeatures] = useState('- Autonomous flight planning via mobile app.\n- HD video and thermal imaging cameras.\n- Modular payload system (sensors, sprayers, delivery boxes).\n- Real-time GPS tracking and geofencing.\n- Emergency return-to-home functionality.');
  const [team, setTeam] = useState([
    { name: 'Justin Carder', role: 'UI/UX Designer' },
    { name: 'Justin Carder', role: 'UI/UX Designer' },
    { name: 'Justin Carder', role: 'UI/UX Designer' },
  ]);
  const [milestones, setMilestones] = useState([
    { title: 'Research & Concept Validation', status: 'Completed' },
    { title: 'Prototype Design & Component Sourcing', status: 'Completed' },
    { title: 'System Integration', status: 'In Progress' },
    { title: 'Testing & Performance Optimization', status: 'Planned' },
    { title: 'Final Deployment & Demo Launch', status: 'Planned' },
  ]);
  const [addingMember, setAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '' });
  const [fundingGoal, setFundingGoal] = useState('12,000');
  const [raised, setRaised] = useState('8,450');
  const [donors, setDonors] = useState('37');
  const [links, setLinks] = useState([
    { label: 'Project website', url: 'https://www.skyscout.rw' },
    { label: 'Jira Link', url: 'link' },
    { label: 'GitHub Repo', url: 'https://github.com/RCA-Projects/GreenByte' },
  ]);
  const [showMilestone, setShowMilestone] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ title: '', status: 'Planned' });
  const [newLink, setNewLink] = useState({ label: '', url: '' });

 

  const handleAddMilestone = () => {
    if (newMilestone.title.trim()) {
      setMilestones([...milestones, newMilestone]);
      setNewMilestone({ title: '', status: 'Planned' });
      setShowMilestone(false);
    }
  };
  const handleAddLink = () => {
    if (newLink.label.trim() && newLink.url.trim()) {
      setLinks([...links, newLink]);
      setNewLink({ label: '', url: '' });
      setShowLinks(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6fcfa]">
      <Header />
      <Sidebar />
      <div className="flex justify-center items-start pt-10 px-2">
        <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-xl p-12 border mx-auto">
          <div className="flex items-center gap-6 mb-10">
            <button
              className="flex-shrink-0 w-14 h-14 rounded-full bg-[#f3f4f6] shadow-md flex items-center justify-center"
              style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
              aria-label="Back"
              onClick={() => window.history.back()}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00c399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <h1 className="text-2xl font-bold text-[#00c399] text-center w-full">Edit Project</h1>
          </div>
          {/* FORM START */}
          <form className="space-y-4">
            <div>
              <label className="block font-bold mb-1">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, i) => (
                  <span key={i} className="flex items-center border border-brand text-brand bg-brand/10 px-2 py-1 rounded-full text-xs">
                    {cat}
                    <button type="button" className="ml-1 text-brand hover:text-red-500">&times;</button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Add category"
                  className="border rounded px-2 py-1 text-xs"
                  style={{ minWidth: 100 }}
                />
              </div>
            </div>
            <div>
              <label className="block font-bold mb-1">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Mission</label>
              <textarea
                value={mission}
                onChange={e => setMission(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Vision</label>
              <textarea
                value={vision}
                onChange={e => setVision(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Key Features</label>
              <textarea
                value={keyFeatures}
                onChange={e => setKeyFeatures(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
                rows={4}
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Team</label>
              <div className="space-y-2">
                {team.map((member, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input type="text" value={member.name} className="border rounded px-2 py-1 flex-1" readOnly />
                    <input type="text" value={member.role} className="border rounded px-2 py-1 flex-1" readOnly />
                    <button type="button" className="text-white bg-red-500 rounded p-2" aria-label="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z" />
                      </svg>
                    </button>
                  </div>
                ))}
                {addingMember ? (
                  <div className="flex gap-2 items-center mb-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={newMember.name}
                      onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                      className="border rounded px-2 py-1 flex-1"
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. UI/UX Designer)"
                      value={newMember.role}
                      onChange={e => setNewMember({ ...newMember, role: e.target.value })}
                      className="border rounded px-2 py-1 flex-1"
                    />
                    <button
                      type="button"
                      className="text-white bg-green-500 rounded p-2 mr-1"
                      aria-label="Save"
                      onClick={() => {
                        if (newMember.name.trim() && newMember.role.trim()) {
                          setTeam([...team, newMember]);
                          setNewMember({ name: '', role: '' });
                          setAddingMember(false);
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-500 rounded p-2"
                      aria-label="Cancel"
                      onClick={() => { setAddingMember(false); setNewMember({ name: '', role: '' }); }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button type="button" className="w-full bg-gray-100 border border-dashed border-gray-400 text-gray-600 rounded py-2 font-semibold mt-1" onClick={() => setAddingMember(true)}>
                    Add Another Member
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="block font-bold mb-1">Project Milestones</label>
              <div className="space-y-2 mb-2">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`text-sm font-semibold flex-1 ${m.status === 'Completed' ? 'text-brand' : m.status === 'In Progress' ? 'text-yellow-600' : 'text-slate-400'}`}>{m.title}</span>
                    <span className="text-xs px-2 py-1 border rounded-full" style={{borderColor: m.status === 'Completed' ? '#00c399' : m.status === 'In Progress' ? '#f59e42' : '#cbd5e1', color: m.status === 'Completed' ? '#00c399' : m.status === 'In Progress' ? '#f59e42' : '#64748b'}}>{m.status}</span>
                    <button type="button" className="text-brand hover:text-[#00b387] p-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00c399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className="w-full bg-[#00c399] text-white rounded py-2 font-semibold" onClick={() => setShowMilestone(true)}>+ Add Milestones</button>
            </div>
            <div>
              <label className="block font-bold mb-1">Funding info</label>
              <input type="text" value={fundingGoal} className="w-full border rounded px-3 py-2 bg-[#fafbfc] mb-2" readOnly />
              <input type="text" value={raised} className="w-full border rounded px-3 py-2 bg-[#fafbfc] mb-2" readOnly />
              <input type="text" value={donors} className="w-full border rounded px-3 py-2 bg-[#fafbfc] mb-2" readOnly />
            </div>
            <div>
              <label className="block font-bold mb-1">Links & Docs</label>
              <div className="space-y-2 mb-2">
                {links.map((l, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="flex-1 text-sm underline text-brand">{l.label}: {l.url}</span>
                    <button type="button" className="text-brand hover:text-[#00b387] p-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00c399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className="w-full bg-[#00c399] text-white rounded py-2 font-semibold" onClick={() => setShowLinks(true)}>+ Add Link</button>
            </div>
            <button type="submit" className="w-full bg-[#00c399] text-white rounded py-3 font-semibold mt-2">Save Changes</button>
          </form>
        </div>
      </div>
    {/* Milestone Modal */}
    {showMilestone && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center" onClick={() => setShowMilestone(false)}>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl border relative" onClick={e => e.stopPropagation()}>
          <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={() => setShowMilestone(false)}>&times;</button>
          <h2 className="text-xl font-bold text-center text-[#00c399] mb-4">Add Milestone</h2>
          <div className="space-y-3 bg-[#f6fafd] p-4 rounded-lg">
            <input type="text" placeholder="Milestone Title" className="w-full border rounded px-3 py-2 bg-white" value={newMilestone.title} onChange={e => setNewMilestone({ ...newMilestone, title: e.target.value })} />
            <select className="w-full border rounded px-3 py-2 bg-white" value={newMilestone.status} onChange={e => setNewMilestone({ ...newMilestone, status: e.target.value })}>
              <option>Planned</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <button className="w-full bg-[#00c399] text-white rounded py-2 font-semibold mt-4" onClick={handleAddMilestone}>Save Milestone</button>
        </div>
      </div>
    )}
    {/* Link Modal */}
    {showLinks && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center" onClick={() => setShowLinks(false)}>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl border relative" onClick={e => e.stopPropagation()}>
          <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={() => setShowLinks(false)}>&times;</button>
          <h2 className="text-xl font-bold text-center text-[#00c399] mb-4">Add Link</h2>
          <div className="space-y-3 bg-[#f6fafd] p-4 rounded-lg">
            <input type="text" placeholder="Label (e.g. Project website, GitHub repo...)" className="w-full border rounded px-3 py-2 bg-white" value={newLink.label} onChange={e => setNewLink({ ...newLink, label: e.target.value })} />
            <input type="text" placeholder="Enter Link URL" className="w-full border rounded px-3 py-2 bg-white" value={newLink.url} onChange={e => setNewLink({ ...newLink, url: e.target.value })} />
          </div>
          <button className="w-full bg-[#00c399] text-white rounded py-2 font-semibold mt-4" onClick={handleAddLink}>Save Link</button>
        </div>
      </div>
    )}
  </div>
  );
}

