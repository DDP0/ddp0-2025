"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import type { FormEvent, KeyboardEvent, ClipboardEvent } from "react";

interface MenteeGrade {
  menteeName: string;
  submittedOn: string;
  submissionUrl: string;
  grade: string;
  feedback: string;
  submissionId?: string;
}

interface Task {
  id: number;
  title: string;
  grades: MenteeGrade[];
}

interface TaskGraderProps {
  taskType: "LAB" | "TP" | "MINIQUIZ";
  displayName: string; // "Lab", "TP", or "Mini Quiz"
}

const TaskGrader: React.FC<TaskGraderProps> = ({ taskType, displayName }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<{
    [taskIdx: number]: { [gradeIdx: number]: boolean };
  }>({});
  const [editing, setEditing] = useState<{
    [taskIdx: number]: { [gradeIdx: number]: boolean };
  }>({});
  const [draftValues, setDraftValues] = useState<{
    [taskIdx: number]: { [gradeIdx: number]: string };
  }>({});
  const [draftFeedback, setDraftFeedback] = useState<{
    [taskIdx: number]: { [gradeIdx: number]: string };
  }>({});
  const [editingFeedback, setEditingFeedback] = useState<{
    [taskIdx: number]: { [gradeIdx: number]: boolean };
  }>({});
  const [savingFeedback, setSavingFeedback] = useState<{
    [taskIdx: number]: { [gradeIdx: number]: boolean };
  }>({});
  const editableRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Fetch tasks data from API
  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/grade?type=${taskType}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${displayName.toLowerCase()} data: ${
              response.status
            }`
          );
        }

        const data: Task[] = await response.json();
        setTasks(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${displayName.toLowerCase()} data:`, err);
        setError(
          err instanceof Error
            ? err.message
            : `An error occurred while fetching ${displayName.toLowerCase()} data`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasksData();
  }, [taskType, displayName]);

  const clampAndSanitize = (text: string): string => {
    const numericOnly = text.replace(/[^0-9]/g, "");
    const number = parseInt(numericOnly) || 0;
    const clampedNumber = Math.min(105, Math.max(0, number));
    return numericOnly === "" ? "" : clampedNumber.toString();
  };

  const getKey = (taskIdx: number, gradeIdx: number) =>
    `${taskIdx}-${gradeIdx}`;

  const handleInput = (
    taskIdx: number,
    gradeIdx: number,
    e: FormEvent<HTMLDivElement>
  ) => {
    const target = e.target as HTMLDivElement;
    const finalValue = clampAndSanitize(target.textContent || "");

    if (target.textContent !== finalValue) {
      target.textContent = finalValue;

      const range = document.createRange();
      const selection = window.getSelection();
      if (selection) {
        range.selectNodeContents(target);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    setDraftValues((prev) => ({
      ...prev,
      [taskIdx]: { ...prev[taskIdx], [gradeIdx]: finalValue },
    }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (
      [8, 9, 27, 13, 46].includes(e.keyCode) ||
      (e.ctrlKey && [65, 67, 86, 88].includes(e.keyCode)) ||
      (e.keyCode >= 35 && e.keyCode <= 39)
    )
      return;

    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    )
      e.preventDefault();
  };

  const handlePaste = (
    taskIdx: number,
    gradeIdx: number,
    e: ClipboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    const paste = e.clipboardData?.getData("text") || "";
    const finalValue = clampAndSanitize(paste);
    const ref = editableRefs.current[getKey(taskIdx, gradeIdx)];
    if (ref) ref.textContent = finalValue;

    setDraftValues((prev) => ({
      ...prev,
      [taskIdx]: { ...prev[taskIdx], [gradeIdx]: finalValue },
    }));
  };

  const cancelEdit = (taskIdx: number, gradeIdx: number) => {
    setEditing((prev) => ({
      ...prev,
      [taskIdx]: { ...prev[taskIdx], [gradeIdx]: false },
    }));
    const ref = editableRefs.current[getKey(taskIdx, gradeIdx)];
    if (ref) ref.textContent = tasks[taskIdx].grades[gradeIdx].grade;
    setDraftValues((prev) => ({
      ...prev,
      [taskIdx]: {
        ...prev[taskIdx],
        [gradeIdx]: tasks[taskIdx].grades[gradeIdx].grade,
      },
    }));
  };

  const startEdit = (taskIdx: number, gradeIdx: number) => {
    const current = tasks[taskIdx].grades[gradeIdx].grade;
    setDraftValues((prev) => ({
      ...prev,
      [taskIdx]: { ...prev[taskIdx], [gradeIdx]: current },
    }));
    setEditing((prev) => ({
      ...prev,
      [taskIdx]: { ...prev[taskIdx], [gradeIdx]: true },
    }));
    setTimeout(() => {
      const ref = editableRefs.current[getKey(taskIdx, gradeIdx)];
      if (ref) ref.textContent = current;
    });
  };

  const saveEdit = async (taskIdx: number, gradeIdx: number) => {
    const newValue = draftValues[taskIdx]?.[gradeIdx] || "";
    const submission = tasks[taskIdx].grades[gradeIdx];

    // Don't save if no submission exists
    if (!submission.submissionId) {
      console.error("Cannot save grade: No submission ID");
      return;
    }

    // Set saving state
    setSaving((prev) => ({
      ...prev,
      [taskIdx]: { ...prev[taskIdx], [gradeIdx]: true },
    }));

    try {
      const response = await fetch("/api/grade", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionId: submission.submissionId,
          grade: newValue === "" ? null : parseInt(newValue),
          feedback: submission.feedback, // Keep existing feedback when saving grade
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save grade");
      }

      // Update local state only after successful API call
      const updatedTasks = [...tasks];
      updatedTasks[taskIdx].grades[gradeIdx].grade = newValue;
      setTasks(updatedTasks);

      setEditing((prev) => ({
        ...prev,
        [taskIdx]: { ...prev[taskIdx], [gradeIdx]: false },
      }));

      console.log("Grade saved successfully");
    } catch (error) {
      console.error("Error saving grade:", error);
      // Optionally show error to user
      alert(
        `Error saving grade: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      // Clear saving state
      setSaving((prev) => ({
        ...prev,
        [taskIdx]: { ...prev[taskIdx], [gradeIdx]: false },
      }));
    }
  };

  const startFeedbackEdit = (taskIdx: number, gradeIdx: number) => {
    const currentFeedback = tasks[taskIdx].grades[gradeIdx].feedback;
    setDraftFeedback((prev) => ({
      ...prev,
      [taskIdx]: { ...prev[taskIdx], [gradeIdx]: currentFeedback },
    }));
    setEditingFeedback((prev) => ({
      ...prev,
      [taskIdx]: { ...prev[taskIdx], [gradeIdx]: true },
    }));
  };

  const cancelFeedbackEdit = (taskIdx: number, gradeIdx: number) => {
    setEditingFeedback((prev) => ({
      ...prev,
      [taskIdx]: { ...prev[taskIdx], [gradeIdx]: false },
    }));
    setDraftFeedback((prev) => ({
      ...prev,
      [taskIdx]: {
        ...prev[taskIdx],
        [gradeIdx]: tasks[taskIdx].grades[gradeIdx].feedback,
      },
    }));
  };

  const saveFeedbackEdit = async (taskIdx: number, gradeIdx: number) => {
    const newFeedback = draftFeedback[taskIdx]?.[gradeIdx] || "";
    const submission = tasks[taskIdx].grades[gradeIdx];

    // Don't save if no submission exists
    if (!submission.submissionId) {
      console.error("Cannot save feedback: No submission ID");
      return;
    }

    // Set saving state
    setSavingFeedback((prev) => ({
      ...prev,
      [taskIdx]: { ...prev[taskIdx], [gradeIdx]: true },
    }));

    try {
      const response = await fetch("/api/grade", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionId: submission.submissionId,
          grade: submission.grade === "" ? null : parseInt(submission.grade),
          feedback: newFeedback || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save feedback");
      }

      // Update local state only after successful API call
      const updatedTasks = [...tasks];
      updatedTasks[taskIdx].grades[gradeIdx].feedback = newFeedback;
      setTasks(updatedTasks);

      setEditingFeedback((prev) => ({
        ...prev,
        [taskIdx]: { ...prev[taskIdx], [gradeIdx]: false },
      }));

      console.log("Feedback saved successfully");
    } catch (error) {
      console.error("Error saving feedback:", error);
      // Optionally show error to user
      alert(
        `Error saving feedback: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      // Clear saving state
      setSavingFeedback((prev) => ({
        ...prev,
        [taskIdx]: { ...prev[taskIdx], [gradeIdx]: false },
      }));
    }
  };

  return (
    <div className="animate-fade-in transition-all duration-300">
      {loading && (
        <div className="text-center py-8">
          <p className="font-josefin-sans text-bodyLarge">
            Loading {displayName.toLowerCase()} data...
          </p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="font-josefin-sans text-bodyLarge text-red-500">
            Error: {error}
          </p>
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <div className="text-center py-8">
          <p className="font-josefin-sans text-bodyLarge">
            No {displayName.toLowerCase()} submissions found.
          </p>
        </div>
      )}

      {!loading &&
        !error &&
        tasks.map((task, taskIdx) => (
          <div key={taskIdx} className="pb-2">
            <h1 className="font-josefin-sans text-h4 font-semibold mb-4">
              {task.title}
            </h1>
            {task.grades.map((grade, gradeIdx) => {
              const isEdit = editing[taskIdx]?.[gradeIdx] || false;
              const isSaving = saving[taskIdx]?.[gradeIdx] || false;
              const value = tasks[taskIdx].grades[gradeIdx].grade;
              const draft = draftValues[taskIdx]?.[gradeIdx] || "";

              const isFeedbackEdit =
                editingFeedback[taskIdx]?.[gradeIdx] || false;
              const isFeedbackSaving =
                savingFeedback[taskIdx]?.[gradeIdx] || false;
              const feedbackValue = tasks[taskIdx].grades[gradeIdx].feedback;
              const feedbackDraft = draftFeedback[taskIdx]?.[gradeIdx] || "";

              return (
                <div
                  key={gradeIdx}
                  className={`${
                    grade.submissionUrl === "" && "opacity-50"
                  } w-full space-y-2 sm:space-y-3 rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-2 sm:p-3 font-josefin-sans text-bodyLarge mb-3`}
                >
                  <div className="flex justify-between h-fit">
                    <div className="flex flex-col justify-between">
                      <h2 className="text-body sm:text-bodyLarge truncate">
                        {grade.menteeName}
                      </h2>
                      <h3 className="text-small">
                        {grade.submissionUrl === ""
                          ? "Not Submitted"
                          : "Submitted On " + grade.submittedOn}
                      </h3>
                    </div>
                    <div
                      className={`${
                        isEdit
                          ? "grid-cols-[1fr_auto_1fr]"
                          : "grid-cols-[auto_1fr_1fr]"
                      } shrink-0 grid gap-1 sm:gap-2 max-sm:text-small`}
                    >
                      {isEdit ? (
                        <>
                          <div
                            ref={(el) => {
                              editableRefs.current[getKey(taskIdx, gradeIdx)] =
                                el;
                            }}
                            contentEditable
                            className="rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-1 sm:p-2 outline-none text-center flex justify-center items-center focus:border-white focus:bg-[#ffffff59]/30"
                            suppressContentEditableWarning
                            onInput={(e) => handleInput(taskIdx, gradeIdx, e)}
                            onKeyDown={handleKeyDown}
                            onPaste={(e) => handlePaste(taskIdx, gradeIdx, e)}
                            style={{ lineHeight: "normal" }}
                          />
                          <Button
                            className="p-1 sm:p-2 bg-[#d536364d]/80 hover:bg-[#d536364d] active:bg-[#d536368a]"
                            onClick={() => cancelEdit(taskIdx, gradeIdx)}
                          >
                            <Image
                              src="/close.svg"
                              alt="Cancel"
                              width={24}
                              height={24}
                            />
                          </Button>
                        </>
                      ) : (
                        <>
                          <a target="_blank" href={grade.submissionUrl}>
                            <Button
                              className="p-1 sm:p-2 relative group"
                              disabled={grade.submissionUrl === ""}
                            >
                              <Image
                                src="/arrow_down.svg"
                                alt="Download"
                                width={24}
                                height={24}
                              />
                              <div className="max-sm:hidden scale-0 origin-right transition group-hover:scale-100 absolute -left-26 bg-neutral-900 px-3 py-2 rounded-full">
                                Download
                              </div>
                            </Button>
                          </a>
                          <div className="rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-1 sm:p-2 outline-none text-center flex justify-center items-center">
                            {value === "" ? "-" : value}
                          </div>
                        </>
                      )}
                      <Button
                        className="px-2 py-2 h-full w-12 sm:w-20"
                        variant={
                          isEdit ? "green" : value === "" ? "yellow" : "blue"
                        }
                        onClick={() =>
                          isEdit
                            ? saveEdit(taskIdx, gradeIdx)
                            : startEdit(taskIdx, gradeIdx)
                        }
                        disabled={grade.submissionUrl === "" || isSaving}
                      >
                        <span className="max-sm:text-small">
                          {isSaving
                            ? "..."
                            : isEdit
                            ? "Save"
                            : value === ""
                            ? "Grade"
                            : "Edit"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  {grade.submissionUrl === "" || (
                    <div className="space-y-1 sm:space-y-2">
                      Feedback
                      <div className="flex gap-1 sm:gap-2">
                        {isFeedbackEdit ? (
                          <>
                            <textarea
                              className="w-full text-left rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-1 sm:p-2 outline-none flex justify-center items-left focus:border-white focus:bg-[#ffffff59]/30 resize-none"
                              placeholder="Enter feedback for the student..."
                              value={feedbackDraft}
                              onChange={(e) =>
                                setDraftFeedback((prev) => ({
                                  ...prev,
                                  [taskIdx]: {
                                    ...prev[taskIdx],
                                    [gradeIdx]: e.target.value,
                                  },
                                }))
                              }
                              disabled={isFeedbackSaving}
                            />
                            <div className="flex flex-col gap-1">
                              <Button
                                className="px-2 py-1 h-fit"
                                variant="green"
                                onClick={() =>
                                  saveFeedbackEdit(taskIdx, gradeIdx)
                                }
                                disabled={
                                  grade.submissionUrl === "" || isFeedbackSaving
                                }
                              >
                                <span className="max-sm:text-small">
                                  {isFeedbackSaving ? "..." : "Save"}
                                </span>
                              </Button>
                              <Button
                                className="px-2 py-1 h-fit bg-[#d536364d]/80 hover:bg-[#d536364d] active:bg-[#d536368a]"
                                onClick={() =>
                                  cancelFeedbackEdit(taskIdx, gradeIdx)
                                }
                                disabled={isFeedbackSaving}
                              >
                                <span className="max-sm:text-small">
                                  Cancel
                                </span>
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-full text-left rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-1 sm:p-2 outline-none flex ">
                              {feedbackValue || (
                                <span className={feedbackValue || "opacity-50"}>
                                  No feedback provided
                                </span>
                              )}
                            </div>
                            <Button
                              className="ml-auto px-2 py-2 h-full"
                              variant={feedbackValue ? "blue" : "yellow"}
                              onClick={() =>
                                startFeedbackEdit(taskIdx, gradeIdx)
                              }
                              disabled={grade.submissionUrl === ""}
                            >
                              <span className="max-sm:text-small">
                                {feedbackValue ? "Edit" : "Add"}
                              </span>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default TaskGrader;
