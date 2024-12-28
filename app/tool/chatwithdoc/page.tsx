"use client";
import { Chatbox } from "@/components/cards/chatbox";
import { Sidebar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileInput } from "@/components/utils/file-input";
import { sendQuery } from "@/services/chatwithdoc";
import { CircleArrowUp, Plus } from "lucide-react";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>();
  const [chat, setChat] = useState<Chatbox[]>([]);
  const [query, setQuery] = useState<string>("");
  const [inputVisible, setInputVisible] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  // const handleFile = (fl: File) => setFile(fl);
  const handleInputVisibility = (bool: boolean) => setInputVisible(bool);

  // scroll to bottom in chat list
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);
  const onSubmit = async () => {
    // if file does not exist return
    if (!file || query.trim() === "") return;

    setChat((prev) => {
      return [
        ...prev,
        {
          user: "User",
          text: query,
          isAI: false,
        },
      ];
    });
    let qry = query;
    // disable text input
    setQuery("");
    setInputVisible(false);

    const res = await sendQuery(qry, file!.name);
    setChat((prev) => {
      return [
        ...prev,
        {
          user: "AI",
          text: res.answer,
          isAI: true,
        },
      ];
    });

    inputRef.current?.focus();
    setInputVisible(true);
  };

  function handleFileRemove() {
    setFile(null);
    setInputVisible(false);
    setChat([]);
  }

  return (
    <>
      <Head>
        <title>Chatwithdoc: AI Chat App</title>
      </Head>
      <main className="xl:grid xl:grid-cols-[20%_80%] min-h-screen">
        <aside className="hidden xl:block z-10">
          <Sidebar
            fileName={file?.name!}
            handleFileRemove={handleFileRemove}
            file={file!}
          />
        </aside>
        <section className="fixed top-0 left-0 right-0 z-20 xl:hidden">
          <div className="grid flex-1 grid-cols-2 justify-center items-center">
            <Button
              variant={"outline"}
              className="py-7 gap-2 cursor-auto rounded-none border-2 "
            >
              <span className="text-sm">File:</span>
              <p className="text-sm font-semibold">
                {file?.name
                  ? `${file.name.substring(0, 10)}...`
                  : "No File Selected"}
              </p>
            </Button>

            <Button
              onClick={handleFileRemove}
              disabled={!file}
              className="py-7 gap-5 text-sm font-bold hover:bg-transparent text-center hover:text-secondary-foreground border-2 rounded-none"
            >
              <Plus size={"1rem"} />
              New Chat
            </Button>
          </div>
        </section>
        <section className="relative left-0 right-0">
          {chat.length <= 0 ? (
            <div className="flex min-h-screen">
              <div className="px-2 m-auto w-full max-w-md">
                <FileInput
                  file={file!}
                  setFile={setFile}
                  handleInputVisibility={handleInputVisibility}
                  handleFileRemove={handleFileRemove}
                />
              </div>
            </div>
          ) : (
            <div className="py-32 xl:py-10 px-2 md:px-4 grid grid-cols-1 justify-items-start min-h-screen items-start gap-10">
              {chat.map((chat, index) => {
                return (
                  <Chatbox
                    key={index}
                    user={chat.user}
                    text={chat.text}
                    isAI={chat.isAI}
                  />
                );
              })}
              <div ref={endOfMessagesRef}></div>
            </div>
          )}
          {file && (
            <div className="pt-20 flex justify-center relative">
              <div className="w-full pt-2 pb-5 bg-background fixed bottom-0">
                <div className="px-2 mx-auto w-full max-w-screen-lg relative">
                  <Textarea
                    ref={inputRef}
                    placeholder="Ask with Simplyanai..."
                    className="px-2 py-2 text-base tracking-wider leading-3 pr-20"
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                    disabled={!inputVisible}
                  />

                  <Button
                    className="absolute bottom-2 right-2 hover:bg-transparent"
                    variant={"ghost"}
                    disabled={!inputVisible || query.trim() === ""}
                    onClick={onSubmit}
                  >
                    <CircleArrowUp size={"2.5rem"} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
