import { Input } from "@/components/ui/input";
import { config } from "@/lib/config";
import axios from "axios";
import * as React from "react";
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";
import { Spinner } from "@/components/ui/spinner";
import { CircleCheckBig } from "lucide-react";
import type {ImagekitUploadProps} from "@/types/global";



export default function ImagekitUpload({folder, acceptedFileTypes = "image/*", onUploadSuccess}: ImagekitUploadProps) {
    const [uploadStatus, setUploadStatus] = React.useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [uploadMessage, setUploadMessage] = React.useState('');

    const authenticator = async () => {
        try {
            const response = await axios.get(`${config.env.apiBackend}/api/auth/imagekit/`);
            if (response.status !== 200) {
                const errorText = JSON.stringify(response.data);
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }
            const { signature, expire, token, publicKey } = response.data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;
        await handleUpload(files[0]);
    };

    const handleUpload = async (file: File) => {
        setUploadStatus("uploading");
        setUploadMessage("Upload en cours...");

        const abortController = new AbortController();

        try {
            const { signature, expire, token, publicKey } = await authenticator();

            const uploadResponse = await upload({
                file,
                fileName: file.name,
                publicKey,
                signature,
                token,
                expire,
                folder,
                onProgress: (event: ProgressEvent<EventTarget>) => {
                    console.log(`Progress: ${(event.loaded / event.total) * 100}%`);
                },
                abortSignal: abortController.signal,
            });

            setUploadStatus("success");
            setUploadMessage("Upload réussi !");
            if (uploadResponse.url) {
                onUploadSuccess?.(uploadResponse.url);
            }
        } catch (error) {
            setUploadStatus("error");

            let message = "Erreur lors de l'upload";

            if (error instanceof ImageKitAbortError) {
                message = "Upload annulé";
            } else if (error instanceof ImageKitInvalidRequestError) {
                message = "Requête invalide";
            } else if (error instanceof ImageKitUploadNetworkError) {
                message = "Erreur réseau";
            } else if (error instanceof ImageKitServerError) {
                message = "Erreur serveur";
            }

            setUploadMessage(message);
        }
    };

    return (
        <div className="grid space-y-2">
            <div className="imagekit-upload">
                <Input
                    id="picture"
                    type="file"
                    accept={acceptedFileTypes}
                    onChange={handleFileSelect}
                    className="block w-full text-sm text-gray-600 h-12
                     file:py-2 file:px-4
                     file:bg-primary file:rounded-sm
                     file:h-full file:text-white
                     shadow-none"
                />

                {uploadStatus === "uploading" && (
                    <div className="flex items-center justify-center">
                        <Spinner className="size-10" />
                    </div>
                )}
                {uploadStatus === "success" && (
                    <div className="flex items-center justify-center">
                        <CircleCheckBig className="text-green-500 size-10" />
                    </div>
                )}
            </div>
            {uploadMessage && <p className="text-sm text-gray-500">{uploadMessage}</p>}
        </div>
    );
}
