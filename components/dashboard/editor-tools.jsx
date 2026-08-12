import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import Table from "@editorjs/table";

const uploadImageByUrl = async (imageUrl) => {
  try {
    const res = await fetch("/api/editor-upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: imageUrl }),
    });
    return await res.json();
  } catch (error) {
    return { success: 0, message: error?.message ?? "Upload by URL failed" };
  }
};

const editorTools = {
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a heading",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  list: {
    class: EditorjsList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
      },
      endpoints: {
        byFile: "/api/editor-upload",
      },
      additionalRequestData: {
        folderName: "craftwise/blogs/editor",
      },
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote author",
    },
  },
  code: {
    class: Code,
    config: {
      placeholder: "Write your code here...",
    },
  },
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
};

export default editorTools;
