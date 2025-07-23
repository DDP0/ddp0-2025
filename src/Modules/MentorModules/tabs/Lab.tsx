"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef } from "react";
import type { FormEvent, KeyboardEvent, ClipboardEvent } from "react";

interface MenteeGrade {
  menteeName: string;
  submittedOn: string;
  submissionUrl: string;
  grade: string;
}

interface Lab {
  id: number;
  grades: MenteeGrade[];
}

const labsData: Lab[] = [
  {
    id: 1,
    grades: [
      {
        menteeName: "Andrew Sanjay Hasian Panjaitan",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
      {
        menteeName: "Vazha Khayri",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
      {
        menteeName: "Muhamad Hakim Nizami",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
      {
        menteeName: "Naufal Zafran Fadil",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
    ],
  },
  {
    id: 2,
    grades: [
      {
        menteeName: "Andrew Sanjay Hasian Panjaitan",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
      {
        menteeName: "Vazha Khayri",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
      {
        menteeName: "Muhamad Hakim Nizami",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
      {
        menteeName: "Naufal Zafran Fadil",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "",
        grade: "",
      },
    ],
  },
  {
    id: 3,
    grades: [
      {
        menteeName: "Andrew Sanjay Hasian Panjaitan",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
      {
        menteeName: "Vazha Khayri",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
      {
        menteeName: "Muhamad Hakim Nizami",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "",
        grade: "",
      },
      {
        menteeName: "Naufal Zafran Fadil",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
    ],
  },
  {
    id: 4,
    grades: [
      {
        menteeName: "Andrew Sanjay Hasian Panjaitan",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
      {
        menteeName: "Vazha Khayri",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
      {
        menteeName: "Muhamad Hakim Nizami",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
      {
        menteeName: "Naufal Zafran Fadil",
        submittedOn: "25 Agustus 2025",
        submissionUrl: "https://shurkou.com",
        grade: "",
      },
    ],
  },
];

const Lab: React.FC = () => {
  const [labs, setLabes] = useState<Lab[]>(() =>
    labsData.map((lab) => ({
      id: lab.id,
      grades: lab.grades.map((grade) => ({ ...grade })),
    }))
  );
  const [editing, setEditing] = useState<{
    [labIdx: number]: { [gradeIdx: number]: boolean };
  }>({});
  const [draftValues, setDraftValues] = useState<{
    [labIdx: number]: { [gradeIdx: number]: string };
  }>({});
  const editableRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const clampAndSanitize = (text: string): string => {
    const numericOnly = text.replace(/[^0-9]/g, "");
    const number = parseInt(numericOnly) || 0;
    const clampedNumber = Math.min(105, Math.max(0, number));
    return numericOnly === "" ? "" : clampedNumber.toString();
  };

  const getKey = (labIdx: number, gradeIdx: number) => `${labIdx}-${gradeIdx}`;

  const handleInput = (
    labIdx: number,
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
      [labIdx]: { ...prev[labIdx], [gradeIdx]: finalValue },
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
    labIdx: number,
    gradeIdx: number,
    e: ClipboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    const paste = e.clipboardData?.getData("text") || "";
    const finalValue = clampAndSanitize(paste);
    const ref = editableRefs.current[getKey(labIdx, gradeIdx)];
    if (ref) ref.textContent = finalValue;

    setDraftValues((prev) => ({
      ...prev,
      [labIdx]: { ...prev[labIdx], [gradeIdx]: finalValue },
    }));
  };

  const cancelEdit = (labIdx: number, gradeIdx: number) => {
    setEditing((prev) => ({
      ...prev,
      [labIdx]: { ...prev[labIdx], [gradeIdx]: false },
    }));
    const ref = editableRefs.current[getKey(labIdx, gradeIdx)];
    if (ref) ref.textContent = labs[labIdx].grades[gradeIdx].grade;
    setDraftValues((prev) => ({
      ...prev,
      [labIdx]: {
        ...prev[labIdx],
        [gradeIdx]: labs[labIdx].grades[gradeIdx].grade,
      },
    }));
  };

  const startEdit = (labIdx: number, gradeIdx: number) => {
    const current = labs[labIdx].grades[gradeIdx].grade;
    setDraftValues((prev) => ({
      ...prev,
      [labIdx]: { ...prev[labIdx], [gradeIdx]: current },
    }));
    setEditing((prev) => ({
      ...prev,
      [labIdx]: { ...prev[labIdx], [gradeIdx]: true },
    }));
    setTimeout(() => {
      const ref = editableRefs.current[getKey(labIdx, gradeIdx)];
      if (ref) ref.textContent = current;
    });
  };

  const saveEdit = (labIdx: number, gradeIdx: number) => {
    const newValue = draftValues[labIdx]?.[gradeIdx] || "";
    const updatedLabs = [...labs];
    updatedLabs[labIdx].grades[gradeIdx].grade = newValue;
    setLabes(updatedLabs);

    setEditing((prev) => ({
      ...prev,
      [labIdx]: { ...prev[labIdx], [gradeIdx]: false },
    }));
  };

  return (
    <div className="animate-fade-in transition-all duration-300">
      {labs.map((lab, labIdx) => (
        <div key={labIdx} className="pb-2">
          <h1 className="font-josefin-sans text-h4 font-semibold mb-4">
            Lab {lab.id}
          </h1>
          {lab.grades.map((grade, gradeIdx) => {
            const isEdit = editing[labIdx]?.[gradeIdx] || false;
            const value = labs[labIdx].grades[gradeIdx].grade;
            const draft = draftValues[labIdx]?.[gradeIdx] || "";

            return (
              <div
                key={gradeIdx}
                className={`${
                  grade.submissionUrl === "" && "opacity-50"
                } w-full flex justify-between h-fit rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-3 font-josefin-sans text-bodyLarge mb-3`}
              >
                <div className="flex flex-col justify-between">
                  <h2 className="text-bodyLarge">{grade.menteeName}</h2>
                  <h3 className="text-footnote">
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
                  } grid gap-2`}
                >
                  {isEdit ? (
                    <>
                      <div
                        ref={(el) => {
                          editableRefs.current[getKey(labIdx, gradeIdx)] = el;
                        }}
                        contentEditable
                        className="rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-2 outline-none text-center flex justify-center items-center focus:border-white focus:bg-[#ffffff59]/30"
                        suppressContentEditableWarning
                        onInput={(e) => handleInput(labIdx, gradeIdx, e)}
                        onKeyDown={handleKeyDown}
                        onPaste={(e) => handlePaste(labIdx, gradeIdx, e)}
                        style={{ lineHeight: "normal" }}
                      />
                      <Button
                        className="p-2 bg-[#d536364d]/80 hover:bg-[#d536364d] active:bg-[#d536368a]"
                        onClick={() => cancelEdit(labIdx, gradeIdx)}
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
                          className="p-2"
                          disabled={grade.submissionUrl === ""}
                        >
                          <Image
                            src="/arrow_down.svg"
                            alt="Download"
                            width={24}
                            height={24}
                          />
                        </Button>
                      </a>
                      <div className="rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-2 outline-none text-center flex justify-center items-center">
                        {value === "" ? "-" : value}
                      </div>
                    </>
                  )}
                  <Button
                    className="px-2 py-2 h-full w-20"
                    variant={
                      isEdit ? "green" : value === "" ? "yellow" : "blue"
                    }
                    onClick={() =>
                      isEdit
                        ? saveEdit(labIdx, gradeIdx)
                        : startEdit(labIdx, gradeIdx)
                    }
                    disabled={grade.submissionUrl === ""}
                  >
                    {isEdit ? "Save" : value === "" ? "Grade" : "Edit"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Lab;
