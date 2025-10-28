"use client";

import Header from "@/components/Header";
import Sidebar from "../Sidebar";
import { useState } from "react";

export default function AddNewProjectPage() {
  const [showMilestone, setShowMilestone] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Header />
      <Sidebar />

      <div className="flex justify-center items-start pt-10 px-2">
        <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-xl p-12 border mx-auto">
          {/* Back Button */}

          <div className="flex items-center gap-6 mb-10">
            <button
              className="flex-shrink-0 w-14 h-14 rounded-full bg-[#f3f4f6] shadow-md flex items-center justify-center"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
              aria-label="Back"
              onClick={() => window.history.back()}
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
            <h1
              className="text-3xl font-bold text-[#00c399] text-center w-full"
              style={{ letterSpacing: 0 }}
            >
              Add New Project
            </h1>
          </div>

          {/* FORM START */}
          <form className="space-y-4">
            <div>
              <label className="block font-bold mb-1">Project Title</label>
              <input
                type="text"
                placeholder="eg: SkyScout"
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Category</label>
              <select className="w-full border rounded px-3 py-2 bg-[#fafbfc]">
                <option>Agriculture</option>
                <option>Health</option>
                <option>Technology</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Description</label>
              <textarea
                placeholder="Write a brief about your project..."
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            {/* Image Upload Field */}
            <div>
              <label className="block font-bold mb-1">Project Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Mission</label>
              <textarea
                placeholder="Describe the project's mission..."
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Vision</label>
              <textarea
                placeholder="Describe the Project's vision..."
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Key Features</label>
              <textarea
                placeholder="List main features"
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Team</label>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-[#00c399] text-white rounded py-2 font-semibold mb-2"
                onClick={() => setShowTeam(true)}
              >
                <span className="text-lg font-bold">+</span> Add Members
              </button>
            </div>

            <div>
              <label className="block font-bold mb-1">Project Milestones</label>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-[#00c399] text-white rounded py-2 font-semibold mb-2"
                onClick={() => setShowMilestone(true)}
              >
                <span className="text-lg font-bold">+</span> Add Milestones
              </button>
            </div>

            <div>
              <label className="block font-bold mb-1">Funding info</label>
              <input
                type="number"
                placeholder="Funding Goal"
                className="w-full border rounded px-3 py-2 bg-[#fafbfc]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Links & Docs</label>
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
              className="w-full bg-[#00c399] text-white rounded py-3 font-semibold mt-2"
            >
              Add Project
            </button>
          </form>
          {/* FORM END */}
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
            <h2 className="text-xl font-bold text-center text-[#00c399] mb-4">
              Milestones
            </h2>
            <div className="space-y-3 bg-[#f6fafd] p-4 rounded-lg">
              <input
                type="text"
                placeholder="Milestone Title"
                className="w-full border rounded px-3 py-2 bg-white"
              />
              <input
                type="text"
                placeholder="Short Description"
                className="w-full border rounded px-3 py-2 bg-white"
              />
              <select className="w-full border rounded px-3 py-2 bg-white">
                <option>Status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <input
                type="text"
                placeholder="Budget"
                className="w-full border rounded px-3 py-2 bg-white"
              />
              <input
                type="date"
                placeholder="Expected Completion Date"
                className="w-full border rounded px-3 py-2 bg-white"
              />
            </div>
            <button className="w-full mt-4 mb-2 bg-gray-100 border border-dashed border-gray-400 text-gray-600 rounded py-2 font-semibold">
              Add Another Milestone
            </button>
            <button
              className="w-full bg-[#00c399] text-white rounded py-2 font-semibold"
              onClick={() => setShowMilestone(false)}
            >
              Save Project Milestone
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
            <h2 className="text-xl font-bold text-center text-[#00c399] mb-4">
              Team Members
            </h2>
            <div className="flex items-center gap-2 border-2 border-[#00c399] rounded-lg p-2 mb-2">
              <input
                type="text"
                placeholder="Search Graduate"
                className="flex-1 border rounded px-3 py-2 bg-white"
              />
              <input
                type="text"
                placeholder="Role (e.g. UI/UX Designer)"
                className="flex-1 border rounded px-3 py-2 bg-white"
              />
              <button
                className="text-white bg-red-500 rounded p-2"
                aria-label="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 7h12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z"
                  />
                </svg>
              </button>
            </div>
            <button className="w-full mb-2 bg-gray-100 border border-dashed border-gray-400 text-gray-600 rounded py-2 font-semibold">
              Add Another Member
            </button>
            <button
              className="w-full bg-[#00c399] text-white rounded py-2 font-semibold"
              onClick={() => setShowTeam(false)}
            >
              Save Team Members
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
            <h2 className="text-xl font-bold text-center text-[#00c399] mb-4">
              Links & Docs
            </h2>
            <div className="space-y-3 bg-[#f6fafd] p-4 rounded-lg">
              <input
                type="text"
                placeholder="Label (e.g. Project website, GitHub repo...)"
                className="w-full border rounded px-3 py-2 bg-white"
              />
              <input
                type="text"
                placeholder="Enter Link URL"
                className="w-full border rounded px-3 py-2 bg-white"
              />
            </div>
            <button className="w-full mt-4 mb-2 bg-gray-100 border border-dashed border-gray-400 text-gray-600 rounded py-2 font-semibold">
              Add Another Link
            </button>
            <button
              className="w-full bg-[#00c399] text-white rounded py-2 font-semibold"
              onClick={() => setShowLinks(false)}
            >
              Save Project Links
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
