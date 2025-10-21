"use client";

import React from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import {
  Bold,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  AlignRight,
  AlignCenter,
  AlignLeft,
} from "lucide-react";

interface ToolbarProps {
  editor: Editor | null;
}

interface EditorForumProps {
  onChange: (richText: string) => void;
  content?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  interface ToolbarButtonProps {
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
  }
  const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    onClick,
    isActive,
    children,
  }) => (
    <button
      onClick={onClick}
      type="button"
      className={`p-2 rounded-md transition-colors duration-200 ${isActive ? "bg-[#4a4a6a] text-white" : "hover:bg-[#2a2a4a] text-gray-300 hover:text-white"}`}
    >
      {children}
    </button>
  );
  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-[#1e1e2f] border-b border-[#3a3a5a]">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <Bold className="w-5 h-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
      >
        <UnderlineIcon className="w-5 h-5" />
      </ToolbarButton>
      <div className="w-[1px] h-7 bg-[#3a3a5a] mx-1" />
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
      >
        {" "}
        <AlignLeft className="w-5 h-5" />{" "}
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
      >
        {" "}
        <AlignCenter className="w-5 h-5" />{" "}
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
      >
        {" "}
        <AlignRight className="w-5 h-5" />{" "}
      </ToolbarButton>
      <div className="w-[1px] h-7 bg-[#3a3a5a] mx-1" />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
      >
        {" "}
        <Heading1 className="w-5 h-5" />{" "}
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
      >
        {" "}
        <Heading2 className="w-5 h-5" />{" "}
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
      >
        {" "}
        <Heading3 className="w-5 h-5" />{" "}
      </ToolbarButton>
    </div>
  );
};

const EditorForum = ({ onChange, content }: EditorForumProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        strike: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Underline,
      TextAlign.configure({
        types: ["paragraph", "heading"],
      }),
      Heading.configure({ levels: [1, 2, 3] }).extend({
        renderHTML({ node, HTMLAttributes }) {
          const level = node.attrs.level;
          const classes: { [key: number]: string } = {
            1: "text-3xl", // H1
            2: "text-2xl", // H2
            3: "text-xl", // H3
          };
          return [
            `h${level}`,
            mergeAttributes(HTMLAttributes, {
              class: `${classes[level]} font-bold`,
            }),
            0,
          ];
        },
      }),
    ],
    content: content ? content : "",
    editorProps: {
      attributes: {
        class:
          "w-full min-h-[128px] resize-none p-4 focus:outline-none text-gray-200",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="bg-[#1e1e2f80] rounded-sm overflow-hidden border border-[#3a3a5a]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorForum;
