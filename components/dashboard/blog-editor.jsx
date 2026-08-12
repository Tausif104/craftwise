"use client";

import { useEffect, useRef } from "react";
import editorTools from "@/components/dashboard/editor-tools";

export default function BlogEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const holderId = useRef(`editorjs-${Math.random().toString(36).slice(2)}`);
  const onChangeRef = useRef(onChange);
  const initialDataRef = useRef(value || { blocks: [] });
  const initVersionRef = useRef(0);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let editorInstance;
    let cancelled = false;
    const currentInitVersion = ++initVersionRef.current;

    const initEditor = async () => {
      if (typeof window === "undefined" || editorRef.current) return;

      const EditorJS = (await import("@editorjs/editorjs")).default;
      const holderElement = document.getElementById(holderId.current);

      if (
        cancelled ||
        currentInitVersion !== initVersionRef.current ||
        !holderElement
      ) {
        return;
      }

      holderElement.innerHTML = "";

      editorInstance = new EditorJS({
        holder: holderId.current,
        placeholder: "Write your CraftWise article here...",
        tools: editorTools,
        data: initialDataRef.current,
        async onChange() {
          try {
            const savedData = await editorInstance.save();
            if (!cancelled) {
              onChangeRef.current(savedData);
            }
          } catch (error) {
            console.error("EditorJS save error:", error);
          }
        },
      });

      editorRef.current = editorInstance;
    };

    initEditor();

    return () => {
      cancelled = true;
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
      const holderElement = document.getElementById(holderId.current);
      if (holderElement) {
        holderElement.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      id={holderId.current}
      className='min-h-[420px] rounded-[20px] border border-[#D8E4F0] bg-[var(--adm-surface-sunken)] px-4 py-4'
    />
  );
}
