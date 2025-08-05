"use client";

import React, { useState, useEffect } from "react";
// import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { EmptyStateToDo } from "./empty-state-todo";
import Loader from "@/components/elements/Loader";
import Link from "next/link";

export type TodoStatus =
  | "not_submitted"
  | "submitted"
  | "on_going"
  | "coming_soon";

export interface TodoItemData {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  linkTugas: string;
  submission?: {
    id: string;
    nilai: number | null;
    link: string;
    feedback: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
}
interface TodoItemProps extends TodoItemData {
  isOpen: boolean;
  onToggle: () => void;
}

export function useFetchTugas() {
  const [items, setItems] = useState<TodoItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTugas = async () => {
      setLoading(true);
      const res = await fetch("/api/dashboard/tugas");
      const { tugas } = await res.json();

      setItems(
        tugas.map(
          (t: {
            id: string;
            title: string;
            description: string;
            linkTugas: string;
            submissionStatus: string;
            submission?: {
              id: string;
              nilai: number | null;
              link: string;
              feedback: string | null;
              createdAt: string;
              updatedAt: string;
            } | null;
          }) => ({
            id: t.id,
            title: t.title,
            description: t.description,
            linkTugas: t.linkTugas,
            status: t.submissionStatus as TodoStatus,
            submission: t.submission,
          })
        )
      );
      setLoading(false);
    };
    fetchTugas();
  }, []);

  return { items, loading };
}

const STATUS_ICON: Record<TodoStatus, React.ReactNode> = {
  not_submitted: (
    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-transparent">
      <img
        src="/status-not-submitted.svg"
        alt="Not Submitted"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  ),
  submitted: (
    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-transparent">
      <img
        src="/status-submitted.svg"
        alt="Submitted"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  ),
  on_going: (
    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-transparent">
      <img
        src="/status-on-going.svg"
        alt="On Going"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  ),
  coming_soon: (
    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-transparent">
      <img
        src="/status-coming-soon.svg"
        alt="Coming Soon"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  ),
};

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  description,
  status,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="w-full flex items-center mb-6">
      <div className="flex-shrink-0">{STATUS_ICON[status]}</div>

      <div className="flex-1 ml-4">
        <button
          onClick={onToggle}
          className={`w-full text-left py-4 cursor-pointer px-6 bg-[#ffffff1a] glass border border-neutral-050/20 flex justify-between items-center transition-all duration-300 hover:bg-gray-700/50 ${
            isOpen ? "rounded-t-2xl" : "rounded-2xl"
          }`}
        >
          <span className="font-josefin-sans text-xl text-white font-400">
            {title}
          </span>
          <ChevronDown
            className={`
                w-6 h-6 text-white transition-transform duration-300
                ${isOpen ? "rotate-180" : ""}
              `}
          />
        </button>

        <div
          className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
            `}
        >
          <div className="py-4 px-6 bg-card/10 glass border border-neutral-050/20 border-x border-b  rounded-b-2xl">
            <div className="flex items-start mb-2">
              <p className=" font-josefin-sans font-400 text-base text-white/90 leading-relaxed flex-1">
                {description}
              </p>
            </div>
            <div className="flex justify-end">
              <Link
                href={"/dashboard/materi/" + id}
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#ffffff1a] glass hover:bg-gray-600/70 border border-neutral-050/20 rounded-xl text-white font-medium transition-all duration-200backdrop-blur-sm"
              >
                Task Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TodoList: React.FC = () => {
  const { items, loading } = useFetchTugas();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  if (loading) return <Loader />;
  if (items.length === 0) return <EmptyStateToDo />;

  const toggle = (id: string) =>
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="w-full">
      {items.map((item) => (
        <TodoItem
          key={item.id}
          {...item}
          isOpen={!!openMap[item.id]}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
};
