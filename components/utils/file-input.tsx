import { Input } from "@/components/ui/input";
import { FilePlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { uploadPDF } from "@/services/chatwithdoc";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import * as mime from "mime-types";
import { supportedFileType } from "@/enum";

type FileInput = {
  file: File | undefined;
  setFile: (file: any) => void;
  handleInputVisibility: (bool: boolean) => void;
  handleFileRemove: () => void;
};

export function FileInput({
  file,
  setFile,
  handleInputVisibility,
  handleFileRemove,
}: FileInput) {
  const [uploading, setUploading] = useState(0);

  const { toast } = useToast();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // if there is no file, simply return
    if (!e.currentTarget.files) return;

    const fl = e.currentTarget.files[0];
    const flType = mime.lookup(fl.name);

    if (supportedFileType.indexOf(flType) === -1) {
      toast({
        title: "File type not supported",
        description: "File format is not supported.",
      });
      return;
    }

    const formData = new FormData();

    formData.append("file", fl);
    const res = await uploadPDF(formData, {
      onUploadProgress: (progress: any) => {
        const percentCompleted = Math.round(
          (progress.loaded * 100) / progress.total
        );
        setUploading(percentCompleted);
      },
    });

    if (res.data.success === true) {
      setFile(fl);
      setUploading(0);
      handleInputVisibility(true);

      toast({
        title: "File Uploaded",
        description: "File has been uploaded,ask your query.",
      });
    } else {
      setFile(null);
      setUploading(0);

      toast({
        title: "File Upload Failed",
        description: res.data.error,
      });
    }
  };

  return (
    <div className="px-2 w-full max-w-md flex flex-col items-center justify-center min-h-screen">
      <div className="w-full h-full flex items-center justify-center aspect-video border-2 border-dashed rounded-md">
        {!file && !uploading ? (
          <>
            <label htmlFor="upload-doc">
              <Input
                type="file"
                accept=".pdf,.txt"
                id="upload-doc"
                className="hidden"
                onChange={handleFile}
              />
              {/* <div className="aspect-video rounded-md border-2 border-dashed w-full max-w-lg flex flex-col justify-center items-center gap-5"> */}
              {/* <div className="aspect-video rounded-md border-2 border-dashed w-full max-w-lg flex flex-col justify-center items-center gap-5"> */}
              <div className="flex flex-col items-center gap-2">
                <FilePlus className="w-20 h-20 text-accent-foreground" />
                <p className="text-accent-foreground text-xl">
                  Drop your files here
                </p>
              </div>
            </label>
          </>
        ) : (
          // <div className="py-20 mt-20 aspect-video rounded-md border-2 border-dashed w-full max-w-lg flex flex-col gap-5 justify-center items-center">
          // <div className="aspect-video rounded-md border-2 border-dashed w-full max-w-lg flex flex-col gap-5 justify-center items-center">
          <>
            {uploading ? (
              <div className="w-full flex flex-col items-center justify-center gap-y-4">
                <Loader2 className="animate-spin delay-700" />
                <div className="px-5 w-full space-y-2">
                  <Progress value={uploading} />
                  <p className="text-center">{uploading}%</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-3xl font-bold">File Uploaded</label>
                <div>
                  <Button
                    onClick={handleFileRemove}
                    className="hover:bg-transparent hover:text-secondary-foreground border-2"
                  >
                    Remove File
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
