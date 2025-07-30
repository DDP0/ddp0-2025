"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ScrollText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loader from "@/components/elements/Loader";
import Background from "@/Modules/RegistModules/Background";

type TaskStatus = "Graded" | "Submitted" | "Not Submitted";
type Submission = {
  id: string;
  link: string;
  nilai: number | null;
  feedback?: string | null;
  updatedAt: string;
};
type Task = {
  id: string;
  title: string;
  description: string;
  tipe: string;
  deadline: string;
  linkTugas: string;
  createdAt: string;
};

export default function TaskPage() {
  const { taskId } = useParams();
  const [tugas, setTugas] = useState<Task | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!taskId) return;
    setLoading(true);
    fetch(`/api/dashboard/materi/${taskId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setErr(data.error);
        } else {
          setTugas(data.tugas);
          setSubmission(data.submission);
        }
      })
      .finally(() => setLoading(false));
  }, [taskId]);

  if (loading) return <Loader />;
  if (err)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-40 text-red-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>
        <div className="text-2xl font-bold mb-2">
          Oops! Something went wrong
        </div>
        <div className="text-base">{err}</div>
      </div>
    );
  if (!tugas)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-40 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>
        <div className="text-2xl font-bold mb-2">Task not found</div>
        <div className="text-base">The requested task could not be found.</div>
      </div>
    );

  // Status logic
  let status: TaskStatus = "Not Submitted";
  if (submission) status = submission.nilai != null ? "Graded" : "Submitted";

  const grade =
    submission && submission.nilai != null ? submission.nilai : "Not graded";
  const lastModified =
    submission && submission.updatedAt
      ? new Date(submission.updatedAt).toLocaleString("en-EN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";
  const fileSubmission = submission?.link ?? "-";
  return (
    <div className="overflow-hidden relative">
      <main className="min-h-screen w-full py-30 px-6 sm:px-8 md:px-20 text-white font-josefin-sans overflow-hidden">
        <div className="w-full flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold">{tugas.title}</h1>
          <Link href={tugas.linkTugas} target="_blank">
            <Button className="" variant={"retro"}>
              <ScrollText size={20} />{" "}
              <span className="hidden md:block">Dokumen Tugas</span>
            </Button>
          </Link>
        </div>
        <div className="text-sm md:text-lg text-gray-300 mb-4">
          <div>
            Released :{" "}
            {new Date(tugas.createdAt).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div>
            Deadline :{" "}
            {new Date(tugas.deadline).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        <div className="rounded-xl w-full glass shadow-xl border border-[#ffffff7d] bg-black/40 backdrop-blur-md ring-1 ring-white/50 p-4 sm:p-6">
          <div>
            <div className="mb-2 font-semibold">Deskripsi Tugas:</div>
            <div className="text-gray-300 mb-2 whitespace-pre-line">
              {tugas.description}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <InfoRow label="Submission status" value={status} status={status} />
            <InfoRow label="Grade" value={grade} />
            <InfoRow label="Last modified" value={lastModified} />
            <InfoRow
              label="File submission"
              value={
                fileSubmission !== "-" ? (
                  <a
                    href={fileSubmission}
                    target="_blank"
                    className="underline text-blue-300 break-all"
                  >
                    {fileSubmission}
                  </a>
                ) : (
                  "-"
                )
              }
            />
          </div>
          <div className="flex justify-center mt-2 gap-4">
            {status === "Not Submitted" ? (
              <Button
                className="px-8"
                onClick={() => setShowModal(true)}
                variant={"kiwi"}
              >
                Submit
              </Button>
            ) : (
              <>
                <Button
                  className="px-8 bg-blue-400/50 border-blue-300 hover:bg-blue-500/50 hover:border-blue-400"
                  onClick={() => setShowModal(true)}
                >
                  Edit
                </Button>
                <Button
                  className="px-8 bg-red-400/50 hover:bg-red-500/50 border-red-300 text-white"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={submitLoading}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Modals */}
        <>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="bg-white/20 border-[#ffffff5a]  glass backdrop-blur-md border rounded-xl p-8 max-w-md w-full text-black relative">
                <button
                  className="absolute cursor-pointer top-2 right-2 text-white hover:text-gray-800 text-xl bg-black/20 px-1 py-1 rounded-lg"
                  onClick={() => {
                    setShowModal(false);
                    setLinkInput("");
                    setSubmitError(null);
                  }}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-white text-center">
                  Submit Your Task
                </h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSubmitLoading(true);
                    setSubmitError(null);
                    try {
                      const res = await fetch(
                        `/api/dashboard/materi/${taskId}`,
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ link: linkInput }),
                        }
                      );
                      const data = await res.json();
                      if (!res.ok) {
                        setSubmitError(data.error || "Failed to submit");
                      } else {
                        setSubmission(data.submission);
                        setShowModal(false);
                        setLinkInput("");
                      }
                    } catch (err) {
                      setSubmitError(`Failed to submit ${err}`);
                    } finally {
                      setSubmitLoading(false);
                    }
                  }}
                >
                  <div className="mb-4 text-white text-center">
                    Paste your link here.
                  </div>
                  <input
                    type="text"
                    className="w-full border rounded-xl px-3 py-2 mb-4 text-white bg-white/40 placeholder:text-gray-200"
                    placeholder="Enter GDrive link here"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    required
                    disabled={submitLoading}
                  />
                  {submitError && (
                    <div className="text-red-500 mb-2 text-sm">
                      {submitError}
                    </div>
                  )}
                  <Button
                    variant={"kiwi"}
                    className="w-full"
                    type="submit"
                    disabled={submitLoading}
                  >
                    {" "}
                    {submitLoading ? "Submitting..." : "Submit"}
                  </Button>
                </form>
              </div>
            </div>
          )}
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="bg-white/20 border-[#ffffff5a] glass backdrop-blur-md border rounded-xl p-8 max-w-md w-full text-white relative">
                <button
                  className="absolute cursor-pointer top-2 right-2 text-white hover:text-gray-800 text-xl bg-black/20 px-1 py-1 rounded-lg"
                  onClick={() => setShowDeleteModal(false)}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-white text-center">
                  Delete Submission
                </h2>
                <div className="mb-6 text-center text-white">
                  Are you sure you want to delete your submission? This action
                  cannot be undone.
                </div>
                <div className="flex gap-4 justify-center">
                  <Button
                    className="px-8"
                    onClick={() => setShowDeleteModal(false)}
                    variant={"default"}
                    disabled={submitLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="px-8 bg-red-600 hover:bg-red-700 text-white"
                    onClick={async () => {
                      if (!taskId) return;
                      setSubmitLoading(true);
                      setSubmitError(null);
                      try {
                        const res = await fetch(
                          `/api/dashboard/materi/${taskId}`,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ link: "" }),
                          }
                        );
                        const data = await res.json();
                        if (!res.ok) {
                          setSubmitError(data.error || "Failed to delete");
                        } else {
                          setSubmission(null);
                          setShowDeleteModal(false);
                        }
                      } catch (err) {
                        setSubmitError(`Failed to delete ${err}`);
                      } finally {
                        setSubmitLoading(false);
                      }
                    }}
                    disabled={submitLoading}
                  >
                    {submitLoading ? "Deleting..." : "Delete"}
                  </Button>
                </div>
                {submitError && (
                  <div className="text-red-500 mt-4 text-sm text-center">
                    {submitError}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      </main>
      <Background />
    </div>
  );
}

function InfoRow({
  label,
  value,
  status,
}: {
  label: string;
  value: React.ReactNode;
  status?: TaskStatus;
}) {
  let valueBg = "bg-white/10";
  if (
    label === "Submission status" &&
    (status === "Submitted" || status === "Graded")
  ) {
    valueBg = "bg-green-300/30 border-green-200";
  }
  if (label === "Grade" && value !== "Not graded") {
    valueBg = "bg-yellow-200/30 border-yellow-100";
  }
  return (
    <div className="flex flex-row gap-2  text-sm md:text-md">
      <div className="flex-[0_0_160px] text-left bg-white/10 rounded-lg border-[1px]  border-[#ffffff44] glass  backdrop-blur-md px-2 py-1">
        {label}
      </div>
      <div
        className={`flex-1 text-left rounded-lg border-[1px] glass backdrop-blur-md px-2 py-1 border-[#ffffff44] ${valueBg}`}
      >
        {value}
      </div>
    </div>
  );
}
